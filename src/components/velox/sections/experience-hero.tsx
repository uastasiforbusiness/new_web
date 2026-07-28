'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { type Experience } from '@/data/experiences';

interface Props {
  experience: Experience;
}

export function ExperienceHero({ experience }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      );
      gsap.fromTo(
        '.hero-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Gradient background instead of missing image */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, #0a0a0a 0%, ${
            experience.color === '#d40000' ? '#1c0a0a' : '#0a1628'
          } 40%, #0a0a0a 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${experience.color}22 0%, transparent 50%)`,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Content */}
      <div className="hero-content relative z-20 h-full w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-4xl">
        <div className="space-y-6">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/5 text-[#c9a96e] text-[10px] font-heading font-semibold tracking-[0.25em] uppercase">
            <span>✦</span>
            <span>Exclusive Experience</span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-tight"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            {experience.title.split(' ').map((word, i) => (
              <span key={i} className="block text-white">
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl md:text-3xl italic text-[#c9a96e] font-light"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            {experience.subtitle}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>🕒</span>
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>📍</span>
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className="font-bold text-lg"
                style={{ color: experience.color }}
              >
                {experience.price}
              </span>
              {experience.priceLabel && (
                <span className="text-gray-500 text-xs">
                  / {experience.priceLabel}
                </span>
              )}
            </div>
          </div>

          {/* Concept */}
          <p className="text-gray-300 font-light leading-relaxed max-w-lg text-sm sm:text-base border-l-2 border-[#c9a96e] pl-4">
            {experience.concept}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-widest text-gray-500 uppercase animate-bounce">
        <span>Discover the journey</span>
        <span className="text-lg">↓</span>
      </div>
    </section>
  );
}