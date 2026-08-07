"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * MotionLink: marries framer-motion's motion.* components with Next.js Link,
 * so cards can carry `initial`/`animate` props while staying proper <a> links.
 */
const MotionLink = motion.create(Link);

/**
 * 02 — The world we move in.
 *
 * A restructured 3D card wheel that works as an intrigue device, not an
 * information dump: each card is one mood, one line, and one door into the
 * site (Fleet, Experiences, Services, Concierge). Nothing is duplicated from
 * the specialized pages — the goal is to make the visitor want to keep
 * navigating.
 */

interface CardData {
  id: number;
  label: string;
  title: string;
  mood: string;
  image: string;
  href: string;
  cta: string;
}

const CAROUSEL_ITEMS: CardData[] = [
  {
    id: 1,
    label: "The fleet",
    title: "Machines with an accent",
    mood: "Ferrari, Maserati, and the open road of Salento.",
    image: "/images/card1_collage.webp",
    href: "/fleet",
    cta: "Meet the fleet",
  },
  {
    id: 2,
    label: "By sea",
    title: "Sunset off Gallipoli",
    mood: "The Cranchi flybridge, the Ionian, and slow evenings at anchor.",
    image: "/images/card2_collage.webp",
    href: "/experiences",
    cta: "Explore the sea",
  },
  {
    id: 3,
    label: "On land",
    title: "Let someone else drive",
    mood: "Chauffeured days along Puglia's cliffs and olive groves.",
    image: "/images/card3_collage.webp",
    href: "/services",
    cta: "Chauffeured days",
  },
  {
    id: 4,
    label: "Private occasions",
    title: "A proposal on the bow",
    mood: "Weddings, proposals, and celebrations, arranged end to end.",
    image: "/images/card4_collage.webp",
    href: "/services",
    cta: "Plan an occasion",
  },
  {
    id: 5,
    label: "Your concierge",
    title: "One message away",
    mood: "A person answers — in English — within two hours.",
    image: "/images/card5_collage.webp",
    href: "/contact",
    cta: "Say hello",
  },
];

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = CAROUSEL_ITEMS.length;

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % count);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + count) % count);

  return (
    <section
      id="carousel"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24"
    >
      {/* Moody background — the wheel's backdrop, kept intentionally dark and soft */}
      <img
        src="/back_cards_whells.jpeg"
        alt=""
        draggable={false}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[#0d0c0a]/55" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.3)_0%,rgba(15,23,42,0.8)_100%)] opacity-80 blur-3xl" />

      {/* Header */}
      <div className="relative z-20 mx-auto w-full max-w-5xl pb-8 pt-6 md:pb-12">
        <div className="flex flex-col items-center text-center">
          <RevealLine>
            <span className="h-px w-12 bg-gold/70" aria-hidden />
          </RevealLine>
          <RevealLine delay={0.08}>
            <p className="mt-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              02 — The world we move in
            </p>
          </RevealLine>
          <RevealLine delay={0.14}>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl">
              Five moods,
              <br className="md:hidden" /> <em className="gold-text">one standard.</em>
            </h2>
          </RevealLine>
        </div>
      </div>

      {/* 3D wheel */}
      <div
        className="relative z-10 flex h-[520px] w-full max-w-5xl items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {[...Array(5)].map((_, slot) => {
          const offset = slot - 2;
          const wrap = (i: number) => ((i % count) + count) % count;
          const card = CAROUSEL_ITEMS[wrap(currentIndex + offset)];
          const isActive = offset === 0;

          const rotateY = -offset * 30;
          const translateX = offset * 150;
          const translateZ = -Math.abs(offset) * 130;
          const scale = 1 - Math.abs(offset) * 0.12;
          const zIndex = 10 - Math.abs(offset);
          const opacity = isActive ? 1 : 0.35;

          return (
            <MotionLink
              key={card.id}
              href={card.href}
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isActive}
              className={`absolute h-[440px] w-[300px] cursor-pointer overflow-hidden rounded-[20px] backdrop-blur-md transition-all duration-500 ease-out will-change-transform ${
                isActive
                  ? "border border-gold/30 shadow-[0_24px_80px_rgba(201,169,110,0.18)]"
                  : "pointer-events-none border border-white/10 blur-[1px]"
              }`}
              initial={{ opacity: 0, scale: 0.8, rotateY: offset * 45 }}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY,
                scale,
                zIndex,
                opacity,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: Math.abs(offset) * 0.08,
              }}
              style={{
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(180deg, rgba(26,26,26,0.92) 0%, rgba(10,10,10,0.96) 100%)",
              }}
            >
              {card.image && (
                <>
                  <img
                    src={card.image}
                    alt={card.title}
                    draggable={false}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/50 to-[#0a0a0a]/25" />
                </>
              )}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,110,0.08),transparent_60%)]" />

              <div className="relative flex h-full w-full flex-col justify-end p-8 pb-9">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
                  {card.label}
                </span>
                <h3 className="mt-3 font-serif text-[26px] font-light leading-[1.15] text-ivory">
                  {card.title}
                </h3>
                <div className="mt-4 h-px w-10 bg-gold/60" />
                <p className="mt-3 font-sans text-[13.5px] leading-relaxed text-ivory/70">
                  {card.mood}
                </p>
                <span className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gold">
                  {card.cta}
                  <ArrowRight size={13} className="transition-transform duration-500 group-hover:translate-x-2" />
                </span>
              </div>
            </MotionLink>
          );
        })}
      </div>

      {/* Controls */}
      <div className="relative z-20 mt-10 flex items-center gap-8">
        <button
          onClick={handlePrev}
          aria-label="Previous mood"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-95"
        >
          ←
        </button>
        <div className="flex gap-3">
          {CAROUSEL_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to mood ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? "w-8 bg-gold" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          aria-label="Next mood"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-95"
        >
          →
        </button>
      </div>

      {/* Quiet nudge to keep exploring */}
      <p className="relative z-20 mt-10 text-[11px] uppercase tracking-[0.4em] text-mute">
        Every mood has a deeper story — keep scrolling
      </p>
    </section>
  );
}

/** Small staggered reveal helper so the header lands like the rest of the page */
function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
