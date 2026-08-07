"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CARS } from "@/lib/data";
import Reveal from "./Reveal";

/**
 * 04 — The fleet (teaser).
 *
 * One cinematic band: the cars shown as a living marquee of names, a single
 * headline, and a path to /fleet where models, specifications and rates live.
 * Nothing from the fleet page is repeated here.
 */

const FEATURED_IMAGE = "/images/ferrari_blanca_card.webp";

export default function FleetStrip() {

  return (
    <section id="fleet" className="relative overflow-hidden border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center px-5 py-20 md:px-10 md:py-28 lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> 04 — The fleet
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
              Driven, never
              <br />
              <em className="gold-text">just rented.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-md text-[15px] leading-8 text-sand">
              Four machines, one shared philosophy: Italian, open-air, and
              yours for the whole journey — not just the drive.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link
                href="/fleet"
                className="group flex items-center gap-3 border border-gold/50 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
              >
                Meet the fleet
                <ArrowRight
                  size={14}
                  className="text-gold transition-transform duration-500 group-hover:translate-x-2"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Imagery: featured car + whispered names of the rest */}
        <div className="relative min-h-[50vh] lg:col-span-7 lg:min-h-[72vh]">
          <div className="absolute inset-0">
              <img
              src={FEATURED_IMAGE}
              alt="Ferrari California"
              loading="lazy"
              className="img-cine h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 md:px-10">
            <p className="font-serif text-2xl font-light text-ivory md:text-3xl">
              Ferrari California
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-mute">
              {CARS.map((c) => c.name).join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
