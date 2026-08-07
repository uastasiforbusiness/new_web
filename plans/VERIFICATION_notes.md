# Visual verification — refactored homepage (localhost:3001)

Verified render (screenshots saved under /home/ubuntu/screenshots/localhost_*):

1. **Hero (01 — The Arrival)**: video background + new copy "SALENTO, FROM THE DRIVER'S SEAT." renders correctly; tagline, description, and "01 — THE ARRIVAL" indicator visible. Marquee ticker renders below.
2. **Signature journeys (02)**: heading "Your week in Salento, curated start to finish." + "By land — 3 journeys" group label; journey rows with sequential numbers 01–07, images load, copy + highlights + price/duration + Reserve button all render. Sea group follows. Continuous numbering intact.
3. **Fleet (03)**: "Driven, never just rented." heading; 4 car rows render (Ferrari California T, Ferrari California, Maserati Ghibli, Mercedes E 220d Cabrio) with prices.
4. **Yacht (04)**: packages preserved, eyebrow now "04 — The yacht".
5. **Private occasions (05)**: slim single band, "05 — Private occasions", link to /services.
6. **Concierge CTA (06)**: "06 — The concierge", existing copy preserved.

Programmatic checks:
- No broken images (0), headings all correct, no "undefined"/"NaN" visible text (only Next.js script tags).
- Section heights: journeys 5398px, fleet 1722px, yacht 1101px, occasions 249px — page is long but coherent.
- `npm run lint`: 0 errors (only pre-existing warnings about <img> and an unused eslint-disable in text-reel).
- `npm run build`: succeeds, all 17 routes render.

Remaining minor items:
- Unused eslint-disable in text-reel.tsx (line 78) — cleanup.
- Old TravelCarousel.tsx is no longer used on the homepage; keep it (still imported by legacy code? check grep) or remove if dead.
