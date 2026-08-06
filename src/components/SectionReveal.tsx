"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  start?: string;
  accentLine?: boolean;
};

/** Section-level entrance with optional gold accent line and child-aware container. */
export default function SectionReveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  start = "top 90%",
  accentLine = false,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, clipPath: "inset(0 0 0% 0)" });
      return;
    }

    const line = el.querySelector<HTMLElement>("[data-section-accent]");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start, once: true },
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      el,
      { opacity: 0, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, clipPath: "inset(0 0 0% 0)", duration, delay },
    );

    if (line) {
      tl.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: duration * 0.8, ease: "power2.out" },
        "-=0.55",
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [delay, duration, start]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {accentLine && (
        <span
          data-section-accent
          className="block h-px w-12 origin-left bg-gold/80"
        />
      )}
      {children}
    </div>
  );
}
