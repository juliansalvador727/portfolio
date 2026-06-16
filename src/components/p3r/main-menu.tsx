"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useP3RSound } from "@/components/p3r/sound";

// Each entry mimics a P3R Skill-menu row: its own shade of blue,
// slight rotation, and a small horizontal jitter off the center axis.
const MENU: {
  label: string;
  href: string;
  color: string;
  rot: number;
  dx: string;
  gapBefore?: boolean;
}[] = [
  { label: "About", href: "/about", color: "#3ecdf3", rot: -5, dx: "0.5rem" },
  {
    label: "Projects",
    href: "/projects",
    color: "#8feaf9",
    rot: -9,
    dx: "-0.75rem",
  },
  {
    label: "Experience",
    href: "/experience",
    color: "#b3f4ff",
    rot: -10,
    dx: "0.25rem",
  },
  { label: "Writing", href: "/writing", color: "#129fe0", rot: -7, dx: "1rem" },
  { label: "Music", href: "/music", color: "#6fd8f2", rot: -4, dx: "-0.25rem" },
  {
    label: "Contact",
    href: "/contact",
    color: "#5fdcf6",
    rot: 7,
    dx: "-0.5rem",
    gapBefore: true,
  },
];

// White selection wedge behind the active item, pink-rimmed like the Camp screen.
const WEDGE_CLIP = "polygon(0 58%, 100% 0, 80% 100%)";

// Party roster, top-right like the Camp screen.
const PARTY = [
  {
    label: "GitHub",
    href: "https://github.com/juliansalvador727",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/julian-salvador727",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:jesalvad@uwaterloo.ca", icon: Mail },
  { label: "Resume", href: "/resume", icon: FileText },
];

// Red crystal shards, like the splash art accents bottom-left of the Camp screen.
const SHARDS = [
  {
    bottom: "12%",
    left: "3%",
    size: 64,
    rot: "18deg",
    dur: 9,
    color: "#e60033",
  },
  {
    bottom: "6%",
    left: "10%",
    size: 38,
    rot: "-24deg",
    dur: 7,
    color: "#ff2e6c",
  },
  {
    bottom: "20%",
    left: "8%",
    size: 26,
    rot: "40deg",
    dur: 11,
    color: "#ff2e6c",
  },
  {
    bottom: "9%",
    left: "16%",
    size: 18,
    rot: "-8deg",
    dur: 8,
    color: "#e60033",
  },
  {
    bottom: "26%",
    left: "2%",
    size: 16,
    rot: "65deg",
    dur: 10,
    color: "#b3002a",
  },
];

export function MainMenu() {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const { play } = useP3RSound();

  const prefetchInternalRoute = useCallback(
    (href: string) => {
      if (href.startsWith("/")) {
        router.prefetch(href);
      }
    },
    [router],
  );

  const move = useCallback(
    (dir: 1 | -1) => {
      setSelected((s) => (s + dir + MENU.length) % MENU.length);
      play("move");
    },
    [play],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        move(1);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        prefetchInternalRoute(MENU[selected].href);
        play("confirm");
        router.push(MENU[selected].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, play, prefetchInternalRoute, router, selected]);

  useEffect(() => {
    prefetchInternalRoute(MENU[selected].href);
  }, [prefetchInternalRoute, selected]);

  return (
    <div className="relative flex min-h-dvh items-center overflow-x-clip">
      {/* Red tint pass over the lower-left, like the splash art bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 65% at 8% 92%, rgba(230,0,51,0.28), rgba(230,0,51,0.08) 45%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 50% at 96% 12%, rgba(255,46,108,0.12), transparent 65%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Red crystal shards */}
      {SHARDS.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="p3r-mobile-hidden pointer-events-none absolute"
          style={{
            bottom: s.bottom,
            left: s.left,
            width: s.size,
            height: s.size * 1.6,
            background: `linear-gradient(160deg, ${s.color}, #ff7a9e 55%, ${s.color})`,
            clipPath: "polygon(50% 0, 100% 55%, 72% 100%, 18% 88%, 0 40%)",
            transform: `rotate(${s.rot})`,
            opacity: 0.85,
            filter: "drop-shadow(0 0 14px rgba(230,0,51,0.6))",
            animation: `p3r-sway ${s.dur}s ease-in-out ${i * 0.7}s infinite`,
          }}
        />
      ))}

      {/* Vertical watermark, like the sideways text on the Camp screen edge */}
      <span
        aria-hidden
        className="p3r-outline-text pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none text-[8rem] font-black italic uppercase leading-none sm:text-[11rem]"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        MENU
      </span>

      {/* Menu list — center-stacked column, each row jittered and tilted */}
      <nav className="relative z-10 mx-auto w-full max-w-3xl px-10 sm:px-16">
        <ul className="flex flex-col items-center gap-0.5 sm:gap-1">
          {MENU.map((item, i) => {
            const active = i === selected;
            return (
              <motion.li
                key={item.href}
                initial={{ x: -90, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.05 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  translate: item.dx,
                  marginTop: item.gapBefore ? "1rem" : undefined,
                }}
              >
                <Link
                  href={item.href}
                  onMouseEnter={() => {
                    prefetchInternalRoute(item.href);
                    if (!active) {
                      setSelected(i);
                      play("move");
                    }
                  }}
                  onFocus={() => {
                    prefetchInternalRoute(item.href);
                    setSelected(i);
                  }}
                  onPointerDown={() => prefetchInternalRoute(item.href)}
                  onClick={() => {
                    prefetchInternalRoute(item.href);
                    play("confirm");
                  }}
                  className="group relative block w-fit outline-none"
                  style={{ transform: `rotate(${item.rot}deg)` }}
                >
                  {/* White selection wedge with pink rim slides between items */}
                  {active && (
                    <motion.span
                      layoutId="menu-cursor"
                      transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 38,
                      }}
                      aria-hidden
                      className="absolute -bottom-0.5 -right-10 -top-6 left-[32%] sm:-right-16 sm:-top-8"
                      style={{
                        filter:
                          "drop-shadow(0 0 6px rgba(255,84,191,0.85)) drop-shadow(0 0 18px rgba(255,46,150,0.5))",
                      }}
                    >
                      <span
                        className="absolute inset-0 bg-[#ff9adf]"
                        style={{
                          clipPath: WEDGE_CLIP,
                          transform: "scale(1.05)",
                        }}
                      />
                      <span
                        className="absolute inset-0 bg-white"
                        style={{ clipPath: WEDGE_CLIP }}
                      />
                    </motion.span>
                  )}

                  <span
                    className={`relative block font-black italic uppercase leading-[0.95] tracking-tight transition-transform duration-150 ${
                      active
                        ? "scale-110 text-5xl text-[#f80000] sm:text-7xl"
                        : "text-4xl group-hover:brightness-125 sm:text-6xl"
                    }`}
                    style={
                      active
                        ? {
                            // Black duplicate peeking out above-right, like SKILL
                            textShadow: "5px -7px 0 #0c0c0e",
                          }
                        : {
                            color: item.color,
                            // Deep navy drop shadow, offset down-left
                            textShadow:
                              "-5px 7px 0 rgba(0,48,176,0.95), -2px 3px 0 rgba(0,22,110,0.6)",
                          }
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {/* Top-right party roster: each link is a party member card */}
      <aside className="absolute right-0 top-24 z-10 flex flex-col gap-2 sm:top-32 sm:gap-2.5">
        {PARTY.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ x: 90, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.25 + 0.08 * i,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Link
              href={m.href}
              target={m.href.startsWith("http") ? "_blank" : undefined}
              rel={
                m.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              onClick={() => {
                prefetchInternalRoute(m.href);
                play("confirm");
              }}
              onFocus={() => prefetchInternalRoute(m.href)}
              onPointerDown={() => prefetchInternalRoute(m.href)}
              onMouseEnter={() => {
                prefetchInternalRoute(m.href);
                play("move");
              }}
              aria-label={m.label}
              className="p3r-mobile-panel group block border-y border-l-2 border-white/20 border-l-p3r-cyan/80 bg-gradient-to-r from-[#0d2fa0]/85 to-[#051657]/90 p-1.5 backdrop-blur-sm transition-all duration-150 hover:translate-x-[-0.4rem] hover:border-l-p3r-pink hover:from-[#7a0020]/90 hover:to-[#3d0014]/90"
            >
              {/* Portrait tile — icon rotated ~−30° like the reference */}
              <span className="flex h-12 w-12 items-center justify-center border border-p3r-sky/50 bg-gradient-to-b from-p3r-sea to-p3r-ink shadow-[inset_0_0_12px_rgba(70,170,255,0.4)] transition-colors group-hover:border-p3r-pink/70 sm:h-14 sm:w-14">
                <m.icon
                  className="h-7 w-7 text-p3r-cyan transition-colors group-hover:text-p3r-pink sm:h-8 sm:w-8"
                  style={{ transform: "rotate(-30deg)" }}
                />
              </span>
            </Link>
          </motion.div>
        ))}
      </aside>
    </div>
  );
}
