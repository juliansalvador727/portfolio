"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { StaticImageData } from "next/image";

import fieldDayAtlas from "../../../UI/Field/Day/T_UI_Field_Day_00_texture.png";

type SpriteDef = {
  atlas: StaticImageData;
  x: number;
  y: number;
  w: number;
  h: number;
};

const MONTH_LABELS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const WEEKDAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function Sprite({
  def,
  scale = 1,
  className = "",
  style,
}: {
  def: SpriteDef;
  scale?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-no-repeat ${className}`}
      style={{
        width: def.w * scale,
        height: def.h * scale,
        backgroundImage: `url(${def.atlas.src})`,
        backgroundPosition: `${-def.x * scale}px ${-def.y * scale}px`,
        backgroundSize: `${def.atlas.width * scale}px ${
          def.atlas.height * scale
        }px`,
        ...style,
      }}
    />
  );
}

function getMoonPhaseSprite(date: Date): SpriteDef {
  const synodicMonth = 29.530588853;
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const daysSince =
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      knownNewMoon) /
    86_400_000;
  const phase = ((daysSince % synodicMonth) + synodicMonth) % synodicMonth;
  const index = Math.round((phase / synodicMonth) * 29) % 30;
  const col = index % 12;
  const row = Math.floor(index / 12);

  return {
    atlas: fieldDayAtlas,
    x: col * 161,
    y: row * 161,
    w: 161,
    h: 161,
  };
}

export function P3RCalendarHud() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();

    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const calendar = useMemo(() => {
    if (!now) return null;

    const month = MONTH_LABELS[now.getMonth()];
    const day = String(now.getDate()).padStart(2, "0");
    const weekday = WEEKDAY_LABELS[now.getDay()];
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).format(now);

    return {
      month,
      day,
      weekday,
      time,
      moon: getMoonPhaseSprite(now),
      label: `${weekday}, ${month} ${day}, ${time}`,
    };
  }, [now]);

  if (!calendar) return null;

  return (
    <aside
      aria-label={calendar.label}
      className="fixed right-2 top-2 z-50 hidden origin-top-right scale-[0.82] sm:block lg:right-5 lg:top-5 lg:scale-100"
    >
      <div
        className="p3r-enter-right relative h-[96px] w-[316px] overflow-hidden border-y border-l-2 border-white/25 border-l-p3r-cyan/80 bg-gradient-to-r from-[#06195a]/95 via-[#0a2d91]/90 to-[#020a28]/95 shadow-[0_10px_32px_rgba(0,10,55,0.45)] backdrop-blur-sm"
        style={{
          clipPath:
            "polygon(1rem 0, 100% 0, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%, 0 1rem)",
        }}
      >
        <div className="p3r-stripes pointer-events-none absolute inset-0 opacity-25" />
        <div className="absolute left-4 top-3">
          <p className="text-[10px] font-black uppercase leading-none tracking-[0.22em] text-p3r-cyan">
            Date
          </p>
          <div className="mt-1 flex items-end gap-2 text-white drop-shadow-[0_2px_0_rgba(0,10,45,0.9)]">
            <span className="text-2xl font-black italic leading-none">
              {calendar.month}
            </span>
            <span className="text-5xl font-black italic leading-[0.8]">
              {calendar.day}
            </span>
            <span className="pb-1 text-xl font-black italic leading-none text-p3r-sky">
              {calendar.weekday}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">
              Time
            </span>
            <span className="text-xl font-black italic leading-none text-white">
              {calendar.time}
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 h-[66px] w-[66px] overflow-hidden rounded-full border border-white/40 bg-[#f4d800] shadow-[0_0_18px_rgba(255,235,0,0.35)]">
          <Sprite
            def={calendar.moon}
            scale={0.41}
            style={{ display: "block" }}
          />
          <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/35" />
        </div>
        <div className="absolute bottom-3 left-4 h-0.5 w-32 bg-gradient-to-r from-p3r-cyan via-white to-transparent" />
      </div>
    </aside>
  );
}
