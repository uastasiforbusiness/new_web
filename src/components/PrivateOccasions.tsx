"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

/**
 * Quiet, single-band pointer to private occasions (weddings, corporate,
 * celebrations). Reframed for a US holiday audience: the focus is the
 * holiday itself — events are a supporting amenity, not the headline.
 */

export default function PrivateOccasions() {
  return (
    <section id="occasions" className="border-t border-line bg-carbon/40">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-8 px-5 py-14 md:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> 05 — Private occasions
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 font-serif text-2xl font-light leading-snug text-ivory md:text-4xl">
              A proposal on the bow. A wedding procession in Puglia.
              <em className="gold-text"> We arrange it all.</em>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.14}>
          <Link
            href="/services"
            className="group flex items-center gap-3 border border-ivory/15 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:border-gold/60 hover:text-gold-light"
          >
            Explore occasions
            <ArrowRight
              size={14}
              className="text-gold transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
