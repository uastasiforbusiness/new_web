'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  headline: string;
  subtitle: string;
  description: string;
  tagline: string;
  reducedMotion?: boolean;
}

export function TextReel({
  headline,
  subtitle,
  description,
  tagline,
  reducedMotion = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.fromTo(
          containerRef.current!.children,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, stagger: 0.1 },
        );
        return;
      }

      // Split headline chars
      const headlineEl = containerRef.current!.querySelector('.split-headline');
      if (headlineEl) {
        const chars = headlineEl.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { y: 40, opacity: 0, rotateX: -90 },
          {
            y: 0, opacity: 1, rotateX: 0,
            duration: 0.6, stagger: 0.03,
            ease: 'back.out(1.4)',
          },
        );
      }

      // Subtitle
      const subtitleEl = containerRef.current!.querySelector('.reel-subtitle');
      if (subtitleEl) {
        gsap.fromTo(
          subtitleEl,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out' },
        );
      }

      // Description per-word stagger
      const descEl = containerRef.current!.querySelector('.reel-description');
      if (descEl) {
        const words = descEl.querySelectorAll('.word');
        gsap.fromTo(
          words,
          { y: 15, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.4, stagger: 0.04, delay: 0.3,
            ease: 'power2.out',
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [headline, subtitle, description, reducedMotion]);

  const splitChars = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ willChange: 'transform, opacity' }}>
        {char === ' ' ? ' ' : char}
      </span>
    ));

  const splitWords = (text: string) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block" style={{ willChange: 'transform, opacity' }}>
        {word}
        {i < text.split(' ').length - 1 && ' '}
      </span>
    ));

  return (
    <div
      ref={containerRef}
      className="relative z-20 h-full w-full flex flex-col justify-center px-6 sm:px-12 md:px-14 lg:px-20"
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Tagline */}
        <p
          className="text-[#b8943e] tracking-[0.4em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] uppercase"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          {tagline}
        </p>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9] tracking-tighter"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          <span className="block split-headline">{splitChars(headline)}</span>
          <span className="block reel-subtitle mt-1">
            <span
              style={{
                background:
                  'linear-gradient(110deg, #c9a96e 0%, #e6c875 20%, #f5e6c8 40%, #e6c875 60%, #c9a96e 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {subtitle}
            </span>
          </span>
        </h1>

        {/* Description */}
        <p className="reel-description text-gray-200 font-light max-w-xs sm:max-w-sm leading-relaxed text-sm sm:text-base">
          {splitWords(description)}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-6 sm:left-12 md:left-14 lg:left-20">
        <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] tracking-widest text-gray-300 font-medium">
          <span>01</span>
          <div className="w-8 sm:w-10 h-px bg-white/30" />
          <span>THE ARRIVAL</span>
        </div>
      </div>
    </div>
  );
}