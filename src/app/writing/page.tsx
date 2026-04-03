import Link from "next/link";

type Entry = {
  title: string;
  href: string;
  date: string;
};

const entries: Entry[] = [
  { title: "1B ECE", href: "/writing/semester-two", date: "Apr 2026" },
  { title: "Before Germany", href: "/before-germany", date: "Mar 2026" },
  { title: "1A ECE", href: "/writing/semester-one", date: "Dec 2025" },
];

export default function WritingPage() {
  return (
    <main>
      <div className="space-y-1">
        {entries.map((entry) => (
          <div key={entry.href} className="flex items-center justify-between">
            <Link href={entry.href} className="underline">
              {entry.title}
            </Link>
            <span className="text-muted-foreground text-sm">{entry.date}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
