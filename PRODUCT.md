# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are US luxury travelers planning a high-end stay in Salento, Puglia. They want a private, effortless way to experience the region by supercar and yacht, with a dependable concierge contact before committing.

## Product Purpose

B LEADER presents and facilitates private luxury driving and yacht experiences in Salento. The site helps travelers discover the experiences, understand what each includes, then either submit a reservation request or begin a conversation with the concierge on WhatsApp.

## Positioning

B LEADER pairs curated Ferrari and luxury-car journeys with private yacht experiences in Salento, creating one concierge-led itinerary across land and sea rather than offering a generic vehicle rental or boat charter.

## Operating Context

Travelers evaluate experiences remotely, often while planning an Italy itinerary. They need clear itineraries, locations, inclusions, and reservation paths, with a high-touch concierge available through WhatsApp.

## Capabilities and Constraints

- Visitors can explore experiences, the luxury fleet, yacht offerings, services, locations, and brand information.
- Visitors can send a reservation request and contact the concierge through WhatsApp.
- Prices, service zones/locations, and listed inclusions are confirmed business content and must be preserved unless the owner explicitly requests a change.
- Customer-facing copy is refined US English.
- The product runs as a Next.js web application on Cloudflare Workers.

## Brand Commitments

- Product name: B LEADER.
- The experience should feel private, precise, and distinctly Salento—not like a mass-market tour or rental marketplace.
- Preserve the established luxury positioning and real media assets unless a task explicitly changes them.

## Evidence on Hand

- Experience details, locations, prices, and inclusions live in `src/data/experiences.ts` and `src/components/velox/data.ts`.
- Real visual media is stored under `public/images/` and `public/hero-video.mp4`.
- Reservation and WhatsApp concierge flows are implemented in the application.
- Do not fabricate testimonials, customer counts, availability, pricing, or included services.

## Product Principles

1. Make extraordinary Salento experiences easy to evaluate from abroad.
2. Let the itinerary, setting, and service explain the premium value clearly.
3. Maintain two credible paths to action: a structured reservation request and immediate concierge contact.
4. Treat operational facts—pricing, zones, and inclusions—as source-of-truth content.

