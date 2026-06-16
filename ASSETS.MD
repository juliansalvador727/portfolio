# `menu_loading.mp4` — Background Asset Inventory

Source video: `menu_loading.mp4` (2108×1188, ~4.9s, 30fps) — the Persona 3 Reload
**"Now Loading" underwater scene**: a white fade-in into deep blue water, the
protagonist drifting with headphones (lower-left foreground), a bright rippling
**water surface / caustics** band along the top, descending **light shafts**, and
**rising bubbles**.

Goal: rebuild that *background* (the water environment, not the character — see
note) by stitching together the original P3R UI textures shipped in `/UI`, so the
site background is authentic art instead of a heavy looping MP4.

All paths below are relative to `/UI`. Dimensions are `W×H`.

---

## Base gradient (water body)

| Asset | Size | Role |
|---|---|---|
| `Loading/Textures/T_UI_Loading_00_texture.png` | 1024×512 | Atlas of the 4 P3R loading gradients (blue / sunset / night / green). The **leftmost blue panel** (content x≈8–200, y≈1–448) is the loading-screen water gradient. |

The blue panel is cropped → `public/p3r/loading-gradient.png` (192×448) and used as
the textured base. The exact top→bottom color stops were also sampled straight
from the clean-water region of `menu_loading.mp4` to tune the CSS gradient:

```
0%  #22fffc   surface cyan
12% #4cfffd
25% #148be5
40% #0d5dc4
55% #053eb9
70% #0527b2
85% #030dae
100% #0500a8  deep navy
surface-band avg: #7efaf9
```

## Caustics (top water surface + parallax water body)

| Asset | Size | Role |
|---|---|---|
| `Common/2D/Textures/T_UI_2D_WaterCaustics_00_Alp.png` | 256×256 | Tileable cellular water caustics. |
| `Common/2D/Textures/T_UI_2D_WaterCaustics_01_Alp.png` | 512×512 | Larger-cell caustics variant. |
| `Common/2D/Textures/T_UI_2D_WaterCaustics_03_Alp.png` | 1024×1024 | Highest-res caustics variant. |
| `Camp/Root/Texture/T_UI_Camp_Caustics_00.png` | 512×512 | Caustics used on the in-game camp/menu background — same cellular pattern. |

The repo already ships `public/p3r/caustics.png` (512×512), a black-background
derivative of this exact `WaterCaustics` pattern. It is reused (screen-blended) for
the bright top **surface band** and the two parallax water layers.

## Light / distortion / depth

| Asset | Size | Role |
|---|---|---|
| `Title/Material/Textures/T_UI_Title_Logo_Light.png` | 1024×512 | Soft light-ray / god-ray sheet (reference for the descending light shafts). |
| `Common/2D/Textures/T_UI_2D_Distortion_00_Nrm.png` | 512×512 | Normal map used to wobble/distort the caustics & surface (heat-haze look). |
| `Common/3D/Textures/T_UI_3D_Smoke_00_Nrm.png` | 512×512 | Smoke normal map — soft drifting murk. |
| `Common/3D/Textures/T_UI_3D_Noise_00_Msk.png` | 256×256 | Cloudy noise mask — depth murk / grain. |
| `Common/3D/Textures/T_UI_3D_Noise_01_Alp.png` | 256×256 | Cloudy noise variant. |
| `Common/3D/Textures/T_UI_3D_Aura_00_Col.png` | — | Soft colored aura glow. |
| `PartyPanel/Textures/T_UI_PartyPanel_Smoke_01.png` (`_02`, `_03`) | 256×256 | Wispy smoke streaks. |
| `MiniMap/T_UI_MiniMap_Noise_01_texture.png` (`_02`) | 512×512 | Extra noise tiles. |

## Bubbles

No dedicated bubble sprite exists in `/UI`; the rising bubbles in the video are
small soft circles and are reproduced as lightweight CSS radial-gradient spans
(matches the on-screen look 1:1).

---

## Wired into the site background

The reconstruction in `src/components/p3r/background.tsx` + `src/app/globals.css`
uses, in layer order (back → front):

1. **Authentic underwater gradient** — CSS stops sampled from `menu_loading.mp4`,
   backed by the stitched `public/p3r/loading-gradient.png`
   (← `Loading/Textures/T_UI_Loading_00_texture.png`).
2. **Bright surface caustics band** (top) — `public/p3r/caustics.png`
   (← `Common/2D/Textures/T_UI_2D_WaterCaustics_*`), screen-blended, panning.
3. **Two parallax caustic layers** through the water body — same texture, different
   scale/speed.
4. **Descending light shafts** — CSS gradients (ref `T_UI_Title_Logo_Light.png`).
5. **Rising bubbles** — CSS.
6. **Depth murk + vignette + scanlines** — CSS (ref `T_UI_3D_Noise_*`).

## Note on the protagonist

The drifting character (Makoto + headphones) that dominates the foreground of the
MP4 is a **rendered movie element**, not a UI texture — it does **not** exist
anywhere under `/UI` (verified by an exhaustive search). Only the underwater
*background environment* is reconstructable from `/UI` assets, which is what is
implemented. The character could be added later by extracting it from the MP4, but
that is out of scope for an "/UI asset" stitch.
