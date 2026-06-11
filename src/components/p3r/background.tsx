"use client";

/**
 * Full-screen layered P3R underwater backdrop:
 * gradient sea -> light shafts -> two parallax caustics layers ->
 * rising bubbles -> drifting geometric accents -> scanlines.
 * Pure CSS animations (transform/background-position only).
 */

const BUBBLES = [
  { left: "6%", size: 10, dur: 19, delay: 0, opacity: 0.35, drift: "2rem" },
  { left: "13%", size: 22, dur: 26, delay: 4, opacity: 0.25, drift: "-3rem" },
  { left: "21%", size: 7, dur: 16, delay: 9, opacity: 0.45, drift: "1.5rem" },
  { left: "32%", size: 14, dur: 23, delay: 2, opacity: 0.3, drift: "4rem" },
  { left: "41%", size: 9, dur: 18, delay: 12, opacity: 0.4, drift: "-2rem" },
  { left: "52%", size: 26, dur: 30, delay: 6, opacity: 0.18, drift: "3rem" },
  { left: "61%", size: 12, dur: 21, delay: 0, opacity: 0.35, drift: "-4rem" },
  { left: "69%", size: 8, dur: 17, delay: 8, opacity: 0.45, drift: "2rem" },
  { left: "78%", size: 18, dur: 27, delay: 3, opacity: 0.25, drift: "-2.5rem" },
  { left: "86%", size: 11, dur: 20, delay: 11, opacity: 0.35, drift: "3rem" },
  { left: "93%", size: 15, dur: 24, delay: 5, opacity: 0.28, drift: "-3rem" },
];

const SHARDS = [
  { top: "16%", left: "78%", size: 130, dur: 52, opacity: 0.1 },
  { top: "64%", left: "8%", size: 90, dur: 44, opacity: 0.12 },
  { top: "78%", left: "70%", size: 160, dur: 70, opacity: 0.08 },
];

export function P3RBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sea gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #1469d6 0%, #0a45a8 38%, #052a76 64%, #021137 100%)",
        }}
      />

      {/* Light shafts */}
      <div
        className="p3r-bg-shaft absolute -inset-y-10 left-[12%] w-[14%] blur-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(120,200,255,0.28), transparent 65%)",
          animation: "p3r-sway 11s ease-in-out infinite",
        }}
      />
      <div
        className="p3r-bg-shaft absolute -inset-y-10 left-[55%] w-[22%] blur-3xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(90,180,255,0.22), transparent 70%)",
          animation: "p3r-sway 15s ease-in-out -4s infinite",
        }}
      />

      {/* Parallax caustics */}
      <div className="p3r-caustics absolute inset-0 opacity-25" />
      <div className="p3r-caustics-2 absolute inset-0 opacity-15" />

      {/* Rising bubbles */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className={`p3r-bg-bubble absolute rounded-full ${
            i > 3 ? "p3r-mobile-hidden" : ""
          }`}
          style={
            {
              left: b.left,
              top: 0,
              width: b.size,
              height: b.size,
              background:
                "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.9), rgba(160,220,255,0.25) 55%, transparent 70%)",
              "--bubble-opacity": b.opacity,
              "--bubble-drift": b.drift,
              animation: `p3r-rise ${b.dur}s linear ${b.delay}s infinite`,
              willChange: "transform",
            } as React.CSSProperties
          }
        />
      ))}

      {/* Slow-rotating geometric shards */}
      {SHARDS.map((s, i) => (
        <span
          key={i}
          className="p3r-bg-shard p3r-mobile-hidden absolute border-2 border-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            clipPath: "polygon(50% 0, 100% 38%, 78% 100%, 10% 84%)",
            animation: `p3r-spin ${s.dur}s linear infinite`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Diagonal hatch + scanlines */}
      <div className="p3r-stripes absolute inset-0 opacity-40" />
      <div className="p3r-scanlines absolute inset-0 opacity-60" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 110% at 50% 50%, transparent 55%, rgba(1,8,28,0.55) 100%)",
        }}
      />
    </div>
  );
}
