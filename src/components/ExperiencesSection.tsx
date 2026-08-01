"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { EXPERIENCES } from "@/lib/data";
import Reveal from "./Reveal";

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="relative border-t border-line bg-coal/40">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-14 max-w-3xl md:mb-20">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> 03 — Curated days
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
              Experiences,
              <br />
              <em className="text-gold-light">written like editorials.</em>
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {EXPERIENCES.map((exp, i) => (
            <Reveal key={exp.slug} y={40} className={i > 1 ? "sm:col-span-1" : ""}>
              <Link
                href={`/experiences#${exp.slug}`}
                className="group relative block h-full overflow-hidden bg-ink"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    loading="lazy"
                    className="img-cine img-hover-zoom h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

                <span className="absolute left-6 top-6 font-display text-xs tracking-[0.35em] text-gold">
                  {exp.index}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-sand">
                    {exp.category}
                  </p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <h3 className="font-serif text-3xl font-light text-ivory md:text-4xl">
                      {exp.name}
                    </h3>
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-ivory/25 text-ivory transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <p className="mt-3 flex items-center gap-5 text-xs tracking-[0.12em] text-sand">
                    <span className="flex items-center gap-2">
                      <Clock size={12} className="text-gold" /> {exp.duration}
                    </span>
                    <span className="text-gold-light">{exp.price}</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
