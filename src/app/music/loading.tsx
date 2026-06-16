import { ScreenFrame } from "@/components/p3r/screen";
import { MAX_SONGS } from "@/lib/songs";

/**
 * Skeleton shown via Suspense while the server component fetches from Firestore.
 * Renders the same strict 10×10 grid so layout never shifts when songs arrive.
 */
export default function MusicLoading() {
  return (
    <ScreenFrame title="Music" wide>
      <div className="space-y-4">
        <div className="h-4 w-2/3 max-w-2xl animate-pulse bg-white/10" />
        <div className="grid grid-cols-10 gap-[3px]">
          {Array.from({ length: MAX_SONGS }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-square animate-pulse overflow-hidden bg-gradient-to-br from-[#081d6e]/40 to-[#04114d]/60 ring-1 ring-white/5"
            >
              <div className="p3r-stripes pointer-events-none absolute inset-0 opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}
