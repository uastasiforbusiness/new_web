"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Anchor } from "lucide-react";
import { YACHT, YACHT_PACKAGES } from "@/lib/data";
import Reveal from "./Reveal";
import { useReserve } from "./ReserveModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function YachtSection() {
  const { openReserve } = useReserve();
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgWrapRef.current || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, imgWrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="yacht" className="relative border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
        {/* sticky imagery */}
        <div className="relative min-h-[60vh] overflow-hidden lg:min-h-screen">
          <div ref={imgWrapRef} className="absolute inset-[-10%_0]">
            <img
              ref={imgRef}
              src={YACHT.image}
              alt="Cranchi Atlantique 50 underway on the Ionian sea"
              className="img-cine h-full w-full scale-[1.22] object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-ink/60" />
          <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ivory/80">
            <Anchor size={13} className="text-gold" /> Marina di Gallipoli
          </div>
        </div>

        {/* copy + packages */}
        <div className="flex flex-col justify-center px-5 py-20 md:px-12 md:py-28 lg:pr-16">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> 02 — The flybridge
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-6xl">
              {YACHT.name.split(" ").slice(0, 1)}{" "}
              <em className="gold-text">{YACHT.name.split(" ").slice(1).join(" ")}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-lg text-[15px] leading-8 text-sand">
              {YACHT.tagline} Licensed skipper, hostess, slow lunches at anchor
              and the kind of sunset that asks you to put the phone down.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 border-t border-line">
              {YACHT_PACKAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => openReserve(`${YACHT.name} — ${p.name}`)}
                  className="group flex w-full items-center justify-between gap-4 border-b border-line py-5 text-left transition-colors duration-300 hover:bg-carbon/70"
                >
                  <div>
                    <p className="font-serif text-xl font-light text-ivory transition-colors duration-300 group-hover:text-gold-light">
                      {p.name}
                    </p>
                    <p className="mt-1 text-xs tracking-[0.1em] text-mute">
                      {p.duration} · {p.note}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg text-gold">{p.price}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-gold opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                onClick={() => openReserve(`${YACHT.name} — Full Day — Two Seas`)}
                className="btn-sweep border border-gold bg-transparent px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
              >
                Charter the flybridge
              </button>
              <Link
                href="/experiences"
                className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
              >
                View all experiences
                <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-2" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
