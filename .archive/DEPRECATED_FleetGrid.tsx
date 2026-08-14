"use client";

import { ArrowRight, Cog, Gauge, Settings2, Timer, Wind, Zap } from "lucide-react";
import { CARS, YACHT } from "@/lib/data";
import Reveal from "./Reveal";

const SPEC_ICONS = [Cog, Gauge, Zap, Settings2, Timer, Wind] as const;

export default function FleetGrid() {
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
                className="fleet-image h-full w-full object-cover"
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

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
                  Featured in selected experiences
                </span>
                <a
                  href="/experiences"
                  className="group/btn flex flex-none items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-gold transition-colors hover:text-gold-light"
                >
                  View experiences
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      ))}

      <Reveal y={48} className="h-full">
        <article
          id={YACHT.slug}
          className="group flex h-full scroll-mt-24 flex-col bg-ink transition-colors duration-500 hover:bg-carbon/60"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src="/images/cranchi_atlantique_50_mediterranean.avif"
              alt={YACHT.name}
              loading="lazy"
              className="fleet-image h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
            <span className="absolute left-6 top-6 font-display text-xs tracking-[0.35em] text-gold">
              05
            </span>
            <span className="absolute right-6 top-6 border border-ivory/20 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-ivory/70 backdrop-blur-sm">
              Yacht
            </span>
            <p className="absolute bottom-5 left-6 right-6 font-serif text-xl font-light italic text-ivory/90">
              “{YACHT.tagline}”
            </p>
          </div>

          <div className="flex flex-1 flex-col p-7 md:p-9">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold-deep">
                {YACHT.kind}
              </p>
              <h2 className="mt-2 font-serif text-4xl font-light text-ivory md:text-5xl">
                {YACHT.name}
              </h2>
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-mute">
                10 guests by day · 6 berths
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-mute">
              A private flybridge for slow days between Gallipoli, Punta della Suina and the Ionian coast.
            </p>

            <div className="mt-5 space-y-2">
              {YACHT.included.slice(0, 2).map((line) => (
                <p key={line} className="flex items-start gap-3 text-xs leading-5 tracking-wide text-sand">
                  <span className="diamond mt-1.5 !h-[5px] !w-[5px] text-gold" />
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-7 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {YACHT.specs.map((spec, s) => {
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

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
              <span className="text-[10px] uppercase tracking-[0.24em] text-mute">
                Featured in sea experiences
              </span>
              <a
                href="/experiences#full-day-charter"
                className="group/btn flex flex-none items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-gold transition-colors hover:text-gold-light"
              >
                View experiences
                <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  );
}
