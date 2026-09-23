import { Page } from "@/components/porto/page";
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
    <Page
      title="music"
      description={`the last ${songs.length || 100} tracks on my spotify.`}
    >
      <MusicMural songs={songs} />
    </Page>
  );
}
