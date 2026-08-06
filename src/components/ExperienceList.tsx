"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { EXPERIENCES, type Experience } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "land", label: "By Land" },
  { key: "sea", label: "By Sea" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function ExperienceList() {
  const { openReserve } = useReserve();
  const [filter, setFilter] = useState<FilterKey>("all");
  const list: Experience[] =
    filter === "all" ? EXPERIENCES : EXPERIENCES.filter((e) => e.type === filter);

  return (
    <div className="border-t border-line">
      {/* filter bar */}
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-5 pt-8 md:px-10">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`border px-5 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 transition-transform duration-160 ease-out active:scale-[0.97] ${
              filter === f.key
                ? "border-gold text-gold"
                : "border-ivory/15 text-sand hover:border-gold/50 hover:text-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[11px] uppercase tracking-[0.2em] text-mute">
          {list.length} experiences
        </span>
      </div>

      {list.map((exp, i) => (
        <section key={exp.slug} id={exp.slug} className="scroll-mt-24 border-b border-line">
          <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
            <Reveal className="hidden md:col-span-2 md:block">
              <span className="text-outline font-display text-[6.5rem] font-semibold leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Reveal>
            <Reveal y={56} className={i % 2 === 1 ? "md:col-span-5 md:order-3" : "md:col-span-5"}>
              <div className="group aspect-[4/3] overflow-hidden">
                <img src={exp.image} alt={exp.name} loading="lazy" className="img-cine img-hover-zoom h-full w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                {exp.index} · {exp.category}
              </p>
              <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-ivory md:text-5xl">
                {exp.name}
              </h2>
              <p className="mt-5 text-[15px] leading-8 text-sand">{exp.description}</p>
              <ul className="mt-7 space-y-3">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm tracking-wide text-ivory/85">
                    <ArrowRight size={13} className="flex-none text-gold" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <button
                  onClick={() => openReserve(exp.name)}
                  className="btn-sweep group flex items-center gap-3 border border-gold/50 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
                >
                  Reserve
                  <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:rotate-45" />
                </button>
                <div className="text-xs tracking-[0.16em] text-mute">
                  <span className="text-gold-light">{exp.price}</span>
                  <span className="mx-3 text-ivory/20">·</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock size={12} className="text-gold" /> {exp.duration}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
