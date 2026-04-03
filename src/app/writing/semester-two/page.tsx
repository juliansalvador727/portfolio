import Link from "next/link";

export default function SemesterTwo() {
  return (
    <main>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">1B ECE</h1>
          <span className="text-muted-foreground text-sm">Apr 2026</span>
        </div>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>Write your semester two reflection here.</p>
        </div>
        <Link href="/writing" className="underline text-sm">
          ← back
        </Link>
      </div>
    </main>
  );
}
