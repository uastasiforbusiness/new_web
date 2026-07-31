# 003 — Add parallax depth to the fleet slide watermarks

- **Status**: DONE
- **Commit**: `aead399`
- **Severity**: LOW
- **Category**: Missed opportunities (spatial consistency / depth)
- **Estimated scope**: 1 file (`src/components/velox/sections/fleet-showcase.tsx`), ~15 lines

## Problem

Each car slide has a giant brand watermark (e.g. `FERRARI`, `MASERATI`) at 4% opacity that is completely static — it scrolls rigidly with the slide, flattening the "blueprint" composition. On a luxury showcase the watermark is the natural background plane; making it drift at a slightly different rate than the foreground builds the depth this section's visual language implies. The watermark is decorative (opacity `0.04`), so motion here is pure spatial storytelling — the correct place for it (audit category 8: spatially-connected UI with no motion explaining relative position).

Current desktop watermark — `src/components/velox/sections/fleet-showcase.tsx:136-141`:

```tsx
                {/* Desktop watermark */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none items-center justify-center hidden lg:flex">
                  <span className="font-elegant text-[clamp(200px,30vw,600px)] leading-none text-white tracking-wider">
                    {brand}
                  </span>
                </div>
```

The horizontal scrub it must reference — `src/components/velox/sections/fleet-showcase.tsx:40-51`:

```tsx
          const st = gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: galleryRef.current,
              pin: true,
              scrub: 1,
              end: () => `+=${container.scrollWidth - window.innerWidth}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
```

## Target

Each desktop watermark drifts `xPercent: 6` relative to its own width over the course of that slide's travel across the viewport, in the opposite direction of the slides' motion (slides translate left; the watermark lags behind). This is a classic GSAP horizontal-scroll parallax, wired to the existing scrub with `containerAnimation: st` so the drift is driven by the same scroll position.

Target values, pulled from the audit and repo conventions:
- `xPercent: 6` (subtle — a watermark at `opacity 0.04` must not draw attention).
- `ease: 'none'` — scroll-linked, constant motion (audit category 2: constant/progress motion → linear; matches the existing `ease: 'none'` at `fleet-showcase.tsx:42`).
- `scrub: true` — fully tied to the horizontal scrub.
- `start: 'left right'` / `end: 'right left'` — the watermark begins drifting as its slide enters from the right and finishes as the slide exits left.
- `containerAnimation: st` — binds this tween to the horizontal scroll tween, the standard GSAP pattern for parallax inside a pinned horizontal scrub.

Under `prefers-reduced-motion: reduce`, skip the drift — the watermark simply stays static (decorative; no comprehension is lost). This keeps the reduced-motion experience calm (audit category 6).

## Repo conventions to follow

- **`containerAnimation` + scrub** is the canonical GSAP pattern for parallax inside a pinned horizontal scroll. There is no existing example in this repo, but `gsap` + `ScrollTrigger` are already registered (`fleet-showcase.tsx:10-12`) and the whole file runs inside `gsap.context`/`ScrollTrigger.matchMedia` (`fleet-showcase.tsx:31-63`).
- **Linear ease for scroll-linked motion**: matches the existing horizontal tween `ease: 'none'` at `fleet-showcase.tsx:42` and `experience-timeline.tsx:38`.
- **Desktop-only**: the existing layout gates desktop vs mobile with `ScrollTrigger.matchMedia`; the parallax belongs in the `(min-width: 1024px)` branch, and the watermark span is already `hidden lg:flex` (only rendered on desktop).

## Steps

1. In `src/components/velox/sections/fleet-showcase.tsx`, add the class `fleet-watermark` to the **desktop** watermark's `<span>` at line 139 (the span inside the `hidden lg:flex` div). Do NOT add it to the mobile watermark span at `fleet-showcase.tsx:144-148` — that one is `lg:hidden` and has no pinned scrub to attach to.

   ```tsx
                   <span className="fleet-watermark font-elegant text-[clamp(200px,30vw,600px)] leading-none text-white tracking-wider">
                     {brand}
                   </span>
   ```

2. In the `(min-width: 1024px)` branch of the existing `ScrollTrigger.matchMedia`, after the `const st = gsap.to(slides, …)` block (`fleet-showcase.tsx:40-51`) and before the `return () => { … }` cleanup, add:

   ```tsx
           const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

           const parallaxTweens: gsap.core.Tween[] = [];
           if (!reduceMotion) {
             gsap.utils.toArray<HTMLElement>('.fleet-watermark').forEach((wm) => {
               const tween = gsap.to(wm, {
                 xPercent: 6,
                 ease: 'none',
                 scrollTrigger: {
                   trigger: wm.closest('.fleet-slide'),
                   containerAnimation: st,
                   start: 'left right',
                   end: 'right left',
                   scrub: true,
                 },
               });
               parallaxTweens.push(tween);
             });
           }
   ```

   `wm.closest('.fleet-slide')` targets the slide that owns each watermark, so the drift spans exactly that slide's on-screen travel.

3. Extend the branch's cleanup (`fleet-showcase.tsx:53-56`) to kill the parallax tweens:

   ```tsx
           return () => {
             st.scrollTrigger?.kill();
             st.kill();
             parallaxTweens.forEach((t) => {
               t.scrollTrigger?.kill();
               t.kill();
             });
           };
   ```

## Boundaries

- Do NOT touch anything outside `src/components/velox/sections/fleet-showcase.tsx`.
- Do NOT modify the mobile watermark (`fleet-showcase.tsx:144-148`) — no pinned scrub exists on mobile, and the mobile branch stays untouched.
- Do NOT change the horizontal tween's values (`xPercent`, `scrub`, `pin`, `end`).
- `xPercent` is applied to the watermark span; do NOT animate `x` or `left` — `transform` only (audit category 5).
- Do NOT add new dependencies.
- If the code no longer matches the excerpts above (drift since commit `aead399`), STOP and report instead of improvising.

## Verification

- **Mechanical**: run `npx tsc --noEmit` and `npm run lint`. Both must pass with no new errors.
- **Feel check**: run `npm run dev`, open http://localhost:3001/fleet at ≥1024px, and confirm:
  - As you scroll through the horizontal gallery, each brand watermark drifts a few percent more slowly than its slide — the brand appears to sit slightly "behind" the car/specs, giving the slide depth. The drift must be clearly perceptible but subtle; if it reads as movement of the car, it's too much (reduce `xPercent` toward 3).
  - The watermark never leaves its slide's bounds noticeably or bleeds across the neighboring slide's edge mid-scroll.
  - Reversing the scroll reverses the drift cleanly (scrub is bidirectional).
  - In DevTools, toggle `prefers-reduced-motion: reduce`, reload, scroll: watermarks stay static, everything else unchanged.
- **Done when**: watermarks drift ~6% of their width per slide travel with `containerAnimation: st`, reduced-motion keeps them static, and `tsc` + `lint` pass.
