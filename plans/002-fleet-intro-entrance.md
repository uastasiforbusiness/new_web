# 002 — Animate the fleet intro slide entrance

- **Status**: DONE
- **Commit**: `aead399`
- **Severity**: MEDIUM
- **Category**: Missed opportunities (preventing a jarring change)
- **Estimated scope**: 1 file (`src/components/velox/sections/fleet-showcase.tsx`), ~20 lines

## Problem

The first slide of the Idol's Gallery (heading "The Idol's Gallery", intro paragraph, and the "Scroll to explore →" hint) appears instantly, with no reveal — the only section in the site whose header content pops in without an entrance. Every other section animates its header on scroll (see Repo conventions), so this one reads as unfinished.

## Target

When the section enters the pinned viewport, the intro content reveals with the site's standard fade-up: `opacity: 0, y: 40` → `{ opacity: 1, y: 0 }`, `duration: 0.8`, `stagger: 0.12`, `ease: 'power3.out'`. Three groups stagger: the eyebrow row (`✦ Our Fleet` + rule), the `<h2>`, and the `<p>` + scroll hint.

The `shimmer-text` span on "Gallery" is an existing infinite CSS background animation — do NOT touch it; the parent `<h2>` reveal is independent and they compose fine.

Under `prefers-reduced-motion: reduce`, the reveal is skipped entirely (content simply renders visible) — no movement (audit category 6).

## Implementation notes (why the mechanism is what it is)

Two facts discovered during implementation, verified in a headless browser at 1440×900:

1. **A second ScrollTrigger on the pinned `<section id="fleet">` does not fire** — not at `start: 'top 70%'` nor at `start: 'top top'` (same as the pin), regardless of `toggleActions`. The pin's own ScrollTrigger works (the progress counter and watermark parallax are driven by it), but an additional ScrollTrigger on the same pinned element never activates.
2. **A bare `paused` tween played via `play()` does not reliably advance before the pin is active** (observed `isActive() === true` but `progress() === 0` with no inline-style change). The repo's proven pattern is `gsap.fromTo` + ScrollTrigger; tween play that works on this page is driven by a ScrollTrigger.

Therefore the reveal is driven by the **pin's own `onUpdate`** with a one-shot guard — the one callback on the pinned section that is confirmed to fire every scroll frame (it already drives the counter). This fires for both the standalone `/fleet` page (pin active at `scrollY 0`) and scroll-into-view on the home page (pin activates when the section reaches the top).

Timing note: with `scrub: 1`, a large programmatic scroll jump lags the scrub by ~1s before `onUpdate` fires — this is ScrollTrigger's scrub smoothing and is not perceptible with real continuous wheel/touch scrolling (the reveal plays promptly when the section pins).

## Repo conventions to follow

- **Reveal vocabulary**: `opacity: 0, y: 40` → `{ opacity: 1, y: 0 }` with `power3.out`. Exemplar — `src/components/velox/ui/text-reveal.tsx:28-33` and `src/components/velox/sections/experience-hero.tsx:16-26`.
- **`gsap.fromTo` + `stagger`**: matches `service-lines-section.tsx:22-28` (`gsap.fromTo` with `stagger`-via-`delay`).
- **Everything already inside the existing `gsap.context`/`ScrollTrigger.matchMedia`** (`fleet-showcase.tsx:37-77`) — no new hooks or scoping.

## Steps (as implemented)

1. Add three classes to the intro elements (`fleet-showcase.tsx:135-161`):
   - `fleet-intro-eyebrow` on the `<div className="flex items-center gap-4 mb-5 lg:mb-6">` (eyebrow row).
   - `fleet-intro-title` on the `<h2 …>`.
   - `fleet-intro-bottom` on the `<p …>` and on the `hidden lg:flex … mt-12` scroll-hint div.

2. In the `(min-width: 1024px)` branch, declare `let introTween: gsap.core.Tween | null = null;` and `let introPlayed = false;` **before** the `const st = gsap.to(slides, …)` — the `onUpdate` closure references `introTween`, so it must not be in the temporal dead zone when ScrollTrigger initializes/refreshes synchronously (a `ReferenceError: Cannot access 'introTween' before initialization` is thrown otherwise).

3. In the existing `onUpdate` (already present for the counter), add the one-shot reveal:

   ```tsx
   if (!introPlayed && introTween) {
     introPlayed = true;
     introTween.play();
   }
   ```

4. After the parallax block, create the paused `fromTo` tween (no scrollTrigger):

   ```tsx
   if (!reduceMotion) {
     const introTargets = gsap.utils.toArray<HTMLElement>(
       '.fleet-intro-eyebrow, .fleet-intro-title, .fleet-intro-bottom',
     );
     if (introTargets.length > 0) {
       introTween = gsap.fromTo(
         introTargets,
         { opacity: 0, y: 40 },
         {
           opacity: 1,
           y: 0,
           duration: 0.8,
           stagger: 0.12,
           ease: 'power3.out',
           paused: true,
         },
       );
     }
   }
   ```

5. Cleanup already kills `st` and `parallaxTweens`; `introTween` has no scrollTrigger, so `introTween?.kill()` suffices (`introTween?.scrollTrigger?.kill()` is a harmless no-op).

## Boundaries

- Do NOT touch anything outside `src/components/velox/sections/fleet-showcase.tsx`.
- Do NOT animate the `shimmer-text` span or any existing CSS animation.
- Do NOT add the entrance to the mobile branch (`max-width: 1023px`) — that's `004-fleet-mobile-entrance.md`.
- Do NOT change the horizontal tween, the pin, or any layout values.
- Do NOT add a second ScrollTrigger on `galleryRef` for this reveal — it will not fire (see Implementation notes).
- Do NOT add new dependencies.
- If the code no longer matches the excerpts above (drift since commit `aead399`), STOP and report instead of improvising.

## Verification

- **Mechanical**: `npx tsc --noEmit` and `npm run lint`. Typecheck passes; lint fails at config load (pre-existing ESLint 9 FlatCompat incompatibility in `eslint.config.js`, unrelated).
- **Feel check**: run `npm run dev` at ≥1024px:
  - Standalone `/fleet`: on load, the intro reveals eyebrow → heading → paragraph/hint in sequence (`power3.out`, ~1s total). Scrolling back to the top does not re-play it (one-shot).
  - Home page: scroll down into `#fleet` — as the section pins, the intro reveals in sequence; the counter shows `01` throughout the intro slide.
  - Toggle `prefers-reduced-motion: reduce` (Rendering panel), reload: content renders fully visible, no movement; the horizontal gallery still works.
- **Done when**: the three groups reveal in sequence on both pages, reduced-motion shows no movement, and `tsc` passes.
