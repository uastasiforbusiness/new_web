"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { EXPERIENCES, type Experience } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

/**
 * Continuous, sequentially numbered index of B LEADER's signature journeys —
 * by land and by sea — presented as one coherent editorial list rather than a
 * carousel. Real names, descriptions, prices, durations and highlights are
 * taken verbatim from src/lib/data.ts (source of truth).
 */

const LAND_JOURNEYS: Experience[] = EXPERIENCES.filter((e) => e.type === "land");
const SEA_JOURNEYS: Experience[] = EXPERIENCES.filter((e) => e.type === "sea");

function JourneyRow({
  journey,
  number,
  index,
}: {
  journey: Experience;
  number: string;
  index: number;
}) {
  const { openReserve } = useReserve();
  const isEven = index % 2 === 0;

  return (
    <article
      id={journey.slug}
      className="scroll-mt-24 border-b border-line transition-colors duration-500 hover:bg-carbon/40"
    >
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-16 md:grid-cols-12 md:gap-12 md:px-10 md:py-20">
        {/* Sequential number — the continuous thread of the page */}
        <Reveal className="hidden md:col-span-2 md:block">
          <span className="text-outline font-display text-[7rem] font-semibold leading-none">
            {number}
          </span>
        </Reveal>

        {/* Image */}
        <Reveal
          y={56}
          className={`md:col-span-5 ${isEven ? "" : "md:order-3"}`}
        >
          <div className="group aspect-[4/3] overflow-hidden">
            <img
              src={journey.image}
              alt={journey.name}
              loading="lazy"
              className="img-cine img-hover-zoom h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal
          delay={0.1}
          className={`md:col-span-5 ${isEven ? "" : "md:order-1"}`}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
            {journey.index} · {journey.category}
          </p>
          <h3 className="mt-4 font-serif text-4xl font-light leading-tight text-ivory md:text-5xl">
            {journey.name}
          </h3>
          <p className="mt-5 text-[15px] leading-8 text-sand">
            {journey.description}
          </p>
          <ul className="mt-7 space-y-3">
            {journey.highlights.slice(0, 4).map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 text-sm tracking-wide text-ivory/85"
              >
                <ArrowRight size={13} className="flex-none text-gold" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <button
              onClick={() => openReserve(journey.name)}
              className="btn-sweep group flex items-center gap-3 border border-gold/50 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
            >
              Reserve
              <ArrowUpRight
                size={14}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </button>
            <div className="text-xs tracking-[0.16em] text-mute">
              <span className="text-gold-light">{journey.price}</span>
              <span className="mx-3 text-ivory/20">·</span>
              <span className="inline-flex items-center gap-2">
                <Clock size={12} className="text-gold" /> {journey.duration}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export default function SignatureJourneys() {
  return (
    <section id="journeys" className="border-t border-line bg-ink">
      {/* Section heading */}
      <div className="mx-auto max-w-[1600px] px-5 pb-4 pt-24 md:px-10 md:pt-32">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> 02 — Signature journeys
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-3xl font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Your week in Salento,
            <br />
            <em className="gold-text">curated start to finish.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-[15px] leading-8 text-sand">
            Seven private journeys across Puglia&apos;s heel — coastal Ferrari
            drives, vineyard cooking classes, and yacht charters from Gallipoli.
            Each one is arranged end to end by your concierge.
          </p>
        </Reveal>
      </div>

      {/* By land */}
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <div className="border-b border-line py-8">
            <p className="text-[11px] uppercase tracking-[0.4em] text-sand">
              By land — {LAND_JOURNEYS.length} journeys
            </p>
          </div>
        </Reveal>
      </div>
      {LAND_JOURNEYS.map((j, i) => (
        <JourneyRow key={j.slug} journey={j} number={String(i + 1).padStart(2, "0")} index={i} />
      ))}

      {/* By sea */}
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <div className="border-b border-line py-8">
            <p className="text-[11px] uppercase tracking-[0.4em] text-sand">
              By sea — {SEA_JOURNEYS.length} journeys
            </p>
          </div>
        </Reveal>
      </div>
      {SEA_JOURNEYS.map((j, i) => (
        <JourneyRow
          key={j.slug}
          journey={j}
          number={String(LAND_JOURNEYS.length + i + 1).padStart(2, "0")}
          index={i}
        />
      ))}

      {/* Continuous path to all experiences */}
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-10 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-mute">
            All 7 journeys, with itineraries and inclusions
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Link
            href="/experiences"
            className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors hover:text-gold-light"
          >
            View all experiences
            <ArrowRight
              size={14}
              className="text-gold transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
