# Port Reference Luxury Platform into new_web — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the clean, editorial structure of `b-leader-luxury-platform (2)` into `new_web`, keeping `new_web`'s current hero, intro, dynamic effects, and API routes.

**Architecture:** Replace `new_web`'s 36 nested `velox/*` components and scattered data with the reference's flat `src/components/*` set (18 components) and a centralized data layer (`src/lib/config.ts` + `src/lib/data.ts`). Pages become: home, fleet, experiences (unified hub, land+sea), services, about, contact. No yacht page, no admin, no DB changes. `new_web`'s hero, intro, 360° frames and `/api/reserve` + `/api/whatsapp/*` are preserved.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, Framer Motion, lucide-react, zod.

**Reference source root:** `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\`
**Working repo:** `C:\Users\gabri\Desktop\new_web` (branch `refactor-luxury-site`)

## Global Constraints

- Do NOT modify: `src/components/velox/sections/hero-scale-down.tsx`, `src/components/velox/hero/image-sequence.tsx`, `src/components/velox/ui/loading-screen.tsx`, `public/images/yacht_360/`, or the home hero + intro wiring.
- Do NOT touch `/api/reserve` and `/api/whatsapp/*` route paths or their security layers (CSRF, rate-limit, D1, Resend).
- NO database / admin page. No new dependencies.
- Data catalogue stays `src/lib/data.ts` + `src/lib/config.ts`. No content invented — source from existing `new_web` data + reference copy.
- Design tokens: noir & gold, Cormorant serif + Outfit display + Inter sans. Gold = `#c9a96e` (keep new_web brand gold).
- Tailwind v4. All class names used by ported components must resolve.
- Every task ends with a working `npx next build` (or `npx tsc --noEmit` where noted).
- Branch commits only after `git status` verified; do not commit dev WIP untracked files.

---

### Task 1: Create `src/lib/config.ts`

**Files:**
- Create: `src/lib/config.ts`

**Interfaces:**
- Produces: `BRAND`, `TAGLINE`, `CONTACT` (address/email/phoneDisplay/phoneHref/hours), `WHATSAPP_NUMBER`, `whatsappUrl(message)`, `SITE_URL`, `NAV_LINKS` (home, fleet, experiences, services, about, contact)

- [ ] **Step 1: Copy the reference config and adapt it**

Copy from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\lib\config.ts`. Change `NAV_LINKS` to the 6-page nav (no Yacht entry):

```ts
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/experiences", label: "Experiences" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
```

Keep all other exports identical to the reference (`BRAND`, `TAGLINE`, `CONTACT`, `WHATSAPP_NUMBER`, `whatsappUrl`, `SITE_URL`). Verify the `CONTACT` values match `src/lib/seo.ts` `CONTACT` (phone `+39 351 666 7788`, email `info@bleaderitaly.com`, address `Piazza Castello 1, 73057 Carmiano (LE), Salento · Italy`).

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: passes (file is standalone, unused imports none).

- [ ] **Step 3: Commit**

```bash
git add src/lib/config.ts
git commit -m "feat(lib): add centralized brand config (config.ts)"
```

---

### Task 2: Create `src/lib/data.ts` (unified catalogue)

**Files:**
- Create: `src/lib/data.ts`

**Interfaces:**
- Produces: types `Car`, `YachtPackage`, `Experience`, `Service`; exports `CARS`, `YACHT`, `YACHT_PACKAGES`, `EXPERIENCES` (7, with `type: "land" | "sea"`), `SERVICES`, `ALL_EXPERIENCE_OPTIONS`, `HERO_VIDEO`, `HERO_POSTER`.
- Consumes: nothing at module load; data only.

- [ ] **Step 1: Write the data file**

Create `src/lib/data.ts`:

```ts
export type CarSpec = { label: string; value: string };

export type Car = {
  slug: string;
  name: string;
  kind: string;
  years?: string;
  tagline: string;
  image: string;
  price: string;
  priceNote: string;
  seats: string;
  exterior: string;
  detail: string;
  specs: CarSpec[];
  heroNote: string;
};

// 4 cars. image paths point to real files under public/images/.
// Prices/specs come from existing new_web content (src/components/velox/data.ts).
export const CARS: Car[] = [
  {
    slug: "ferrari-california-t",
    name: "Ferrari California T",
    kind: "Gran Turismo Spider",
    years: "2014 – 2017",
    tagline: "Twin-turbo thunder, roof down, Adriatic ahead.",
    image: "/images/rossa_card.webp",
    price: "€2,450",
    priceNote: "per day",
    seats: "2 + 2",
    exterior: "Pininfarina lines · vertical LED optics · Rosso Corsa",
    detail: "Retractable hard-top in 14 s · Magnetic Ride · F1-Trac · Manettino",
    specs: [
      { label: "Engine", value: "3.9L V8 Biturbo" },
      { label: "Power", value: "560 hp" },
      { label: "Torque", value: "755 Nm" },
      { label: "Gearbox", value: "F1 DCT · 7-speed" },
      { label: "0–100 km/h", value: "3.6 s" },
      { label: "Top speed", value: "316 km/h" },
    ],
    heroNote: "Our flag-bearer. The 90° biturbo V8 with grand-touring ease.",
  },
  {
    slug: "ferrari-california",
    name: "Ferrari California",
    kind: "Convertible GT",
    tagline: "The naturally-aspirated icon that started it all.",
    image: "/images/ferrari_blanca_card.webp",
    price: "€1,950",
    priceNote: "per day",
    seats: "2 + 2",
    exterior: "Bianco Avus · bi-tone Gloss Black roof · diamond-cut alloys",
    detail: "Carbon-ceramic Brembo brakes · 100–0 km/h in 32.5 m",
    specs: [
      { label: "Engine", value: "4.3L V8 · 4,297 cc" },
      { label: "Power", value: "460 hp" },
      { label: "Torque", value: "485 Nm" },
      { label: "Gearbox", value: "Getrag DCT · 7-speed" },
      { label: "0–100 km/h", value: "3.9 s" },
      { label: "Top speed", value: "310 km/h" },
    ],
    heroNote: "Front-mid V8, 3.55 kg per hp and a voice that needs no turbo.",
  },
  {
    slug: "maserati-ghibli",
    name: "Maserati Ghibli",
    kind: "Executive Sports Sedan",
    tagline: "Trident-badged poise — whisper-quiet, 600 Nm strong.",
    image: "/images/maserati_card.jpg",
    price: "€890",
    priceNote: "per day",
    seats: "5",
    exterior: "Blu Nobile tri-coat pearl · deep metallic lustre",
    detail: "Maserati Active Sound exhaust · limited-slip differential",
    specs: [
      { label: "Engine", value: "3.0L V6 Turbodiesel" },
      { label: "Power", value: "250 hp" },
      { label: "Torque", value: "600 Nm" },
      { label: "Gearbox", value: "ZF 8-speed automatic" },
      { label: "0–100 km/h", value: "6.3 s" },
      { label: "Top speed", value: "250 km/h" },
    ],
    heroNote: "The chauffeur favourite. Discreet outside, symphonic inside.",
  },
  {
    slug: "mercedes-e-cabrio",
    name: "Mercedes E 220d Cabrio",
    kind: "Four-Seat Cabriolet",
    tagline: "Open-air elegance for slow Salento afternoons.",
    image: "/images/mercedes_e220d_cabrio.webp",
    price: "€590",
    priceNote: "per day",
    seats: "4",
    exterior: "Polar White · multi-layer acoustic canvas hood",
    detail: "Roof opens in 20 s at up to 50 km/h · ~1,150 km range",
    specs: [
      { label: "Engine", value: "2.0L 4-cyl Turbodiesel" },
      { label: "Power", value: "194 hp" },
      { label: "Torque", value: "400 Nm" },
      { label: "Gearbox", value: "9G-TRONIC · 9-speed" },
      { label: "0–100 km/h", value: "7.7 s" },
      { label: "Top speed", value: "237 km/h" },
    ],
    heroNote: "Four real seats, Aircap serenity and silent cabrio cruising.",
  },
];

export type YachtPackage = {
  id: string;
  name: string;
  duration: string;
  price: string;
  note: string;
};

export const YACHT = {
  slug: "cranchi-atlantique-50",
  name: "Cranchi Atlantique 50",
  kind: "Flybridge Motor Yacht",
  tagline: "Fifteen metres of Italian craftsmanship between two seas.",
  image: "https://images.pexels.com/photos/10514509/pexels-photo-10514509.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  imageCruise: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  imageDinner: "https://images.pexels.com/photos/7766408/pexels-photo-7766408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  imageSailing: "https://images.pexels.com/photos/7873392/pexels-photo-7873392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  specs: [
    { label: "Length", value: "15.82 m — teak deck" },
    { label: "Engines", value: "2 × Volvo Penta D9-575" },
    { label: "Power", value: "1,150 hp combined" },
    { label: "Cruise", value: "24.5 kn · 30 kn max" },
    { label: "Guests", value: "10 by day · 6 berths / 3 cabins" },
  ],
  included: [
    "Licensed skipper & stewardess",
    "Fuel for both-seas itineraries",
    "Welcome prosecco & aperitivo at anchor",
    "SUP boards, snorkel sets & sea towels",
    "Air-conditioned saloon, galley & cabins",
  ],
};

export const YACHT_PACKAGES: YachtPackage[] = [
  { id: "golden-hour", name: "Golden Hour Cruise", duration: "2.5 hours", price: "€950", note: "Champagne sunset off Gallipoli." },
  { id: "half-day", name: "Half Day — Ionian", duration: "4 hours", price: "€1,450", note: "Swim stops at Punta Suina." },
  { id: "dinner-on-board", name: "Dinner at Anchor", duration: "3 hours", price: "€1,800", note: "Private chef, catch of the day." },
  { id: "full-day", name: "Full Day — Two Seas", duration: "8 hours", price: "€2,600", note: "Gallipoli to Porto Cesareo and back." },
];

export type Experience = {
  slug: string;
  index: string;
  name: string;
  category: string;
  type: "land" | "sea";
  description: string;
  image: string;
  price: string;
  duration: string;
  highlights: string[];
};

// Unified hub — ALL 7 experiences (3 land + 4 sea).
export const EXPERIENCES: Experience[] = [
  // ── LAND (cars) ─────────────────────────────────────────────
  {
    slug: "adriatic-morning",
    index: "N°1",
    name: "Adriatic Morning",
    category: "Coastal drive",
    type: "land",
    description: "Ferrari along the clifftop SP358, sea caves at Castro and Finis Terrae at Santa Maria di Leuca — the coast at its wildest.",
    image: "https://images.pexels.com/photos/7995539/pexels-photo-7995539.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €890",
    duration: "4 hours",
    highlights: ["Clifftop SP358", "Grotta della Zinzulusa", "Finis Terrae — Leuca"],
  },
  {
    slug: "salento-supercar-tour",
    index: "N°2",
    name: "Salento Supercar Tour",
    category: "Signature tour",
    type: "land",
    description: "The roar of a Ferrari along the Ionian coast, a cliffside photoshoot at Porto Selvaggio and fresh orecchiette with a local nonna.",
    image: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €890",
    duration: "4 hours",
    highlights: ["Drive. Dine. Dolce Vita.", "Porto Selvaggio photoshoot", "Pasta making at a masseria"],
  },
  {
    slug: "sea-and-road",
    index: "N°3",
    name: "Sea & Road",
    category: "Combo experience",
    type: "land",
    description: "The afternoon boat experience: supercar to Porto Gaio, then board the flybridge for swim stops at Punta della Suina.",
    image: "https://images.pexels.com/photos/36610228/pexels-photo-36610228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "on request",
    duration: "4 hours",
    highlights: ["Supercar + yacht combo", "Punta della Suina", "Aperitivo at anchor"],
  },
  // ── SEA (boat) ──────────────────────────────────────────────
  {
    slug: "full-day-two-seas",
    index: "N°4",
    name: "Full Day — Two Seas",
    category: "Yacht experience",
    type: "sea",
    description: "Board the Atlantique 50 at dawn, cross where the Ionian pours into the Adriatic, and anchor over the sandbanks of Punta Suina.",
    image: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €2,600",
    duration: "8 hours",
    highlights: ["Two seas in one day", "Lunch cooked on board", "Sunset return into Gallipoli"],
  },
  {
    slug: "half-day-ionian",
    index: "N°5",
    name: "Half Day — Ionian",
    category: "Yacht experience",
    type: "sea",
    description: "Swim stops at Punta Suina and a slow cruise of the Ionian coast — barefoot, prosecco in hand.",
    image: "https://images.pexels.com/photos/7873392/pexels-photo-7873392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,450",
    duration: "4 hours",
    highlights: ["Punta Suina swim stops", "Ionian coast cruise", "Aperitivo at anchor"],
  },
  {
    slug: "dinner-at-anchor",
    index: "N°6",
    name: "Dinner at Anchor",
    category: "Yacht experience",
    type: "sea",
    description: "A private chef, the catch of the day, and the anchor down off Gallipoli — dinner afloat, lit by the sunset.",
    image: "https://images.pexels.com/photos/7766408/pexels-photo-7766408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,800",
    duration: "3 hours",
    highlights: ["Private chef on board", "Catch of the day", "Sunset dining at anchor"],
  },
  {
    slug: "golden-hour",
    index: "N°7",
    name: "Golden Hour",
    category: "Sunset ritual",
    type: "sea",
    description: "Champagne sunset off Gallipoli — the flybridge at golden hour, two-and-a-half hours of pure light.",
    image: "https://images.pexels.com/photos/36610228/pexels-photo-36610228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €950",
    duration: "2.5 hours",
    highlights: ["Champagne at sunset", "Gallipoli skyline", "Flybridge at golden hour"],
  },
];

export type Service = {
  slug: string;
  name: string;
  description: string;
  image: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "weddings",
    name: "Weddings",
    description: "Uniformed chauffeurs, ribbon-styled cars, and timing rehearsed to the minute.",
    image: "https://images.pexels.com/photos/32632277/pexels-photo-32632277.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    features: ["Dedicated wedding coordinator", "Floral & ribbon styling", "Guest shuttles", "Photo-time built into the route"],
  },
  {
    slug: "corporate",
    name: "Corporate & Business",
    description: "Board-grade logistics for retreats, launches and visiting delegations.",
    image: "https://images.pexels.com/photos/13741320/pexels-photo-13741320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    features: ["Airport & station meet-and-greet", "Fleet coordination up to 40 guests", "NDA-grade discretion", "VAT invoicing"],
  },
  {
    slug: "social-events",
    name: "Social Events",
    description: "Anniversaries, proposals, birthdays on deck — styled to the last sparkler.",
    image: "https://images.pexels.com/photos/17041994/pexels-photo-17041994.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    features: ["Proposal & celebration set-ups", "Yacht dinner partnerships", "Photographer on request", "Late-return flexibility"],
  },
];

export const ALL_EXPERIENCE_OPTIONS = [
  ...CARS.map((c) => ({ type: "car" as const, value: c.name, label: c.name })),
  ...YACHT_PACKAGES.map((p) => ({ type: "yacht" as const, value: `${YACHT.name} — ${p.name}`, label: `Yacht · ${p.name}` })),
  ...EXPERIENCES.map((e) => ({ type: "tour" as const, value: e.name, label: e.name })),
  ...SERVICES.map((s) => ({ type: "event" as const, value: s.name, label: `Service · ${s.name}` })),
];

export const HERO_VIDEO = "https://videos.pexels.com/video-files/8443860/8443860-uhd_3840_2160_30fps.mp4";
export const HERO_POSTER = "/images/rossa_card.webp";
```

> **NOTE (data fidelity):** Prices, durations and vehicle specs above are compiled from existing `new_web` content (`src/components/velox/data.ts` for cars, `src/data/experiences.ts` for tours) and the reference's `src/lib/data.ts`. Verify each price against those sources during implementation and correct any drift — do not invent numbers.

- [ ] **Step 2: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Commit**

```bash
git add src/lib/data.ts
git commit -m "feat(lib): add unified catalogue data (cars, yacht, 7 experiences, services)"
```

---

### Task 3: Extend `globals.css` with reference design tokens & utilities

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: theme tokens `--color-ink/coal/carbon/gold-light/gold-deep/ivory/sand/mute/line`, `--font-serif/--font-display`, keyframes `marquee`/`glow`, utilities `text-outline`, `text-outline-gold`, `gold-text`, `hairline`, `grain`, `diamond`, `field`, `btn-sweep`, `img-cine`, `img-hover-zoom`, `[data-reveal]`.
- Preserves: all existing tokens and effect CSS (hero-scale, scroll-seq, loading, nav-glass, aurora, noise, scroll-progress, back-to-top).

- [ ] **Step 1: Add reference design tokens to the existing `@theme inline` block**

In `src/app/globals.css`, inside the existing `@theme inline { ... }` block, add:

```css
  --color-ink: #0a0908;
  --color-coal: #131110;
  --color-carbon: #1a1715;
  --color-gold-light: #e6cf95;
  --color-gold-deep: #8f6f2f;
  --color-ivory: #f3eee3;
  --color-sand: #a79e8e;
  --color-mute: #6f6859;
  --color-line: rgba(243, 238, 228, 0.09);
  --font-serif: var(--font-cormorant), Georgia, serif;
  --font-display: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
```

**Change `--font-sans` to Inter** to match the reference body font (the reference uses
`font-sans` = Inter on the body; new_web currently maps `--font-sans` to Outfit). Replace the
existing `--font-sans: var(--font-outfit)` line with:

```css
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
```

> This is safe: the kept `loading-screen.tsx` overrides `.font-sans` in its own `<style jsx>`
> block, and the hero components (`hero-scale-down`, `image-sequence`, `text-reel`) use no
> global font classes (verified). Old components using `font-sans` expecting Outfit are deleted
> in Task 21.

(Keep existing `--font-body`, `--font-heading`, `--font-elegant`, `--color-gold`.)

- [ ] **Step 2: Append the reference utility CSS at the end of the file**

Append (after the last rule, still top-level):

```css
/* ── Ported from reference design system ─────────────────────── */
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes glow {
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.06); }
}

.text-outline {
  -webkit-text-stroke: 1px rgba(243, 238, 228, 0.16);
  color: transparent;
}
.text-outline-gold {
  -webkit-text-stroke: 1px rgba(200, 162, 78, 0.4);
  color: transparent;
}
.gold-text {
  background: linear-gradient(115deg, #8f6f2f 0%, #c8a24e 35%, #f2e2b2 50%, #c8a24e 65%, #8f6f2f 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hairline { border-color: var(--color-line); }

.grain::before {
  content: "";
  position: fixed;
  inset: -50%;
  z-index: 70;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain-shift 900ms steps(4) infinite;
}
@keyframes grain-shift {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2%, 3%); }
  50% { transform: translate(3%, -2%); }
  75% { transform: translate(-3%, -3%); }
  100% { transform: translate(2%, 2%); }
}

.diamond {
  display: inline-block;
  width: 0.45em;
  height: 0.45em;
  background: currentColor;
  transform: rotate(45deg);
  flex: none;
}

.field {
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(243, 238, 228, 0.18);
  padding: 0.85rem 0;
  font-size: 0.95rem;
  color: var(--color-ivory);
  outline: none;
  border-radius: 0;
  transition: border-color 0.35s var(--ease-out, ease);
}
.field::placeholder { color: var(--color-mute); }
.field:focus { border-bottom-color: var(--color-gold); }
select.field { appearance: none; }
input[type="date"].field { color-scheme: dark; }

.btn-sweep {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.btn-sweep::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: var(--color-gold);
  transform: translateY(101%);
  transition: transform 0.5s var(--ease-drama, cubic-bezier(0.65, 0, 0.15, 1));
}
.btn-sweep:hover::after { transform: translateY(0); }

.img-cine { filter: saturate(0.82) contrast(1.06) brightness(0.94); }
.img-hover-zoom { transition: transform 1.4s cubic-bezier(0.65, 0, 0.15, 1), filter 1.4s cubic-bezier(0.65, 0, 0.15, 1); }
.group:hover .img-hover-zoom { transform: scale(1.055); filter: saturate(0.95) contrast(1.06) brightness(0.98); }

[data-reveal] { opacity: 0; transform: translateY(36px); }
```

- [ ] **Step 3: Build to verify**

Run: `npx next build`
Expected: builds clean (existing pages + new tokens resolve).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style(theme): add reference design tokens and utilities to globals.css"
```

---

### Task 4: Port shared components — Reveal, Marquee, SmoothScroll, JsonLd

**Files:**
- Create: `src/components/Reveal.tsx`, `src/components/Marquee.tsx`, `src/components/SmoothScroll.tsx`, `src/components/JsonLd.tsx`

**Interfaces:**
- Produces: `Reveal` (default export; props `children`, `className?`, `delay?`, `y?`, `duration?`, `start?`), `Marquee` (default), `SmoothScroll` (default; declares `window.__lenis`), `JsonLd` (named export).
- Consumes: `src/lib/data.ts`? No — Marquee is self-contained (hardcoded ITEMS). Reveal uses gsap. SmoothScroll uses lenis.

- [ ] **Step 1: Copy `Reveal.tsx`, `Marquee.tsx`, `SmoothScroll.tsx` verbatim**

Copy each file exactly from:
- `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\Reveal.tsx`
- `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\Marquee.tsx`
- `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\SmoothScroll.tsx`

to `src/components/` in `new_web`. No changes needed (they use `@/lib`? No — they use gsap/lenis only). Verify imports resolve (`gsap`, `lenis`, `@/components` none).

- [ ] **Step 2: Create `src/components/JsonLd.tsx`**

`new_web`'s `src/lib/seo.ts` does NOT export `JsonLd` (the existing one lives in `velox/ui/json-ld.tsx`, which Task 21 deletes). Create a flat copy so all ported pages import it from `@/components/JsonLd`:

```tsx
/**
 * JSON-LD utility component — renders a schema.org script tag.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 3: Build to verify**

Run: `npx next build`
Expected: builds clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/Reveal.tsx src/components/Marquee.tsx src/components/SmoothScroll.tsx src/components/JsonLd.tsx
git commit -m "feat(components): port Reveal, Marquee, SmoothScroll + add flat JsonLd"
```

---

### Task 5: Port `ReserveModal.tsx` (context + two-step modal)

**Files:**
- Create: `src/components/ReserveModal.tsx`

**Interfaces:**
- Produces: `ReserveProvider` (default? named), `useReserve()` hook → `{ openReserve(experience?: string) }`.
- Consumes: `ALL_EXPERIENCE_OPTIONS` from `@/lib/data`; POSTs to `/api/reserve`.

- [ ] **Step 1: Copy `ReserveModal.tsx` verbatim**

Copy from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\ReserveModal.tsx` to `src/components/ReserveModal.tsx`.

It uses `ALL_EXPERIENCE_OPTIONS` (provided by Task 2) and posts to `/api/reserve` with the experience-centric payload (`experienceType`, `experienceName`, `name`, `email`, `phone`, `date`, `guests`, `notes`, `company`).

- [ ] **Step 2: Adapt the POST to new_web's `/api/reserve` contract**

new_web's existing `/api/reserve` expects a **car-centric** schema. Do NOT modify the route (Global Constraint). Instead, add a thin adapter **inside the modal** before fetch. Change the fetch body in `ReserveModal.tsx` `submit()`:

```ts
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_name: selected?.label ?? experience,
          car_variant: selected?.type ?? "tour",
          customer_name: name,
          email,
          phone,
          pickup_date: date,
          return_date: date,
          consent_accepted: true,
          message: `${experience}\n\nGuests: ${guests}\n${notes}`,
        }),
      });
```

And update the response handling — new_web's `/api/reserve` returns `{ success, reservationId }` (not `{ ok, reference }`). Change:

```ts
      const data = (await res.json()) as {
        success?: boolean;
        reservationId?: string;
        error?: string;
      };
      if (!res.ok || !data.success) {
        setApiError(data.error ?? "Something interrupted the reservation. Try again.");
        setStatus("error");
        return;
      }
      setReference(data.reservationId ?? null);
      setStatus("success");
```

Remove the honeypot/`company` field from the payload (new_web route has no honeypot) — keep the hidden input but do not send it.

- [ ] **Step 3: Verify build + typecheck**

Run: `npx tsc --noEmit && npx next build`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add src/components/ReserveModal.tsx
git commit -m "feat(reserve): port two-step ReserveModal adapted to new_web /api/reserve"
```

---

### Task 6: Port `Navbar.tsx` and `Footer.tsx`

**Files:**
- Create: `src/components/Navbar.tsx`, `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS`, `CONTACT` from `@/lib/config`; `CARS` from `@/lib/data`; `useReserve` from `./ReserveModal`.
- Produces: `Navbar` (default), `Footer` (default).

- [ ] **Step 1: Copy `Navbar.tsx` verbatim**

Copy from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\Navbar.tsx` to `src/components/Navbar.tsx`. It imports `CONTACT, NAV_LINKS` from `@/lib/config` (Task 1) and `useReserve` from `./ReserveModal` (Task 5). No adaptation needed.

- [ ] **Step 2: Copy `Footer.tsx` and remove the `/yacht` link**

Copy from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\Footer.tsx` to `src/components/Footer.tsx`. In the "The fleet" column, **delete the `<li>` that links to `/yacht`** (the Cranchi Atlantique 50 line) because there is no yacht page. The fleet column then shows only the 4 cars.

- [ ] **Step 3: Verify build**

Run: `npx next build`
Expected: builds clean (config + data + modal present).

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "feat(layout): port Navbar and Footer (nav without yacht page)"
```

---

### Task 7: Port `WhatsAppButton.tsx` (simplified hand-off)

**Files:**
- Create: `src/components/WhatsAppButton.tsx`

**Interfaces:**
- Consumes: `whatsappUrl` from `@/lib/config`.
- Produces: `WhatsAppButton` (default) — floating concierge chat that hands off to WhatsApp.

- [ ] **Step 1: Copy `WhatsAppButton.tsx` and remove `/api/chat` dependency**

Copy from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\WhatsAppButton.tsx` to `src/components/WhatsAppButton.tsx`.

The reference version POSTs to `/api/chat` (does not exist in new_web). **Remove the fetch to `/api/chat`** and the session persistence. Keep the intake UI (quick prompts, name, message) but on send simply `window.open(whatsappUrl(...))`. Replace the `send()` function:

```ts
  const send = () => {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setBubbles((b) => [...b, { dir: "guest", body }]);
    setDraft("");
    setBubbles((b) => [
      ...b,
      { dir: "concierge", body: "Certo. Continuing on WhatsApp — a concierge replies within minutes." },
    ]);
    setSending(false);
    window.open(whatsappUrl(`${name ? `Hi, I'm ${name}. ` : "Hi! "}${body}`), "_blank", "noopener");
  };
```

Remove the now-unused `sessionId`/`SESSION_KEY`/`localStorage` state and the `async` keyword. Keep `type Bubble`, `QUICK`, and the full JSX.

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: builds clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhatsAppButton.tsx
git commit -m "feat(contact): port WhatsApp concierge button (direct hand-off, no /api/chat)"
```

---

### Task 8: Port `CTASection.tsx`

**Files:**
- Create: `src/components/CTASection.tsx`

**Interfaces:**
- Consumes: `whatsappUrl` from `@/lib/config`, `useReserve` from `./ReserveModal`, `Reveal` from `./Reveal`.
- Produces: `CTASection` (default).

- [ ] **Step 1: Copy `CTASection.tsx` verbatim**

Copy from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\components\CTASection.tsx` to `src/components/CTASection.tsx`. No changes (uses `whatsappUrl`, `useReserve`, `Reveal`). It uses `animate-glow` and `btn-sweep` (Task 3).

- [ ] **Step 2: Verify build**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "feat(components): port CTA section"
```

---

### Task 9: Port fleet components — `FleetShowcase.tsx`, `FleetGrid.tsx`

**Files:**
- Create: `src/components/FleetShowcase.tsx`, `src/components/FleetGrid.tsx`

**Interfaces:**
- Consumes: `CARS` from `@/lib/data`, `useReserve`, `Reveal`.
- Produces: `FleetShowcase` (default, home section), `FleetGrid` (default, /fleet page).

- [ ] **Step 1: Copy `FleetShowcase.tsx` and `FleetGrid.tsx` verbatim**

Copy both from the reference `src/components/` to `new_web/src/components/`. They use `car.specs[1].value.split(" @")[0]` (FleetShowcase) and `car.specs`, `car.seats`, `car.exterior`, `car.detail`, `car.heroNote`, `car.years` (FleetGrid) — all present in Task 2's `Car` type.

- [ ] **Step 2: Verify build**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/components/FleetShowcase.tsx src/components/FleetGrid.tsx
git commit -m "feat(fleet): port FleetShowcase and FleetGrid"
```

---

### Task 10: Port yacht section — `YachtSection.tsx`, `YachtPackages.tsx`

**Files:**
- Create: `src/components/YachtSection.tsx`, `src/components/YachtPackages.tsx`

**Interfaces:**
- Consumes: `YACHT`, `YACHT_PACKAGES` from `@/lib/data`, `useReserve`, `Reveal`.
- Produces: `YachtSection` (default, home section — shows the flybridge + 4 packages), `YachtPackages` (default) + `YachtIncluded` (named).

- [ ] **Step 1: Copy `YachtSection.tsx` and `YachtPackages.tsx` verbatim**

Copy from reference `src/components/`. In `YachtSection.tsx`, the "Full specification" link goes to `/yacht`. Since there is no yacht page, **change that Link's `href` to `/experiences`** and label to `View all experiences`:

```tsx
              <Link
                href="/experiences"
                className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
              >
                View all experiences
                <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-2" />
              </Link>
```

- [ ] **Step 2: Verify build**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/components/YachtSection.tsx src/components/YachtPackages.tsx
git commit -m "feat(yacht): port YachtSection and YachtPackages (no yacht page — links to experiences)"
```

---

### Task 11: Port experiences — `ExperiencesSection.tsx`, `ExperienceList.tsx` with land/sea filter

**Files:**
- Create: `src/components/ExperiencesSection.tsx`, `src/components/ExperienceList.tsx`

**Interfaces:**
- Consumes: `EXPERIENCES` from `@/lib/data`, `useReserve`, `Reveal`.
- Produces: `ExperiencesSection` (default, home section), `ExperienceList` (default, /experiences hub).

- [ ] **Step 1: Copy `ExperiencesSection.tsx` verbatim**

Copy from reference `src/components/`. No changes (maps `EXPERIENCES`, uses `exp.index`, `exp.category`, `exp.image`, `exp.name`, `exp.duration`, `exp.price`).

- [ ] **Step 2: Port `ExperienceList.tsx` with a land/sea filter**

Copy from reference `src/components/ExperienceList.tsx`, then add a client-side filter (all / land / sea) at the top. The whole component becomes:

```tsx
"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { EXPERIENCES, type Experience } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "land", label: "By Land" },
  { key: "sea", label: "By Sea" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function ExperienceList() {
  const { openReserve } = useReserve();
  const [filter, setFilter] = useState<FilterKey>("all");
  const list: Experience[] =
    filter === "all" ? EXPERIENCES : EXPERIENCES.filter((e) => e.type === filter);

  return (
    <div className="border-t border-line">
      {/* filter bar */}
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-5 pt-8 md:px-10">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`border px-5 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
              filter === f.key
                ? "border-gold text-gold"
                : "border-ivory/15 text-sand hover:border-gold/50 hover:text-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[11px] uppercase tracking-[0.2em] text-mute">
          {list.length} experiences
        </span>
      </div>

      {list.map((exp, i) => (
        <section key={exp.slug} id={exp.slug} className="scroll-mt-24 border-b border-line">
          <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
            <Reveal className="hidden md:col-span-2 md:block">
              <span className="text-outline font-display text-[6.5rem] font-semibold leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Reveal>
            <Reveal y={56} className={i % 2 === 1 ? "md:col-span-5 md:order-3" : "md:col-span-5"}>
              <div className="group aspect-[4/3] overflow-hidden">
                <img src={exp.image} alt={exp.name} loading="lazy" className="img-cine img-hover-zoom h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                {exp.index} · {exp.category}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ivory md:text-5xl">
                {exp.name}
              </h2>
              <p className="mt-5 text-[15px] leading-8 text-sand">{exp.description}</p>
              <ul className="mt-7 space-y-3">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm tracking-wide text-ivory/85">
                    <ArrowRight size={13} className="flex-none text-gold" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <button
                  onClick={() => openReserve(exp.name)}
                  className="btn-sweep group flex items-center gap-3 border border-gold/50 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
                >
                  Reserve
                  <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
                </button>
                <div className="text-xs tracking-[0.16em] text-mute">
                  <span className="text-gold-light">{exp.price}</span>
                  <span className="mx-3 text-ivory/20">·</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={12} className="text-gold" /> {exp.duration}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npx next build`

- [ ] **Step 4: Commit**

```bash
git add src/components/ExperiencesSection.tsx src/components/ExperienceList.tsx
git commit -m "feat(experiences): port sections with unified land/sea filter hub"
```

---

### Task 12: Port services — `ServicesPreview.tsx`, `ServiceBands.tsx`

**Files:**
- Create: `src/components/ServicesPreview.tsx`, `src/components/ServiceBands.tsx`

**Interfaces:**
- Consumes: `SERVICES` from `@/lib/data`, `useReserve`, `Reveal`.
- Produces: `ServicesPreview` (default, home), `ServiceBands` (default, /services).

- [ ] **Step 1: Copy `ServicesPreview.tsx` and `ServiceBands.tsx` verbatim**

Copy from reference `src/components/`. Uses `SERVICES`, `useReserve`, `Reveal`. No changes.

- [ ] **Step 2: Verify build**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/components/ServicesPreview.tsx src/components/ServiceBands.tsx
git commit -m "feat(services): port ServicesPreview and ServiceBands"
```

---

### Task 13: Port `ContactForm.tsx` (adapted to new_web /api/reserve)

**Files:**
- Create: `src/components/ContactForm.tsx`

**Interfaces:**
- Consumes: nothing from lib; POSTs to `/api/reserve`.
- Produces: `ContactForm` (default).

- [ ] **Step 1: Copy `ContactForm.tsx` and adapt the POST**

Copy from reference `src/components/ContactForm.tsx`. In `submit()`, replace the fetch body with the car-centric adapter (same approach as Task 5):

```ts
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_name: "Concierge enquiry",
          car_variant: "contact",
          customer_name: name,
          email,
          phone: phone.trim() || "+39 000 000 0000",
          pickup_date: tomorrow,
          return_date: tomorrow,
          consent_accepted: true,
          message,
        }),
      });
      const data = (await res.json()) as { success?: boolean; reservationId?: string; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? "Something interrupted the message. Try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
```

Remove the reference's honeypot `experienceType`/`experienceName`/`guests`/`notes` fields (not needed).

- [ ] **Step 2: Verify build**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "feat(contact): port ContactForm adapted to new_web /api/reserve"
```

---

### Task 14: Rewrite root `layout.tsx` (app shell)

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `Navbar`, `Footer`, `SmoothScroll`, `WhatsAppButton`, `ReserveProvider` (from `@/components`), `JsonLd` + `localBusinessSchema` from `@/lib/seo`.
- Produces: app shell with the reference chrome.

- [ ] **Step 1: Keep the font metadata, replace the body chrome**

Keep the existing `next/font/google` setup (Inter, Outfit, Cormorant_Garamond) and metadata. Replace the `<body>` inner chrome. Current body renders `{children}` via the velox `SiteChrome`-like wrapper. Replace with:

```tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ReserveProvider } from "@/components/ReserveModal";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/seo";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${inter.variable}`}>
      <body className="grain bg-ink font-sans text-ivory antialiased">
        <JsonLd data={localBusinessSchema()} />
        <ReserveProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ReserveProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
```

> Check `src/app/layout.tsx` current structure first. The hero + intro (LoadingScreen) are wired inside `home-client.tsx`, not the root layout — so this task does NOT touch them. Keep `import "./globals.css"` and any viewport/themeColor settings. `localBusinessSchema()` already exists in `new_web`'s `src/lib/seo.ts` (verify export name; it returns a schema object).

- [ ] **Step 2: Build to verify**

Run: `npx next build`
Expected: passes — but old pages still use old components; the shell renders for all.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(layout): swap app shell to reference chrome (Navbar/Footer/SmoothScroll/Reserve)"
```

---

### Task 15: Rewrite home page — keep hero + intro, add reference sections

**Files:**
- Modify: `src/app/_components/home-client.tsx`

**Interfaces:**
- Consumes: existing `HeroScaleDown`, `LoadingScreen` (KEPT), plus `Marquee`, `FleetShowcase`, `YachtSection`, `ExperiencesSection`, `ServicesPreview`, `CTASection` from `@/components`.
- Produces: home section order matching the reference.

- [ ] **Step 1: Inspect current home-client.tsx**

Read `src/app/_components/home-client.tsx` fully. Identify where `LoadingScreen` and `HeroScaleDown` are rendered and how the intro/hide logic works. **Do not alter** those two blocks or their state logic (`loaded`, `onComplete`).

- [ ] **Step 2: Replace the sections below the hero — full import cleanup**

Keep `LoadingScreen` (intro) + `HeroScaleDown` (hero) and their state logic exactly as-is. Replace every section after the hero with the reference sections. New section order — **and remove the outer `<main>` wrapper** (the root layout now provides `<main>`, matching the reference):

```tsx
      <>
        <LoadingScreen onComplete={() => setLoaded(true)} />
        {loaded && (
          <>
            <HeroScaleDown />
            <Marquee />
            <FleetShowcase />
            <YachtSection />
            <ExperiencesSection />
            <ServicesPreview />
            <CTASection />
          </>
        )}
      </>
```

> The current home-client wraps everything in `<main className="bg-[#0a0a0a] min-h-screen">`.
> Remove that wrapper — the reference renders pages as fragments and the layout's `<main>`
> wraps children. The `bg-ink` background comes from the layout body class (Task 14).

**Remove ALL of these imports** (their components are now provided by the root layout or deleted in Task 21):

```tsx
// REMOVE (from velox)
import { useLenis } from '@/components/velox/use-lenis';            // layout provides SmoothScroll
import { FilmGrain, SvgFilters } from '@/components/velox/ui/film-grain';
import { Navigation } from '@/components/velox/sections/navigation'; // layout provides Navbar
import { Footer } from '@/components/velox/sections/footer';          // layout provides Footer
import { WhatsAppButton } from '@/components/velox/chat/whatsapp-button'; // layout provides it
import { ScrollProgress } from '@/components/velox/ui/scroll-progress';
import { BackToTop } from '@/components/velox/ui/back-to-top';
import { BackgroundAurora } from '@/components/velox/ui/background-aurora';
import { MarqueeText } from '@/components/velox/ui/marquee-text';
import { YachtExperienceSection } from '@/components/velox/sections/yacht-experience-section';
import { ServiceLinesSection } from '@/components/velox/sections/service-lines-section';
import { CoverageSection } from '@/components/velox/sections/coverage-section';
import { ReserveSection } from '@/components/velox/sections/reserve-section';
import { FleetShowcase } from '@/components/velox/sections/fleet-showcase'; // old velox one
```

**Add these imports** (from the new flat components):

```tsx
import { HeroScaleDown } from '@/components/velox/sections/hero-scale-down'; // KEPT (velox)
import { LoadingScreen } from '@/components/velox/ui/loading-screen';       // KEPT (velox)
import Marquee from '@/components/Marquee';
import FleetShowcase from '@/components/FleetShowcase';
import YachtSection from '@/components/YachtSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ServicesPreview from '@/components/ServicesPreview';
import CTASection from '@/components/CTASection';
```

> Keep `useState`/`useEffect`/`AnimatePresence`/`gsap`/`ScrollTrigger` imports only if still used
> by the kept intro logic (the `loaded` gating uses `useState`/`useEffect`; `AnimatePresence`
> wraps the LoadingScreen). If after cleanup a React/GSAP import is unused, remove it — lint fails
> on unused vars.

- [ ] **Step 3: Build to verify**

Run: `npx next build`
Expected: home renders hero + intro + reference sections; no missing imports.

- [ ] **Step 4: Manual smoke check**

Run: `npx next dev` (or use the running dev server) and open `http://localhost:3001/`. Confirm hero + intro animate, sections render, nav/footer/modal work.

- [ ] **Step 5: Commit**

```bash
git add src/app/_components/home-client.tsx
git commit -m "feat(home): keep hero+intro, swap sections to reference layout"
```

---

### Task 16: Rewrite `/fleet` page

**Files:**
- Modify: `src/app/fleet/page.tsx`

**Interfaces:**
- Consumes: `FleetGrid`, `CTASection`, `Reveal` from `@/components`; `CARS` from `@/lib/data`; `buildPageMeta`/`breadcrumbSchema`/`JsonLd`/`productSchema` from `@/lib/seo`.

- [ ] **Step 1: Replace the page body with the reference fleet page**

Copy the structure from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\app\fleet\page.tsx`, adapting imports to `@/components/*` and `@/lib/data`. Keep `new_web`'s metadata (title/description) for `/fleet`, then render:

```tsx
import FleetGrid from "@/components/FleetGrid";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { buildPageMeta } from "@/lib/seo";

export const metadata = buildPageMeta({
  title: "The Fleet — Ferrari, Maserati & Mercedes",
  description: "Ferrari California T, Ferrari California, Maserati Ghibli and Mercedes E 220d Cabrio — supercar hire in Salento.",
  path: "/fleet",
});

export default function FleetPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> The fleet
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Machines with <em className="gold-text pr-2">an accent.</em>
          </h1>
        </Reveal>
      </div>
      <FleetGrid />
      <CTASection />
    </>
  );
}
```

(Verify `buildPageMeta` in new_web's `src/lib/seo.ts` accepts `path` — it does per the earlier grep.)

- [ ] **Step 2: Build to verify**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/fleet/page.tsx
git commit -m "feat(fleet): rewrite /fleet with FleetGrid + CTA"
```

---

### Task 17: Rewrite `/experiences` page (unified hub)

**Files:**
- Modify: `src/app/experiences/page.tsx`

**Interfaces:**
- Consumes: `ExperienceList`, `CTASection`, `Reveal` from `@/components`; `EXPERIENCES` from `@/lib/data`; `buildPageMeta`/`JsonLd`.

- [ ] **Step 1: Replace the page body**

Delete the old grid (which used `experiences` from `@/data/experiences`). New body:

```tsx
import ExperienceList from "@/components/ExperienceList";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { buildPageMeta } from "@/lib/seo";

export const metadata = buildPageMeta({
  title: "Experiences — Editorial Days in Salento",
  description: "Curated experiences by B LEADER: supercar tours, flybridge yacht charters and sunset rituals across land and sea.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> Curated days
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Experiences, <em className="text-gold-light">written like editorials.</em>
          </h1>
        </Reveal>
      </div>
      <ExperienceList />
      <CTASection />
    </>
  );
}
```

Also **delete** `src/app/experiences/[slug]/page.tsx`, `src/app/experiences/[slug]/layout.tsx`,
`src/app/experiences/layout.tsx`, and the untracked WIP dirs `src/app/experiences/combo`,
`src/app/experiences/ferrari`, `src/app/experiences/jet` (no detail pages — reference is a
single hub). Verify no other file imports `@/data/experiences` before removing.

- [ ] **Step 2: Verify build + grep for stale references**

Run: `grep -rn "@/data/experiences" src/ || echo none`
Run: `npx next build`
Expected: no references to `src/data/experiences.ts` remain, build clean.

- [ ] **Step 3: Commit**

The `[slug]` dir and `experiences/layout.tsx` are tracked; `combo|ferrari|jet` are untracked
WIP. Delete both kinds with `rm -rf`, then stage tracked deletions with `git add -u` (NOT
`git add -A`, which would also sweep in the dev-WIP files):

```bash
rm -rf src/app/experiences/combo src/app/experiences/ferrari src/app/experiences/jet
git rm -r src/app/experiences/[slug] 2>/dev/null || true
git rm src/app/experiences/layout.tsx 2>/dev/null || true
git rm -r src/data/experiences.ts 2>/dev/null || true
git add -u
git commit -m "feat(experiences): rewrite /experiences as unified land/sea hub; drop detail pages"
```

---

### Task 18: Rewrite `/services` page

**Files:**
- Modify: `src/app/services/page.tsx`

**Interfaces:**
- Consumes: `ServiceBands`, `CTASection`, `Reveal` from `@/components`; `SERVICES` from `@/lib/data`; `buildPageMeta`/`JsonLd`.

- [ ] **Step 1: Replace the page body**

Delete the old `ServiceLinesSection`/`CoverageSection` usage. New body:

```tsx
import ServiceBands from "@/components/ServiceBands";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { buildPageMeta } from "@/lib/seo";

export const metadata = buildPageMeta({
  title: "Chauffeured Services — Weddings, Corporate & Events",
  description: "Uniformed chauffeurs and flawless logistics for weddings, corporate delegations and social events across Salento.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-32 md:px-10 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> Chauffeured services
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Weddings, boardrooms, <em className="text-gold-light">everything sequinned.</em>
          </h1>
        </Reveal>
      </div>
      <ServiceBands />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Build to verify**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat(services): rewrite /services with ServiceBands + CTA"
```

---

### Task 19: Rewrite `/about` page (keep the story, adapt style)

**Files:**
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `Reveal`, `CTASection`, `JsonLd` from `@/components`; `buildPageMeta`, `breadcrumbSchema` from `@/lib/seo`.
- Preserves: the EST. 2023 story content and values.

- [ ] **Step 1: Adapt the existing about page to the reference design language**

Keep the existing copy (EST. 2023, "The B LEADER Story", the 4 values: Excellence, Passion, Local Mastery, Discretion). Restyle to the reference tokens (`bg-ink`, `font-serif`, `text-gold`, `border-line`, `Reveal`, `CTASection`). Replace the old tailwind inline `#0a0a0a`/`#c9a96e` classes with the token equivalents. Render values through `Reveal` and end with `CTASection` instead of the old inline reserve button.

- [ ] **Step 2: Build to verify**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat(about): restyle B LEADER story to reference design language"
```

---

### Task 20: Rewrite `/contact` page

**Files:**
- Create: `src/app/contact/page.tsx` (new route)

**Interfaces:**
- Consumes: `ContactForm`, `Reveal` from `@/components`; `CONTACT`, `whatsappUrl` from `@/lib/config`; `buildPageMeta`/`JsonLd`/`breadcrumbSchema` from `@/lib/seo`.

- [ ] **Step 1: Create the contact page**

Copy the structure from `C:\Users\gabri\Desktop\b-leader-luxury-platform (2)\src\app\contact\page.tsx`, adapting imports:

```tsx
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMeta, breadcrumbSchema } from "@/lib/seo";
import { CONTACT, whatsappUrl } from "@/lib/config";

export const metadata = buildPageMeta({
  title: "Contact — Talk to the Concierge",
  description: "Speak with the B LEADER concierge in English or Italian. Phone, WhatsApp and email — replies within two hours.",
  path: "/contact",
});
```

Render the reference contact page body (contact cards for phone/email/address/hours + `ContactForm` + WhatsApp link). Use `CONTACT`/`whatsappUrl`.

- [ ] **Step 2: Build to verify**

Run: `npx next build`

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat(contact): add /contact page with ContactForm + concierge channels"
```

---

### Task 21: Remove old pages and dead components

**Files:**
- Delete: `src/app/locations/`, `src/app/locations/salento/page.tsx`, `src/app/luxury-cars/`, `src/app/premium-experiences/`, `src/app/yachts/`, `src/app/blog/`, `src/app/yacht/`, `src/data/experiences.ts`, and unused `src/components/velox/*` files
- Keep: `src/components/velox/sections/hero-scale-down.tsx`, `src/components/velox/hero/*`, `src/components/velox/ui/loading-screen.tsx`, and any component still imported by the kept hero/intro/home.

> **Carry-over from Task 17:** `src/data/experiences.ts` was NOT deleted in Task 17 because 6 tracked velox components still import it — `experience-card`, `experience-cta`, `experience-hero`, `experience-includes`, `experience-related`, `experience-timeline` (the dead detail-page sections, only consumers were the deleted `[slug]` routes). In this task, delete those 6 velox `experience-*.tsx` components FIRST, then `src/data/experiences.ts`. Re-run `grep -rn "@/data/experiences" src/` before deleting the module to confirm zero remaining importers.

**Interfaces:**
- Result: only reference components + kept hero/intro remain.

- [ ] **Step 1: Find what still references kept hero/intro**

Run: `grep -rln "hero-scale-down\|image-sequence\|loading-screen\|text-reel" src/app src/components`
Expected: only `home-client.tsx` (or files it imports). List those files; they are the "keep set".

- [ ] **Step 2: Delete pages for removed routes**

Some of these are git-tracked (committed), others are untracked dev WIP (blog, luxury-cars,
premium-experiences, yachts, experiences/combo|ferrari|jet). `git rm` fails on untracked
files — use plain `rm -rf` for everything, then `git add -A` stages the tracked deletions:

```bash
rm -rf src/app/locations src/app/luxury-cars src/app/premium-experiences src/app/yachts src/app/blog src/app/yacht src/app/experiences/combo src/app/experiences/ferrari src/app/experiences/jet
git add -A src/app/locations src/app/luxury-cars src/app/premium-experiences src/app/yachts src/app/blog src/app/yacht 2>/dev/null
```

(Keep `src/app/fleet`, `experiences`, `services`, `about`, `contact`, `page.tsx`, `layout.tsx`, `api/`.)

- [ ] **Step 3: Delete unused velox components**

From `src/components/velox/`, delete every file NOT in the keep set from Step 1 and not needed by it. Recommended deletions (verify imports first):
- `src/components/velox/sections/` → remove all except `hero-scale-down.tsx` (and anything it imports, e.g. `../hero/image-sequence`).
- `src/components/velox/hero/` → keep `image-sequence.tsx`, `hero-images.ts`, `text-reel.tsx` (hero uses them); remove `cinematic-transition.tsx` if unused.
- `src/components/velox/ui/` → keep `loading-screen.tsx`; remove `navigation`, `marquee-text`, `scroll-progress`, `back-to-top`, `background-aurora`, `film-grain` only if home-client no longer imports them.
- `src/components/velox/data.ts` → delete if `navLinks`/`cars` no longer referenced (grep first). Move any still-needed pieces into `src/lib/data.ts`.

Check each: `grep -rn "velox/<name>" src/app src/components` before deleting.

- [ ] **Step 4: Build to verify nothing breaks**

Run: `npx next build`
Expected: builds clean. Fix any dangling imports by removing them or re-pointing to `@/lib/data`.

- [ ] **Step 5: Verify no untracked dev WIP leaks into commits**

Run: `git status`
Expected: only intended deletions; the untracked WIP files from the earlier cleanup remain untracked (do NOT commit them).

- [ ] **Step 6: Commit**

Stage ONLY the tracked deletions and kept-file changes — never `git add -A` (that would sweep
in the untracked dev-WIP files, violating the Global Constraint). Use `git add -u` (stages
modifications+deletions of tracked files only) plus explicit `git add` for any new kept files:

```bash
git add -u
git add src/components/Reveal.tsx src/components/JsonLd.tsx 2>/dev/null || true
git commit -m "refactor: remove old velox components and removed routes"
```

After commit, run `git status` and confirm the untracked dev-WIP files (blog/, yachts/,
luxury-cars/, new_items/, videos/, etc.) remain **untracked** — they must NOT be in the commit.

---

### Task 22: Full verification pass

**Files:** (none — verification)

- [ ] **Step 1: Clean build**

Run: `npx next build`
Expected: success. Confirm the route list includes: `/`, `/fleet`, `/experiences`, `/services`, `/about`, `/contact`, `/api/reserve`, `/api/whatsapp/*`.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors (fix any unused-import warnings from removed sections).

- [ ] **Step 3: Manual smoke test (dev server)**

Run `npx next dev -p 3001` (new_web dev port) and check every page renders; hero + intro animate on home; Reserve modal opens from nav, fleet, yacht, experiences, services; WhatsApp button hands off; contact form submits.

- [ ] **Step 4: Confirm hero/intro/effects untouched**

Run: `git diff HEAD~N --stat` or `git log --oneline -5` — confirm no commits touched `hero-scale-down.tsx`, `image-sequence.tsx`, `loading-screen.tsx`, `public/images/yacht_360/`.

- [ ] **Step 5: Final status**

Run: `git status --short`
Expected: clean except untracked dev WIP (left for the WIP branch decision).

---

## Self-Review Notes

- **Spec coverage:** config/data (Tasks 1–2), globals tokens (3), shared components (4–8), fleet (9), yacht section (10), experiences hub (11), services (12), contact form (13), layout shell (14), home with hero+intro kept (15), fleet/experiences/services/about/contact pages (16–20), cleanup (21), verify (22). Admin/DB out of scope. `/about` kept (Task 19). No yacht page (removed Task 21).
- **Hero/intro constraint:** only home-client.tsx (Task 15) is modified and it keeps `LoadingScreen` + `HeroScaleDown`; all hero component files are in the keep set (Task 21). No other task touches them.
- **API constraint:** `/api/reserve` and `/api/whatsapp/*` routes are never modified; adapters live in the client components (Tasks 5, 7, 13).
- **Type consistency:** `Car`, `Experience`, `Service`, `YachtPackage` types defined in Task 2 are used by Tasks 9–12. `NAV_LINKS`/`CONTACT` from Task 1 used by Tasks 6, 20. `whatsappUrl` from Task 1 used by Tasks 7, 8, 20. `ALL_EXPERIENCE_OPTIONS` from Task 2 used by Task 5.
