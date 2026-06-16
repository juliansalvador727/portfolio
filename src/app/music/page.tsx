import { ScreenFrame } from "@/components/p3r/screen";
import { MusicMural } from "@/components/music-mural";
import { getMuralSongs } from "@/lib/songs";

export const metadata = { title: "Music | Julian Salvador" };

// Re-fetch from Firestore at most once a minute so the mural stays refresh-safe
// after each Spotify sync without hitting the database on every visit.
export const revalidate = 60;

export default async function MusicPage() {
  // Single centralized Firestore query — the one source of truth for ordering.
  const songs = await getMuralSongs();

  return (
    <ScreenFrame title="Music" wide>
      <div className="space-y-4">
        <p className="max-w-2xl text-xs font-bold uppercase tracking-wide text-p3r-sky sm:text-sm">
          The last {songs.length || 100} tracks on my Spotify, newest in the
          top-left. Hover a tile for the title — click to open it on Spotify.
        </p>
        <MusicMural songs={songs} />
      </div>
    </ScreenFrame>
  );
}
