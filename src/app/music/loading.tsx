import { Page } from "@/components/porto/page";
import { MAX_SONGS } from "@/lib/songs";

/**
 * Skeleton shown via Suspense while the server component fetches from Firestore.
 * Renders the same strict 10×10 grid so layout never shifts when songs arrive.
 */
export default function MusicLoading() {
  return (
    <Page title="music" description="loading tiles…">
      <div className="grid grid-cols-10 gap-[3px]">
        {Array.from({ length: MAX_SONGS }).map((_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-[2px] bg-muted"
          />
        ))}
      </div>
    </Page>
  );
}
