import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ScreenFrame } from "@/components/p3r/screen";

import DLR from "@/components/icons/DLR.jpg";
import UWLogo from "@/components/icons/UWLogo.png";
import OrbitalLogo from "@/components/icons/Orbital.png";
import MidSun from "@/components/icons/MidSun.png";
import VayaLogo from "@/components/icons/VayaLogo.png";
import SFULogo from "@/components/icons/SFULogo.png";
import GojoLogo from "@/components/icons/GojoLogo.png";
import Delta from "@/components/icons/Delta.png";

export const metadata = { title: "About | Julian Salvador" };

function RoleRow({
  role,
  org,
  href,
  logo,
  alt,
  delay,
}: {
  role: string;
  org: string;
  href: string;
  logo: StaticImageData;
  alt: string;
  delay: number;
}) {
  return (
    <li
      className="p3r-enter-up flex items-center gap-3 border-l-2 border-p3r-cyan/60 bg-white/5 px-3 py-2"
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      <Image
        src={logo}
        alt={alt}
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
      <span className="text-sm sm:text-base">
        {role}{" "}
        <Link
          className="font-bold uppercase italic text-p3r-sky underline decoration-p3r-cyan/60 underline-offset-4 hover:text-white"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {org}
        </Link>
      </span>
    </li>
  );
}

export default function AboutPage() {
  return (
    <ScreenFrame title="Status" wide>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Portrait card */}
        <div
          className="p3r-enter-left relative h-fit overflow-hidden border-2 border-white/20 bg-gradient-to-b from-p3r-sea/60 to-p3r-ink/80 p-6 text-center"
          style={{
            clipPath:
              "polygon(0 0, 100% 0, 100% calc(100% - 1.6rem), calc(100% - 1.6rem) 100%, 0 100%)",
          }}
        >
          <div className="relative mx-auto h-32 w-32 -skew-x-6 overflow-hidden border-2 border-p3r-cyan/70 bg-p3r-ink/70 shadow-[0_0_24px_rgba(53,224,255,0.35)]">
            <Image
              src="/about-photo.jpg"
              alt="Julian Salvador"
              width={160}
              height={160}
              priority
              className="h-full w-full skew-x-6 scale-110 object-cover"
            />
          </div>
          <p className="mt-4 text-xl font-black uppercase italic leading-tight text-white">
            Julian Salvador
          </p>
          <div className="mt-4 space-y-1 text-left text-xs text-white/75">
            <p className="flex justify-between border-b border-white/10 pb-1">
              <span className="font-bold uppercase">Program</span>
              <span>Comp Eng</span>
            </p>
            <p className="flex justify-between">
              <span className="font-bold uppercase">Uni</span>
              <span className="inline-flex items-center gap-1">
                <Image
                  src={UWLogo}
                  alt="UW Logo"
                  width={12}
                  height={12}
                  className="h-3 w-3"
                />
                <Link
                  href="https://uwaterloo.ca/electrical-computer-engineering/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-p3r-cyan/60 underline-offset-2 hover:text-white"
                >
                  uwaterloo
                </Link>
              </span>
            </p>
          </div>
        </div>

        {/* Status body */}
        <div className="space-y-7">
          <p
            className="p3r-enter-up text-base leading-relaxed sm:text-lg"
            style={{ "--d": "0.15s" } as React.CSSProperties}
          >
            Hi! My name is Julian Salvador — a computer engineering student
            interested in{" "}
            <strong className="text-p3r-cyan">embedded software</strong> and{" "}
            <strong className="text-p3r-cyan">systems programming</strong>.
          </p>

          <div>
            <h2
              className="p3r-enter-left mb-3 w-fit -skew-x-12 bg-p3r-red px-4 py-1 text-sm font-black uppercase italic tracking-wider text-white"
              style={{ "--d": "0.2s" } as React.CSSProperties}
            >
              <span className="block skew-x-12">Currently...</span>
            </h2>
            <ul className="space-y-2">
              <RoleRow
                role="swe intern @"
                org="dlr"
                href="https://www.dlr.de/en/fk"
                logo={DLR}
                alt="DLR Logo"
                delay={0.25}
              />
              <RoleRow
                role="fullstack eng @"
                org="orbital"
                href="https://www.uworbital.com/"
                logo={OrbitalLogo}
                alt="Orbital Logo"
                delay={0.3}
              />
              <RoleRow
                role="firmware eng @"
                org="midsun"
                href="https://www.uwmidsun.com/"
                logo={MidSun}
                alt="Midnight Sun Logo"
                delay={0.35}
              />
            </ul>
          </div>

          <div>
            <h2
              className="p3r-enter-left mb-3 w-fit -skew-x-12 bg-p3r-navy px-4 py-1 text-sm font-black uppercase italic tracking-wider text-white"
              style={{ "--d": "0.4s" } as React.CSSProperties}
            >
              <span className="block skew-x-12">Completed Quests</span>
            </h2>
            <ul className="space-y-2">
              <RoleRow
                role="won top 3 @"
                org="DeltaHacks XII"
                href="https://devpost.com/software/reeljobs"
                logo={Delta}
                alt="DeltaHacks Logo"
                delay={0.45}
              />
              <RoleRow
                role="did STEM outreach to 250+ students @"
                org="sfu"
                href="https://www.sfu.ca/fas/about/community-engagement-outreach/"
                logo={SFULogo}
                alt="SFU Logo"
                delay={0.5}
              />
              <RoleRow
                role="won 2 piano concerto festivals @"
                org="vayalive"
                href="https://vayafestivals.ca/"
                logo={VayaLogo}
                alt="Vaya Logo"
                delay={0.55}
              />
              <RoleRow
                role="drew the greatest sorcerer"
                org="with math"
                href="https://www.desmos.com/calculator/9gcwysjqal"
                logo={GojoLogo}
                alt="Gojo Logo"
                delay={0.6}
              />
            </ul>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}
