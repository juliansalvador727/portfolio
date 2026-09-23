import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AzulejoPattern } from "@/components/porto/azulejo";
import { SectionLabel } from "@/components/porto/page";
import { SOCIALS } from "@/components/porto/site-footer";
import { SpotifyNowPlaying } from "@/components/spotify-now-playing";
import { WRITING } from "@/lib/writing";
import { EXPERIENCE } from "@/lib/experience";

import UWLogo from "@/components/icons/UWLogo.png";

function Stagger({ d, children }: { d: number; children: React.ReactNode }) {
  return (
    <div className="porto-enter" style={{ "--d": `${d}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-14 pt-10 sm:pt-16">
      <Stagger d={0.1}>
        <section className="flex items-start justify-between gap-6">
          <div>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              hi, i&apos;m <em className="text-cobalt">julian salvador</em>.
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-foreground/85">
              computer engineering student at{" "}
              <Image
                src={UWLogo}
                alt=""
                width={16}
                height={16}
                className="mr-1 inline-block h-4 w-4 -translate-y-px object-contain"
              />
              <Link
                href="https://uwaterloo.ca/electrical-computer-engineering/"
                target="_blank"
                rel="noopener noreferrer"
                className="porto-link"
              >
                uwaterloo
              </Link>{" "}
              interested in systems programming and performance engineering.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-cobalt"
                >
                  <s.icon className="h-4 w-4" />
                  {s.label.toLowerCase()}
                </Link>
              ))}
            </div>
          </div>
          {/* Portrait set into a tiled mat */}
          <div className="relative hidden shrink-0 overflow-hidden rounded-md p-2 sm:block">
            <svg aria-hidden className="absolute inset-0 h-full w-full text-cobalt">
              <defs>
                <AzulejoPattern id="portrait-mat" size={16} />
              </defs>
              <rect width="100%" height="100%" fill="url(#portrait-mat)" />
            </svg>
            <Image
              src="/about-photo.jpg"
              alt="Julian Salvador"
              width={112}
              height={112}
              priority
              className="relative h-28 w-28 rounded-sm object-cover"
            />
          </div>
        </section>
      </Stagger>

      <Stagger d={0.2}>
        <section>
          <SectionLabel>experience</SectionLabel>
          <ul className="divide-y divide-border">
            {EXPERIENCE.map((e) => (
              <li
                key={e.org}
                className="flex items-center justify-between gap-4 py-2.5"
              >
                <span className="flex items-center gap-3">
                  {e.logo && (
                    <Image
                      src={e.logo}
                      alt=""
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] shrink-0 rounded-sm object-contain"
                    />
                  )}
                  <span>
                    {e.role} @{" "}
                    <Link
                      href={e.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="porto-link"
                    >
                      {e.org}
                    </Link>
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {e.dates}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Stagger>

      <Stagger d={0.3}>
        <section>
          <SectionLabel>writing</SectionLabel>
          <ul className="divide-y divide-border">
            {WRITING.slice(0, 3).map((w) => (
              <li key={w.href}>
                <Link
                  href={w.href}
                  className="group flex items-baseline justify-between gap-4 py-2.5"
                >
                  <span className="transition-colors group-hover:text-cobalt">
                    {w.title}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {w.date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/writing"
            className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-cobalt"
          >
            all writing <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </section>
        <div className="mt-8">
          <SpotifyNowPlaying />
        </div>
      </Stagger>
    </div>
  );
}
