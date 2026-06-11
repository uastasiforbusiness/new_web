# B LEADER — Developer Guide

## Project Overview

**B LEADER** is a premium car & yacht rental landing page built with Next.js 16, featuring high-end animations, scroll-driven interactions, and a reservation system. Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + GSAP ScrollTrigger + Lenis smooth scroll + Framer Motion + Prisma (SQLite).

---

## Quick Start

```bash
# Install dependencies
bun install

# Setup database
bun run db:push

# Development server (port 3001)
bun run dev

# Production build
bun run build
bun run start  # runs on port 3000
```

Environment: copy `.env.example` to `.env` and adjust `DATABASE_URL` if needed. Default: `file:../db/custom.db` (SQLite file at `db/custom.db`).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/reserve/        # Reservation API endpoint
│   ├── globals.css         # Global styles + Tailwind v4
│   ├── layout.tsx          # Root layout, fonts, metadata
│   └── page.tsx            # Main landing page (client component)
├── components/
│   ├── ui/                 # shadcn/ui components (40+ primitives)
│   └── velox/              # Project-specific components
├── hooks/                  # Custom React hooks
├── lib/
│   ├── db.ts               # Prisma client singleton
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
├── prisma/
│   └── schema.prisma       # Database schema (Reservation model)
```

---

## Key Architecture Decisions

### 1. Single-Page Landing with Sections
All content lives in `src/app/page.tsx` which composes 15+ section components from `components/velox/`. Each section is a self-contained client component with its own GSAP animations.

### 2. Animation Stack
- **GSAP ScrollTrigger**: Scroll-driven animations, pinning, scrubbing
- **Lenis**: Smooth scrolling (auto-initialized via `useLenis` hook)
- **Framer Motion**: Mount/unmount transitions (LoadingScreen, AnimatePresence)
- **Sprite sheets**: Used for yacht 360° view (5 frames in single WebP)

### 3. Font System (3 fonts via next/font)
- **Outfit** (`--font-outfit`): Primary UI, headings, buttons — `font-heading`
- **Inter** (`--font-inter`): Body text, forms — `font-body`
- **Cormorant Garamond** (`--font-cormorant`): Elegant accents — `font-elegant`

CSS variables defined in `globals.css`; Tailwind config uses `@theme` syntax (v4).

### 4. Responsive Images
- Critical images preloaded in `page.tsx` useEffect
- Sprite sheets for animation sequences (yacht: 5 frames × 835×306px)
- WebP format throughout; `images.unoptimized: true` in `next.config.ts` (standalone output)

### 5. Database: Prisma + SQLite
Single `Reservation` model with fields: id, carName, carVariant, customerName, email, phone, pickupDate, returnDate, message, status, userId, timestamps. API at `/api/reserve` with rate limiting (5 req/min/IP), validation, sanitization.

---

## Component Map (velox/)

| Component | Purpose |
|-----------|---------|
| `hero-scale-down.tsx` | Hero with scale-down scroll animation |
| `fleet-section.tsx` | Car grid overview |
| `fleet-detail-section.tsx` | Detailed car specs + 360° viewer |
| `yacht-experience-section.tsx` | Yacht showcase with sprite animation |
| `service-lines-section.tsx` | 5 service cards (Yacht, Wedding, Corporate, Party, Transfer) |
| `coverage-section.tsx` | Geographic coverage map/list |
| `features-section.tsx` | Feature highlights (currently "Coming Soon") |
| `reserve-section.tsx` | Wrapper for ReservationForm |
| `reservation-form.tsx` | Form with car selector, dates, validation, API submit |
| `navigation.tsx` | Fixed nav with scroll spy + mobile drawer |
| `whatsapp-button.tsx` | Floating WhatsApp CTA |
| `custom-cursor.tsx` | Custom cursor (desktop only) |
| `film-grain.tsx` | Subtle film grain overlay via SVG filter |
| `loading-screen.tsx` | Initial load animation |
| `scroll-driven-playback.tsx` | Video-like scroll playback |
| `marquee-text.tsx` | Infinite scrolling text |
| `displacement-card.tsx` | WebGL displacement effect cards |
|| `date-picker.tsx` | Accessible date picker (radix calendar) ||
|| `use-lenis.ts` | Lenis initialization hook ||

---

## Development Workflow

### Adding a New Vehicle
1. Add entry to `cars` array in `src/components/velox/data.ts`
2. Place images in `public/images/` (card image + 360° frames)
3. Update `fleetSpecs` if specs differ from `cars` data
4. No code changes needed elsewhere — sections consume `cars` array automatically

### Adding a New Section
1. Create component in `src/components/velox/`
2. Import and add to `page.tsx` in desired order
3. Add anchor ID for navigation (e.g., `<section id="new-section">`)
4. Update `navLinks` in `data.ts` if it needs nav entry

### Modifying Animations
- GSAP animations are typically in `useEffect` with `gsap.context()` for cleanup
- ScrollTrigger instances: call `ScrollTrigger.refresh()` after DOM changes
- Lenis integration: `useLenis()` hook handles RAF loop; avoid manual `requestAnimationFrame`

### Database Changes
```bash
# Edit prisma/schema.prisma, then:
bun run db:push    # Push schema changes (dev)
bun run db:generate # Regenerate Prisma Client
```

### Styling Conventions
- Tailwind v4: use `@theme` in `globals.css` for design tokens
- Color palette: `#0a0a0a` (bg), `#c9a96e`/`#d4af37` (gold accent), `#fff` (text)
- Utility classes: `font-heading`, `font-body`, `font-elegant` for font families
- Custom properties: `--font-outfit`, `--font-inter`, `--font-cormorant`

---

## Common Commands

| Task | Command |
|------|---------|
| Dev server | `bun run dev` |
| Type-check | `bunx tsc --noEmit` |
| Lint | `bun run lint` |
| DB push | `bun run db:push` |
| DB generate | `bun run db:generate` |
| Build | `bun run build` |
| Preview build | `bun run start` |

---

## Deployment Notes

- `output: "standalone"` in `next.config.ts` → produces self-contained `.next/standalone/`
- Docker: copy `.next/standalone/` + `.next/static/` + `public/`
- SQLite file (`db/custom.db`) must persist; mount volume in production
- Environment: `DATABASE_URL="file:../db/custom.db"` (relative to `.next/standalone/server.js`)

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| GSAP ScrollTrigger not triggering | Call `ScrollTrigger.refresh()` after dynamic content mounts |
| iOS Safari address bar jumps | `ScrollTrigger.normalizeScroll(true)` + `ignoreMobileResize: true` (in `page.tsx`) |
| Input zoom on focus (mobile) | Global `font-size: 16px` on inputs in `globals.css` |
| Hydration mismatch | `'use client'` on page; `suppressHydrationWarning` on `<html>` |
| Lenis scroll broken | Ensure `useLenis()` called once in root component (`page.tsx`) |
| Sprite sheet misaligned | Check `YACHT_SPRITE_SLOT_W/H` match actual frame dimensions |
| Prisma client error in dev | Singleton pattern in `lib/db.ts` prevents multiple instances |

---

## Performance Considerations

- **Critical images**: Preloaded in `page.tsx` (hero-bg, logo)
- **Code splitting**: Each velox component is a separate chunk (dynamic imports not yet used)
- **Sprite sheets**: Reduce HTTP requests for animation frames
- **`images.unoptimized: true`**: Required for standalone output; consider Cloudinary/Imgix for production optimization
- **Bundle size**: Heavy deps (GSAP, Framer Motion, Radix, Recharts) — monitor with `bun run build` output

---

## Extending the Reservation System

Current flow: Form → `/api/reserve` → Prisma → SQLite. To extend:
- Add fields to `Reservation` model + `reservation-form.tsx` + API validation
- Email notifications: integrate Resend/SendGrid in API route
- Admin panel: build separate Next.js admin route or use Prisma Studio (`bunx prisma studio`)
- WhatsApp integration: `whatsapp-button.tsx` opens `wa.me` with prefilled message

---

## Accessibility

- Radix UI primitives provide ARIA compliance for dialogs, dropdowns, date picker
- Semantic HTML: `<main>`, `<section>`, `<nav>`, `<form>`
- Focus visible styles via Tailwind `focus:border-[#c9a96e]`
- Color contrast: gold on dark bg meets WCAG AA for large text

---

## Scripts & Utilities

- `scripts/`: Build-time or maintenance scripts (check contents)
- `.zscripts/`: Zsh utilities (not needed for development)
- `worklog.md`: Running development log