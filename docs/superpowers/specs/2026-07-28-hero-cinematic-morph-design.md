# Hero Cinematic Morph — Design Specification

**Project:** B LEADER — Luxury Travel Experiences
**Date:** 2026-07-28
**Status:** Approved

---

## 1. Overview

Replace the current static-image hero with a cinematic 5-image morphing sequence that feels like a luxury video montage. The hero auto-advances through real photographs of Salento (coast, yacht, lifestyle, drone, sunset) with fluid clip-path transitions, Ken Burns zooms, and matching text reveals. The existing GSAP scroll scale-down mechanic is preserved.

---

## 2. Image Sequence

| # | File | Headline | Description | Duration |
|---|---|---|---|---|
| 1 | `torre-santandrea.jpg` | ELEVATE YOUR JOURNEY | B LEADER defines the new standard of Mediterranean luxury. | 6s |
| 2 | `yatch.jpeg` | SAIL BEYOND HORIZONS | Private yacht charters along the pristine Salento coastline. | 6s |
| 3 | `Couple_walking_to_beach_2K.jpeg` | LIVE THE DREAM | Curated experiences for those who demand the extraordinary. | 6s |
| 4 | `paisaje_drone.jpg` | DISCOVER PARADISE | From the cliffs of Torre Sant'Andrea to the beaches of Gallipoli. | 6s |
| 5 | `atardecer-bahia-verde.webp` | WHERE LUXURY MEETS THE SEA | Est. 2023 — Puglia, Italy | 6s |

Each image has a Ken Burns effect: slow zoom 100% → 108% with subtle pan.

---

## 3. Transition Types (randomized rotation)

1. **Circle Reveal** — A circle clip-path grows from the center/lower-right, revealing the next image. Gold-tinted edge.
2. **Golden Sweep** — A horizontal bar with golden gradient sweeps L-to-R. Behind it, the new image appears.
3. **Organic Ripple** — The image distorts with a liquid/organic clip-path morph into the next.
4. **Scale & Blur** — Current image blurs + scales out; next image sharpens + scales in.

---

## 4. Text Animation (TextReel)

- **Headline:** Split-flip character animation — each letter flips in 3D from below.
- **Subtitle:** Staggered fade-in + translateY per word.
- **Tagline ("Est. 2023…"):** Fades out/in between slides.
- **Headline swap:** Previous slides up, next slides in from below (like a reel).

---

## 5. Scroll Behavior

- **GSAP ScrollTrigger pin** for ~120% of viewport (existing mechanic).
- **Scale-down effect:** `clipPath: inset(0%) → inset(3% round 24px)`, `scale: 1 → 0.88`.
- While pinned, the image sequence continues cycling independently.
- After unpin, next section (MarqueeText) scrolls into view.

---

## 6. File Structure

```
src/components/velox/sections/
  └── hero-scale-down.tsx       ← MODIFY (refactor to use new components)

src/components/velox/hero/
  ├── image-sequence.tsx        ← NEW — timer + index logic
  ├── cinematic-transition.tsx  ← NEW — clip-path morph animation
  ├── text-reel.tsx             ← NEW — rotating headlines + split text
  └── hero-images.ts            ← NEW — config data (paths, texts, durations)

public/images/hero-sequence/
  ├── torre-santandrea_....jpg
  ├── yatch.jpeg
  ├── Couple_walking_to_beach_2K_....jpeg
  ├── paisaje_drone.jpg
  └── atardecer-en-bahia-verde-galipoli-puglia.webp
```

---

## 7. Component Architecture

```
hero-images.ts                  (static config array of HeroImageSlide[])
     │
image-sequence.tsx              (useState index, useEffect timer, dispatches index changes)
     │
cinematic-transition.tsx        (receives prevImage → nextImage, applies clip-path transition)
     │
text-reel.tsx                   (receives prevText → nextText, animates with split/flip)
     │
hero-scale-down.tsx             (container: overlays, scroll trigger, layout, composition)
```

---

## 8. Data Types

```typescript
interface HeroImageSlide {
  src: string;
  alt: string;
  headline: string;
  subtitle: string;
  description: string;
  duration: number;            // ms, default 6000
  focalPoint?: { x: number; y: number };
}

type TransitionType = 'circle-reveal' | 'golden-sweep' | 'organic-ripple' | 'scale-blur';
```

---

## 9. Responsive Behavior

- **Desktop (> 1024px):** Full morph transitions, Ken Burns, split text.
- **Tablet (768–1024px):** Same transitions, faster timing.
- **Mobile (< 768px):** Crossfade only (no clip-path), reduced/no Ken Burns, simpler text fade.
- **Reduced motion:** `prefers-reduced-motion` → crossfade only.

---

## 10. Performance

- GPU acceleration via `will-change: transform, clip-path`.
- Images preloaded during the existing LoadingScreen.
- Next image in sequence preloaded one step ahead.
- Next.js `<Image>` with `priority` on the first slide.

---

## 11. Image Requirements

All images are real photographs (no AI/stock). The 5 selected images from the user's library cover:
- Salento coastline (Torre Sant'Andrea)
- Luxury yacht
- Lifestyle / people enjoying the experience
- Drone aerial landscape
- Sunset over Gallipoli bay

`images.jpg` (254×198) and `pexels-axp-photography...` (1013×675, generic) are excluded.