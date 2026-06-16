import { NextResponse, type NextRequest } from "next/server";

import { getRecentlyPlayedTracks, SpotifyRateLimitError } from "@/lib/spotify";
import { syncSongs } from "@/lib/songs";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 30;

/**
 * Authorize the request. Vercel Cron automatically sends
 * `Authorization: Bearer ${CRON_SECRET}` when CRON_SECRET is set; manual /
 * external triggers can pass `?secret=...` instead. If CRON_SECRET is not yet
 * configured, the route is open (dev convenience) — set it before deploying.
 */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return true;
  if (request.nextUrl.searchParams.get("secret") === secret) return true;

  return false;
}

async function handle(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, {
      status: 401,
    });
  }

  try {
    const tracks = await getRecentlyPlayedTracks(50);
    const result = await syncSongs(tracks);
    return NextResponse.json(
      { ok: true, ...result, at: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof SpotifyRateLimitError) {
      return NextResponse.json(
        { ok: false, error: "rate_limited", retryAfter: error.retryAfter },
        {
          status: 429,
          headers: error.retryAfter
            ? { "Retry-After": error.retryAfter }
            : undefined,
        },
      );
    }

    console.error("[syncSpotify] failed:", error);
    const message = error instanceof Error ? error.message : "sync_failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

// Cron triggers GET; manual testing can use either.
export const GET = handle;
export const POST = handle;
