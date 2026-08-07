# Fleet page redesign — asset & architecture notes

## Design system tokens (globals.css)
- Colors: ink #0a0908, coal #131110, carbon #1a1715, gold #c9a96e, gold-light #e6cf95, gold-deep #8f6f2f, ivory #f3eee3, sand #a79e8e, mute #6f6859, line rgba(243,238,228,.09)
- Fonts: font-serif = Cormorant Garamond, font-display = Outfit, font-body = Inter
- Utilities: .text-outline, .text-outline-gold, .gold-text, .diamond, .btn-sweep, .img-cine, .img-hover-zoom, .fleet-image (saturate .76 contrast 1.06 bright .93, hover zoom 1.055), [data-reveal]
- Lenis smooth scroll + GSAP ScrollTrigger already registered site-wide (SmoothScroll.tsx)

## Reveal component props
- <Reveal delay y duration start as className>: GSAP fromTo fade-up, y default 44, start default "top 88%"

## Fleet data (src/lib/data.ts)
- CARS[4]: ferrari-california-t (€2,450/day, 2 seats, 3.9L V8 Biturbo 560hp, 0-100 3.6s, 316km/h), ferrari-california (€1,950, 4.3L V8 NA 460hp, 3.9s, 310), maserati-ghibli (€890, 3.0L V6 TD 250hp, 6.3s, 250, 5 seats), mercedes-e-cabrio (€590, 2.0L TD 194hp, 7.7s, 237, 4 seats)
- Each car: slug, name, kind, years?(CA-T only "2014–2017"), tagline, image, price, priceNote, seats, exterior, detail, specs[6], heroNote
- YACHT: cranchi-atlantique-50, Flybridge Motor Yacht, "Fifty-one feet of Italian craftsmanship between two seas.", 5 specs, 5 included, remote pexels images
- Footer links to /fleet#slug anchors — KEEP anchor ids stable (car.slug + YACHT.slug)

## Fleet images
- /images/rossa_card_mediterranean.png — CA T, gorgeous mediterranean stone wall + sea, 2560x1440. EXCELLENT for full-bleed.
- /images/ferrari_california_white_background.png — CA white, plain bg.
- /images/maserati_card_mediterranean.png, /images/mercedes_e220d_cabrio_mediterranean.png — mediterranean versions too (assume similar quality).
- 360 folders: ferrari_rossa_360/rossa_profilo.webp — parking lot photo, weak bg. NOT needed.

## Current fleet page structure
- page.tsx: eyebrow "The fleet", h1 "Machines with an accent." (max-w 1600 px-5 pt-32), SectionReveal -> FleetGrid, SectionReveal -> CTASection mode="experiences"
- FleetGrid: uniform 2x2 grid gap-px border-line, 16:10 img, number 0i, years badge, italic tagline, kind + name + seats, heroNote, 2 diamond lines, 2x3 spec grid, footer link to /experiences
- Yacht rendered as 5th card (number "05")

## Redesign plan (new FleetShowcase client component, replaces FleetGrid only)
1. Cinematic hero band: full-bleed first-car image, giant outlined numeral, editorial headline; keep existing page header (eyebrow/h1) but upgrade header with huge outline "FLEET" word.
2. Chapter sections per car, alternating L/R asymmetric split:
   - left col: giant outlined numeral (01-04), kind eyebrow, serif name (huge, italic gold-text accent), tagline, heroNote, price large "€2,450 / day", reserve anchor
   - right col: full-bleed image w/ parallax (GSAP yPercent -10→10), anchor id stable
   - brochure spec strip: horizontal hairline-separated row of 6 specs, not grid boxes
   - exterior/detail diamond lines
3. Yacht chapter: same treatment but sea-toned, number "05"/V, image gallery row of 4 pexels images (Cruise/Dinner/Sailing), included list, specs strip.
4. Marquee band between cars: model names ticker (reuse Marquee tone).
5. GSAP: ScrollTrigger pin none (Lenis friendly), per-section parallax, text reveal stagger, number count-up? keep simple: fromTo stagger, scale reveal.
6. Keep CTASection exactly as-is after showcase.
7. Keep footer anchors: ids = car.slug, YACHT.slug.
