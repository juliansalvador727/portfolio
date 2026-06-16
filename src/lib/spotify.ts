import "server-only";

import type { RecentlyPlayedTrack } from "@/lib/songs";

/**
 * Server-side Spotify access for the listening-history sync.
 *
 * This reuses the SAME credentials and Spotify endpoints as the existing
 * now-playing integration (SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET /
 * SPOTIFY_REFRESH_TOKEN) — it is another consumer of the one Spotify data
 * source, not a second source of truth. The now-playing route is untouched.
 * Secrets stay on the server and are never sent to the client.
 */

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";

/** Thrown when Spotify returns 429 so the API route can surface Retry-After. */
export class SpotifyRateLimitError extends Error {
  retryAfter: string | null;
  constructor(retryAfter: string | null) {
    super("Spotify rate limited");
    this.name = "SpotifyRateLimitError";
    this.retryAfter = retryAfter;
  }
}

type SpotifyRecentlyPlayed = {
  items: Array<{
    track: {
      id: string;
      name: string;
      external_urls?: { spotify?: string };
      artists?: Array<{ name: string }>;
      album?: { images?: Array<{ url: string }> };
    } | null;
    played_at: string;
  }>;
};

async function getAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify credentials");
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
    throw new Error(`Spotify token request failed: ${response.status}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Spotify token missing from response");
  }

  return data.access_token;
}

/**
 * Fetch up to `limit` (Spotify max 50) most-recently-played tracks, mapped to
 * the persisted Song shape. Tracks without an id (rare) are dropped.
 */
export async function getRecentlyPlayedTracks(
  limit = 50,
): Promise<RecentlyPlayedTrack[]> {
  const accessToken = await getAccessToken();
  const boundedLimit = Math.min(Math.max(limit, 1), 50);

  const response = await fetch(
    `${RECENTLY_PLAYED_ENDPOINT}?limit=${boundedLimit}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    },
  );

  if (response.status === 429) {
    throw new SpotifyRateLimitError(response.headers.get("retry-after"));
  }

  if (!response.ok) {
    throw new Error(`Spotify recently-played failed: ${response.status}`);
  }

  const data = (await response.json()) as SpotifyRecentlyPlayed;

  return (data.items ?? [])
    .filter((item) => item.track?.id)
    .map((item) => {
      const track = item.track!;
      return {
        trackId: track.id,
        name: track.name,
        artist: (track.artists ?? []).map((a) => a.name).join(", "),
        albumArt: track.album?.images?.[0]?.url ?? "",
        spotifyUrl:
          track.external_urls?.spotify ??
          `https://open.spotify.com/track/${track.id}`,
        playedAt: item.played_at,
      };
    });
}
