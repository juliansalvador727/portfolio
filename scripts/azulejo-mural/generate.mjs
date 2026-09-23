/**
 * Painted azulejo panels for the page margins, after the figurative walls of
 * Capela das Almas: one picture brushed across a grid of tiles, inside a
 * baroque frame of scrolls and acanthus, over a patterned dado.
 *
 *   left.svg   a rabelo on the Douro under a painted sky
 *   right.svg  an albarrada — vase of flowers
 *
 * One palette for both themes: dark mode dims the same white-glazed tiles.
 * Deterministic (seeded). Run with `npm run mural`.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "../../public/mural");
const W = 400;
const H = 1000;
const T = 40; // tile size
const BAND = 44; // frame width at the sides
const DADO = 880; // where the patterned lower band starts

const PALETTE = { glaze: "#f7f4ec", ink: "#1f4bb4", grout: "#d8d1c0" };

/* ------------------------------------------------------------------ */

function mulberry32(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
let rand = mulberry32(1);
const reseed = (s) => (rand = mulberry32(s));
const R = (a, b) => a + (b - a) * rand();
const f = (n) => Math.round(n * 10) / 10;

/* ------------------------------------------------------------------ */
/* Filters: wet washes with pooled edges and pigment granulation,      */
/* and a loaded brush for line work.                                    */
/* ------------------------------------------------------------------ */

function defs(p) {
  return `
<filter id="wash" x="-10%" y="-10%" width="120%" height="120%">
  <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="3" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feGaussianBlur in="d" stdDeviation="0.9" result="b"/>
  <feMorphology in="b" operator="erode" radius="1.6" result="er"/>
  <feComposite in="b" in2="er" operator="out" result="edge"/>
  <feMerge result="m"><feMergeNode in="b"/><feMergeNode in="edge"/></feMerge>
  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="9" result="g"/>
  <feComposite in="m" in2="g" operator="arithmetic" k1="0.7" k2="0.65" k3="0" k4="0"/>
</filter>
<filter id="brush" x="-10%" y="-10%" width="120%" height="120%">
  <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feGaussianBlur in="d" stdDeviation="0.35"/>
</filter>
<clipPath id="panel"><rect width="${W}" height="${H}"/></clipPath>
<linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="${p.ink}" stop-opacity="0.42"/>
  <stop offset="0.55" stop-color="${p.ink}" stop-opacity="0.08"/>
  <stop offset="1" stop-color="${p.ink}" stop-opacity="0"/>
</linearGradient>`;
}

/* ------------------------------------------------------------------ */
/* Frame                                                                */
/* ------------------------------------------------------------------ */

// Scene window: straight sides, a segmental arch with little shoulders.
const SCENE_TOP = 200;
const ARCH_TOP = 140;
const SCENE_BOTTOM = 850;
const sceneWindow = () => {
  const l = BAND;
  const r = W - BAND;
  return `M${l} ${SCENE_BOTTOM}V${SCENE_TOP}C${l + 14} ${SCENE_TOP} ${l + 18} ${SCENE_TOP - 18} ${l + 34} ${SCENE_TOP - 22}Q${W / 2} ${ARCH_TOP - 40} ${r - 34} ${SCENE_TOP - 22}C${r - 18} ${SCENE_TOP - 18} ${r - 14} ${SCENE_TOP} ${r} ${SCENE_TOP}V${SCENE_BOTTOM}Z`;
};

/** An S-scroll with curled ends and acanthus leaves, the frame's workhorse. */
function scroll(p, cx, cy, s, flip = 1) {
  const k = s;
  const x = (v) => f(cx + v * k * flip);
  const y = (v) => f(cy + v * k);
  const spine = `M${x(0)} ${y(-40)}C${x(16)} ${y(-30)} ${x(16)} ${y(-8)} ${x(0)} ${y(0)}C${x(-16)} ${y(8)} ${x(-16)} ${y(30)} ${x(0)} ${y(40)}`;
  const curlTop = `M${x(0)} ${y(-40)}C${x(-9)} ${y(-43)} ${x(-12)} ${y(-32)} ${x(-5)} ${y(-30)}C${x(0)} ${y(-29)} ${x(1)} ${y(-35)} ${x(-3)} ${y(-36)}`;
  const curlBot = `M${x(0)} ${y(40)}C${x(9)} ${y(43)} ${x(12)} ${y(32)} ${x(5)} ${y(30)}C${x(0)} ${y(29)} ${x(-1)} ${y(35)} ${x(3)} ${y(36)}`;
  const leaf = (lx, ly, ang) =>
    `<path d="M0 0C4 -5 12 -6 18 -2C12 2 5 3 0 0Z" transform="translate(${x(lx)} ${y(ly)}) rotate(${ang * flip + (flip < 0 ? 180 : 0)}) scale(${k})" fill="${p.glaze}"/>`;
  return `
<path d="${spine}" stroke="${p.glaze}" stroke-width="${f(6 * k)}" fill="none"/>
<path d="${curlTop}${curlBot}" stroke="${p.glaze}" stroke-width="${f(4 * k)}" fill="none"/>
${leaf(8, -20, -30)}${leaf(-8, 20, 150)}${leaf(10, -6, 20)}
<path d="${spine}" stroke="${p.ink}" stroke-width="${f(1.1 * k)}" fill="none" transform="translate(${f(2 * k * flip)} 0)" opacity="0.8"/>`;
}

/** Scallop shell crest. */
function shell(p, cx, cy, r) {
  let ribs = "";
  let petals = "";
  for (let i = 0; i < 9; i++) {
    const a = Math.PI + (i / 8) * Math.PI;
    const ex = cx + Math.cos(a) * r;
    const ey = cy + Math.sin(a) * r;
    petals += `<path d="M${cx} ${cy}Q${f(cx + Math.cos(a - 0.17) * r * 1.05)} ${f(cy + Math.sin(a - 0.17) * r * 1.05)} ${f(ex)} ${f(ey)}Q${f(cx + Math.cos(a + 0.17) * r * 1.05)} ${f(cy + Math.sin(a + 0.17) * r * 1.05)} ${cx} ${cy}Z" fill="${p.glaze}"/>`;
    ribs += `M${cx} ${cy}L${f(cx + Math.cos(a) * r * 0.92)} ${f(cy + Math.sin(a) * r * 0.92)}`;
  }
  return `${petals}<path d="${ribs}" stroke="${p.ink}" stroke-width="1" opacity="0.75" fill="none"/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.18)}" fill="${p.ink}" opacity="0.8"/>`;
}

function frame(p) {
  reseed(11);
  const window = sceneWindow();
  let out = "";

  // Frame ground: a strong wash between the panel edge and the window.
  out += `<g filter="url(#wash)" fill="${p.ink}">
  <path d="M0 0H${W}V${DADO}H0Z${window}" fill-rule="evenodd" fill-opacity="0.62"/>
  <path d="M0 0H${W}V${DADO}H0Z${window}" fill-rule="evenodd" fill-opacity="0.18" transform="translate(3 4)"/>
</g>`;

  // Scroll chains down both sides, facing inward.
  let ornaments = "";
  for (let y = 262; y < SCENE_BOTTOM - 40; y += 104) {
    ornaments += scroll(p, BAND / 2 + 2, y, 0.95, 1);
    ornaments += scroll(p, W - BAND / 2 - 2, y + 52, 0.95, -1);
  }
  // Pearls along the moulding.
  for (let y = SCENE_TOP + 16; y < SCENE_BOTTOM; y += 14) {
    ornaments += `<circle cx="${BAND - 5}" cy="${y}" r="1.7" fill="${p.glaze}"/><circle cx="${W - BAND + 5}" cy="${y + 7}" r="1.7" fill="${p.glaze}"/>`;
  }
  // Crest: shell flanked by long horizontal scrolls and acanthus.
  ornaments += shell(p, W / 2, 96, 34);
  for (const flip of [1, -1]) {
    const x0 = W / 2 + flip * 48;
    ornaments += `<path d="M${x0} 92C${x0 + flip * 40} 64 ${x0 + flip * 90} 60 ${x0 + flip * 120} 86C${x0 + flip * 140} 104 ${x0 + flip * 126} 128 ${x0 + flip * 108} 118C${x0 + flip * 96} 110 ${x0 + flip * 104} 98 ${x0 + flip * 114} 104" stroke="${p.glaze}" stroke-width="6" fill="none"/>`;
    ornaments += `<path d="M${x0} 92C${x0 + flip * 40} 64 ${x0 + flip * 90} 60 ${x0 + flip * 120} 86" stroke="${p.ink}" stroke-width="1.1" fill="none" transform="translate(0 3)" opacity="0.8"/>`;
    for (let i = 0; i < 4; i++) {
      const lx = x0 + flip * (20 + i * 26);
      ornaments += `<path d="M0 0C5 -7 14 -8 22 -3C14 2 6 3 0 0Z" transform="translate(${lx} ${76 - i * 2 + (i % 2) * 22}) rotate(${flip > 0 ? -20 + i * 14 : 200 - i * 14})" fill="${p.glaze}"/>`;
    }
    // Corner rosettes.
    const rx = flip > 0 ? W - 26 : 26;
    ornaments += `<circle cx="${rx}" cy="30" r="12" fill="${p.glaze}"/><circle cx="${rx}" cy="30" r="5" fill="${p.ink}" opacity="0.8"/>`;
    // Shoulder curls where the arch meets the sides.
    const sx = flip > 0 ? W - BAND - 6 : BAND + 6;
    ornaments += `<path d="M${sx} ${SCENE_TOP - 26}c${flip * 10} -14 ${flip * 26} -6 ${flip * 20} 8c${flip * -4} 8 ${flip * -14} 4 ${flip * -10} -2" stroke="${p.glaze}" stroke-width="4" fill="none"/>`;
  }
  out += `<g filter="url(#brush)">${ornaments}</g>`;

  // Window moulding: a double ink line hugging the scene.
  out += `<g filter="url(#brush)" fill="none" stroke="${p.ink}">
  <path d="${window}" stroke-width="2.4"/>
  <path d="${window}" stroke-width="0.8" transform="translate(${W / 2} ${(SCENE_TOP + SCENE_BOTTOM) / 2}) scale(1.035 1.012) translate(${-W / 2} ${-(SCENE_TOP + SCENE_BOTTOM) / 2})" opacity="0.8"/>
</g>`;
  return out;
}

/** The lower band: one small painted flower per tile between rules. */
function dado(p) {
  reseed(21);
  let out = `<g filter="url(#wash)" fill="${p.ink}"><rect x="0" y="${DADO}" width="${W}" height="${H - DADO}" fill-opacity="0.1"/></g>`;
  let motifs = "";
  for (let x = T / 2; x < W; x += T) {
    for (let y = DADO + T / 2 + 4; y < H; y += T) {
      const s = R(0.9, 1.05);
      let petals = "";
      for (let i = 0; i < 4; i++) {
        petals += `<ellipse cx="0" cy="-7" rx="4" ry="7" transform="rotate(${i * 90 + R(-6, 6)})"/>`;
      }
      let leaves = "";
      for (let i = 0; i < 4; i++) {
        leaves += `<path d="M0 0C3 -4 8 -5 12 -3C8 0 4 1 0 0Z" transform="rotate(${45 + i * 90}) translate(7 0)"/>`;
      }
      motifs += `<g transform="translate(${x} ${f(y)}) scale(${f(s)})"><g fill-opacity="0.55">${petals}</g><g fill-opacity="0.85">${leaves}</g><circle r="2.6" fill="${p.glaze}"/></g>`;
    }
  }
  out += `<g filter="url(#wash)" fill="${p.ink}">${motifs}</g>`;
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none">
  <path d="M0 ${DADO + 2}H${W}" stroke-width="3"/>
  <path d="M0 ${DADO + 8}H${W}" stroke-width="1"/>
</g>`;
  return out;
}

/* ------------------------------------------------------------------ */
/* Scenes                                                               */
/* ------------------------------------------------------------------ */

function strokes(list, width, opacity) {
  return list
    .map(([x1, y1, x2, y2]) => {
      const my = (y1 + y2) / 2 + R(-1.5, 1.5);
      return `<path d="M${f(x1)} ${f(y1)}Q${f((x1 + x2) / 2)} ${f(my)} ${f(x2)} ${f(y2)}" stroke-width="${f(width * R(0.7, 1.3))}" stroke-opacity="${f(opacity * R(0.7, 1.2))}"/>`;
    })
    .join("");
}

function sky(p, seed, from = SCENE_TOP - 70, to = 560) {
  reseed(seed);
  // A graded wash, darkest at the crown of the arch…
  let out = `<rect x="0" y="${from}" width="${W}" height="${to - from}" fill="url(#skyGrad)"/>`;
  // …then a few long, loose strokes that thin toward the horizon.
  let sweeps = "";
  for (let y = from + 10; y < to; y += R(16, 30)) {
    const t = (y - from) / (to - from);
    let x = BAND - R(10, 40);
    while (x < W - BAND) {
      const len = R(90, 230);
      if (rand() < 0.75 - t * 0.35) {
        const bow = R(-7, 7);
        sweeps += `<path d="M${f(x)} ${f(y)}Q${f(x + len / 2)} ${f(y + bow)} ${f(x + len)} ${f(y + R(-4, 4))}" stroke-width="${f(R(4, 11) * (1 - t * 0.5))}" stroke-opacity="${f(R(0.14, 0.34) * (1 - t * 0.6) * 100) / 100}"/>`;
      }
      x += len + R(20, 70);
    }
  }
  out += sweeps;
  return `<g filter="url(#wash)" stroke="${p.ink}" stroke-linecap="round" fill="none">${out}</g>`;
}

function cloud(p, cx, cy, w, h, seed) {
  reseed(seed);
  const puffs = [];
  const n = Math.max(3, Math.round(w / 26));
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1) - 0.5;
    const r = h * (0.35 + 0.35 * Math.sqrt(1 - (2 * t) ** 2)) * R(0.85, 1.1);
    puffs.push([cx + t * w, cy - r * 0.4, r]);
  }
  const cs = puffs.map(([x, y, r]) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}"/>`).join("");
  // Reserve the cloud out of the sky, then shade its belly.
  return `<g filter="url(#wash)" fill="${p.glaze}">${cs}</g>
<g filter="url(#wash)" fill="${p.ink}" fill-opacity="0.26"><ellipse cx="${cx}" cy="${f(cy + h * 0.18)}" rx="${f(w * 0.58)}" ry="${f(h * 0.3)}"/><ellipse cx="${f(cx + w * 0.12)}" cy="${f(cy + h * 0.02)}" rx="${f(w * 0.3)}" ry="${f(h * 0.2)}" fill-opacity="0.5"/></g>`;
}

function leftScene(p) {
  let out = sky(p, 31);
  out += cloud(p, 150, 300, 150, 52, 32);
  out += cloud(p, 300, 420, 110, 38, 33);
  out += cloud(p, 110, 470, 90, 30, 34);

  // Far bank with a small church tower — Porto, in a word.
  const hill = `M${BAND - 10} 600C110 560 170 572 230 548C270 532 320 540 ${W - BAND + 10} 566V640H${BAND - 10}Z`;
  out += `<g filter="url(#wash)" fill="${p.ink}"><path d="${hill}" fill-opacity="0.38"/>
  <path d="M262 544V492H272V544Z M259 492L267 474L275 492Z" fill-opacity="0.7"/>
  <path d="M232 552h20v-14h-20Z M282 548h24v-18h-24Z" fill-opacity="0.55"/></g>`;
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none"><path d="M${BAND - 10} 600C110 560 170 572 230 548C270 532 320 540 ${W - BAND + 10} 566" stroke-width="1.6" opacity="0.85"/></g>`;

  // The Douro: brushed horizontals, denser toward the viewer.
  reseed(35);
  let water = "";
  for (let y = 612; y < SCENE_BOTTOM; y += R(8, 14)) {
    const t = (y - 612) / (SCENE_BOTTOM - 612);
    let x = BAND - R(0, 40);
    const segs = [];
    while (x < W - BAND) {
      const len = R(50, 170);
      if (rand() < 0.4 + t * 0.4) segs.push([x, y, x + len, y + R(-2, 2)]);
      x += len + R(14, 50);
    }
    water += strokes(segs, 2.5 + t * 4, 0.22 + t * 0.35);
  }
  out += `<g filter="url(#wash)" stroke="${p.ink}" stroke-linecap="round" fill="none">${water}</g>`;

  // Rabelo: dark hull, square sail catching light, barrels, steering oar.
  const bx = 196;
  const by = 730;
  out += `<g filter="url(#wash)" fill="${p.ink}">
  <path d="M${bx - 92} ${by - 4}Q${bx - 20} ${by + 22} ${bx + 92} ${by - 10}L${bx + 108} ${by - 30}L${bx + 78} ${by - 20}L${bx - 80} ${by - 16}Z" fill-opacity="0.85"/>
  <path d="M${bx - 44} ${by - 128}Q${bx} ${by - 136} ${bx + 44} ${by - 128}Q${bx + 54} ${by - 80} ${bx + 46} ${by - 26}Q${bx} ${by - 20} ${bx - 46} ${by - 26}Q${bx - 38} ${by - 80} ${bx - 44} ${by - 128}Z" fill="${p.glaze}"/>
  <path d="M${bx - 44} ${by - 128}Q${bx - 20} ${by - 132} ${bx - 8} ${by - 130}Q${bx - 4} ${by - 80} ${bx - 10} ${by - 24}Q${bx - 30} ${by - 24} ${bx - 46} ${by - 26}Q${bx - 38} ${by - 80} ${bx - 44} ${by - 128}Z" fill-opacity="0.3"/>
  ${[-62, -46, 48].map((dx) => `<ellipse cx="${bx + dx}" cy="${by - 22}" rx="8" ry="7" fill-opacity="0.7"/>`).join("")}
</g>
<g filter="url(#brush)" stroke="${p.ink}" fill="none" stroke-linecap="round">
  <path d="M${bx} ${by - 18}V${by - 146}" stroke-width="2.4"/>
  <path d="M${bx - 50} ${by - 130}H${bx + 50}" stroke-width="1.8"/>
  <path d="M${bx - 44} ${by - 128}Q${bx} ${by - 136} ${bx + 44} ${by - 128}Q${bx + 54} ${by - 80} ${bx + 46} ${by - 26}M${bx - 44} ${by - 128}Q${bx - 38} ${by - 80} ${bx - 46} ${by - 26}" stroke-width="1.3"/>
  <path d="M${bx + 94} ${by - 22}L${bx + 150} ${by + 14}" stroke-width="2.2"/>
</g>`;
  // Reflection.
  reseed(36);
  const refl = [];
  for (let i = 0; i < 14; i++) {
    const y = by + 10 + i * 5;
    refl.push([bx - R(40, 80), y, bx + R(30, 80), y]);
  }
  out += `<g filter="url(#wash)" stroke="${p.ink}" stroke-linecap="round" fill="none">${strokes(refl, 3, 0.45)}</g>`;

  // Gulls.
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none" stroke-width="1.4" stroke-linecap="round">
  <path d="M96 382q7 -7 13 0q6 -7 13 0"/><path d="M126 364q5 -5 9 0q4 -5 9 0"/><path d="M282 318q6 -6 11 0q5 -6 11 0"/>
</g>`;
  return out;
}

function rightScene(p) {
  let out = sky(p, 41, SCENE_TOP - 70, 420);

  const cx = W / 2;
  const base = 812;

  // Ledge the vase stands on.
  out += `<g filter="url(#wash)" fill="${p.ink}"><path d="M${BAND} ${base}H${W - BAND}V${SCENE_BOTTOM}H${BAND}Z" fill-opacity="0.32"/></g>`;
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none"><path d="M${BAND} ${base}H${W - BAND}" stroke-width="1.8"/></g>`;

  // Bouquet first so the vase mouth overlaps the stems.
  reseed(42);
  const blooms = [
    [cx, 404, 30], [cx - 72, 452, 24], [cx + 70, 446, 26], [cx - 40, 520, 22],
    [cx + 44, 530, 22], [cx - 104, 548, 18], [cx + 104, 540, 18], [cx, 476, 18],
  ];
  let stems = "";
  let leaves = "";
  for (const [x, y] of blooms) {
    stems += `M${cx + R(-6, 6)} 640Q${f((cx + x) / 2 + R(-20, 20))} ${f((640 + y) / 2)} ${f(x)} ${f(y + 10)}`;
    for (let i = 0; i < 2; i++) {
      const t = R(0.3, 0.7);
      const lx = cx + (x - cx) * t + R(-8, 8);
      const ly = 640 + (y - 640) * t;
      const ang = R(-160, 20) + (x < cx ? 0 : 140);
      leaves += `<path d="M0 0C6 -9 18 -10 28 -3C18 3 7 4 0 0Z" transform="translate(${f(lx)} ${f(ly)}) rotate(${f(ang)})"/>`;
    }
  }
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none" stroke-width="1.6" opacity="0.9"><path d="${stems}"/></g>`;
  out += `<g filter="url(#wash)" fill="${p.ink}" fill-opacity="0.72">${leaves}</g>`;

  // Camellias: overlapping petals, deeper at the heart.
  let petals = "";
  let hearts = "";
  for (const [x, y, r] of blooms) {
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + R(-0.2, 0.2);
      petals += `<ellipse cx="${f(x + Math.cos(a) * r * 0.5)}" cy="${f(y + Math.sin(a) * r * 0.5)}" rx="${f(r * 0.55)}" ry="${f(r * 0.42)}" transform="rotate(${f((a * 180) / Math.PI)} ${f(x + Math.cos(a) * r * 0.5)} ${f(y + Math.sin(a) * r * 0.5)})"/>`;
    }
    hearts += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r * 0.32)}"/>`;
  }
  out += `<g filter="url(#wash)" fill="${p.ink}" fill-opacity="0.38">${petals}</g>`;
  out += `<g filter="url(#wash)" fill="${p.ink}" fill-opacity="0.85">${hearts}</g>`;
  let petalLines = "";
  for (const [x, y, r] of blooms) {
    petalLines += `M${f(x - r)} ${f(y)}A${f(r)} ${f(r * 0.9)} 0 0 1 ${f(x + r)} ${f(y)}`;
  }
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none" stroke-width="1" opacity="0.7"><path d="${petalLines}"/></g>`;

  // The vase: gadrooned body, highlight left bare, scroll handles.
  const body = `M${cx - 30} 640C${cx - 34} 660 ${cx - 80} 672 ${cx - 82} 716C${cx - 84} 760 ${cx - 40} 780 ${cx - 20} 786L${cx - 30} ${base}H${cx + 30}L${cx + 20} 786C${cx + 40} 780 ${cx + 84} 760 ${cx + 82} 716C${cx + 80} 672 ${cx + 34} 660 ${cx + 30} 640Z`;
  out += `<g filter="url(#wash)" fill="${p.ink}">
  <path d="${body}" fill="${p.glaze}"/>
  <path d="${body}" fill-opacity="0.62"/>
  <path d="M${cx - 52} 690C${cx - 64} 710 ${cx - 62} 740 ${cx - 44} 760" stroke="${p.glaze}" stroke-width="9" stroke-linecap="round" fill="none"/>
  <rect x="${cx - 40}" y="630" width="80" height="12" rx="4" fill-opacity="0.85"/>
</g>`;
  let gadroons = "";
  for (let i = -3; i <= 3; i++) {
    gadroons += `M${cx + i * 10} 700Q${cx + i * 13} 740 ${cx + i * 6} 780`;
  }
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none" stroke-linecap="round">
  <path d="${gadroons}" stroke-width="1.2" opacity="0.8"/>
  <path d="${body}" stroke-width="1.6"/>
  <path d="M${cx - 78} 700C${cx - 110} 690 ${cx - 112} 650 ${cx - 90} 646C${cx - 78} 644 ${cx - 76} 660 ${cx - 86} 662" stroke-width="3"/>
  <path d="M${cx + 78} 700C${cx + 110} 690 ${cx + 112} 650 ${cx + 90} 646C${cx + 78} 644 ${cx + 76} 660 ${cx + 86} 662" stroke-width="3"/>
</g>`;

  // Two birds on the wing above the bouquet.
  out += `<g filter="url(#brush)" stroke="${p.ink}" fill="none" stroke-width="1.4" stroke-linecap="round">
  <path d="M110 300q7 -7 13 0q6 -7 13 0"/><path d="M270 262q6 -6 11 0q5 -6 11 0"/>
</g>`;
  return out;
}

/* ------------------------------------------------------------------ */
/* Tiles: every tile takes its own glaze, then grout over everything.   */
/* ------------------------------------------------------------------ */

function tiles(p, seed) {
  reseed(seed);
  let tint = "";
  let shade = "";
  for (let y = 0; y < H; y += T) {
    for (let x = 0; x < W; x += T) {
      const v = rand();
      if (v < 0.55) tint += `<rect x="${x}" y="${y}" width="${T}" height="${T}" fill-opacity="${f(R(0.03, 0.14) * 100) / 100}"/>`;
      else if (v > 0.85) shade += `<rect x="${x}" y="${y}" width="${T}" height="${T}" fill-opacity="${f(R(0.03, 0.08) * 100) / 100}"/>`;
    }
  }
  let grout = "";
  for (let x = T; x < W; x += T) grout += `M${x} 0V${H}`;
  for (let y = T; y < H; y += T) grout += `M0 ${y}H${W}`;
  return `<g fill="${p.glaze}">${tint}</g><g fill="${p.ink}">${shade}</g>
<path d="${grout}" stroke="${p.grout}" stroke-width="1.3" fill="none"/>`;
}

function panel(p, scene, seed) {
  const body = `<rect width="${W}" height="${H}" fill="${p.glaze}"/>
<g clip-path="url(#win)">${scene(p)}</g>
${frame(p)}
${dado(p)}
${tiles(p, seed)}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="none"><defs>${defs(p)}<clipPath id="win"><path d="${sceneWindow()}"/></clipPath></defs><g clip-path="url(#panel)">${body}</g></svg>`;
}

mkdirSync(OUT, { recursive: true });
for (const [side, scene, seed] of [
  ["left", leftScene, 51],
  ["right", rightScene, 52],
]) {
  const svg = panel(PALETTE, scene, seed);
  const file = join(OUT, `${side}.svg`);
  writeFileSync(file, svg);
  console.log(`${file}  ${(svg.length / 1024).toFixed(0)} KB`);
}
