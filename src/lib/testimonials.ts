/**
 * Testimonials — curated guest voices.
 *
 * SOURCE OF TRUTH: real conversations via WhatsApp/email, anonymized
 * (first name + experience + short quote). NEVER fabricate quotes.
 * When you have 3+ real quotes, paste them here; the homepage renders
 * them automatically between the yacht section and the concierge CTA.
 *
 * Schema:
 *  - name:       first name only (or initials), as consented
 *  - experience: which product, e.g. "Ferrari Grand Tour · July 2025"
 *  - quote:      verbatim or lightly edited (typos only), 1–3 sentences
 *  - date:       "July 2025" or ISO date for the Review schema
 */
export type Testimonial = {
  id: string;
  name: string;
  experience: string;
  quote: string;
  date: string;
};

export const TESTIMONIALS: Testimonial[] = [];