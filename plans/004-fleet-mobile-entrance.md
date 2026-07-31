# 004 — Animate the fleet section on mobile (stacked slides)

- **Status**: DONE
- **Commit**: `aead399`
- **Severity**: LOW
- **Category**: Missed opportunities (preventing a jarring change)
- **Estimated scope**: 1 file (`src/components/velox/sections/fleet-showcase.tsx`), ~15 lines

## Problem

Below `1024px` the gallery stops being a pinned horizontal scroll and becomes six full-width slides stacked vertically (`flex flex-col`), and the section currently has **zero animation** on mobile: each slide pops into existence as the user scrolls, with no entrance — inconsistent with the rest of the site, where sections reveal their content with a fade-up on scroll. The mobile branch of the existing `ScrollTrigger.matchMedia` is empty.

Current mobile branch — `src/components/velox/sections/fleet-showcase.tsx:59-61`:

```tsx
        '(max-width: 1023px)': () => {
          return () => {};
        },
```

## Target

On mobile, each `.fleet-slide` reveals with the site's standard fade-up as it scrolls into view: `opacity: 0, y: 40` → `{ opacity: 1, y: 0 }`, `duration: 0.8`, `ease: 'power3.out'`, triggered per-slide at `start: 'top 85%'`. A gentle `stagger: 0.08` cascades within each slide's content so the image and specs don't land as one flat block. This matches the site-wide reveal vocabulary and keeps the mobile reading experience consistent.

Values pulled from the audit and repo conventions:
- `opacity: 0, y: 40` → `{ opacity: 1, y: 0 }`, `duration: 0.8`, `ease: 'power3.out'` — the site standard (see exemplars below).
- `stagger: 0.08` — small, decorative, never blocking (audit category 7: 30–80ms stagger belongs on group entrances).
- Trigger per slide at `start: 'top 85%'` so each slide reveals just as it enters the viewport.
- Under `prefers-reduced-motion: reduce`, skip the reveal entirely — content renders visible, no movement (audit category 6).

## Repo conventions to follow

- **Reveal vocabulary**: `opacity: 0, y: 40` → `{ opacity: 1, y: 0 }` with `power3.out`. Exemplar — `src/components/velox/ui/text-reveal.tsx:28-33` and `src/components/velox/sections/experience-hero.tsx:16-26` (`{ y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }`).
- **Per-item scroll reveals**: `src/components/velox/sections/experience-timeline.tsx:60-62` reveals each step via its own `scrollTrigger`-driven tween inside a `defaults: { ease: 'power3.out' }` timeline — the same shape used here.
- **GSAP + ScrollTrigger registration** is already in place (`fleet-showcase.tsx:10-12`), and the file runs animation inside `gsap.context`/`ScrollTrigger.matchMedia` (`fleet-showcase.tsx:31-63`).

## Steps

1. In `src/components/velox/sections/fleet-showcase.tsx`, add the class `fleet-mobile-reveal` to the **children that should cascade** inside each car slide: the image column wrapper (`<div className={…isLeftSpec ? 'lg:col-span-7 order-1 lg:order-2' : …}>` at `fleet-showcase.tsx:156-162`) and the specs column wrapper (the `isLeftSpec ? 'lg:col-span-5 order-2 lg:order-1' : …` div at `fleet-showcase.tsx:186-192`). On mobile these stack as `order-1` then `order-2`, so the cascade reveals image → specs.

   For the **intro slide** (first slide), the intro content is out of this plan's scope — it uses the desktop-only reveal from `002-fleet-intro-entrance.md`. On mobile the intro slide's content should simply render visible (no reveal), which is what it does today.

2. Replace the empty mobile branch (`fleet-showcase.tsx:59-61`) with:

   ```tsx
        '(max-width: 1023px)': () => {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (reduceMotion) return () => {};

          const tweens: gsap.core.Tween[] = [];
          gsap.utils.toArray<HTMLElement>('.fleet-slide').forEach((slide) => {
            const revealEls = slide.querySelectorAll<HTMLElement>('.fleet-mobile-reveal');
            if (revealEls.length === 0) return;
            const tween = gsap.from(revealEls, {
              opacity: 0,
              y: 40,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: slide,
                start: 'top 85%',
              },
            });
            tweens.push(tween);
          });

          return () => {
            tweens.forEach((t) => {
              t.scrollTrigger?.kill();
              t.kill();
            });
          };
        },
   ```

   The per-slide `scrollTrigger` handles cleanup automatically when the media query no longer matches (matchMedia reverts); the explicit cleanup list is belt-and-suspenders for the `gsap.context` revert.

3. No changes to the desktop branch (`fleet-showcase.tsx:36-57`) — the horizontal scroll and its progress indicator (plan 001) stay as-is.

## Boundaries

- Do NOT touch anything outside `src/components/velox/sections/fleet-showcase.tsx`.
- Do NOT modify the desktop branch or the horizontal scrub.
- Do NOT add the `fleet-mobile-reveal` class to elements that are `hidden lg:…` — on mobile only the always-visible columns should reveal.
- Do NOT animate layout properties — `opacity` and `transform` (`y`) only (audit category 5).
- Do NOT add new dependencies.
- If the code no longer matches the excerpts above (drift since commit `aead399`), STOP and report instead of improvising.

## Verification

- **Mechanical**: run `npx tsc --noEmit` and `npm run lint`. Both must pass with no new errors.
- **Feel check**: run `npm run dev`, open http://localhost:3001/fleet in a viewport < 1024px (DevTools device toolbar, e.g. iPhone 14 / 390×844), and confirm:
  - Scrolling down the stacked slides: each slide's image fades/rises in, then its specs a beat later — never a whole slide popping in as one flat block.
  - The reveal never triggers twice on re-scroll and never fights the vertical scroll (the trigger at `top 85%` should feel like it "catches" the slide just as it appears).
  - Fast scrolling past several slides: reveals are brief and don't cause the page to stutter or the user to feel like they must wait (stagger stays ≤ 0.08).
  - Toggle `prefers-reduced-motion: reduce` (Rendering panel), reload: slides render fully visible, no movement, scrolling is unaffected.
  - Desktop (≥1024px) is completely unchanged — no reveals on the pinned layout beyond plan 001/002/003.
- **Done when**: mobile slides reveal image→specs with `power3.out` at `top 85%`, reduced-motion shows no movement, desktop is untouched, and `tsc` + `lint` pass.
