"use client";

import { ArrowUpRight, Cog, Gauge, Settings2, Timer, Wind, Zap } from "lucide-react";
import { CARS } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

const SPEC_ICONS = [Cog, Gauge, Zap, Settings2, Timer, Wind] as const;

export default function FleetGrid() {
  const { openReserve } = useReserve();

  return (
    <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
      {CARS.map((car, i) => (
        <Reveal key={car.slug} y={48} className="h-full">
          <article
            id={car.slug}
            className="group flex h-full scroll-mt-24 flex-col bg-ink transition-colors duration-500 hover:bg-carbon/60"
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
              {car.years && (
                <span className="absolute right-6 top-6 border border-ivory/20 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-ivory/70 backdrop-blur-sm">
                  {car.years}
                </span>
              )}
              <p className="absolute bottom-5 left-6 right-6 font-serif text-xl font-light italic text-ivory/90">
                “{car.tagline}”
              </p>
            </div>

            <div className="flex flex-1 flex-col p-7 md:p-9">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-gold-deep">
                    {car.kind}
                  </p>
                  <h2 className="mt-2 font-serif text-4xl font-light text-ivory md:text-5xl">
                    {car.name}
                  </h2>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-mute">
                    {car.seats} seats
                  </p>
                </div>
                <p className="text-right font-display text-2xl text-gold">
                  {car.price}
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-mute">
                    {car.priceNote}
                  </span>
                </p>
              </div>

              <p className="mt-4 text-sm leading-7 text-mute">{car.heroNote}</p>

              <div className="mt-5 space-y-2">
                {[car.exterior, car.detail].map((line) => (
                  <p key={line} className="flex items-start gap-3 text-xs leading-5 tracking-wide text-sand">
                    <span className="diamond mt-1.5 !h-[5px] !w-[5px] text-gold" />
                    {line}
                  </p>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                {car.specs.map((spec, s) => {
                  const Icon = SPEC_ICONS[s] ?? Gauge;
                  return (
                    <div key={spec.label} className="bg-coal p-4">
                      <Icon size={13} strokeWidth={1.5} className="text-gold" />
                      <p className="mt-2.5 text-[9px] uppercase tracking-[0.22em] text-mute">
                        {spec.label}
                      </p>
                      <p className="mt-1 text-xs font-medium tracking-wide text-ivory">
                        {spec.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => openReserve(car.name)}
                className="btn-sweep group/btn mt-8 flex w-full items-center justify-between border border-gold/45 px-7 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
              >
                Reserve the {car.name.split(" ")[0]}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-500 group-hover/btn:rotate-45"
                />
              </button>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
