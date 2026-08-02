"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { CARS } from "@/lib/data";

/**
 * Home-page fleet moment — all five machines, presented as an editorial
 * collection: the four cars in a hairline grid, the yacht as a wide
 * cinematic banner. The full catalogue lives on /fleet.
 */
const YACHT_MOMENT = {
  name: "Cranchi Atlantique 50",
  kind: "Flybridge Motor Yacht",
  image: "/images/floating_last.webp",
  price: "from €950",
  priceNote: "per charter",
  href: "/experiences",
};

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

      {/* Cars — editorial 2×2 grid */}
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
        {CARS.map((car, i) => (
          <Reveal key={car.slug} y={48} className="h-full">
            <Link
              href="/fleet"
              className="group flex h-full flex-col bg-ink transition-colors duration-500 hover:bg-carbon/60"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="img-cine img-hover-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                <span className="absolute left-6 top-6 font-display text-xs tracking-[0.35em] text-gold">
                  0{i + 1}
                </span>
                <p className="absolute bottom-5 left-6 right-6 font-serif text-xl font-light italic text-ivory/90">
                  &ldquo;{car.tagline}&rdquo;
                </p>
              </div>

              <div className="flex flex-1 items-end justify-between gap-6 p-7 md:p-9">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-gold-deep">
                    {car.kind}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-light text-ivory md:text-4xl">
                    {car.name}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-gold md:text-2xl">
                    {car.price}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mute">
                    {car.priceNote}
                  </p>
                  <ArrowUpRight
                    size={16}
                    className="ml-auto mt-3 text-sand transition-all duration-500 group-hover:rotate-45 group-hover:text-gold"
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Yacht — wide cinematic finale */}
      <Reveal y={64} className="mt-px">
        <Link href={YACHT_MOMENT.href} className="group block">
          <figure className="group">
            <div className="relative overflow-hidden border border-line">
              <div className="aspect-[16/10] w-full md:aspect-[21/9]">
                <img
                  src={YACHT_MOMENT.image}
                  alt={YACHT_MOMENT.name}
                  loading="lazy"
                  className="img-cine img-hover-zoom h-full w-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 md:p-10">
                <div>
                  <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-gold">
                    <span className="h-px w-8 bg-gold/70" /> 05 — At sea
                  </p>
                  <h3 className="mt-3 font-serif text-3xl font-light text-ivory md:text-5xl">
                    {YACHT_MOMENT.name}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-gold-deep">
                    {YACHT_MOMENT.kind}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl text-gold md:text-2xl">
                    {YACHT_MOMENT.price}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mute">
                    {YACHT_MOMENT.priceNote}
                  </p>
                </div>
              </div>
            </div>
            <figcaption className="mt-5 flex items-center justify-between gap-6 border-t border-line pt-5">
              <p className="max-w-2xl text-sm leading-relaxed text-mute">
                Licensed skipper, welcome prosecco and a private chef at anchor
                — every day begins at your villa, masseria or airport.
              </p>
              <span className="hidden shrink-0 items-center gap-2 font-display text-[10px] uppercase tracking-[0.32em] text-gold-deep md:flex">
                Explore the sea
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-500 group-hover:rotate-45 group-hover:text-gold"
                />
              </span>
            </figcaption>
          </figure>
        </Link>
      </Reveal>
    </section>
  );
}
