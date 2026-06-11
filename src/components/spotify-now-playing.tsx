"use client";

import { Clock3, ExternalLink, Music2, Pause, Radio } from "lucide-react";
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
const CACHE_KEY = "p3r-spotify-now-playing";

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

export function SpotifyNowPlaying({ visible }: { visible: boolean }) {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const cached = readCachedNowPlaying();
    if (cached) {
      setData(asLastPlayed(cached));
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

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
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [visible]);

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

  const signal =
    data?.status === "playing"
      ? "Live"
      : data?.status === "paused"
        ? "Paused"
        : data?.status === "recent"
          ? "Last Played"
          : "Standby";
  const SignalIcon =
    data?.status === "playing" ? Radio : data?.status === "recent" ? Clock3 : Pause;
  const showProgress = data?.status === "playing" || data?.status === "paused";

  if (!visible || !data) return null;

  const body = (
    <div
      className="p3r-enter-left p3r-mobile-panel fixed left-3 top-24 z-50 w-[min(calc(100vw-1.5rem),16.5rem)] overflow-hidden border-l-4 border-p3r-cyan/80 bg-gradient-to-r from-[#071a56]/95 via-[#082778]/95 to-[#020b28]/95 text-white shadow-[0_14px_40px_rgba(0,10,50,0.55)] backdrop-blur-sm sm:left-8 sm:top-28"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 1.1rem) 0, 100% 1.1rem, 100% 100%, 1.1rem 100%, 0 calc(100% - 1.1rem))",
      }}
    >
      <div className="p3r-stripes pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative flex items-center gap-2.5 p-2.5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden border border-p3r-sky/60 bg-black/50">
          {data?.albumImageUrl ? (
            <div
              aria-hidden
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${data.albumImageUrl})` }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-p3r-red to-p3r-navy">
              <Music2 className="h-5 w-5 text-white" />
            </div>
          )}
          {data?.isPlaying && (
            <span className="absolute bottom-0.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1db954] shadow-[0_0_10px_rgba(29,185,84,0.85)]">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="-skew-x-12 bg-p3r-red px-1.5 py-0.5 text-[9px] font-black uppercase italic tracking-wider">
              <span className="block skew-x-12">Spotify</span>
            </span>
            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-p3r-cyan">
              <SignalIcon className="h-3 w-3" />
              {signal}
            </span>
          </div>

          {isUnavailable ? (
            <>
              <p className="mt-1 truncate text-xs font-black uppercase italic text-white">
                No active track
              </p>
              <p className="truncate text-[10px] font-bold text-white/55">
                Playback signal offline
              </p>
            </>
          ) : (
            <>
              <p className="mt-1 truncate text-xs font-black uppercase italic text-white">
                {data.title}
              </p>
              <p className="truncate text-[10px] font-bold text-p3r-sky">
                {data.artists}
              </p>
            </>
          )}

          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="w-7 text-[9px] font-bold text-white/55">
              {showProgress ? formatTime(progress.elapsed) : "last"}
            </span>
            <span className="h-1 min-w-0 flex-1 -skew-x-12 overflow-hidden bg-black/55">
              <span
                className="block h-full bg-gradient-to-r from-[#1db954] via-p3r-cyan to-white transition-[width] duration-1000"
                style={{
                  width:
                    data?.status === "recent" ? "100%" : `${progress.percent}%`,
                }}
              />
            </span>
            <span className="w-7 text-right text-[9px] font-bold text-white/55">
              {formatTime(data?.durationMs ?? 0)}
            </span>
          </div>
        </div>

        {data?.songUrl && !isUnavailable && (
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-p3r-cyan" />
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
