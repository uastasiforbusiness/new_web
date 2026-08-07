# Plan — Homepage refactor for US luxury travelers (Salento, Italy)

## Diagnosis — why the current homepage feels "messy"

1. **No continuous numbering.** Sections carry inconsistent labels: hero has "01 INTRO" but then TravelCarousel uses "Step 01–05", YachtSection uses "02 — The flybridge", ServicesPreview uses "04 — Chauffeured services" — the numbers jump (01, 02, 04…) with no 03, and the "Step" carousel numbering collides with them. Nothing tells the visitor an ordered story.
2. **Fragmented, disconnected sections.** Hero (velox video hero) → Marquee ticker → 3D card carousel ("Five steps" process) → Yacht section (its own full-width split block) → Services grid (weddings/corporate/events) → CTA. Each block has its own typography rhythm, its own heading style, its own CTA pattern; no narrative glue.
3. **Wrong audience focus.** The page leads with fleet names and event services (weddings, corporate) instead of the holiday experience a US traveler is buying. The hero copy is generic ("precision-engineered rentals").
4. **Confusing "Five steps" carousel.** Steps mix "Select the fleet" with "Set sail" and "Begin" — part process, part product, part CTA. US travelers scanning the page cannot parse what they can actually book.
5. **Mixed copy languages.** Components contain Italian/Spanish comments and legacy class names (`ivory-100`, `gold-500`) that don't exist in the theme — visual noise in code, and a few theme colors may not render as intended.

## New homepage narrative — one continuous numbered journey

A single coherent story, numbered 01–05, in refined US English, speaking to affluent US travelers planning a Southern Italy (Salento) holiday:

| # | Section | Content (source of truth preserved) |
|---|---------|-------------------------------------|
| 01 | **Hero** | Hero video + new copy: "Salento, from the driver's seat" / "Land & sea, one private itinerary." Tagline "Est. 2023 — Puglia, Italy" kept. Number indicator "01 — The arrival". |
| 02 | **Curated journeys** (replaces the 5-step carousel) | Continuous editorial index of the 7 real EXPERIENCES (3 land + 4 sea), numbered 02–04… actually a single continuous list with sequential numbers — "02 — By land" group, "03 — By sea" group, keeping real names, descriptions, prices, durations, highlights from `src/lib/data.ts`. Use compact continuous rows (like ExperienceList's editorial pattern) with reserve buttons. |
| 03 | **The fleet** (compact strip) | The 4 cars (real names, prices €/day, taglines) in a refined continuous strip linking to /fleet — "03 — The fleet". |
| 04 | **The yacht** | Cranchi Atlantique 50 real packages, kept intact. "04 — The yacht". |
| 05 | **The concierge / CTA** | Existing CTASection copy kept, reframed as "05 — Your concierge". Marquee retained as a thin divider with fixed fleet list. Services demoted to a single quiet line linking to /services (not a full block). |

## Implementation

- Rewrite `src/app/_components/home-client.tsx` as the new page shell with a continuous numbered rhythm (shared eyebrow format: `<index> — <name>` in gold).
- Refactor `TravelCarousel.tsx` → replace its body with a continuous **SignatureJourneys** section (new client component) built from `EXPERIENCES` data; keep sequential numbering (`01`..`07` across land/sea groups).
- Update hero copy in `hero-images.ts` (non-generic, Salento-specific, US-English).
- Update YachtSection eyebrow to "04 — The yacht"; ServicesPreview replaced by a slim "Private occasions" strip with link to /services.
- CTASection eyebrow "05 — Your concierge".
- Keep all real prices, durations, inclusions, image assets unchanged (business facts are source of truth).
- Keep animations but simplify: the GSAP pin/scale hero, reveal on scroll, wave parallax all remain; remove the confusing 3D carousel.
- Follow repo conventions: TypeScript, `'use client'` only where needed, US English copy, black/gold system.
- Verify with `npm run lint` + `npm run build`, then visual check via local dev preview.

## Deployment

The user owns the repo on GitHub. The refactor will be delivered as a local result for the user to review; no push to production unless requested.
