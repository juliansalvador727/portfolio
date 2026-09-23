"use client";

import { Music2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NowPlaying = {
  configured: boolean;
  status:
    | "playing"
    | "paused"
    | "recent"
    | "idle"
    | "ad"
    | "missing_config"
    | "token_request_failed"
    | "token_missing"
    | "spotify_request_failed"
    | "rate_limited"
    | "error";
  isPlaying: boolean;
  title?: string;
  artists?: string;
  album?: string;
  albumImageUrl?: string | null;
  songUrl?: string | null;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
  updatedAt?: string;
};

const POLL_MS = 30_000;
const CACHE_KEY = "spotify-now-playing";

let memoryCache: NowPlaying | null = null;

function isTrackData(
  data: NowPlaying | null | undefined
): data is NowPlaying & { title: string } {
  return Boolean(
    data?.configured &&
      data.title &&
      (data.status === "playing" ||
        data.status === "paused" ||
        data.status === "recent")
  );
}

function readCachedNowPlaying() {
  if (isTrackData(memoryCache)) return memoryCache;
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const cached = JSON.parse(raw) as NowPlaying;
    if (!isTrackData(cached)) return null;

    memoryCache = cached;
    return cached;
  } catch {
    return null;
  }
}

function writeCachedNowPlaying(data: NowPlaying) {
  if (!isTrackData(data)) return;

  memoryCache = data;

  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // Storage can be unavailable in private contexts.
  }
}

function asLastPlayed(data: NowPlaying, updatedAt?: string): NowPlaying {
  return {
    ...data,
    status: "recent",
    isPlaying: false,
    progressMs: data.durationMs ?? data.progressMs ?? 0,
    updatedAt: updatedAt ?? data.updatedAt,
  };
}

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function SpotifyNowPlaying() {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const cached = readCachedNowPlaying();
    if (cached) {
      setData(asLastPlayed(cached));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/spotify/now-playing", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const next = (await response.json()) as NowPlaying;
        if (!cancelled) {
          setData((previous) => {
            if (isTrackData(next)) {
              writeCachedNowPlaying(next);
              return next;
            }

            const cached = previous ?? readCachedNowPlaying();
            if (isTrackData(cached)) {
              return asLastPlayed(cached, next.updatedAt);
            }

            return next;
          });
        }
      } catch {
        if (!cancelled) {
          setData((previous) => {
            const cached = previous ?? readCachedNowPlaying();
            if (isTrackData(cached)) {
              return asLastPlayed(cached);
            }

            return {
              configured: true,
              status: "error",
              isPlaying: false,
            };
          });
        }
      }
    }

    void load();
    const interval = window.setInterval(load, POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const progress = useMemo(() => {
    if (!data?.durationMs || data.progressMs == null) {
      return { elapsed: 0, percent: 0 };
    }

    const serverTime = data.updatedAt ? Date.parse(data.updatedAt) : now;
    const drift = data.isPlaying ? Math.max(0, now - serverTime) : 0;
    const elapsed = Math.min(data.durationMs, data.progressMs + drift);

    return {
      elapsed,
      percent: Math.min(100, Math.max(0, (elapsed / data.durationMs) * 100)),
    };
  }, [data, now]);

  const isUnavailable =
    !data ||
    !data.configured ||
    data.status === "idle" ||
    data.status === "ad" ||
    data.status === "error" ||
    data.status === "rate_limited" ||
    data.status === "spotify_request_failed" ||
    data.status === "token_request_failed" ||
    data.status === "token_missing" ||
    data.status === "missing_config";

  const showProgress = data?.status === "playing" || data?.status === "paused";

  if (!data) return null;

  const body = (
    <div className="group flex items-center gap-3 rounded-md border border-border bg-card p-3 transition-colors hover:border-cobalt/40">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-muted">
        {data.albumImageUrl ? (
          <div
            aria-hidden
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${data.albumImageUrl})` }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-cobalt">
            <Music2 className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        {isUnavailable ? (
          <p className="truncate text-sm text-muted-foreground">
            nothing playing right now
          </p>
        ) : (
          <>
            <p className="truncate text-sm font-medium">{data.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {data.artists}
            </p>
          </>
        )}
        {showProgress && (
          <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span>{formatTime(progress.elapsed)}</span>
            <span className="h-0.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
              <span
                className="block h-full bg-cobalt transition-[width] duration-1000"
                style={{ width: `${progress.percent}%` }}
              />
            </span>
            <span>{formatTime(data.durationMs ?? 0)}</span>
          </div>
        )}
      </div>

    </div>
  );

  if (data?.songUrl && !isUnavailable) {
    return (
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${data.title ?? "current track"} on Spotify`}
      >
        {body}
      </a>
    );
  }

  return body;
}
