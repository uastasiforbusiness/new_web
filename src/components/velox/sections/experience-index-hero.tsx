'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function ExperienceIndexHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.animate-in',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0e0a0a] to-[#0a0a0a]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 30% 30%, #c9a96e11 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, #d4000011 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="animate-in text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-semibold mb-6">
          B LEADER
        </p>
        <h1
          className="animate-in text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.92] mb-6"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          Experiences
        </h1>
        <p
          className="animate-in text-xl sm:text-2xl italic text-[#c9a96e] mb-8"
          style={{ fontFamily: 'var(--font-cormorant), serif' }}
        >
          Four ways to fall in love with Salento
        </p>
        <p className="animate-in text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          From the cockpit of a Ferrari to the deck of a private yacht — each
          journey is crafted around a single belief: that the best memories are
          the ones you feel.
        </p>
      </div>
    </section>
  );
}