"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Anchor } from "lucide-react";
import { YACHT } from "@/lib/data";
import Reveal from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * 05 — One glance at the sea.
 *
 * A single cinematic band for the Cranchi Atlantique 50: one image, one
 * sentence of desire, and two doors deeper (charter CTA → /experiences,
 * full packages → /experiences). The four charter packages with durations,
 * inclusions and seasonal rates live on the experiences page.
 */

export default function YachtSection() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const waveRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!imgWrapRef.current || !imgRef.current) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
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

      if (waveRef.current) {
        gsap.to(waveRef.current, {
          x: isMobile ? -20 : -40,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: isMobile ? 0.5 : 1,
          },
        });
      }
    }, imgWrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="yacht" className="relative border-t border-line bg-ink">
      {/* Wave parallax */}
      <div className="pointer-events-none absolute -top-px inset-x-0 overflow-hidden leading-none" aria-hidden>
        <svg
          viewBox="0 0 1440 120"
          className="block w-[120%] -ml-[10%]"
          preserveAspectRatio="none"
        >
          <path
            ref={waveRef}
            className="wave-path"
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="#080706"
          />
        </svg>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-0 lg:grid-cols-2">
        {/* Sticky imagery */}
        <div className="relative min-h-[55vh] overflow-hidden lg:min-h-screen">
          <div ref={imgWrapRef} className="absolute inset-[-10%_0]">
            <Image
              ref={imgRef}
              src={YACHT.image}
              alt="Cranchi Atlantique 50 underway on the Ionian sea"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="img-cine scale-[1.22] object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-ink/60" />
          <div className="absolute bottom-8 left-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ivory/80">
            <Anchor size={13} className="text-gold" /> Marina di Gallipoli
          </div>
        </div>

        {/* Copy — one sentence, two doors */}
        <div className="flex flex-col justify-center px-5 py-20 md:px-12 md:py-28 lg:pr-16">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> 05 — The sea
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
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/experiences"
                className="btn-sweep group flex items-center gap-3 border border-gold/50 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
              >
                Charter the flybridge
                <ArrowRight
                  size={14}
                  className="text-gold transition-transform duration-500 group-hover:translate-x-2"
                />
              </Link>
              <Link
                href="/experiences"
                className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
              >
                All day & sunset options
                <ArrowRight
                  size={14}
                  className="text-gold transition-transform duration-500 group-hover:translate-x-2"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
