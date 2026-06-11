"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useP3RSound } from "@/components/p3r/sound";

type Entry = {
  title: string;
  href: string;
  date: string;
};

const entries: Entry[] = [
  { title: "1B ECE", href: "/writing/semester-two", date: "Apr 2026" },
  { title: "Before Germany", href: "/writing/before-germany", date: "Mar 2026" },
  { title: "1A ECE", href: "/writing/semester-one", date: "Dec 2025" },
];

export default function WritingPage() {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const { play } = useP3RSound();

  const prefetchEntry = useCallback(
    (href: string) => {
      router.prefetch(href);
    },
    [router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (s + 1) % entries.length);
        play("move");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => (s - 1 + entries.length) % entries.length);
        play("move");
      } else if (e.key === "Enter") {
        e.preventDefault();
        prefetchEntry(entries[selected].href);
        play("confirm");
        router.push(entries[selected].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play, prefetchEntry, router, selected]);

  useEffect(() => {
    prefetchEntry(entries[selected].href);
  }, [prefetchEntry, selected]);

  return (
    <ul className="space-y-1.5">
      {entries.map((entry, i) => {
        const active = i === selected;
        return (
          <li key={entry.href}>
            <Link
              href={entry.href}
              onMouseEnter={() => {
                prefetchEntry(entry.href);
                if (!active) {
                  setSelected(i);
                  play("move");
                }
              }}
              onFocus={() => {
                prefetchEntry(entry.href);
                setSelected(i);
              }}
              onClick={() => play("confirm")}
              className={`relative flex items-center gap-3 px-4 py-2 font-bold transition-colors ${
                active ? "text-black" : "text-white/90"
              }`}
            >
              {/* White selection pill with red border, like the dictionary screen */}
              {active && (
                <motion.span
                  layoutId="writing-pill"
                  transition={{ type: "spring", stiffness: 700, damping: 40 }}
                  className="absolute inset-0 rounded-md border-2 border-p3r-red bg-white shadow-[0_0_18px_rgba(230,0,51,0.4)]"
                />
              )}
              <span
                className={`relative h-1.5 w-1.5 shrink-0 rounded-full ${
                  active ? "bg-p3r-red" : "bg-p3r-sky"
                }`}
              />
              <span className="relative">{entry.title}</span>
              <span
                className={`relative ml-auto text-xs font-bold ${
                  active ? "text-black/50" : "text-white/40"
                }`}
              >
                {entry.date}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
