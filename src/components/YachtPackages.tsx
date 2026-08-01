"use client";

import { ArrowUpRight, Check, Clock, Users } from "lucide-react";
import { YACHT, YACHT_PACKAGES } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

export default function YachtPackages() {
  const { openReserve } = useReserve();

  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
      {YACHT_PACKAGES.map((p, i) => (
        <Reveal key={p.id} y={40} delay={i * 0.06} className="h-full">
          <article className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-carbon/70">
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold">
              <Clock size={12} /> {p.duration}
            </p>
            <h3 className="mt-4 font-serif text-3xl font-light leading-tight text-ivory">
              {p.name}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-mute">{p.note}</p>
            <p className="mt-6 font-display text-3xl font-light text-gold">{p.price}</p>
            <p className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-mute">
              <Users size={11} /> up to 10 guests
            </p>
            <button
              onClick={() => openReserve(`${YACHT.name} — ${p.name}`)}
              className="btn-sweep group/btn mt-7 flex items-center justify-between border border-gold/45 px-6 py-3.5 text-[10px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
            >
              Charter this
              <ArrowUpRight size={14} className="transition-transform duration-500 group-hover/btn:rotate-45" />
            </button>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function YachtIncluded() {
  return (
    <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {YACHT.included.map((item) => (
        <div key={item} className="flex items-center gap-4 bg-ink p-6">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-gold/40 text-gold">
            <Check size={13} strokeWidth={2} />
          </span>
          <p className="text-sm tracking-wide text-sand">{item}</p>
        </div>
      ))}
    </div>
  );
}
