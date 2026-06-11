"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useP3RSound } from "@/components/p3r/sound";
import { SpotifyNowPlaying } from "@/components/spotify-now-playing";

const GUIDE_TEXT: Record<string, string> = {
  "/": "What do you want to do?",
  "/about": "Reviewing status...",
  "/projects": "Which project do you want to view?",
  "/experience": "Reviewing work history...",
  "/resume": "Obtain the official document?",
  "/contact": "How do you want to reach out?",
  "/writing": "Which entry do you want to read?",
};

function ButtonGlyph({ label }: { label: string }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
      {label}
    </span>
  );
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function P3RHud() {
  const pathname = usePathname();
  const router = useRouter();
  const { enabled, toggle, play } = useP3RSound();
  const [today, setToday] = useState<{ date: string; weekday: string } | null>(
    null
  );

  useEffect(() => {
    const d = new Date();
    setToday({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      weekday: WEEKDAYS[d.getDay()],
    });
  }, []);
  const isHome = pathname === "/";
  const guide =
    GUIDE_TEXT[pathname] ??
    (pathname.startsWith("/writing/") ? "Reading entry..." : "Navigating...");

  const goBack = useCallback(() => {
    const href = pathname.startsWith("/writing/") ? "/writing" : "/";
    play("back");
    router.prefetch(href);
    router.push(href);
  }, [pathname, play, router]);

  // ○ Back — Esc returns toward the main menu, like backing out of a submenu.
  useEffect(() => {
    if (isHome) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goBack, isHome]);

  return (
    <>
      {/* Top-right name chip */}
      <div className="p3r-enter-right fixed right-0 top-3 z-50 sm:top-5">
        <Link
          href="/"
          onMouseEnter={() => router.prefetch("/")}
          onFocus={() => router.prefetch("/")}
          onClick={() => {
            if (!isHome) play("back");
          }}
          className="block bg-white py-1.5 pl-6 pr-4 text-right text-black shadow-[0_4px_18px_rgba(0,20,80,0.45)]"
          style={{
            clipPath: "polygon(1rem 0, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <span className="block text-sm font-black italic leading-none tracking-tight">
            JULIAN SALVADOR
          </span>
          <span className="mt-1 block text-[10px] font-bold uppercase leading-none text-neutral-500">
            comp eng @ uwaterloo
          </span>
        </Link>
      </div>

      {/* Top-left date box, styled like the game's "current wallet" panel */}
      {today && (
        <div className="p3r-enter-left fixed left-3 top-3 z-50 sm:left-8 sm:top-6">
          <Link
            href="/"
            aria-label="Julian Salvador — home"
            onMouseEnter={() => router.prefetch("/")}
            onFocus={() => router.prefetch("/")}
            onClick={() => {
              if (!isHome) play("back");
            }}
            className="block border border-black/70 bg-white px-5 py-2 text-left text-black shadow-[0_4px_18px_rgba(0,20,80,0.45)]"
          >
            <span className="flex items-end gap-1.5 leading-none">
              <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                {today.date}
              </span>
              <span className="pb-0.5 text-sm font-bold text-neutral-500">
                {today.weekday}
              </span>
            </span>
            <span className="mt-1 block text-[11px] font-bold italic leading-none text-neutral-800">
              current date
            </span>
          </Link>
        </div>
      )}

      <SpotifyNowPlaying visible={isHome} />

      {/* Sound toggle */}
      <button
        type="button"
        onClick={() => {
          toggle();
          play("confirm");
        }}
        aria-label={enabled ? "Disable menu sounds" : "Enable menu sounds"}
        className="fixed bottom-3 left-3 z-50 flex h-9 w-9 -skew-x-12 items-center justify-center border border-white/30 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:bottom-5 sm:left-5"
      >
        <span className="skew-x-12">
          {enabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </span>
      </button>

      {/* Bottom guide bar */}
      <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex items-end">
        <div
          className="pointer-events-auto flex items-center gap-4 bg-black/85 py-2 pl-8 pr-4 backdrop-blur-sm sm:gap-6 sm:pr-6"
          style={{ clipPath: "polygon(1.6rem 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <span className="hidden text-xs font-bold italic text-white/90 sm:block sm:text-sm">
            {guide}
            <span className="mt-0.5 block h-0.5 w-full bg-gradient-to-r from-p3r-cyan to-transparent" />
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-white">
            <ButtonGlyph label="✕" /> Confirm
          </span>
          {!isHome && (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-xs font-bold text-white transition-colors hover:text-p3r-cyan"
            >
              <ButtonGlyph label="○" /> Back
            </button>
          )}
        </div>
      </div>
    </>
  );
}
