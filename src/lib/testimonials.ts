/**
 * Testimonials — curated guest voices.
 *
 * SOURCE: Google reviews of our connected wedding/chauffeured-services
 * business, reproduced with each client's consent. Lightly edited for
 * length and tone only; never rewritten.
 *
 * Schema:
 *  - name:       first name only (as consented)
 *  - experience: which product, e.g. "Ferrari Grand Tour · July 2025"
 *  - quote:      verbatim or lightly edited (typos/caps normalised), 1–3 sentences
 *  - date:       year of the original review (approximate from review age)
 */
export type Testimonial = {
  id: string;
  name: string;
  experience: string;
  quote: string;
  date: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "martina",
    name: "Martina",
    experience: "Ferrari California · 2025",
    quote:
      "A much-appreciated gift! We were looking for a white Ferrari that's hard to find — and they have it. A Ferrari California convertible… fantastic, especially to drive. Service and professionalism!",
    date: "2025",
  },
  {
    id: "matteo",
    name: "Matteo",
    experience: "Wedding day · 2023",
    quote:
      "Speechless. A unique wedding day experience. The owner was very helpful, professional and punctual, attentive to every detail.",
    date: "2023",
  },
  {
    id: "nunzio",
    name: "Nunzio",
    experience: "Guest · 2024",
    quote: "Top service. Professionalism and availability. Highly recommended.",
    date: "2024",
  },
];