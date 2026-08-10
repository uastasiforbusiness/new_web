"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

export default function ServiceBands({
  audience,
}: {
  audience?: "leisure" | "corporate";
}) {
  const { openReserve } = useReserve();
  const services = audience ? SERVICES.filter((s) => s.audience === audience) : SERVICES;

  return (
    <div className="border-t border-line">
      {services.map((service, i) => (
        <section id={service.slug} key={service.slug} className="scroll-mt-24 border-b border-line">
          <div className="mx-auto grid max-w-[1600px] items-stretch md:grid-cols-2">
            {/* image */}
            <Reveal y={0} className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="group relative h-full min-h-[340px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  loading="lazy"
                  className="img-cine img-hover-zoom absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="absolute left-7 top-7 font-display text-xs tracking-[0.35em] text-gold">
                  0{i + 1}
                </span>
              </div>
            </Reveal>

            {/* copy */}
            <Reveal
              delay={0.1}
              className={`flex flex-col justify-center px-5 py-16 md:px-12 md:py-24 ${i % 2 === 1 ? "md:order-1" : ""}`}
            >
              <h2 className="font-serif text-5xl font-light text-ivory md:text-6xl">
                {service.name}
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-8 text-sand">
                {service.description}
              </p>

              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm leading-6 text-ivory/85">
                    <Check size={14} className="mt-1 flex-none text-gold" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <button
                  onClick={() => openReserve(service.name)}
                  className="btn-sweep group flex items-center gap-3 border border-gold/50 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
                >
                  Plan with us
                  <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
