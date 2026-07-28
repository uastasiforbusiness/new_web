'use client';

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import {
  HERO_SLIDES,
  getRandomTransition,
  type HeroImageSlide,
  type TransitionType,
} from './hero-images';
import { CinematicTransition } from './cinematic-transition';
import { TextReel } from './text-reel';

export function ImageSequence() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [transitionType, setTransitionType] = useState<TransitionType>('circle-reveal');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect reduced motion via useSyncExternalStore (no setState-in-effect).
  const reducedMotion = useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false // server snapshot
  );

  const startTimer = useCallback(() => {
    const slide = HERO_SLIDES[currentIndex];
    timerRef.current = setTimeout(() => {
      const nextIdx = (currentIndex + 1) % HERO_SLIDES.length;
      setNextIndex(nextIdx);
      setIsTransitioning(true);
      setTransitionType(getRandomTransition());
    }, slide.duration);
  }, [currentIndex]);

  useEffect(() => {
    if (!isTransitioning) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, isTransitioning, startTimer]);

  const handleTransitionComplete = useCallback(() => {
    if (nextIndex !== null) {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
      setIsTransitioning(false);
    }
  }, [nextIndex]);

  const current: HeroImageSlide = HERO_SLIDES[currentIndex];
  const next: HeroImageSlide | null =
    nextIndex !== null ? HERO_SLIDES[nextIndex] : null;

  return (
    <>
      {/* Background images with morph transition */}
      <div className="absolute inset-0">
        <CinematicTransition
          current={current}
          next={next}
          transitionType={transitionType}
          onComplete={handleTransitionComplete}
          reducedMotion={reducedMotion}
        />
        {/* Fixed overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Text with key to force re-mount on slide change */}
      <TextReel
        key={currentIndex}
        headline={current.headline}
        subtitle={current.subtitle}
        description={current.description}
        tagline="Est. 2023 — Puglia, Italy"
        reducedMotion={reducedMotion}
      />
    </>
  );
}