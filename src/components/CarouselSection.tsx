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
  label: string;
  title: string;
  mood: string;
  image: string;
  /** CSS object-position so each collage's focal point centers in the frame */
  focus: string;
  href: string;
  cta: string;
}

const CAROUSEL_ITEMS: CardData[] = [
  {
    id: 1,
    label: "The fleet",
    title: "Machines with an accent",
    mood: "Your pulse rises before the key even turns.",
    image: "/images/card1_collage.webp",
    focus: "center 70%",
    href: "/fleet",
    cta: "Meet the fleet",
  },
  {
    id: 2,
    label: "By sea",
    title: "Sunset off Gallipoli",
    mood: "The moment the sun touches the water, everything else goes quiet.",
    image: "/images/card2_collage.webp",
    focus: "center 55%",
    href: "/experiences",
    cta: "Explore the sea",
  },
  {
    id: 3,
    label: "On land",
    title: "Let someone else drive",
    mood: "The whole coast unfolds in front of you — no map, no decisions, just the view.",
    image: "/images/card3_collage.webp",
    focus: "center 48%",
    href: "/services",
    cta: "Chauffeured days",
  },
  {
    id: 4,
    label: "Private occasions",
    title: "A proposal on the bow",
    mood: "The moment they say yes — and the one after, when you remember why you planned it.",
    image: "/images/card4_collage.webp",
    focus: "center 55%",
    href: "/services",
    cta: "Plan an occasion",
  },
  {
    id: 5,
    label: "Your concierge",
    title: "One message away",
    mood: "You never have to figure it out alone. Someone already has.",
    image: "/images/card5_collage.webp",
    focus: "center 40%",
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
      {/* Calm, near-black backdrop so the cards float */}
      <img
        src="/back_cards_whells.jpeg"
        alt=""
        draggable={false}
        aria-hidden
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 z-0 bg-[#0a0908]/82" />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(201,169,110,0.06) 0%, transparent 55%)",
        }}
      />

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
              {/* Card art */}
              <img
                src={card.image}
                alt={card.title}
                draggable={false}
                className="absolute inset-[-4%] h-[108%] w-[108%] object-cover"
                style={{ objectPosition: card.focus }}
              />
              {/* Reading gradient — guaranteed contrast for the copy */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/97 via-[#0a0908]/35 to-[#0a0908]/10" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

              {/* Gold hairline on top edge */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

              {/* Copy — consistent layout on every card */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 pb-7 md:p-10">
                <div className="flex w-full items-center justify-between">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold">
                    {String(i + 1).padStart(2, "0")} · {card.label}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-gold/90">
                      {card.cta}
                      <ChevronRight size={12} />
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-serif text-[25px] font-light leading-[1.08] text-ivory md:mt-4 md:text-[32px]">
                  {card.title}
                </h3>
                <div className="mt-4 h-px w-10 bg-gold/60" />
                <p className="mt-3 max-w-[340px] font-sans text-[12.5px] leading-relaxed text-ivory/75 md:text-[13.5px]">
                  {card.mood}
                </p>
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
