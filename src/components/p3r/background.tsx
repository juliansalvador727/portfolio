"use client";

/**
 * Full-screen P3R "Now Loading" underwater backdrop, rebuilt from the original
 * `menu_loading.mp4` using stitched /UI assets (see ASSETS.MD):
 *
 *   white fade-in -> authentic water gradient (colors sampled from the video)
 *   -> bright rippling surface band (caustics + stitched loading gradient)
 *   -> descending light shafts -> two parallax caustics layers
 *   -> rising bubbles -> depth murk + vignette.
 *
 * Pure CSS animations (transform / background-position / opacity only).
 */

// Top -> bottom color stops sampled straight from menu_loading.mp4's clean water.
const WATER_GRADIENT =
  "linear-gradient(to bottom," +
  "#22fffc 0%,#4cfffd 11%,#148be5 24%,#0d5dc4 40%," +
  "#053eb9 55%,#0527b2 70%,#030dae 85%,#0500a8 100%)";

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

// Descending light shafts (god rays from the surface).
const SHAFTS = [
  { left: "10%", width: "13%", dur: 13, delay: 0, from: "rgba(150,245,255,0.30)" },
  { left: "30%", width: "9%", dur: 17, delay: -5, from: "rgba(120,220,255,0.20)" },
  { left: "54%", width: "20%", dur: 15, delay: -4, from: "rgba(110,210,255,0.22)" },
  { left: "80%", width: "11%", dur: 19, delay: -8, from: "rgba(150,245,255,0.26)" },
];

export function P3RBackground() {
  return (
    <div
      aria-hidden
      className="p3r-bg-in fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Water body gradient (sampled from menu_loading.mp4) */}
      <div className="absolute inset-0" style={{ background: WATER_GRADIENT }} />

      {/* Stitched P3R loading gradient as surface light (Loading atlas, blue panel) */}
      <div
        className="absolute inset-x-0 top-0 h-[28%]"
        style={{
          backgroundImage: "url(/p3r/loading-gradient.png)",
          backgroundSize: "100% 100%",
          mixBlendMode: "screen",
          opacity: 0.45,
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)",
        }}
      />

      {/* Descending light shafts */}
      {SHAFTS.map((s, i) => (
        <div
          key={i}
          className={`p3r-bg-shaft absolute -top-10 bottom-0 blur-2xl ${
            i > 1 ? "p3r-mobile-hidden" : ""
          }`}
          style={{
            left: s.left,
            width: s.width,
            background: `linear-gradient(to bottom, ${s.from}, transparent 70%)`,
            animation: `p3r-sway ${s.dur}s ease-in-out ${s.delay}s infinite`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Bright rippling water surface (caustics band at the top) */}
      <div className="p3r-surface absolute inset-x-0 top-0 h-[36%]" />

      {/* Parallax caustics through the water body */}
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

      {/* Faint scanlines (keeps the site's game-UI texture) */}
      <div className="p3r-scanlines absolute inset-0 opacity-30" />

      {/* Depth murk toward the abyss + vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 100% at 50% 8%, transparent 42%, rgba(2,8,52,0.5) 100%)",
        }}
      />
    </div>
  );
}
