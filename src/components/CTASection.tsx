"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

export default function CTASection() {
  const { openReserve } = useReserve();

  return (
    <section className="relative overflow-hidden border-t border-line">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 animate-glow rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,162,78,0.13) 0%, transparent 62%)" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-28 text-center md:py-40">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            The concierge
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 font-serif text-5xl font-light leading-[1.05] text-ivory md:text-7xl">
            One message away
            <br />
            <em className="gold-text">from the sea.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-8 text-sand">
            No deposits taken online, no call centre. Describe the day —
            a person answers, in English or Italian, within two hours.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <button
              onClick={() => openReserve()}
              className="btn-sweep group flex items-center gap-3 border border-gold px-9 py-4.5 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
            >
              Reserve
              <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-1.5" />
            </button>
            <a
              href={whatsappUrl("Hello B LEADER — I would like to plan an experience in Salento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-ivory/20 px-9 py-4.5 text-[11px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:border-gold/60 hover:text-gold-light"
            >
              <MessageCircle size={15} className="text-gold" />
              WhatsApp us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
