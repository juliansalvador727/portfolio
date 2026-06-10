"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useP3RSound } from "@/components/p3r/sound";

const MENU = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Writing", href: "/writing" },
  { label: "Contact", href: "/contact" },
];

// Party roster, top-right like the Camp screen.
const PARTY = [
  {
    label: "GitHub",
    href: "https://github.com/juliansalvador727",
    icon: Github,
    hp: "82%",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juliansalvador727",
    icon: Linkedin,
    hp: "67%",
  },
  {
    label: "Email",
    href: "mailto:jesalvad@uwaterloo.ca",
    icon: Mail,
    hp: "91%",
  },
  { label: "Resume", href: "/resume", icon: FileText, hp: "74%" },
];

// Red crystal shards, like the splash art accents bottom-left of the Camp screen.
const SHARDS = [
  { bottom: "12%", left: "3%", size: 64, rot: "18deg", dur: 9, color: "#e60033" },
  { bottom: "6%", left: "10%", size: 38, rot: "-24deg", dur: 7, color: "#ff2e6c" },
  { bottom: "20%", left: "8%", size: 26, rot: "40deg", dur: 11, color: "#ff2e6c" },
  { bottom: "9%", left: "16%", size: 18, rot: "-8deg", dur: 8, color: "#e60033" },
  { bottom: "26%", left: "2%", size: 16, rot: "65deg", dur: 10, color: "#b3002a" },
];

export function MainMenu() {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const { play } = useP3RSound();

  const move = useCallback(
    (dir: 1 | -1) => {
      setSelected((s) => (s + dir + MENU.length) % MENU.length);
      play("move");
    },
    [play]
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
        play("confirm");
        router.push(MENU[selected].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move, play, router, selected]);

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
          className="pointer-events-none absolute"
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

      {/* Menu list — items cascade diagonally down-right */}
      <nav className="relative z-10 mx-auto w-full max-w-3xl px-10 sm:px-16">
        <ul className="flex flex-col gap-1 sm:gap-1.5">
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
                style={{ marginLeft: `${i * 5.5}%` }}
              >
                <Link
                  href={item.href}
                  onMouseEnter={() => {
                    if (!active) {
                      setSelected(i);
                      play("move");
                    }
                  }}
                  onFocus={() => setSelected(i)}
                  onClick={() => play("confirm")}
                  className="group relative block w-fit outline-none"
                >
                  {/* Red selection slab slides between items */}
                  {active && (
                    <motion.span
                      layoutId="menu-cursor"
                      transition={{
                        type: "spring",
                        stiffness: 600,
                        damping: 38,
                      }}
                      className="p3r-shine absolute -inset-x-4 -inset-y-1 -skew-x-12 overflow-hidden bg-gradient-to-r from-p3r-red via-p3r-pink to-p3r-red shadow-[0_0_30px_rgba(230,0,51,0.65)]"
                    />
                  )}

                  {/* Cursor caret */}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -left-9 top-1/2 -translate-y-1/2 text-xl text-white"
                      style={{ animation: "p3r-cursor 0.8s ease-in-out infinite" }}
                    >
                      ▶
                    </span>
                  )}

                  <span
                    className={`relative block text-4xl font-black italic uppercase leading-[1.05] tracking-tight transition-transform duration-150 sm:text-6xl ${
                      active
                        ? "scale-105 text-white drop-shadow-[0_2px_0_rgba(120,0,30,0.8)]"
                        : "text-p3r-blue group-hover:text-p3r-sky"
                    }`}
                    style={
                      active
                        ? undefined
                        : {
                            // Chromatic split: dark blue one way, red fringe the other
                            textShadow:
                              "3px 3px 0 rgba(2,17,55,0.9), -2px 1px 0 rgba(230,0,51,0.5), -4px 2px 8px rgba(255,46,108,0.25)",
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
              rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={() => play("confirm")}
              onMouseEnter={() => play("move")}
              aria-label={m.label}
              className="group flex items-center gap-2.5 border-y border-l-2 border-white/20 border-l-p3r-cyan/80 bg-gradient-to-r from-[#0d2fa0]/85 to-[#051657]/90 py-1.5 pl-2.5 pr-3 backdrop-blur-sm transition-all duration-150 hover:translate-x-[-0.4rem] hover:border-l-p3r-pink hover:from-[#7a0020]/90 hover:to-[#3d0014]/90 sm:pr-5"
              style={{
                clipPath:
                  "polygon(0.8rem 0, 100% 0, 100% 100%, 0 100%, 0 0.8rem)",
              }}
            >
              {/* Portrait tile */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-p3r-sky/50 bg-gradient-to-b from-p3r-sea to-p3r-ink shadow-[inset_0_0_12px_rgba(70,170,255,0.4)] transition-colors group-hover:border-p3r-pink/70 sm:h-12 sm:w-12">
                <m.icon className="h-5 w-5 text-p3r-cyan transition-colors group-hover:text-p3r-pink sm:h-6 sm:w-6" />
              </span>

              <span className="hidden flex-col gap-1 sm:flex">
                <span className="text-xs font-black uppercase italic leading-none text-white/90 group-hover:text-white">
                  {m.label}
                </span>
                {/* HP/SP-style gauges (decorative) */}
                <span className="block h-1.5 w-20 -skew-x-12 overflow-hidden bg-black/50">
                  <span
                    className="block h-full bg-gradient-to-r from-amber-400 to-yellow-200"
                    style={{
                      width: m.hp,
                      transformOrigin: "left",
                      animation: `p3r-bar-fill 0.5s cubic-bezier(0.16,1,0.3,1) ${
                        0.45 + i * 0.08
                      }s backwards`,
                    }}
                  />
                </span>
                <span className="block h-1 w-14 -skew-x-12 overflow-hidden bg-black/50">
                  <span
                    className="block h-full bg-gradient-to-r from-p3r-cyan to-p3r-sky"
                    style={{
                      width: "60%",
                      transformOrigin: "left",
                      animation: `p3r-bar-fill 0.5s cubic-bezier(0.16,1,0.3,1) ${
                        0.55 + i * 0.08
                      }s backwards`,
                    }}
                  />
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </aside>
    </div>
  );
}
