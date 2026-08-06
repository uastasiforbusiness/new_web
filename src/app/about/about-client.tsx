"use client";

import { Shield, Heart, MapPin, Award, type LucideIcon } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import SectionReveal from "@/components/SectionReveal";
import { StoryReveal } from "@/components/velox/sections/story-reveal";

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
          {/* Hero — Owner revealed as background */}
          <section className="relative flex min-h-screen items-end">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/loading-frames/frame_0060.webp')`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.8) 55%, rgba(10,10,10,0.95) 100%)",
              }}
            />
            <div className="relative z-10 mx-auto max-w-[1600px] pb-16 px-5 pt-40 md:pt-48 md:pb-24 md:px-10">
              <Reveal>
                <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                  <span className="h-px w-12 bg-gold/70" />
                  EST. 2023 — SALENTO, ITALY
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-6 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
                  The B LEADER <em className="gold-text pr-2">Story</em>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 max-w-2xl text-[15px] leading-8 text-sand">
                  Founded in the heart of Salento, Puglia, B LEADER was born
                  from a vision to offer the world&apos;s most discerning
                  travelers access to Italy&apos;s finest automotive and
                  nautical experiences.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <span className="mt-10 block h-px w-40 bg-gold/50 md:w-64" />
              </Reveal>
            </div>
          </section>

          {/* Editorial Story — Two-column narrative */}
          <SectionReveal accentLine>
            <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
              <div className="grid gap-12 md:gap-20 lg:grid-cols-2 items-start">
                <figure className="relative aspect-[4/3] overflow-hidden md:aspect-[3/4]">
                  <img
                    src="/collage.jpeg"
                    alt="B LEADER experiences in Salento"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </figure>
                <div className="space-y-8">
                  <Reveal>
                    <p className="text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                      <span className="h-px w-12 bg-gold/70" /> The Vision
                    </p>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h2 className="font-serif text-4xl font-light leading-[1.05] text-ivory md:text-5xl">
                      Why B LEADER <em className="gold-text">Exists</em>
                    </h2>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="text-lg leading-8 text-sand">
                      We do not rent cars. We curate moments that become
                      memories. Every experience — whether a Ferrari tour along
                      the Adriatic coast or a sunset dinner on a flybridge
                      yacht — is composed like an editorial: intentional,
                      refined, and deeply rooted in the places that matter.
                    </p>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <blockquote className="border-l-2 border-gold pl-6 italic text-gold-light">
                      &ldquo;Perfection is not a destination. It is a standard we
                      measure every detail against.&rdquo;
                    </blockquote>
                  </Reveal>
                  <Reveal delay={0.32}>
                    <p className="text-sm text-mute">
                      Our founder, a lifelong Salentino, spent years navigating
                      Alpine passes and Adriatic coves before settling on the
                      question: What if luxury travel were not about excess,
                      but about intention?
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Journey / Timeline */}
          <SectionReveal accentLine>
            <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                  <span className="h-px w-12 bg-gold/70" /> The Journey
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] text-ivory md:text-5xl">
                  Milestones in <em className="gold-text">Movement</em>
                </h2>
              </Reveal>
              <div className="mt-20 space-y-16">
                {milestones.map((m, i) => (
                  <Reveal key={`${m.year}-${i}`} y={40} delay={i * 0.08}>
                    <div className="flex items-center gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
                      <time className="font-mono text-lg text-gold">
                        {m.year}
                      </time>
                      <span className="hidden h-px w-12 bg-gold/50 md:inline-block md:w-24" />
                      <div className="space-y-2">
                        <h3 className="font-serif text-2xl font-light text-ivory md:text-3xl">
                          {m.title}
                        </h3>
                        <p className="text-sm leading-7 text-mute">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Values — Redesigned grid */}
          <SectionReveal accentLine>
            <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
              <Reveal>
                <p className="text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
                  <span className="h-px w-12 bg-gold/70" /> Our Foundation
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-serif text-4xl font-light leading-[1.05] text-ivory md:text-5xl">
                  What <em className="gold-text">Drives</em> Us
                </h2>
              </Reveal>
              <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {values.map((v, i) => (
                  <Reveal key={v.title} y={40} delay={0.16 + i * 0.06}>
                    <div className="group flex h-full flex-col bg-ink p-8 transition-colors duration-500 hover:bg-carbon/70 md:p-10">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                        <v.icon size={17} strokeWidth={1.5} />
                      </span>
                      <h2 className="mt-7 font-serif text-3xl font-light text-ivory md:text-4xl">
                        {v.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-mute">
                        {v.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </SectionReveal>

          <CTASection />
        </>
      )}
    </>
  );
}