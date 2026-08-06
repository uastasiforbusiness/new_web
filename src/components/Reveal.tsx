"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  as?: "div" | "span" | "li" | "figure";
};

/** GSAP scroll-triggered reveal. Fades children up into view once. */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 44,
  duration = 1.1,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const start = isMobile ? "top 92%" : "top 88%";

    let tween: gsap.core.Tween | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;

    const register = () => {
      tween = gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    };

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              timeoutId = setTimeout(() => register(), 0);
              observer?.disconnect();
            }
          });
        },
        { rootMargin: "0px 0px 20% 0px" },
      );
      observer.observe(el);
    } else {
      timeoutId = setTimeout(() => register(), 0);
    }

    return () => {
      observer?.disconnect();
      clearTimeout(timeoutId);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [delay, y, duration, start]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
