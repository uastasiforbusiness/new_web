# Design — Port reference luxury platform into new_web

**Date:** 2026-07-31
**Status:** Approved by user (sections 1–5)
**Working branch:** `refactor-luxury-site`
**Reference project:** `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)` (running at localhost:3000)

## Context

The user prefers the structure and content of the reference project
`b-leader-luxury-platform (2)` over the current `new_web` site. The reference is a clean,
data-driven, editorial design ("noir & gold", Cormorant/Inter/Outfit, centralized catalogue
in `src/lib/data.ts` + `src/lib/config.ts`). `new_web` is functional but complex
(36 components nested under `velox/{sections,ui,hero,chat}`, data spread across
`velox/data.ts` + `src/data/experiences.ts`).

**Decision:** Port the reference site's structure and content into `new_web`, while keeping
`new_web`'s working infrastructure and dynamic effects.

## Scope

### In scope
- Port the reference's **6 public pages**: home, fleet, yacht, experiences, services, contact.
- Port the reference's **data-driven architecture**: `src/lib/config.ts` + `src/lib/data.ts`.
- Port the reference's **flat component set** (18 components).
- Keep `new_web`'s **dynamic effects** untouched: current hero (HeroScaleDown + ImageSequence),
  intro/loading (LoadingScreen), Ferrari 360° frames (`public/images/yacht_360/`).
- Keep `new_web`'s **API routes**: `/api/reserve`, `/api/whatsapp/*`.

### Out of scope
- `/admin` page and any database (Drizzle/pg) from the reference — NOT ported. `new_web`
  targets Cloudflare Workers; no DB layer is introduced.
- New content sections (blog posts, testimonials, FAQ, press, venues) — deferred.
- Modifying the hero, the intro, or any dynamic effect.

## Design

### 1. Architecture

Port the reference's data-driven architecture into `new_web`:

```
src/lib/config.ts   → brand, contact, nav links, whatsapp helper (NEW)
src/lib/data.ts     → unified catalogue: CARS, YACHT, YACHT_PACKAGES, EXPERIENCES, SERVICES (NEW)
src/lib/seo.ts      → keep new_web's existing seo util (adapt as needed)
src/components/     → reference's flat components (Hero, FleetShowcase, YachtSection,
                      ExperiencesSection, ServicesPreview, CTASection, Navbar, Footer,
                      Marquee, Reveal, SmoothScroll, WhatsAppButton, ReserveModal,
                      ContactForm, FleetGrid, YachtPackages, ExperienceList, ServiceBands)
src/app/            → pages: home, fleet, yacht, experiences, services, contact
src/app/api/        → keep new_web reserve + whatsapp (untouched)
```

### 2. Page inventory

| Page | Action |
|------|--------|
| `/` (home) | Restructured with reference sections, but keeps **new_web's current hero + intro** |
| `/fleet` | Port reference version (FleetGrid + CTASection) — the cars (products) |
| `/experiences` | **UNIFIED hub** listing ALL experiences (car + boat) with category filters. No separate yacht page |
| `/experiences/[slug]` | Removed (reference has no per-experience detail page) |
| `/services` | Port reference version (ServiceBands) |
| `/contact` | Port reference version (ContactForm) |
| `/yacht` | **NOT built** — yacht experiences live inside the unified `/experiences` hub |
| `/about` | **KEPT** — "The B LEADER Story" (EST. 2023, how the business was born, values). Existing new_web page with real content; adapted to the reference's design language |
| `/locations`, `/locations/salento` | Removed (not in reference) |
| `/admin` | Not ported (no DB) |

**Nav:** `HOME | FLEET | EXPERIENCES | SERVICES | ABOUT | CONTACT` (no Yacht entry; the
yacht is presented through its experiences in the hub; About keeps the business story).

### 3. Data layer

Create `src/lib/config.ts` mirroring the reference:
- `BRAND`, `TAGLINE`, `CONTACT` (address/email/phone/hours)
- `WHATSAPP_NUMBER` + `whatsappUrl(message)`
- `SITE_URL`, `NAV_LINKS`

Create `src/lib/data.ts` — unified catalogue sourced from existing `new_web` content:
- `CARS` (4 autos — from `velox/data.ts`)
- `YACHT` (Cranchi Atlantique 50) — the vessel, used inside yacht-experience cards
- `EXPERIENCES` — **unified list of ALL experiences** (car + boat, 7 total) with a
  `category` field (`land` / `sea`) so the hub can filter. Sourced from
  `src/data/experiences.ts` + `velox/data.ts`
- `SERVICES` (3 servicios)
- `HERO_VIDEO`, `HERO_POSTER`

No new content is invented; existing `new_web` content is centralized.

**Reparto de experiencias (owner-confirmed):**

🚗 **Land (car) — 3:**
1. Adriatic Morning (la ruta adriática)
2. Salento Supercar Tour
3. Sea and Road (Ferrari & Sea Combination)

⛵ **Sea (boat) — 4:**
1. Full Day — Two Seas
2. Half Day — Ionian
3. Dinner at Anchor
4. Golden Hour / Sunset

All 7 appear on the single `/experiences` hub, filterable by `Land` / `Sea`.

### 4. Components

Port the reference's flat components to `src/components/`. The reference set is 18 files
(≈2,200 lines total):

| Component | Size | Notes |
|---|---|---|
| Hero.tsx | 167 | NOT ported. Home keeps new_web's current hero; reference hero is unused |
| Navbar.tsx | 168 | Adapt to NAV_LINKS |
| Footer.tsx | 129 | Adapt to CONTACT |
| ReserveModal.tsx | 500 | Reserve flow — adapt to new_web /api/reserve |
| WhatsAppButton.tsx | 190 | Adapt to whatsappUrl |
| ContactForm.tsx | 132 | Contact flow — adapt to new_web API |
| FleetShowcase.tsx / FleetGrid.tsx | 117/107 | Fleet |
| YachtSection.tsx / YachtPackages.tsx | 130/54 | Yacht |
| ExperiencesSection.tsx / ExperienceList.tsx | 74/83 | Experiences |
| ServicesPreview.tsx / ServiceBands.tsx | 82/68 | Services |
| CTASection.tsx, Marquee.tsx, Reveal.tsx, SmoothScroll.tsx | 61/33/65/44 | Shared |

After porting, old `velox/*` components that become unused are removed (verified by import
graph before deletion).

### 5. Preserved (untouched)

- **Hero actual**: `src/components/velox/sections/hero-scale-down.tsx` + `hero/image-sequence.tsx`
- **Intro/loading**: `src/components/velox/ui/loading-screen.tsx` + its usage in home
- **360° frames**: `public/images/yacht_360/frame_*.webp` + any component consuming them
- **APIs**: `/api/reserve`, `/api/whatsapp/messages|send|status|webhook`
- **Design tokens**: `globals.css` stays on Tailwind v4 (current committed state)

### 6. Cleanup

- Delete unused `velox/*` components after confirming no imports remain.
- Remove pages `/about`, `/locations`, `/locations/salento`.
- Keep `new_web`'s `src/app/layout.tsx` (metadata, fonts, favicon) as the app shell; adapt
  to reference's Navbar/Footer/SmoothScroll/ReserveProvider structure.

## Risks

- **ReserveModal/ContactForm integration**: the reference posts to its own API; must be
  rewired to `new_web`'s `/api/reserve` (which already sends emails via Resend).
- **Component naming collision**: `new_web` already has `FleetShowcase`, `YachtSection`,
  `WhatsAppButton` under `velox/*`. The ported flat components must live at `src/components/`
  and old ones removed to avoid ambiguity.
- **Build regression**: the current committed state builds (verified). Port must keep it green.

## Verification

1. `npx next build` succeeds.
2. All 6 pages render with reference structure; home keeps current hero + intro.
3. Reserve form posts to `/api/reserve` and email fires (test locally).
4. `git status` shows only intended deletions/creations.
