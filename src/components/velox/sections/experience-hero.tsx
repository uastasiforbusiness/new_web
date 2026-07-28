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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
      )
        .fromTo(
          '.hero-title-line',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
          '-=0.3',
        )
        .fromTo(
          '.hero-subtitle',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4',
        )
        .fromTo(
          '.hero-meta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.3',
        )
        .fromTo(
          '.hero-concept',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.2',
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate a unique gradient per experience
  const isAuto = experience.color === '#d40000';
  const gradientFrom = isAuto ? '#1c0a0a' : '#0a1628';
  const gradientVia = isAuto ? '#2a0a0a' : '#0a1a30';

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Cinematic gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${gradientFrom} 0%, ${gradientVia} 30%, #0a0a0a 70%)`,
        }}
      />

      {/* Radial glow — accent color */}
      <div
        className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 rounded-full opacity-[0.12]"
        style={{
          background: `radial-gradient(circle, ${experience.color} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle golden accent line — brand signature */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 h-full w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-4xl">
        <div className="space-y-5">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#c9a96e]/20 bg-[#c9a96e]/5 text-[#c9a96e] text-[10px] font-heading font-semibold tracking-[0.25em] uppercase">
            <span>✦</span>
            <span>Exclusive Experience</span>
          </div>

          {/* Title — each word is a line */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.92] tracking-tight text-white"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            {experience.title.split(' ').map((word, i) => (
              <span key={i} className="hero-title-line block">
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle — italic cormorant for elegance */}
          <p
            className="hero-subtitle text-xl sm:text-2xl md:text-3xl italic text-[#c9a96e] font-light"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            {experience.subtitle}
          </p>

          {/* Meta info */}
          <div className="hero-meta flex flex-wrap gap-6 pt-1">
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
                <span className="text-gray-500 text-xs">/{experience.priceLabel}</span>
              )}
            </div>
          </div>

          {/* Concept — short + punchy */}
          <p className="hero-concept text-gray-300 font-light leading-relaxed max-w-md text-sm sm:text-base border-l border-[#c9a96e]/40 pl-4">
            {experience.concept}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9px] tracking-[0.3em] text-gray-500 uppercase font-heading">
        <span className="animate-bounce inline-block">↓</span>
        <span>Scroll</span>
      </div>
    </section>
  );
}