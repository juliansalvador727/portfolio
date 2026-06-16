import { Music2 } from "lucide-react";

import { MAX_SONGS, type Song } from "@/lib/songs";

/**
 * A strict 10×10 "wall of music" mural. Always renders exactly MAX_SONGS (100)
 * cells: real plays first (already ordered newest-first by Firestore — never
 * re-sorted here), then empty placeholder tiles to fill the grid.
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
            className="group relative block aspect-square overflow-hidden bg-p3r-ink ring-1 ring-white/5 transition-shadow hover:z-10 hover:ring-2 hover:ring-p3r-cyan"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={song.albumArt}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Hover overlay: song name + artist */}
            <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-p3r-ink/95 via-p3r-navy/50 to-transparent p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="block truncate text-[8px] font-black uppercase italic leading-tight text-white sm:text-[10px]">
                {song.name}
              </span>
              <span className="block truncate text-[7px] font-bold leading-tight text-p3r-sky sm:text-[9px]">
                {song.artist}
              </span>
            </span>
          </a>
        ) : (
          <div
            key={`empty-${index}`}
            aria-hidden
            className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#081d6e]/40 to-[#04114d]/60 ring-1 ring-white/5"
          >
            <div className="p3r-stripes pointer-events-none absolute inset-0 opacity-20" />
            <Music2 className="absolute inset-0 m-auto h-1/3 w-1/3 text-white/10" />
          </div>
        ),
      )}
    </div>
  );
}
