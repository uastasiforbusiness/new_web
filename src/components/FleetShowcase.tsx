"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gauge, Users } from "lucide-react";
import { CARS } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

export default function FleetShowcase() {
  const { openReserve } = useReserve();

  return (
    <section id="fleet" className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      {/* heading */}
      <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
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
            <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </Reveal>
      </div>

      {/* editorial rows */}
      <div className="border-t border-line">
        {CARS.map((car, i) => (
          <Reveal key={car.slug} y={56}>
            <article
              className="group grid gap-0 border-b border-line py-10 transition-colors duration-500 hover:bg-carbon/60 md:grid-cols-12 md:gap-8 md:py-0"
            >
              {/* index + name */}
              <div className="flex flex-col justify-center px-0 py-6 md:col-span-4 md:py-14 md:pr-6">
                <span className="font-display text-xs tracking-[0.35em] text-gold-deep">
                  0{i + 1} · {car.kind}
                </span>
                <h3 className="mt-3 font-serif text-4xl font-light text-ivory transition-colors duration-500 group-hover:text-gold-light md:text-5xl">
                  {car.name}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-mute">
                  {car.tagline}
                </p>
              </div>

              {/* image */}
              <Link
                href={`/fleet#${car.slug}`}
                className="relative block overflow-hidden md:col-span-5 md:my-6"
                aria-label={`View ${car.name}`}
              >
                <div className="aspect-[16/9] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[280px]">
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className="img-cine img-hover-zoom h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-ivory opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
                  <ArrowUpRight size={15} />
                </div>
              </Link>

              {/* specs + CTA */}
              <div className="flex flex-col justify-center gap-6 py-8 md:col-span-3 md:items-end md:py-14">
                <div className="flex gap-8 md:flex-col md:items-end md:gap-2">
                  <span className="flex items-center gap-2 text-xs tracking-[0.14em] text-sand">
                    <Gauge size={13} className="text-gold" strokeWidth={1.5} />
                    {car.specs[1].value.split(" @")[0]}
                  </span>
                  <span className="flex items-center gap-2 text-xs tracking-[0.14em] text-sand">
                    <Users size={13} className="text-gold" strokeWidth={1.5} />
                    {car.seats} seats
                  </span>
                </div>
                <p className="font-display text-2xl font-light text-ivory md:text-3xl">
                  from <span className="text-gold">{car.price}</span>
                  <span className="ml-2 text-xs uppercase tracking-[0.2em] text-mute">
                    / {car.priceNote}
                  </span>
                </p>
                <button
                  onClick={() => openReserve(car.name)}
                  className="btn-sweep w-fit border border-gold/50 px-7 py-3.5 text-[10px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
                >
                  Reserve
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10">
        <p className="text-center text-xs tracking-[0.2em] text-mute">
          Every car is detailed, chauffeur-prepared and delivered to your villa, masseria or airport.
        </p>
      </Reveal>
    </section>
  );
}
