import Link from "next/link";
import { WRITING } from "@/lib/writing";

export const metadata = { title: "Writing | Julian Salvador" };

export default function WritingPage() {
  return (
    <ul className="divide-y divide-border">
      {WRITING.map((entry) => (
        <li key={entry.href}>
          <Link
            href={entry.href}
            className="group flex items-baseline justify-between gap-4 py-3"
          >
            <span className="transition-colors group-hover:text-cobalt">
              {entry.title}
            </span>
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {entry.date}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
