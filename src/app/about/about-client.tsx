"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Heart, MapPin, Award, type LucideIcon } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";
import { StoryReveal } from "@/components/velox/sections/story-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Parallax image section with scrub (borrowed from FleetShowcase) ──── */
function ParallaxImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
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
        { yPercent: 8, scale: 1.08 },
        {
          yPercent: -8,
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
    <section ref={sectionRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <div ref={imgRef} className="absolute inset-0 h-[120%] w-full">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover fleet-image" />
      </div>
    </section>
  );
}

/* ── Giant wordmark band (borrowed from Fleet page) ───────────────────── */
function WordmarkBand({ word }: { word: string }) {
  return (
    <div aria-hidden className="select-none overflow-hidden border-t border-line py-12 md:py-20">
      <div className="text-outline -mt-[0.08em] px-0 font-display text-[24vw] font-bold leading-[0.85] tracking-tight text-ivory">
        {word}
      </div>
    </div>
  );
}

/* ── Values data (same 4 values, kept verbatim) ───────────────────────── */
const values: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Shield,
    title: "Excellence",
    description:
      "Every vehicle is meticulously maintained, every itinerary carefully planned. We accept nothing less than perfection.",
  },
  {
    icon: Heart,
    title: "Passion",
    description:
      "Born from a love for Italian automotive heritage and the breathtaking landscapes of Puglia. We share what moves us.",
  },
  {
    icon: MapPin,
    title: "Local Mastery",
    description:
      "Deep roots in Salento mean we know the hidden coves, the scenic roads, and the best vineyards that tourists never find.",
  },
  {
    icon: Award,
    title: "Discretion",
    description:
      "White-glove service from booking to drop-off. Your privacy and comfort are our highest priority.",
  },
];

/* ── Milestones data (owner's exact text, kept verbatim) ──────────────── */
const milestones = [
  {
    year: "2023",
    title: "Founded in Salento",
    description:
      "B LEADER was born from a vision to offer the world's most discerning travelers access to Italy's finest automotive and nautical experiences.",
  },
  {
    year: "2024",
    title: "First Supercar Tour",
    description:
      "Launched the Adriatic Grand Tour — Ferrari drive to Grotta della Zinzulusa by private boat.",
  },
  {
    year: "2024",
    title: "Yacht Fleet Added",
    description:
      "Added the Cranchi Atlantique 50 — a 15-metre flybridge yacht between two seas.",
  },
  {
    year: "2025",
    title: "Editorial Experiences",
    description:
      "Curated days written like editorials: cooking classes, sunset rituals, and combo tours across land and sea.",
  },
];

export default function AboutClient() {
  const [sequenceDone, setSequenceDone] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleComplete = () => {
    setSequenceDone(true);
    if (!hasCompleted) setHasCompleted(true);
  };

  return (
    <>
      {/* Cinematic Story Reveal — frame sequence leading to owner reveal */}
      {!hasCompleted && <StoryReveal onComplete={handleComplete} />}

      {sequenceDone && (
        <>
          {/* ── Page intro ───────────────────────────────────────────── */}
          <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
            <Reveal>
              <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                <span className="h-px w-12 bg-gold/70" /> About — Est. 2023, Salento
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
                Who we are.
                <br />
                <em className="gold-text pr-2">Where it started.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-[15px] leading-8 text-sand">
                B LEADER was born from a vision to offer the world&apos;s most
                discerning travelers access to Italy&apos;s finest automotive
                and nautical experiences.
              </p>
            </Reveal>
          </div>

          {/* ── Giant wordmark band ───────────────────────────────────── */}
          <WordmarkBand word="ABOUT" />

          {/* ── Cinematic hero band ───────────────────────────────────── */}
          <div className="relative min-h-[70vh] lg:min-h-[85svh]">
            <ParallaxImage
              src="/images/about/hero_frame.webp"
              alt="B LEADER — couple in a Ferrari California"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 left-0 z-10 mx-auto max-w-[1600px] px-5 pb-14 md:px-10 md:pb-20">
              <div className="flex items-end justify-between gap-6">
                <div className="flex items-start gap-5">
                  <span className="text-outline-gold select-none pt-3 font-display text-[17vw] font-bold leading-none md:text-[8rem]">
                    I
                  </span>
                  <div className="pb-4">
                    <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                      <span className="h-px w-10 bg-gold/70" /> Salento · Italy
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-ivory/60">
                      Curated luxury, land and sea
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Editorial story — owner's exact words, redesigned ─────── */}
          <SectionReveal accentLine>
            <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
              <div className="grid items-start gap-12 md:gap-20 lg:grid-cols-12">
                {/* Copy — column on the left */}
                <div className="space-y-8 lg:col-span-6">
                  <Reveal>
                    <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                      <span className="h-px w-12 bg-gold/70" /> 02 — The vision
                    </p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h2 className="font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl">
                      Why B LEADER
                      <br />
                      <em className="gold-text">Exists</em>
                    </h2>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="text-lg leading-8 text-sand md:text-xl md:leading-10">
                      We do not rent cars. We curate moments that become
                      memories. Every experience — whether a Ferrari tour along
                      the Adriatic coast or a sunset dinner on a flybridge
                      yacht — is composed like an editorial: intentional,
                      refined, and deeply rooted in the places that matter.
                    </p>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <blockquote className="border-l-2 border-gold pl-6 font-serif text-2xl font-light italic leading-10 text-gold-light md:text-3xl md:leading-12">
                      &ldquo;Perfection is not a destination. It is a standard
                      we measure every detail against.&rdquo;
                    </blockquote>
                  </Reveal>
                  <Reveal delay={0.32}>
                    <p className="border-t border-line pt-6 text-sm leading-8 text-sand">
                      Our founder, a lifelong Salentino, spent years navigating
                      Alpine passes and Adriatic coves before settling on the
                      question: What if luxury travel were not about excess,
                      but about intention?
                    </p>
                  </Reveal>
                </div>

                {/* Full-bleed image — right column */}
                <div className="relative min-h-[60vh] overflow-hidden lg:col-span-6 lg:min-h-[85vh]">
                  <ParallaxImage
                    src="/images/about/polignano_panoramic.webp"
                    alt="Polignano a Mare cliffs, Salento, Puglia"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <span className="absolute bottom-8 left-6 hidden font-display text-[10px] tracking-[0.35em] text-ivory/60 md:block">
                    B LEADER — Salento
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* ── Visual interlude: Gallipoli old town ─────────────────── */}
          <div aria-hidden className="relative overflow-hidden border-t border-line py-10">
            <div className="mx-auto max-w-[1600px] px-5 md:px-10">
              <div className="group aspect-[3/4] overflow-hidden md:aspect-[16/9]">
                <img
                  src="/images/new_items/gallipoli.jpg"
                  alt="Gallipoli old town at golden hour"
                  loading="lazy"
                  className="img-cine img-hover-zoom h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>
            </div>
            <p className="mt-8 text-center font-display text-xs uppercase tracking-[0.42em] text-sand md:text-sm">
              Gallipoli · Salento · Puglia
            </p>
          </div>

          {/* ── Foundation / Values — alternating bands ──────────────── */}
          <SectionReveal accentLine>
            <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
              <Reveal>
                <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                  <span className="h-px w-12 bg-gold/70" /> 03 — What drives us
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl">
                  What <em className="gold-text">Drives</em> Us
                </h2>
              </Reveal>
            </div>

            <div className="mx-auto max-w-[1600px] px-5 md:px-10">
              {values.map((v, i) => {
                const isEven = i % 2 === 0;
                return (
                  <Reveal
                    key={v.title}
                    y={40}
                    delay={i * 0.08}
                    className={`border-t border-line ${i === 0 ? "md:border-t-0" : ""}`}
                  >
                    <article className="group grid items-center gap-10 py-12 md:grid-cols-12 md:gap-16 md:py-20">
                      {/* Image column */}
                      <div className={`md:col-span-5 ${isEven ? "" : "md:order-2"}`}>
                        <div className="group/fig aspect-[4/3] overflow-hidden">
                          <img
                            src={
                              i === 0
                                ? "/images/about/ferrari_coastal_road.webp"
                                : i === 1
                                  ? "/images/about/yacht_sunset_dinner.webp"
                                  : i === 2
                                    ? "/images/about/polignano_cliffs.webp"
                                    : "/images/new_items/torre_uluzzo2.jpg"
                            }
                            alt={v.title}
                            loading="lazy"
                            className="img-cine img-hover-zoom h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Copy column */}
                      <div className={`md:col-span-7 ${isEven ? "" : "md:order-1"}`}>
                        <div className="flex items-start gap-6">
                          <span className="text-outline-gold select-none pt-3 font-display text-5xl font-bold leading-none md:text-[5rem]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="flex flex-col justify-end pb-4">
                            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                              <span className="h-px w-10 bg-gold/70" /> Our
                              foundation
                            </p>
                          </div>
                        </div>
                        <h3 className="mt-8 font-serif text-4xl font-light leading-tight text-ivory md:text-5xl">
                          {v.title}
                        </h3>
                        <p className="mt-5 max-w-lg text-[15px] leading-8 text-sand">
                          {v.description}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </SectionReveal>

          {/* ── Milestones — editorial timeline with images ──────────── */}
          <SectionReveal accentLine>
            <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
              <Reveal>
                <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                  <span className="h-px w-12 bg-gold/70" /> 04 — The journey
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl">
                  Milestones in
                  <br />
                  <em className="gold-text">Movement</em>
                </h2>
              </Reveal>

              <div className="mt-16 md:mt-24">
                {milestones.map((m, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <Reveal key={`${m.year}-${i}`} y={40} delay={i * 0.08}>
                      <div
                        className={`grid items-center gap-10 py-14 md:grid-cols-12 md:gap-16 md:py-20 ${i > 0 ? "border-t border-line" : ""}`}
                      >
                        {/* Copy column */}
                        <div className={`md:col-span-5 ${isEven ? "" : "md:order-2"}`}>
                          <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                            <span className="h-px w-10 bg-gold/70" />{" "}
                            <time className="font-mono text-xs">{m.year}</time>
                          </p>
                          <h3 className="mt-6 font-serif text-3xl font-light leading-tight text-ivory md:text-5xl">
                            {m.title}
                          </h3>
                          <p className="mt-5 max-w-lg text-[15px] leading-8 text-sand">
                            {m.description}
                          </p>
                        </div>

                        {/* Image column */}
                        <div className={`md:col-span-7 ${isEven ? "" : "md:order-1"}`}>
                          <div className="group aspect-[16/9] overflow-hidden">
                            <img
                              src={
                                i === 0
                                  ? "/images/about/ferrari_coastal_road.webp"
                                  : i === 1
                                    ? "/images/new_items/torre_uluzzo2.jpg"
                                    : i === 2
                                      ? "/images/cranchi_atlantique_50.jpg"
                                      : "/images/new_items/pasta_3.jpg"
                              }
                              alt={`${m.year} — ${m.title}`}
                              loading="lazy"
                              className="img-cine img-hover-zoom h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <CTASection />
        </>
      )}
    </>
  );
}
