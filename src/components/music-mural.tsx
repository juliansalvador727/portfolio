import { MAX_SONGS, type Song } from "@/lib/songs";
import { AzulejoPattern } from "@/components/porto/azulejo";

/**
 * A strict 10×10 "wall of music" mural. Always renders exactly MAX_SONGS (100)
 * cells: real plays first (already ordered newest-first by Firestore — never
 * re-sorted here), then blank azulejo tiles to fill the grid.
 */
export function MusicMural({ songs }: { songs: Song[] }) {
  const cells: Array<Song | null> = Array.from(
    { length: MAX_SONGS },
    (_, index) => songs[index] ?? null,
  );

  return (
    <div className="grid grid-cols-10 gap-[3px]">
      {cells.map((song, index) =>
        song ? (
          <a
            key={`${song.trackId}-${song.playedAt}`}
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${song.name} by ${song.artist} on Spotify`}
            title={`${song.name} — ${song.artist}`}
            className="group relative block aspect-square overflow-hidden rounded-[2px] bg-muted ring-cobalt transition-shadow hover:z-10 hover:ring-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={song.albumArt}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:flex">
              <span className="block truncate text-[10px] font-medium leading-tight text-white">
                {song.name}
              </span>
              <span className="block truncate text-[9px] leading-tight text-white/70">
                {song.artist}
              </span>
            </span>
          </a>
        ) : (
          <svg
            key={`empty-${index}`}
            aria-hidden
            viewBox="0 0 100 100"
            className="aspect-square w-full rounded-[2px] text-cobalt opacity-30"
          >
            <defs>
              <AzulejoPattern id={`mural-empty-${index}`} size={100} />
            </defs>
            <rect width="100" height="100" fill={`url(#mural-empty-${index})`} />
          </svg>
        ),
      )}
    </div>
  );
}
