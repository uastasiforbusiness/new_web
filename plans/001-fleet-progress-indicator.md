# 001 — Add a scrub-driven progress indicator to the fleet horizontal gallery

- **Status**: DONE
- **Commit**: `aead399`
- **Severity**: MEDIUM
- **Category**: Missed opportunities (feedback)
- **Estimated scope**: 1 file (`src/components/velox/sections/fleet-showcase.tsx`), ~40 lines

## Problem

The "Idol's Gallery" section pins for the entire horizontal scroll (5 slides) and the only feedback the user gets is the slides translating. The per-slide counter (`01/05`, …) snaps from slide to slide and offers no sense of overall position — there is no continuous signal of how far into the gallery the user is, or how much remains. A long pinned scroll with no progress readout feels unbounded.

Current per-slide counter — `src/components/velox/sections/fleet-showcase.tsx:268-277`:

```tsx
                {/* Slide counter */}
                <div className="hidden lg:flex absolute bottom-8 right-8 sm:right-12 items-center gap-3">
                  <span className="font-heading text-[10px] tracking-[0.15em] text-[#c9a96e]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-6 h-[1px] bg-[#c9a96e]/30" />
                  <span className="font-heading text-[10px] tracking-[0.15em] text-[#444]">
                    {String(cars.length).padStart(2, '0')}
                  </span>
                </div>
```

The existing horizontal scrub — `src/components/velox/sections/fleet-showcase.tsx:40-51`:

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

A single, global progress indicator pinned to the section (not per-slide): a gold counter of the active slide (`01 … 05`) plus a thin gold progress line that fills continuously with the scroll position. Both are driven by the existing ScrollTrigger's `onUpdate`, so they stay in lockstep with the scrub. The per-slide counter block is removed (it moves with the slides and duplicates the global one).

The fill uses `transform: scaleX(progress)` only (GPU-friendly, per audit category 5 — animate `transform`/`opacity` only), with `transform-origin: left`, driven through `gsap.quickSetter` for performance. Progress is constant motion → **linear** (`ease: 'none'`), per audit category 2.

The counter text updates from `01` to `0{slides.length}` via `Math.round(progress * (slides.length - 1)) + 1` — it only writes the DOM when the value changes (no churn per scroll frame).

New indicator element (placed inside the `<section id="fleet">`, directly after the closing `</div>` of the flex container and before `</section>`):

```tsx
                {/* Global progress indicator */}
                <div className="hidden lg:flex absolute bottom-8 right-8 sm:right-12 items-center gap-3 z-20">
                  <span
                    ref={countRef}
                    className="font-heading text-[10px] tracking-[0.15em] text-[#c9a96e]"
                  >
                    01
                  </span>
                  <div className="w-24 h-[1px] bg-white/10 overflow-hidden">
                    <div
                      ref={progressRef}
                      className="h-full w-full bg-[#c9a96e]"
                      style={{ transformOrigin: 'left' }}
                    />
                  </div>
                  <span className="font-heading text-[10px] tracking-[0.15em] text-[#444]">
                    {String(cars.length).padStart(2, '0')}
                  </span>
                </div>
```

## Repo conventions to follow

- **Linear ease for scrub-driven/constant motion**: the section already uses `ease: 'none'` on the horizontal tween (`fleet-showcase.tsx:42`); `experience-timeline.tsx:38` uses `ease: 'none'` for its scroll-driven thread. Progress is the same class — linear, no extra curve.
- **Gold accent + `font-heading` tracking for micro-labels**: matches the existing counter at `fleet-showcase.tsx:271-276` and the site-wide `#c9a96e` accent used across the fleet section.
- **`gsap.quickSetter` for per-frame transforms**: this is the standard GSAP pattern for a transform driven every scroll frame (avoids a tween per frame). There is no existing `quickSetter` use in the repo; it is a GSAP core API already bundled (`gsap` is imported at `fleet-showcase.tsx:4`).
- **Refs are already available**: `useRef` is imported at `fleet-showcase.tsx:3`.

## Steps

1. In `src/components/velox/sections/fleet-showcase.tsx`, add two refs next to the existing ones (`fleet-showcase.tsx:24-25`):

   ```tsx
   const galleryRef = useRef<HTMLDivElement>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const progressRef = useRef<HTMLDivElement>(null);
   const countRef = useRef<HTMLSpanElement>(null);
   ```

2. Delete the per-slide counter block at `fleet-showcase.tsx:268-277` (the `{/* Slide counter */}` comment through its closing `</div>`).

3. Add the global progress indicator element after the container's closing tag. The container closes at `fleet-showcase.tsx:281` (`</div>`); insert the block from **Target** between that line and `</section>` at `fleet-showcase.tsx:282`.

4. In the existing `ScrollTrigger.matchMedia({ '(min-width: 1024px)': () => { … } })` branch, add an `onUpdate` to the `scrollTrigger` config object (`fleet-showcase.tsx:43-51`), inside the function that returns the cleanup. The `scrollTrigger` becomes:

   ```tsx
             scrollTrigger: {
               trigger: galleryRef.current,
               pin: true,
               scrub: 1,
               end: () => `+=${container.scrollWidth - window.innerWidth}`,
               invalidateOnRefresh: true,
               anticipatePin: 1,
               onUpdate: (self) => {
                 if (progressRef.current) {
                   const setScaleX = gsap.quickSetter(progressRef.current, 'scaleX');
                   setScaleX(self.progress);
                 }
                 if (countRef.current) {
                   const idx = Math.round(self.progress * (slides.length - 1));
                   const label = String(idx + 1).padStart(2, '0');
                   if (countRef.current.textContent !== label) {
                     countRef.current.textContent = label;
                   }
                 }
               },
             },
   ```

   `quickSetter` may be created once outside `onUpdate` (e.g. right after `const st = …`) to avoid re-creating it every frame — either placement is acceptable; creating it once is preferred.

5. Because the counter/progress element is `hidden lg:flex`, it only renders on the pinned desktop layout. No mobile changes are needed and the mobile branch (`fleet-showcase.tsx:59-61`) stays untouched.

## Boundaries

- Do NOT touch anything outside `src/components/velox/sections/fleet-showcase.tsx`.
- Do NOT change the horizontal tween's `xPercent`, `scrub`, `pin`, or `end` values — motion properties of the existing scrub are out of scope.
- Do NOT add new dependencies or change markup beyond the refs, the removed counter block, and the new indicator block described above.
- The progress indicator is feedback (an `lg:`-only, non-interactive readout). It does NOT need a `prefers-reduced-motion` gate — it is a progress bar, not positional movement of content, and removing it would remove comprehension aid (audit category 6: reduced motion means fewer and gentler, not zero).
- If the code no longer matches the excerpts above (drift since commit `aead399`), STOP and report instead of improvising.

## Verification

- **Mechanical**: run `npx tsc --noEmit` (repo uses TypeScript) and `npm run lint`. Both must pass with no new errors. The refs are typed (`HTMLSpanElement`, `HTMLDivElement`) so a `tsc` failure would surface immediately.
- **Feel check**: run `npm run dev`, open http://localhost:3001/fleet (or scroll to `#fleet` on the home page) at ≥1024px width, and confirm:
  - The counter starts at `01` on the intro slide and reaches `05` (or `0{n}`) exactly when the yacht slide is centered — it updates smoothly, one step per slide, never mid-slide jitter.
  - The gold progress line fills left→right continuously as you scroll and never jumps backward except when you scroll back (scrub is bidirectional — reversing should reverse the line, which is correct).
  - The indicator stays fixed on screen for the entire pinned section (it must not translate with the slides).
  - In DevTools (Animations panel) set playback to 10%: the line advances smoothly, no layout/paint jank; the counter flips exactly once per slide boundary.
  - Scroll back to the top and forward again: line and counter return to `00`/`01` correctly (no drift).
- **Done when**: the counter shows the centered slide index, the line maps 0→1 to the full scroll, and `tsc` + `lint` pass.
