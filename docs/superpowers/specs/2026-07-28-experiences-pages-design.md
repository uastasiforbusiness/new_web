# Experiences Landing Pages — Design Specification

**Project:** B LEADER — Luxury Travel Experiences
**Target Audience:** US luxury travelers
**Date:** 2026-07-28
**Status:** Approved

---

## 1. Overview

Create individual landing pages for each of the 4 B LEADER experiences, optimized for US luxury audience SEO. Each page presents a complete itinerary with timeline, pricing, inclusions, and a clear booking CTA. A master index page at `/experiences` lists all offerings.

---

## 2. URL Structure & SEO

```
/experiences                              ← Index page (list of all experiences)
/experiences/supercar-tour                ← Salento Supercar Tour (Ionian coast)
/experiences/adriatic-morning             ← Adriatic Morning Tour (caves + Leuca)
/experiences/ferrari-sea-combo            ← Ferrari & Sea Combination (afternoon boat)
/experiences/yacht-charter                ← Private Yacht Charter (Cranchi 50)
```

**SEO rules:**
- All routes in English (US market)
- Each page has unique `metadata` via Next.js generateMetadata:
  - `title` — descriptive, keyword-rich (e.g. "Salento Supercar Tour — Ferrari Driving & Pasta Making in Puglia")
  - `description` — compelling, under 160 chars
  - `openGraph` — hero image + description for social sharing
  - `schema.org` — `TouristTrip` or `Product` markup with price, duration, location
- Canonical URLs on all pages
- Internal linking: each experience page links to the other 3 as "Related Experiences"
- Breadcrumb: `Home > Experiences > Supercar Tour`

---

## 3. Data Model

```typescript
// src/data/experiences.ts

interface Experience {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  location: string;
  tagline: string;
  heroImage: string;
  concept: string;
  itinerary: ItineraryStep[];
  includes: string[];
  seo: {
    title: string;
    description: string;
  };
}

interface ItineraryStep {
  time: string;
  icon: string;
  title: string;
  description: string;
  highlight?: {
    tag: string;
    text: string;
  };
}
```

---

## 4. Experiences Content (English — US Market)

### Supercar Tour
| Field | Value |
|---|---|
| Title | Salento Supercar Tour |
| Subtitle | The Art of Driving & Pasta Making |
| Duration | 4 hours (10:00 – 14:00) |
| Price | €890 |
| Location | Porto Gaio, Gallipoli |
| Concept | Ferrari drive along the Ionian coast, photo stop at Porto Selvaggio, pasta masterclass & wine tasting at a historic winery. |

**Itinerary:**
1. **10:00** — Departure from Porto Gaio: engines roar along the SP108 coastal road
2. **Photo Stop** — Porto Selvaggio & Torre Uluzzo: cliffside photo shoot with the Ferrari
3. **Arrival** — Winery among olive groves: welcome Negroamaro rosé
4. **Masterclass** — "Hands in Flour": make orecchiette pasta with a local nonna
5. **Lunch** — Traditional lunch with Primitivo & Negroamaro wine pairing
6. **14:00** — Return to Porto Gaio

### Adriatic Morning Tour
| Field | Value |
|---|---|
| Title | Adriatic Morning Tour |
| Subtitle | Sea Caves, Coastal Roads & Finis Terrae |
| Duration | 4 hours (10:00 – 14:00) |
| Price | €890 |
| Location | Porto Gaio, Gallipoli |
| Concept | Ferrari drive across Salento to the Adriatic coast, private boat into Zinzulusa sea cave, panoramic SP358 drive, aperitivo at Ciolo Bridge, and Santa Maria di Leuca. |

**Itinerary:**
1. **10:00** — Departure from Porto Gaio cross-country to the Adriatic
2. **Adventure** — Grotta della Zinzulusa (Castro): private boat into the majestic sea cave
3. **Scenic Drive** — SP358 panoramic road: cliffs, curves, turquoise sea
4. **Tasting** — Ciolo Bridge: local delicacies + Negroamaro rosé on a cliffside terrace
5. **Arrival** — Santa Maria di Leuca: photo at the iconic lighthouse (Finis Terrae)
6. **Return** — Drive back to Porto Gaio

### Ferrari & Sea Combination
| Field | Value |
|---|---|
| Title | Ferrari & Sea Combination |
| Subtitle | The Afternoon Boat Experience |
| Duration | 4 hours (15:00 – 19:00) |
| Price | On request |
| Location | Porto Gaio, Gallipoli |
| Concept | After the morning Ferrari tour, relax aboard a private boat exploring Gallipoli's coastline — swimming at Punta della Suina, snorkeling at Sant'Andrea Island, drinks included. |

**Itinerary:**
1. **15:00** — Boarding at Porto Gaio: welcome from the skipper
2. **Swim Stop** — Punta della Suina: turquoise waters
3. **Exploration** — Torre del Pizzo: coastal views and hidden coves
4. **Relax** — Scoglio di Sant'Andrea: swimming, snorkeling, prosecco
5. **19:00** — Return to Porto Gaio

### Private Yacht Charter
| Field | Value |
|---|---|
| Title | Private Yacht Charter |
| Subtitle | Cranchi 50 Atlantique Flybridge |
| Duration | Full day (8h) or Half day (4h) |
| Price | From €1,300 (half day) / From €1,800 (full day) |
| Location | Porto Gaio, Gallipoli |
| Concept | Private yacht charter on a Cranchi 50. Professional skipper, onboard assistant, premium aperitif, lunch, prosecco. Explore Sant'Andrea Island, Gallipoli Bay, Punta della Suina. Max 12 guests. |

**Pricing tiers:**
| Season | Full Day | Half Day |
|---|---|---|
| May / September | €1,800 | €1,300 |
| June / July | €1,900 | €1,400 |
| August | €2,000 | €1,500 |
| Aug 10–17 (peak) | €2,300 | €1,800 |

**Includes:** Skipper, assistant, fuel, aperitif, lunch (full day), prosecco, water, snorkeling gear, SUP, canoe.

---

## 5. Layout per Experience Page

```
┌─────────────────────────────────────────────────────┐
│  NAV (same as rest of site)                         │
├─────────────────────────────────────────────────────┤
│  ┌── HERO ───────────────────────────────────────┐  │
│  │  Full-screen image with overlay               │  │
│  │  Badge: "EXCLUSIVE EXPERIENCE"                │  │
│  │  Title + subtitle                              │  │
│  │  Quick info: duration | location | price        │  │
│  │  Concept paragraph                             │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  ─── ◆ ───                                            │
│                                                       │
│  ┌── TIMELINE ────────────────────────────────────┐   │
│  │  Vertical timeline with animated steps          │   │
│  │  (GSAP scroll reveal + staggered fade-in)       │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  ┌── WHAT'S INCLUDED ────────────────────────────┐    │
│  │  Bullet list with check icons                 │    │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  ┌── BOOK THIS EXPERIENCE ───────────────────────┐    │
│  │  CTA section with price + BOOK NOW button      │   │
│  │  Links to WhatsApp / reservation form          │   │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  ┌── RELATED EXPERIENCES ───────────────────────┐     │
│  │  Grid of 3 cards linking to other experiences │    │
│  └────────────────────────────────────────────────┘   │
│                                                       │
│  FOOTER (same as rest of site)                       │
└─────────────────────────────────────────────────────┘
```

---

## 6. File Structure

```
src/app/experiences/
├── page.tsx                       ← Index page listing all experiences
├── layout.tsx                     ← Layout with metadata template

src/app/experiences/[slug]/
├── page.tsx                       ← Dynamic page per experience
├── layout.tsx                     ← Dynamic metadata via generateMetadata

src/components/velox/sections/
├── experience-index-hero.tsx      ← Hero for /experiences index
├── experience-card.tsx            ← Card component for listing
├── experiences-showcase.tsx       ← Section for the homepage
├── experience-hero.tsx           ← Hero for individual experience page
├── experience-timeline.tsx       ← Animated itinerary timeline
├── experience-includes.tsx       ← "What's included" checklist
├── experience-cta.tsx            ← Booking CTA section
└── experience-related.tsx        ← Related experiences grid

src/data/
└── experiences.ts                ← Data array with all 4 experiences

public/images/experiences/
├── supercar-tour-hero.jpg
├── adriatic-morning-hero.jpg
├── ferrari-sea-combo-hero.jpg
├── yacht-charter-hero.jpg
└── experiences-index-hero.jpg
```

---

## 7. Integration with Existing Site

- **Navigation:** Add "EXPERIENCES" link pointing to `/experiences`
- **Homepage:** Add `ExperiencesShowcase` section (e.g. between MarqueeText and FleetShowcase)
- **Fleet/Yacht sections:** Stay as-is (they show vehicles; experiences show itineraries)
- **WhatsApp button, footer, nav:** Reuse existing components

---

## 8. Responsive & Performance

- **Desktop:** Full timeline with animations, hero cinematic
- **Mobile:** Simplified timeline, smaller hero, cards stack vertically
- **Images:** Next.js `<Image>` with `priority` on hero, lazy on rest
- **GSAP:** Scroll-triggered fade-in for timeline steps
- **SEO metadata:** Dynamic via Next.js `generateMetadata`