"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EXPERIENCES } from "@/lib/data";
import Reveal from "./Reveal";

/**
 * 03 — A taste of the journeys.
 *
 * Teaser only: one evocative image per journey, its name, and a single
 * verb phrase. Itineraries, highlights, prices and durations live on the
 * /experiences page — the homepage's job is to make visitors click through.
 */

const FEATURED = [
  {
    slug: EXPERIENCES.find((e) => e.slug === "ferrari-grand-tour")?.slug ?? "ferrari-grand-tour",
    image: "/images/ferrari_rossa_card.webp",
    name: "Ferrari Grand Tour",
    verb: "Chase the Adriatic sunrise in an open-top Ferrari.",
  },
  {
    slug: EXPERIENCES.find((e) => e.slug === "salento-supercar-tour")?.slug ?? "salento-supercar-tour",
    image: "/images/new_items/pasta_3.jpg",
    name: "Supercar & Pasta Day",
    verb: "A coastal drive, an ancient estate, hands in the flour.",
  },
  {
    slug: EXPERIENCES.find((e) => e.slug === "ferrari-sea-combination")?.slug ?? "ferrari-sea-combination",
    image: "/images/new_items/labarca.jpg",
    name: "The Ultimate Day",
    verb: "Land by Ferrari, sea by flybridge — one unbroken day.",
  },
];

export default function SignatureJourneys() {
  return (
    <section id="journeys" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        {/* Heading */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div>
            <Reveal>
              <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                <span className="h-px w-12 bg-gold/70" /> 03 — The journeys
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
                A taste of what your
                <br />
                <em className="gold-text">week could look like.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <Link
              href="/experiences"
              className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
            >
              All seven journeys
              <ArrowRight
                size={14}
                className="text-gold transition-transform duration-500 group-hover:translate-x-2"
              />
            </Link>
          </Reveal>
        </div>

        {/* Teaser tiles — image + name + one verb, nothing more */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {FEATURED.map((tile, i) => (
            <Reveal key={tile.slug} delay={i * 0.08} y={32}>
              <Link
                href={`/experiences#${tile.slug}`}
                className="group block"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={tile.image}
                    alt={tile.name}
                    loading="lazy"
                    className="img-cine img-hover-zoom h-full w-full object-cover transition-all duration-700"
                  />
                </div>
                <p className="mt-6 flex items-baseline justify-between gap-4">
                  <span className="font-serif text-2xl font-light text-ivory transition-colors duration-500 group-hover:text-gold-light">
                    {tile.name}
                  </span>
                  <ArrowRight
                    size={16}
                    className="flex-none text-gold opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-mute">
                  {tile.verb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
