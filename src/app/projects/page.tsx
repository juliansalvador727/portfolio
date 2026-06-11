"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ScreenFrame } from "@/components/p3r/screen";
import { useP3RSound } from "@/components/p3r/sound";

type Project = {
  name: string;
  description: string;
  link: string | null;
  category: "software" | "hardware";
};

const projects: Project[] = [
  {
    name: "goosehunt",
    description: "waterlooworks scraper + resume matching",
    link: "https://github.com/juliansalvador727/goosehunt",
    category: "software",
  },
  {
    name: "vmc",
    description: "variational monte carlo simulator",
    link: "https://github.com/UWHPC/Variational-Monte-Carlo",
    category: "software",
  },
  {
    name: "genesis",
    description: "minecraft v1.16.1 seed finder (in progress)",
    link: "https://github.com/juliansalvador727/genesis",
    category: "software",
  },
  {
    name: "izhnet",
    description: "N-neuron izhikevich network",
    link: "https://github.com/juliansalvador727/izhnet",
    category: "software",
  },
  {
    name: "axonhh",
    description: "hodgkin-huxley neuron model solver. (in progress)",
    link: "https://github.com/juliansalvador727/axonhh",
    category: "software",
  },
  {
    name: "emulator",
    description: "rust nes emulator.",
    link: "https://github.com/juliansalvador727/emulator",
    category: "software",
  },
  {
    name: "reeljobs",
    description:
      "ai-generated videos of real job postings + 3rd @ deltahacks XII.",
    link: "https://devpost.com/software/reeljobs",
    category: "software",
  },
  {
    name: "c2c",
    description: "bfs on a world map.",
    link: "https://c2c-visualized-v2.vercel.app/",
    category: "software",
  },
  {
    name: "jakegen",
    description: "jake's resume for people who don't like latex.",
    link: "https://jake-gen-v2.vercel.app/",
    category: "software",
  },
  {
    name: "quickflix",
    description: "digital camera photo renamer.",
    link: "https://github.com/juliansalvador727/quickflix",
    category: "software",
  },
  {
    name: "actuate",
    description: "rf-based wireless game controller w/ <5ms latency.",
    link: "https://github.com/juliansalvador727/actuate",
    category: "hardware",
  },
  {
    name: "lumen",
    description: "500khz bandwidth oscilloscope with lcd display (in progress).",
    link: null,
    category: "hardware",
  },
  {
    name: "apls",
    description: "scaleable hospital patient bluetooth esp32 monitoring system.",
    link: null,
    category: "hardware",
  },
  {
    name: "nfc pcb card",
    description: "custom pcb with copper antenna sharing contact info.",
    link: null,
    category: "hardware",
  },
];

export default function ProjectsPage() {
  const [selected, setSelected] = useState(0);
  const { play } = useP3RSound();
  const current = projects[selected];

  const grouped = useMemo(() => {
    return {
      software: projects.filter((p) => p.category === "software"),
      hardware: projects.filter((p) => p.category === "hardware"),
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (s + 1) % projects.length);
        play("move");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => (s - 1 + projects.length) % projects.length);
        play("move");
      } else if (e.key === "Enter" && projects[selected].link) {
        window.open(projects[selected].link!, "_blank", "noopener,noreferrer");
        play("confirm");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play, selected]);

  return (
    <ScreenFrame title="Projects" wide>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Compendium list */}
        <div className="space-y-5">
          {(["software", "hardware"] as const).map((cat) => (
            <div key={cat}>
              <h2 className="mb-2 w-fit -skew-x-12 bg-white/10 px-3 py-0.5 text-xs font-black uppercase italic tracking-widest text-p3r-sky">
                <span className="block skew-x-12">{cat}</span>
              </h2>
              <ul>
                {grouped[cat].map((p) => {
                  const idx = projects.indexOf(p);
                  const active = idx === selected;
                  return (
                    <li key={p.name}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(idx);
                          play("confirm");
                        }}
                        onMouseEnter={() => {
                          if (!active) {
                            setSelected(idx);
                            play("move");
                          }
                        }}
                        className={`relative flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-sm font-bold transition-colors sm:text-base ${
                          active ? "text-black" : "text-white/85 hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="project-pill"
                            transition={{
                              type: "spring",
                              stiffness: 700,
                              damping: 40,
                            }}
                            className="absolute inset-0 rounded-md border-2 border-p3r-red bg-white shadow-[0_0_18px_rgba(230,0,51,0.4)]"
                          />
                        )}
                        <span
                          className={`relative h-1.5 w-1.5 shrink-0 rounded-full ${
                            active ? "bg-p3r-red" : "bg-p3r-sky"
                          }`}
                        />
                        <span className="relative">{p.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.name}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -25, opacity: 0 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden border-2 border-white/15 bg-gradient-to-br from-p3r-ink/90 to-p3r-navy/70 p-6"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 1.4rem) 0, 100% 1.4rem, 100% 100%, 0 100%)",
              }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-p3r-pink">
                {current.category} compendium
              </p>
              <h3 className="mt-1 text-3xl font-black uppercase italic leading-none text-white sm:text-4xl">
                {current.name}
              </h3>
              <div className="mt-3 h-0.5 w-2/3 bg-gradient-to-r from-p3r-red via-p3r-pink to-transparent" />
              <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">
                {current.description}
              </p>

              {current.link ? (
                <Link
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => play("confirm")}
                  className="mt-6 inline-flex -skew-x-12 items-center gap-2 bg-p3r-red px-5 py-2 text-sm font-black uppercase italic text-white shadow-[0_0_20px_rgba(230,0,51,0.5)] transition-colors hover:bg-p3r-pink"
                >
                  <span className="flex skew-x-12 items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> View
                  </span>
                </Link>
              ) : (
                <p className="mt-6 w-fit -skew-x-12 border border-white/25 bg-black/40 px-4 py-2 text-xs font-bold uppercase italic text-white/60">
                  <span className="block skew-x-12">
                    link/source available upon request
                  </span>
                </p>
              )}
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </ScreenFrame>
  );
}
