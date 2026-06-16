import "server-only";

import { Timestamp } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";

/** A single listening-history record as stored in / read from Firestore. */
export type Song = {
  trackId: string;
  name: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
  /** ISO-8601 string. Serializable so it can cross the server→client boundary. */
  playedAt: string;
};

/** Shape returned by the Spotify recently-played fetch, ready to persist. */
export type RecentlyPlayedTrack = Song;

export const COLLECTION = "songs";
export const MAX_SONGS = 100;

/**
 * The single source of truth for mural ordering.
 *
 * Firestore is queried once: newest first, with trackId as a deterministic
 * secondary key so ordering stays stable even if two plays share a timestamp.
 * Callers must NOT re-sort the result. If Firestore is unreachable or not yet
 * configured, returns an empty array so the page renders an all-placeholder
 * grid instead of crashing.
 */
export async function getMuralSongs(): Promise<Song[]> {
  try {
    const db = getAdminDb();
    const snapshot = await db
      .collection(COLLECTION)
      .orderBy("playedAt", "desc")
      .orderBy("trackId", "desc")
      .limit(MAX_SONGS)
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        trackId: data.trackId as string,
        name: data.name as string,
        artist: data.artist as string,
        albumArt: data.albumArt as string,
        spotifyUrl: data.spotifyUrl as string,
        playedAt: (data.playedAt as Timestamp).toDate().toISOString(),
      };
    });
  } catch (error) {
    console.error("[songs] getMuralSongs failed:", error);
    return [];
  }
}

export type SyncResult = {
  fetched: number;
  inserted: number;
  pruned: number;
};

/**
 * Persist freshly-played tracks with three guarantees:
 *
 *  1. Idempotency — each doc id is `${playedAtMs}_${trackId}`, a deterministic
 *     key for a (trackId, playedAt) pair. Overlapping cron runs `set()` the
 *     same id and overwrite in place, never creating a duplicate.
 *  2. Consecutive de-duplication — a play is skipped if it has the same
 *     trackId as the immediately preceding kept play (seeded with the most
 *     recent stored song). Non-adjacent repeats (A → B → A) are preserved.
 *  3. Capped history — anything beyond the newest MAX_SONGS is pruned.
 *
 * `tracks` may be in any order; this function only reads the newest stored
 * play and processes the genuinely newer ones chronologically.
 */
export async function syncSongs(
  tracks: RecentlyPlayedTrack[],
): Promise<SyncResult> {
  const db = getAdminDb();
  const collection = db.collection(COLLECTION);

  if (!tracks.length) {
    return { fetched: 0, inserted: 0, pruned: 0 };
  }

  // The most recent play we have already stored — our consecutive-dedup anchor.
  const newestSnapshot = await collection
    .orderBy("playedAt", "desc")
    .limit(1)
    .get();
  const newest = newestSnapshot.docs[0]?.data();
  const lastStoredMs = newest
    ? (newest.playedAt as Timestamp).toMillis()
    : Number.NEGATIVE_INFINITY;
  let previousTrackId: string | null = (newest?.trackId as string) ?? null;

  // Only consider plays strictly newer than what we have, oldest-first so the
  // consecutive comparison runs in chronological order.
  const fresh = tracks
    .map((track) => ({ ...track, playedAtMs: Date.parse(track.playedAt) }))
    .filter(
      (track) =>
        Number.isFinite(track.playedAtMs) && track.playedAtMs > lastStoredMs,
    )
    .sort((a, b) => a.playedAtMs - b.playedAtMs);

  const toInsert: Array<RecentlyPlayedTrack & { playedAtMs: number }> = [];
  for (const track of fresh) {
    if (track.trackId === previousTrackId) continue; // collapse consecutive
    toInsert.push(track);
    previousTrackId = track.trackId;
  }

  if (toInsert.length) {
    const batch = db.batch();
    for (const track of toInsert) {
      const id = `${track.playedAtMs}_${track.trackId}`;
      batch.set(collection.doc(id), {
        trackId: track.trackId,
        name: track.name,
        artist: track.artist,
        albumArt: track.albumArt,
        spotifyUrl: track.spotifyUrl,
        playedAt: Timestamp.fromMillis(track.playedAtMs),
      });
    }
    await batch.commit();
  }

  // Prune everything past the newest MAX_SONGS.
  let pruned = 0;
  const overflow = await collection
    .orderBy("playedAt", "desc")
    .offset(MAX_SONGS)
    .get();
  if (!overflow.empty) {
    const batch = db.batch();
    overflow.docs.forEach((doc) => {
      batch.delete(doc.ref);
      pruned += 1;
    });
    await batch.commit();
  }

  return { fetched: tracks.length, inserted: toInsert.length, pruned };
}
