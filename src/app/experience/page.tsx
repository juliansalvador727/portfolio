import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ScreenFrame } from "@/components/p3r/screen";

import DLR from "@/components/icons/DLR.jpg";
import OrbitalLogo from "@/components/icons/Orbital.png";
import MidSun from "@/components/icons/MidSun.png";
import SFULogo from "@/components/icons/SFULogo.png";
import Delta from "@/components/icons/Delta.png";

export const metadata = { title: "Experience | Julian Salvador" };

type Entry = {
  org: string;
  role: string;
  href: string;
  logo: StaticImageData;
  alt: string;
  status: "NOW" | "PAST";
  detail: string;
};

const entries: Entry[] = [
  {
    org: "DLR",
    role: "Software Engineering Intern",
    href: "https://www.dlr.de/en/fk",
    logo: DLR,
    alt: "DLR Logo",
    status: "NOW",
    detail: "german aerospace center.",
  },
  {
    org: "UW Orbital",
    role: "Fullstack Engineer",
    href: "https://www.uworbital.com/",
    logo: OrbitalLogo,
    alt: "Orbital Logo",
    status: "NOW",
    detail: "waterloo's satellite design team.",
  },
  {
    org: "Midnight Sun",
    role: "Firmware Engineer",
    href: "https://www.uwmidsun.com/",
    logo: MidSun,
    alt: "Midnight Sun Logo",
    status: "NOW",
    detail: "waterloo's solar car design team.",
  },
  {
    org: "SFU",
    role: "STEM Outreach",
    href: "https://www.sfu.ca/fas/about/community-engagement-outreach/",
    logo: SFULogo,
    alt: "SFU Logo",
    status: "PAST",
    detail: "reached 250+ students through community engagement.",
  },
];

export default function ExperiencePage() {
  return (
    <ScreenFrame title="Experience">
      <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-0.5 before:bg-gradient-to-b before:from-p3r-cyan before:via-p3r-blue before:to-transparent">
        {entries.map((e, i) => (
          <li
            key={e.org}
            className="p3r-enter-right relative pl-8"
            style={{ "--d": `${0.15 + i * 0.08}s` } as React.CSSProperties}
          >
            <span
              aria-hidden
              className={`absolute left-0 top-3 h-4 w-4 rotate-45 border-2 ${
                e.status === "NOW"
                  ? "border-p3r-pink bg-p3r-red shadow-[0_0_12px_rgba(255,46,108,0.8)]"
                  : "border-p3r-sky/70 bg-p3r-navy"
              }`}
            />
            <Link
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-white/15 bg-white/5 px-4 py-3 transition-colors hover:border-p3r-cyan/70 hover:bg-white/10"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 1.1rem) 0, 100% 1.1rem, 100% 100%, 0 100%)",
              }}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className={`-skew-x-12 px-2 py-0.5 text-[10px] font-black uppercase ${
                    e.status === "NOW"
                      ? "bg-p3r-red text-white"
                      : "bg-white/15 text-white/70"
                  }`}
                >
                  <span className="block skew-x-12">{e.status}</span>
                </span>
                <Image
                  src={e.logo}
                  alt={e.alt}
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain"
                />
                <span className="text-lg font-black uppercase italic text-white group-hover:text-p3r-cyan">
                  {e.org}
                </span>
                <span className="text-sm font-bold text-p3r-sky">{e.role}</span>
              </div>
              <p className="mt-1 text-sm text-white/70">{e.detail}</p>
            </Link>
          </li>
        ))}
      </ol>
    </ScreenFrame>
  );
}
