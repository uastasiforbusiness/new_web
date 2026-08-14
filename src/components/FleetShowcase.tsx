"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARS, YACHT } from "@/lib/data";
import Reveal from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════
   THE FLEET — EDITORIAL SHOWCASE
   One chapter per machine. Full-bleed imagery, alternating
   asymmetric layouts, oversized serif numerals, brochure-
   style spec strips. Data untouched; ids kept stable so the
   footer's /fleet#slug anchors still resolve.
   ═══════════════════════════════════════════════════════════ */

type Chapter = {
  slug: string;
  index: string;
  indexOutline: string;
  kind: string;
  name: string;
  tagline: string;
  image: string;
  seats: string;
  heroNote: string;
  exterior: string;
  detail: string;
  specs: { label: string; value: string }[];
};

const CAR_CHAPTERS: Chapter[] = CARS.map((car, i) => ({
  slug: car.slug,
  index: String(i + 1).padStart(2, "0"),
  indexOutline: String(i + 1),
  kind: car.kind,
  name: car.name,
  tagline: car.tagline,
  image: car.image,
  seats: car.seats,
  heroNote: car.heroNote,
  exterior: car.exterior,
  detail: car.detail,
  specs: car.specs,
}));

/* ── Spec strip — brochure line, not grid boxes ─────────── */
function SpecStrip({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
      {specs.map((spec) => (
        <div key={spec.label} className="flex flex-col gap-2">
          <dt className="text-[9px] uppercase tracking-[0.3em] text-mute">
            {spec.label}
          </dt>
          <dd className="font-serif text-lg font-light leading-snug text-ivory md:text-xl">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ── Car chapter ─────────────────────────────────────────── */
function CarChapter({
  chapter,
  flip,
}: {
  chapter: Chapter;
  flip: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: 2, scale: 1.02 },
        {
          yPercent: -2,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const copyOrder = flip ? "lg:order-1" : "lg:order-2";
  const imgOrder = flip ? "lg:order-2" : "lg:order-1";

  return (
    <article
      id={chapter.slug}
      ref={sectionRef}
      className="scroll-mt-20 border-t border-line"
    >
      <div
        className={`mx-auto grid max-w-[1600px] lg:grid-cols-12 ${
          flip ? "" : ""
        }`}
      >
        {/* ── Editorial copy column ──────────────────────── */}
        <div
          className={`relative flex flex-col justify-center px-5 py-16 md:px-10 md:py-28 lg:col-span-5 lg:py-36 ${copyOrder}`}
        >
          <div className="relative flex items-start gap-6">
            <span className="text-outline-gold select-none pt-3 font-display text-[17vw] font-bold leading-none tracking-tight md:text-[7.5rem]">
              {chapter.indexOutline}
            </span>
            <div className="flex flex-col justify-end pb-4">
              <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                <span className="h-px w-10 bg-gold/70" /> {chapter.kind}
              </p>
              {chapter.seats && (
                <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-mute">
                  {chapter.seats} seats
                </p>
              )}
            </div>
          </div>

          <Reveal delay={0.06}>
            <h2 className="mt-8 font-serif text-5xl font-light leading-[0.95] text-ivory md:text-7xl">
              {chapter.name.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {i > 0 ? (
                    <em className="gold-text">{word}</em>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-sm font-serif text-xl font-light italic leading-relaxed text-sand md:text-2xl">
              “{chapter.tagline}”
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-md text-[15px] leading-8 text-mute">
              {chapter.heroNote}
            </p>
          </Reveal>

          <div className="mt-8 space-y-2.5">
            <p className="flex items-start gap-3 text-xs leading-5 tracking-wide text-sand">
              <span className="diamond mt-1.5 !h-[5px] !w-[5px] text-gold" />
              {chapter.exterior}
            </p>
            <p className="flex items-start gap-3 text-xs leading-5 tracking-wide text-sand">
              <span className="diamond mt-1.5 !h-[5px] !w-[5px] text-gold" />
              {chapter.detail}
            </p>
          </div>

          <SpecStrip specs={chapter.specs} />

          <Reveal delay={0.24}>
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-8">
              <a
                href="/experiences"
                className="group/btn flex items-center gap-2.5 border border-gold/50 px-7 py-3.5 text-[10px] uppercase tracking-[0.28em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink"
              >
                Featured experiences
                <ArrowRight
                  size={13}
                  className="transition-transform duration-500 group-hover/btn:translate-x-1.5"
                />
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Full-bleed imagery column ──────────────────── */}
        <div
          className={`relative min-h-[50vh] overflow-hidden lg:col-span-7 lg:min-h-[80svh] ${imgOrder}`}
        >
          <div ref={imgRef} className="absolute inset-0 h-[108%] w-full">
            <Image
              src={chapter.image}
              alt={chapter.name}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover fleet-image"
            />
          </div>
          <div
            className={`absolute inset-0 ${
              flip
                ? "bg-gradient-to-l from-transparent via-transparent to-ink/70"
                : "bg-gradient-to-r from-transparent via-transparent to-ink/70"
            }`}
          />
          <span className="absolute bottom-8 left-6 z-10 hidden font-display text-[10px] tracking-[0.35em] text-ivory/60 md:block">
            B LEADER — Salento
          </span>
        </div>
      </div>
    </article>
  );
}

/* ── Yacht chapter — same editorial grammar, sea mood ───── */
function YachtChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img = heroImgRef.current;
    if (!section || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: 2, scale: 1.02 },
        {
          yPercent: -2,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <article
      id={YACHT.slug}
      ref={sectionRef}
      className="scroll-mt-20 border-t border-line"
    >
      {/* Hero band */}
      <div className="relative min-h-[50vh] overflow-hidden lg:min-h-[72svh]">
          <div ref={heroImgRef} className="absolute inset-0 h-[106%] w-full">
            <Image
              src={YACHT.image}
              alt={YACHT.name}
              fill
              sizes="100vw"
              className="object-cover fleet-image"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 md:px-10 md:pb-20">
          <div className="flex items-end justify-between gap-6">
            <div className="flex items-start gap-5">
              <span className="text-outline-gold select-none pt-3 font-display text-[17vw] font-bold leading-none md:text-[8rem]">
                V
              </span>
              <div className="pb-4">
                <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                  <span className="h-px w-10 bg-gold/70" /> {YACHT.kind}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-ivory/60">
                  10 guests by day · 6 berths
                </p>
              </div>
            </div>
          </div>

          <Reveal delay={0.08}>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl font-light leading-[0.98] text-ivory md:text-7xl">
              {YACHT.name}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 max-w-xl font-serif text-xl font-light italic text-sand md:text-2xl">
              “{YACHT.tagline}”
            </p>
          </Reveal>
        </div>
      </div>

      {/* Brochure content */}
      <div className="mx-auto max-w-[1600px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                The invitation
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl text-[15px] leading-8 text-mute">
                A private flybridge for slow days between Gallipoli, Punta della
                Suina and the Ionian coast. Every hour aboard is arranged by our
                team — from the welcome prosecco to the anchor you choose.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10">
                <p className="text-[10px] uppercase tracking-[0.42em] text-mute">
                  Included in every crossing
                </p>
                <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2">
                  {YACHT.included.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 bg-coal px-5 py-4 text-sm leading-6 tracking-wide text-sand"
                    >
                      <span className="diamond mt-2 !h-[5px] !w-[5px] text-gold" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <SpecStrip specs={YACHT.specs} />
        </div>
      </div>
      </div>
    </article>
  );
}

/* ── Marquee band between chapters ──────────────────────── */
function FleetMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 34,
        repeat: -1,
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden className="overflow-hidden border-t border-line py-7">
      <div ref={trackRef} className="flex w-max gap-10 whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, set) =>
          [
            ...CARS.map((c) => c.name),
            YACHT.name,
          ].map((name, i) => (
            <span
              key={`${set}-${i}-${name}`}
              className="flex items-center gap-10 font-serif text-2xl font-light text-ivory/30 md:text-4xl"
            >
              {name}
              <span className="diamond !h-[7px] !w-[7px] text-gold/50" />
            </span>
          )),
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function FleetShowcase() {
  return (
    <div className="bg-ink">
      {CAR_CHAPTERS.map((chapter, i) => (
        <div key={chapter.slug}>
          <CarChapter chapter={chapter} flip={i % 2 === 1} />
          <FleetMarquee />
        </div>
      ))}
      <YachtChapter />
    </div>
  );
}
