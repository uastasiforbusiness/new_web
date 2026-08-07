"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Briefcase, Heart, Sparkles } from "lucide-react";
import { SERVICES } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

const ICONS = [Heart, Briefcase, Sparkles] as const;

export default function ServicesPreview() {
  const { openReserve } = useReserve();

  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
          <div>
            <Reveal>
              <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                <span className="h-px w-12 bg-gold/70" /> 05 — Private occasions
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
                Weddings, boardrooms,
                <br />
                <em className="text-gold-light">everything in between.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href="/services"
              className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
            >
              All services
              <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <Reveal key={service.slug} y={40} delay={i * 0.08}>
                <article className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-carbon/70 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                      <Icon size={17} strokeWidth={1.5} />
                    </span>
                    <button
                      onClick={() => openReserve(service.name)}
                      aria-label={`Reserve ${service.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 text-sand transition-all duration-500 hover:rotate-45 hover:border-gold hover:text-gold"
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <h3 className="mt-8 font-serif text-3xl font-light text-ivory md:text-4xl">
                    {service.name}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-mute">
                    {service.description}
                  </p>
                  <Link
                    href={`/services#${service.slug}`}
                    className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold-light/80 transition-colors hover:text-gold-light"
                  >
                    Plan this occasion
                    <ArrowRight size={12} />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
