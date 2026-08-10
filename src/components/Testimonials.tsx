"use client";

import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import Reveal from "./Reveal";

/**
 * Guest voices — Tier-2 trust signal for the US luxury traveler.
 *
 * Renders nothing until TESTIMONIALS (src/lib/testimonials.ts) contains
 * real, consented quotes. Editorial layout matching the site: serif
 * numerals, gold eyebrow, generous type, no stars — one voice per card.
 */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="testimonials" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        {/* Heading */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div>
            <Reveal>
              <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                <span className="h-px w-12 bg-gold/70" /> In their words
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-6xl">
                Guests, <em className="text-gold-light">unscripted.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-xs text-right text-sm leading-7 text-mute">
              Real voices from Salento — shared with permission, lightly edited for
              length alone.
            </p>
          </Reveal>
        </div>

        {/* Quote cards */}
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {TESTIMONIALS.map((t: Testimonial, i) => (
            <Reveal key={t.id} y={40} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col justify-between bg-ink p-8 md:p-10">
                <blockquote className="font-serif text-xl font-light leading-8 text-ivory md:text-2xl md:leading-9">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-10 border-t border-line pt-6">
                  <p className="text-sm text-ivory">{t.name}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-mute">
                    {t.experience} · {t.date}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}