'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageSequence } from '../hero/image-sequence';

/* ─── Shimmer keyframes inyectados ─── */
const shimmerKeyframes = `
@keyframes elegant-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

export function HeroScaleDown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ═══════════ GSAP scroll scale-down ═══════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        contentRef.current,
        {
          clipPath: 'inset(3% 3% 3% 3% round 24px)',
          scale: 0.88,
          borderRadius: '24px',
          ease: 'none',
          duration: 1,
        },
        0,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ═══════════ Shimmer injection ═══════════ */
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = shimmerKeyframes;
    document.head.appendChild(styleEl);

    return () => {
      styleEl.remove();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden border-b border-[#222] bg-[#0a0a0a] md:h-screen"
    >
      {/* Content that scales down on scroll */}
      <div
        ref={contentRef}
        className="absolute inset-0 overflow-hidden"
        style={{ willChange: 'clip-path, transform' }}
      >
        <ImageSequence />
      </div>
    </section>
  );
}