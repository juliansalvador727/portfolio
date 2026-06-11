import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SpotifyImage = {
  url: string;
  width: number | null;
  height: number | null;
};

type SpotifyTrack = {
  type: "track";
  name: string;
  duration_ms: number;
  external_urls?: { spotify?: string };
  artists?: { name: string }[];
  album?: {
    name: string;
    images?: SpotifyImage[];
  };
};

type SpotifyEpisode = {
  type: "episode";
  name: string;
  duration_ms: number;
  external_urls?: { spotify?: string };
  show?: {
    name: string;
    images?: SpotifyImage[];
  };
};

type SpotifyCurrentlyPlaying = {
  is_playing: boolean;
  item: SpotifyTrack | SpotifyEpisode | null;
  currently_playing_type: "track" | "episode" | "ad" | "unknown";
  progress_ms: number | null;
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing?additional_types=track,episode";

function json(data: Record<string, unknown>, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      ...init?.headers,
    },
  });
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return { error: "missing_config" as const };
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { error: "token_request_failed" as const };
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    return { error: "token_missing" as const };
  }

  return { accessToken: data.access_token };
}

export async function GET() {
  try {
    const token = await getAccessToken();

    if ("error" in token) {
      return json({
        configured: token.error !== "missing_config",
        status: token.error,
        isPlaying: false,
        updatedAt: new Date().toISOString(),
      });
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 204 || response.status === 202) {
      return json({
        configured: true,
        status: "idle",
        isPlaying: false,
        updatedAt: new Date().toISOString(),
      });
    }

    if (response.status === 429) {
      return json({
        configured: true,
        status: "rate_limited",
        isPlaying: false,
        retryAfter: response.headers.get("retry-after"),
        updatedAt: new Date().toISOString(),
      });
    }

    if (!response.ok) {
      return json({
        configured: true,
        status: "spotify_request_failed",
        isPlaying: false,
        updatedAt: new Date().toISOString(),
      });
    }

    const data = (await response.json()) as SpotifyCurrentlyPlaying;
    const item = data.item;

    if (!item || data.currently_playing_type === "ad") {
      return json({
        configured: true,
        status: data.currently_playing_type === "ad" ? "ad" : "idle",
        isPlaying: false,
        updatedAt: new Date().toISOString(),
      });
    }

    const image =
      item.type === "track"
        ? item.album?.images?.[0]?.url
        : item.show?.images?.[0]?.url;

    return json({
      configured: true,
      status: data.is_playing ? "playing" : "paused",
      isPlaying: data.is_playing,
      itemType: item.type,
      title: item.name,
      artists:
        item.type === "track"
          ? item.artists?.map((artist) => artist.name).join(", ") ?? ""
          : item.show?.name ?? "",
      album: item.type === "track" ? item.album?.name ?? "" : item.show?.name ?? "",
      albumImageUrl: image ?? null,
      songUrl: item.external_urls?.spotify ?? null,
      progressMs: data.progress_ms ?? 0,
      durationMs: item.duration_ms,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return json({
      configured: true,
      status: "error",
      isPlaying: false,
      updatedAt: new Date().toISOString(),
    });
  }
}
