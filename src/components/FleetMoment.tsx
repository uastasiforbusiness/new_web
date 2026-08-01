"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Home-page fleet moment — a single, cinematic photo as a teaser.
 * The full collection lives on /fleet, so the home never duplicates the list.
 */
export default function FleetMoment() {
  return (
    <section
      id="fleet"
      className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36"
    >
      {/* heading */}
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
        <div>
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> 01 — The fleet
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
              Machines with
              <br />
              <em className="gold-text pr-2">an accent.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link
            href="/fleet"
            className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
          >
            The complete fleet
            <ArrowRight
              size={14}
              className="text-gold transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        </Reveal>
      </div>

      {/* single photo — framed editorial moment */}
      <Reveal y={64}>
        <figure className="group">
          <div className="overflow-hidden border border-line">
            <div className="aspect-[16/10] w-full md:aspect-[21/9]">
              <img
                src="/images/ferrari_blanca_card.webp"
                alt="Ferrari California — the B LEADER fleet"
                loading="lazy"
                className="img-cine img-hover-zoom h-full w-full object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-5 flex items-center justify-between gap-6 border-t border-line pt-5">
            <p className="max-w-2xl text-sm leading-relaxed text-mute">
              Every car is detailed, chauffeur-prepared and delivered to your
              villa, masseria or airport.
            </p>
            <span className="hidden shrink-0 font-display text-[10px] uppercase tracking-[0.32em] text-gold-deep md:block">
              Ferrari California · Bianco Avus
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
