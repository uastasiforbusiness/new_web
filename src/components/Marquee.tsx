"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ITEMS = [
  "Ferrari California T",
  "Maserati Ghibli",
  "Mercedes E Cabrio",
  "Cranchi Atlantique 50",
  "Salento Supercar Tour",
  "Weddings · Corporate · Events",
];

gsap.registerPlugin(ScrollTrigger);

/** Infinite editorial ticker with subtle scroll-driven parallax. */
export default function Marquee() {
  useEffect(() => {
    const track = document.querySelector("[data-marquee-track]");
    if (!track) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth / 2) * (isMobile ? 0.04 : 0.15),
        ease: "none",
        scrollTrigger: {
          trigger: track.closest("[data-marquee-root]"),
          start: "top bottom",
          end: "bottom top",
          scrub: isMobile ? 0.5 : 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      data-marquee-root
      className="relative overflow-hidden border-y border-line bg-coal py-5"
      aria-hidden
    >
      <div
        data-marquee-track
        className="flex w-max animate-marquee items-center gap-10"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10">
            {ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-10">
                <span className="whitespace-nowrap font-display text-sm font-light uppercase tracking-[0.42em] text-sand">
                  {item}
                </span>
                <span className="diamond text-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
