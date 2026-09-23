import Link from "next/link";
import { AzulejoPattern } from "@/components/porto/azulejo";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 pt-16 text-center">
      {/* One tile knocked loose from the wall */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="h-24 w-24 rotate-[8deg] rounded-sm text-cobalt shadow-sm"
      >
        <defs>
          <AzulejoPattern id="not-found-tile" size={100} />
        </defs>
        <rect width="100" height="100" fill="url(#not-found-tile)" />
      </svg>
      <h1 className="font-serif text-7xl leading-none">404</h1>
      <p className="text-muted-foreground">
        this tile fell off the wall. the page you&apos;re looking for isn&apos;t here.
      </p>
      <Link href="/" className="porto-link text-sm">
        ← back home
      </Link>
    </div>
  );
}
