# PLAN — Global Typography Switch to Yacht-Page Style

## Goal
Make every page on the project read in the same typography stack as `/yacht`:
**Cormorant Garamond** as the universal serif (headlines, body, eyebrows, CTAs).
No more Outfit. No more Inter fallback for body. The whole site becomes one
coherent serif-led editorial system, matching the brand direction the user prefers.

This plan is **typography only**. No layout, color, motion, copy, or content changes.

---

## Reference — The yacht-page typography stack (CANONICAL)

These are the patterns to replicate across the whole site:

| Element | Class signature | Font |
|---|---|---|
| Hero headline | `font-serif text-5xl md:text-7xl font-light leading-[1.05]` | Cormorant Light |
| Hero subheadline | `font-serif italic font-light text-xl` | Cormorant Italic Light |
| Eyebrow "02 — The flybridge" | `font-display font-semibold tracking-[0.32em] text-gold` uppercase | Cormorant Semibold |
| Section title | `font-serif text-3xl md:text-5xl font-light` | Cormorant Light |
| Card title | `font-serif text-3xl font-light leading-tight` | Cormorant Light |
| Nav wordmark | `font-display tracking-[0.32em]` | Cormorant |
| Nav item | `font-display tracking-[0.18em]` | Cormorant |
| CTA / button | `text-[11px] uppercase tracking-[0.3em]` | Cormorant |
| Body / specs | `text-sm leading-7 text-mute` | Cormorant (default) |
| Spec micro-label | `text-[10px] uppercase tracking-[0.3em]` | Cormorant |

The reason this stack works: **one font, four weights, two axes (regular + italic)**.
Cormorant Light 300 → headlines. Cormorant Regular 400 → body. Cormorant Semibold 600
→ eyebrows and CTAs. Italic variant for accents. No family mixing anywhere.

---

## Current state (audit)

### Token wiring (`src/app/globals.css` `@theme inline`)
```
--font-sans:     var(--font-cormorant)   ← generates `font-sans`
--font-heading:  var(--font-cormorant)   ← generates `font-heading`
--font-body:     var(--font-inter)       ← NO Tailwind utility generated (dead)
--font-elegant:  var(--font-cormorant)   ← NO Tailwind utility generated (dead)
```
There is **no** `--font-serif` or `--font-display` token declared in `@theme inline`,
but the Tailwind v4 default theme ships these by default, mapped to
`--font-serif` (system serif fallback) and `--font-display` (system display fallback).
So `font-serif` and `font-display` currently resolve to generic CSS system stacks
(`ui-serif, Georgia, ...` and `ui-sans-serif, system-ui, ...`), **not** Cormorant.
That is why the yacht page works: it relies on those generic stacks falling back
to something readable, not because it's actually loading Cormorant everywhere.

The previous `globals.css` edit already mapped `--font-sans` and `--font-heading`
to Cormorant, so `font-sans` and `font-heading` resolve correctly. The other four
classes (`font-serif`, `font-display`, `font-body`, `font-elegant`) need explicit
declaration in `@theme inline` to actually use Cormorant.

### Class usage in src/ (today)
| Class | Count | Currently resolves to |
|---|---|---|
| `font-heading` | 71 | Cormorant ✅ |
| `font-body` | 53 | **Dead** (no utility) → falls back to body default |
| `font-elegant` | 48 | **Dead** (no utility) → falls back to body default |
| `font-serif` | 11 | System serif fallback |
| `font-display` | 7 | System sans fallback |
| `font-sans` | 3 | Cormorant ✅ |

Total: 193 class uses across **30 files**.

### Files in scope
```
src/app/layout.tsx
src/app/globals.css
src/app/page.tsx
src/app/about/page.tsx
src/app/experiences/page.tsx
src/app/locations/page.tsx
src/app/locations/salento/page.tsx
src/components/velox/chat/whatsapp-button.tsx
src/components/velox/chat/whatsapp-popup.tsx
src/components/velox/hero/text-reel.tsx
src/components/velox/sections/coverage-section.tsx
src/components/velox/sections/experience-card.tsx
src/components/velox/sections/experience-cta.tsx
src/components/velox/sections/experience-hero.tsx
src/components/velox/sections/experience-includes.tsx
src/components/velox/sections/experience-index-hero.tsx
src/components/velox/sections/experience-related.tsx
src/components/velox/sections/experience-timeline.tsx
src/components/velox/sections/fleet-showcase.tsx
src/components/velox/sections/footer.tsx
src/components/velox/sections/hero-scale-down.tsx
src/components/velox/sections/navigation.tsx
src/components/velox/sections/reserve-section.tsx
src/components/velox/sections/service-lines-section.tsx
src/components/velox/sections/yacht-experience-section.tsx
src/components/velox/sections/yacht-flybridge.tsx
src/components/velox/sections/yacht-section.tsx
src/components/velox/ui/car-gallery.tsx
src/components/velox/ui/date-picker.tsx
src/components/velox/ui/displacement-card.tsx
src/components/velox/ui/loading-screen.tsx
src/components/velox/ui/marquee-text.tsx
src/components/velox/ui/reservation-form.tsx
```

---

## Strategy — token-only switch, no per-file rewrites

The 193 class uses already use one of six class names. If we wire all six tokens
to Cormorant in `globals.css`, **every class already in the codebase resolves to
the right font automatically**. No need to touch 30 files. This is the
"infrastructure lever" — fix the source of truth, the consumers follow.

### Step 1 — Rewrite `@theme inline` block in `src/app/globals.css`

Replace the current four-token block with:

```css
@theme inline {
  --font-sans:     var(--font-cormorant);
  --font-serif:    var(--font-cormorant);
  --font-display:  var(--font-cormorant);
  --font-heading:  var(--font-cormorant);
  --font-elegant:  var(--font-cormorant);
  --font-body:     var(--font-cormorant);
  --font-outfit:   var(--font-cormorant);
  --color-gold:    #c9a96e;
  --color-gold-light: #d4af37;
  --color-gold-dark:  #b8943e;
  --radius:        0.625rem;
  --radius-sm:     calc(var(--radius) - 4px);
  --radius-md:     calc(var(--radius) - 2px);
  --radius-lg:     var(--radius);
  --radius-xl:     calc(var(--radius) + 4px);
}
```

**What this does:**
- `font-sans`    → Cormorant (was already correct)
- `font-serif`   → Cormorant (was system serif)
- `font-display` → Cormorant (was system sans)
- `font-heading` → Cormorant (was already correct)
- `font-elegant` → Cormorant (was dead, now active)
- `font-body`    → Cormorant (was Inter, now Cormorant — matches yacht page body)
- `font-outfit`  → Cormorant (was dead, now active — covers any `font-outfit` uses)

**What this changes visually:**
- 11 `font-serif` uses (headlines, card titles) → Cormorant Light (was Georgia-like)
- 7 `font-display` uses (nav, prices, eyebrows) → Cormorant (was system sans)
- 48 `font-elegant` uses (section titles, region names, footers) → Cormorant (was dead)
- 53 `font-body` uses (descriptions, specs) → Cormorant Regular (was Inter)

Net effect: every visible string on the site renders in Cormorant Garamond. The
project's editorial / luxury register is unified.

### Step 2 — Drop the now-unused Outfit import in `src/app/layout.tsx`

`Outfit` is still imported and the variable is still added to the `<body>`
className. It's dead weight now. Outfit is no longer used by any CSS rule.

Change:
- Remove `import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";`
- Add `import { Cormorant_Garamond } from "next/font/google";`
- Remove the `outfit` and `inter` const declarations entirely
- Remove `${outfit.variable}` and `${inter.variable}` from the body className
- Keep `${cormorant.variable}`
- Optionally drop the unused `--font-outfit` and `--font-inter` variables

**Decision**: keep `--font-inter` and `--font-outfit` defined but unused, just
in case any future component needs a sans fallback. If user wants them gone
completely, remove them too.

### Step 3 — Verify the body font-family inherits

In `globals.css` the html/body has no `font-family` declaration, so it inherits
from the browser default (typically Times New Roman or system serif). The yacht
page works because every visible element has an explicit `font-*` class. Other
pages rely on `font-sans` being set to something — they will use Cormorant now.

If any element on the project has **no** `font-*` class, it will fall through
to the browser default serif. Audit by:
1. `npm run build` → must complete without TS or PostCSS errors
2. `npm run dev` → open every page in browser and visually confirm
3. Spot-check: cover section, footer, marquee text, navigation wordmark

If any text renders in Times New Roman (browser default), add the appropriate
`font-sans` (now Cormorant) class to that element.

---

## Files NOT touched

This is a **token-only** change. Per-file rewrites are not in scope.

If the user later wants to tune specific element typography (e.g., make all
section titles `font-light italic` like the cover section), that is a separate
task. Plan now is to unify the font family only.

---

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Cormorant at 8-9px (tiny labels) is hard to read | Cormorant Light at small sizes is actually fine for letterforms; if any look bad, bump `text-[10px]` → `text-[11px]` (separate pass) |
| Italic descenders clipped on display headlines | Cormorant Italic has descenders on `g y p q j` — yacht page uses `leading-[1.05]` which is safe; no other page uses italic at display size, so risk is contained |
| A few sans-serif features lose their "tech" feel (e.g., dashboard-style spec rows) | Acceptable trade-off per user request — they prefer yacht style globally |
| Tailwind v4 may not auto-generate `font-serif` / `font-display` from `--font-serif` / `--font-display` without `inline` | The `inline` keyword in `@theme inline` is correct and is what makes this work in v4 |
| Body copy at 14px in Cormorant Regular is slightly less readable than Inter | Cormorant Regular at body sizes is a standard editorial pattern (Vogue, NYT use serif bodies). If user complains, swap `--font-body` back to Inter. |
| `font-outfit` is referenced anywhere I missed | Audit grep showed 0 uses outside `layout.tsx` declaration, so safe |

---

## Verification checklist

After Step 1 + Step 2:

1. `npm run lint` → must pass
2. `npm run build` → must pass (validates Tailwind v4 token generation)
3. `npm run dev` → open each page in browser:
   - `/` (homepage) — hero, fleet, services, cover, reserve, footer
   - `/yacht` — must look identical to before (regression check)
   - `/fleet`, `/services`, `/about`, `/experiences`, `/experiences/[slug]`, `/locations`, `/locations/salento`
   - All CTAs, all eyebrows, all body copy
4. In Chrome DevTools → inspect any text → Computed → font-family should
   contain "Cormorant Garamond" or the cormorant variable
5. No text should render in Times New Roman (browser fallback)

If any page has stray Times Roman text, identify the element and add the
appropriate `font-sans` class to it. This is expected to be zero cases given
the audit, but flagged here for safety.

---

## Out of scope

- Font weight/size tuning per element
- Adding/removing tracking values
- Converting any layout
- Color, motion, copy changes
- Removing `font-sans` / `font-heading` from the codebase (they still work, no harm)

---

## Estimated effort

- **Step 1** (globals.css edit): 1 file, ~15 lines changed
- **Step 2** (layout.tsx edit): 1 file, ~15 lines changed
- **Verification**: 30 min manual browser check across 8 routes

Total: 2 file edits, 30 min verification. No per-component rewrites.
