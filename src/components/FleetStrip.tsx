"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CARS } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

/**
 * Compact, continuous fleet introduction — real models, prices and taglines
 * from src/lib/data.ts, with a single path to the full /fleet page.
 */

export default function FleetStrip() {
  const { openReserve } = useReserve();

  return (
    <section id="fleet" className="border-t border-line bg-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        {/* Heading */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-16">
          <div>
            <Reveal>
              <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                <span className="h-px w-12 bg-gold/70" /> 03 — The fleet
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
                Driven, never
                <br />
                <em className="gold-text">just rented.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <Link
              href="/fleet"
              className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
            >
              Full specifications
              <ArrowRight
                size={14}
                className="text-gold transition-transform duration-500 group-hover:translate-x-2"
              />
            </Link>
          </Reveal>
        </div>

        {/* Continuous car rows */}
        <div className="border-t border-line">
          {CARS.map((car, i) => (
            <Reveal key={car.slug} delay={i * 0.06} y={28}>
              <div className="group grid grid-cols-1 items-center gap-6 border-b border-line py-8 transition-colors duration-500 hover:bg-carbon/40 md:grid-cols-12 md:gap-10 md:py-10">
                {/* Index */}
                <div className="md:col-span-1">
                  <span className="text-[11px] tracking-[0.3em] text-mute transition-colors duration-500 group-hover:text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Image */}
                <div className="md:col-span-4">
                  <div className="group/img aspect-[16/9] overflow-hidden md:aspect-[5/3]">
                    <img
                      src={car.image}
                      alt={car.name}
                      loading="lazy"
                      className="img-cine img-hover-zoom h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="md:col-span-5">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-mute">
                    {car.kind}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-light text-ivory md:text-4xl">
                    {car.name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-sand">{car.tagline}</p>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-6 md:col-span-2 md:flex-col md:items-end">
                  <div className="text-right">
                    <p className="font-serif text-2xl font-light text-gold-light md:text-3xl">
                      {car.price}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-mute">
                      {car.priceNote}
                    </p>
                  </div>
                  <button
                    onClick={() => openReserve(car.name)}
                    aria-label={`Reserve the ${car.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-sand transition-all duration-500 hover:rotate-45 hover:border-gold hover:text-gold"
                  >
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
