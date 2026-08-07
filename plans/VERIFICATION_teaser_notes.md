# Visual verification — teaser-first homepage (localhost:3001)

All sections verified by scrolling + DOM inspection. Render confirmed:

1. **Hero (01 — The Arrival)**: untouched — loading screen + video hero + "Salento, from the driver's seat." all identical to before.
2. **02 — The world we move in (carousel)**: 3D wheel restored and restructured — 5 mood cards each linking to /fleet, /experiences, /services, /contact. Each card: label + title + one-line mood + CTA. Prev/next arrows + dot navigation work; wheel rotates smoothly with fan effect; side cards blurred/faded, center card gold-framed. No prices or specs on cards.
3. **03 — The journeys**: 3 teaser tiles (Ferrari Grand Tour, Supercar & Pasta Day, The Ultimate Day) — image + name + single verb phrase, each linking to /experiences#slug. No descriptions, prices, or highlights.
4. **04 — The fleet**: single cinematic band — Ferrari California image, headline "Driven, never just rented.", one sentence, "Meet the fleet" → /fleet. Names of all four cars whispered as a ticker line. No prices.
5. **05 — The sea**: yacht teaser — big Cranchi image with parallax, one sentence, "Charter the flybridge" + "All day & sunset options" both → /experiences. Package list removed from homepage.
6. **06 — The concierge**: unchanged (Reserve + WhatsApp).

Checks: `npm run build` green; `npm run lint` 0 errors (only pre-existing `<img>` warnings). No broken images; page content shows exactly the teaser copy.

Commit: pending — next step push to main.
