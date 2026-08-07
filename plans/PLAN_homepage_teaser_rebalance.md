# Homepage v3 — teaser-first, navigation-driving structure

## User feedback
- All info was dumped on the homepage; specialized pages became redundant.
- Keep loading screen and hero exactly as they are.
- Bring the carousel back, but restructured — as an intrigue device, not an info dump.
- Homepage must give an idea of the product to gain attention, then push people to keep navigating (Fleet / Experiences / Services).

## Principle
The homepage = appetizer. Each section shows ONE evocative image + ONE line of desire + ONE path deeper. No specs, no highlight lists, no prices (prices stay on /fleet and /experiences).

## New structure (continuous 01–05)
- **01 — The Arrival**: hero untouched (loading + hero as before).
- **02 — The world we move in (carousel)**: restructured 3D carousel. 5 evocative cards, each mapping to a destination page, with only a name + one-line mood, NO details:
  1. Supercar Fleet → /fleet ("Machines with an accent")
  2. The Flybridge → /experiences ("Sunset off Gallipoli")
  3. Chauffeured Days → /services ("Let someone else drive")
  4. Private Occasions → /services ("A proposal on the bow")
  5. Your Concierge → /contact ("One message away from the sea")
  Each card clickable, arrow CTA "Discover". Reuse TravelCarousel 3D mechanics (restored from git) with cleaner styling; keep `min-h-screen` feel but reduce header duplication (hero already did the intro).
- **03 — A taste of the journeys**: horizontal "teaser tiles" — 3 signature journeys, image only + name + one verb phrase, click through to /experiences. No descriptions, no prices, no highlights.
- **04 — One glance at the sea**: single yacht band — big image, one sentence, "Charter the flybridge" + link to /experiences. Remove package list from homepage.
- **05 — The Concierge CTA**: kept as-is.

## Files
- Restore `TravelCarousel.tsx` (git show) → restructure into `CarouselSection.tsx` (editorial cards linking out, clickable cards, arrows + dot navigation).
- Rewrite `SignatureJourneys.tsx` → slim 3-tile teaser grid.
- Rewrite `FleetStrip.tsx` → one evocative band image + headline ("The fleet") + link to /fleet.
- Slim `YachtSection.tsx` → keep sticky image + one sentence + CTAs, remove package buttons.
- Keep `PrivateOccasions`? No — absorb into carousel card 4 and CTA flow to avoid duplication.
- Renumber eyebrows: 02 carousel, 03 journeys taste, 04 the sea, 05 concierge.
- home-client.tsx: Hero (01), Carousel (02), JourneyTeasers (03), SeaTeaser (04), CTASection (05).

## Guardrails
- No price rendering anywhere on homepage.
- Every section has exactly one primary navigation path.
- Descriptions max one line.
