import Image from "next/image";
import Link from "next/link";
import { Page } from "@/components/porto/page";
import { EXPERIENCE } from "@/lib/experience";

export const metadata = { title: "Experience | Julian Salvador" };

export default function ExperiencePage() {
  return (
    <Page title="experience">
      <ol className="relative space-y-8 border-l border-border pl-6">
        {EXPERIENCE.map((e, i) => (
          <li
            key={e.org}
            className="porto-enter relative"
            style={{ "--d": `${0.05 + i * 0.07}s` } as React.CSSProperties}
          >
            {/* Tile-shaped marker on the timeline */}
            <span
              aria-hidden
              className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rotate-45 border border-cobalt ${
                e.current ? "bg-cobalt" : "bg-background"
              }`}
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {e.logo && (
                <Image
                  src={e.logo}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] rounded-sm object-contain"
                />
              )}
              <Link
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:text-cobalt"
              >
                {e.org}
              </Link>
              <span className="text-sm text-muted-foreground">{e.role}</span>
              <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {e.dates}
              </span>
            </div>
            {e.detail && (
              <p className="mt-1.5 text-sm text-foreground/80">{e.detail}</p>
            )}
          </li>
        ))}
      </ol>
    </Page>
  );
}
