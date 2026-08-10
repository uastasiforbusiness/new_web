"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * MotionLink: marries framer-motion's motion.* components with Next.js Link,
 * so cards can carry `initial`/`animate` props while staying proper <a> links.
 */
const MotionLink = motion.create(Link);

/**
 * 02 — The world we move in.
 *
 * A refined 3D coverflow wheel — intrigue device, never an information dump.
 * The active card dominates, side cards sit quietly behind it with a gentle
 * rotation and darkness (no blur smear). Autoplay, swipe, arrows, dots and
 * keyboard all supported; each card opens one door deeper into the site.
 */

interface CardData {
  id: number;
  badge?: string;
  label: string;
  title: string;
  subtitle?: string;
  body?: string;
  image?: string;
  /** CSS object-position so each collage's focal point centers in the frame */
  focus?: string;
  href: string;
  cta: string;
}

const CAROUSEL_ITEMS: CardData[] = [
  {
    id: 1,
    badge: "PREMIUM",
    label: "⚓ Yacht charter",
    title: "Nautical experiences",
    body: "Sail the crystal-clear waters of the Salento coast aboard our luxury yachts. Exclusive departures from Porto Gaio, Gallipoli — with routes to the wonders of Punta della Suina, Porto Cesareo, Santa Maria di Leuca, and the evocative shores of Greece.\n\nChoose your experience: half-day cruise, full day, sunset, or overnight on board — always with a professional skipper at your service.",
    href: "/experiences",
    cta: "Explore the sea",
  },
  {
    id: 2,
    label: "Card 2",
    title: "Pending content",
    body: "Waiting for your copy.",
    href: "/services",
    cta: "Discover",
  },
  {
    id: 3,
    label: "Card 3",
    title: "Pending content",
    body: "Waiting for your copy.",
    href: "/services",
    cta: "Discover",
  },
  {
    id: 4,
    label: "Card 4",
    title: "Pending content",
    body: "Waiting for your copy.",
    href: "/contact",
    cta: "Say hello",
  },
];

const AUTOPLAY_MS = 5200;

export default function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const count = CAROUSEL_ITEMS.length;

  const goTo = useCallback(
    (next: number) => setCurrentIndex(((next % count) + count) % count),
    [count],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  /* Autoplay — pauses while the visitor hovers the wheel or the page hides */
  useEffect(() => {
    if (hovering) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [currentIndex, hovering, next]);

  /* Keyboard navigation when the section is focused/visible */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const wrap = (i: number) => ((i % count) + count) % count;

  return (
    <section
      id="carousel"
      ref={sectionRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative flex min-h-[auto] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 md:min-h-screen md:py-24"
    >
      {/* Header */}
      <div className="relative z-20 mx-auto w-full max-w-5xl pb-10 pt-6 md:pb-14">
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

      {/* 3D coverflow wheel */}
      <div
        className="relative z-10 flex w-full max-w-[1400px] items-center justify-center"
        style={{ perspective: "2400px", minHeight: "clamp(430px, 125vw, 640px)" }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
        }}
      >
        {CAROUSEL_ITEMS.map((card, i) => {
          /* relative position of this card's index around the current one */
          let rel = wrap(i - currentIndex);
          if (rel > count / 2) rel -= count;

          const isActive = rel === 0;
          const absRel = Math.abs(rel);

          /* geometry: active centered & large; others rotated + pushed back */
          const rotateY = rel * 14;
          // On phones, keep the active card readable while letting adjacent cards peek in.
          const translateX = rel * (typeof window !== "undefined" && window.innerWidth < 768 ? 112 : 260);
          const translateZ = absRel * 180;
          const scale = isActive ? 1 : 1 - absRel * (typeof window !== "undefined" && window.innerWidth < 768 ? 0.06 : 0.09);
          const brightness = isActive ? 1 : 0.42 - (absRel - 1) * 0.16;
          const zIndex = 100 - absRel;

          return (
            <MotionLink
              key={card.id}
              href={card.href}
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isActive}
              className="absolute left-1/2 top-1/2 h-[min(118vw,480px)] min-h-[400px] w-[calc(100vw-48px)] max-w-[360px] overflow-hidden rounded-[18px] shadow-[0_40px_100px_rgba(0,0,0,0.55)] md:h-[620px] md:w-[464px]"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                x: `calc(${translateX}px - 50% + ${swipeX}px)`,
                y: "-50%",
                z: translateZ,
                rotateY,
                scale,
                filter: `brightness(${brightness})`,
                zIndex,
                opacity: isActive ? 1 : 0.55,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 22,
                mass: 1,
                filter: { duration: 0.55 },
              }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDrag={(e, info) => setSwipeX(info.offset.x)}
              onDragEnd={(e, info) => {
                setSwipeX(0);
                const dir = info.offset.x;
                const vel = info.velocity.x;
                if (dir < -60 || vel < -200) prev();
                else if (dir > 60 || vel > 200) next();
              }}
              style={{ transformStyle: "preserve-3d" }}
              whileHover={isActive ? { y: "-52%" } : undefined}
            >
              {/* Card art — black panel, gold hairline */}
              <div className="absolute inset-0 bg-[#0a0a0a]" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

              {/* Gold hairline on top edge */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

              {/* Copy — consistent layout on every card */}
              <div className="absolute inset-0 flex flex-col items-start justify-between overflow-y-auto p-6 pb-7 md:p-10">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    {card.badge && (
                      <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.45em] text-gold">
                        {card.badge}
                      </span>
                    )}
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-ivory/80">
                      {card.label}
                    </span>
                  </div>
                  {isActive && (
                    <span className="flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-gold/90">
                      {card.cta}
                      <ChevronRight size={12} />
                    </span>
                  )}
                </div>

                <div className="flex w-full flex-col">
                  <h3 className="font-serif text-[25px] font-light leading-[1.08] text-ivory md:text-[34px]">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <p className="mt-1 font-sans text-[12px] uppercase tracking-[0.28em] text-gold/90 md:text-[13px]">
                      {card.subtitle}
                    </p>
                  )}
                  <div className="mt-4 h-px w-10 bg-gold/60" />
                  {card.body && (
                    <div className="mt-3 max-w-[340px] space-y-3 font-sans text-[12.5px] leading-relaxed text-ivory/75 md:text-[13.5px]">
                      {card.body.split("\n\n").map((paragraph, pi) => (
                        <p key={pi}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </MotionLink>
          );
        })}
      </div>

      {/* Luxury controls */}
      <div className="relative z-20 mt-10 flex items-center gap-8 md:gap-10">
        <button
          onClick={prev}
          aria-label="Previous mood"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold backdrop-blur-sm transition-all duration-500 hover:border-gold hover:bg-gold/10 active:scale-95"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2.5">
          {CAROUSEL_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to mood ${i + 1}`}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === currentIndex ? 26 : 6,
                height: 6,
                background:
                  i === currentIndex
                    ? "linear-gradient(90deg, #c9a96e, #e4cba3)"
                    : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next mood"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold backdrop-blur-sm transition-all duration-500 hover:border-gold hover:bg-gold/10 active:scale-95"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Quiet nudge to keep exploring */}
      <p className="relative z-20 mt-8 text-[11px] uppercase tracking-[0.4em] text-mute">
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
