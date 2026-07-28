'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { type HeroImageSlide, type TransitionType } from './hero-images';

interface Props {
  current: HeroImageSlide;
  next: HeroImageSlide | null;
  transitionType: TransitionType;
  onComplete: () => void;
  reducedMotion?: boolean;
}

const TRANSITION_DURATION = 1.8;

export function CinematicTransition({
  current,
  next,
  transitionType,
  onComplete,
  reducedMotion = false,
}: Props) {
  const revealRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!next || !revealRef.current || reducedMotion) {
      onComplete();
      return;
    }

    const el = revealRef.current;
    gsap.set(el, { clearProps: 'clipPath' });

    const clipPaths: Record<TransitionType, { from: string; to: string }> = {
      'circle-reveal': {
        from: 'circle(0% at 50% 50%)',
        to: 'circle(150% at 50% 50%)',
      },
      'golden-sweep': {
        from: 'inset(0 100% 0 0)',
        to: 'inset(0 0% 0 0)',
      },
      'organic-ripple': {
        from: 'circle(0% at 30% 50%)',
        to: 'circle(150% at 30% 50%)',
      },
      'scale-blur': {
        from: 'inset(50% 50% 50% 50%)',
        to: 'inset(0% 0% 0% 0%)',
      },
    };

    const { from, to } = clipPaths[transitionType];
    gsap.set(el, { clipPath: from, WebkitClipPath: from });

    const tl = gsap.timeline({ onComplete });
    tl.to(el, {
      clipPath: to,
      WebkitClipPath: to,
      duration: TRANSITION_DURATION,
      ease: 'power3.inOut',
    });

    return () => { tl.kill(); };
  }, [next, transitionType, onComplete, reducedMotion]);

  // Ken Burns on current image
  useEffect(() => {
    const img = containerRef.current?.querySelector('.ken-burns-current');
    if (!img || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { scale: 1 },
        { scale: 1.08, duration: 5.5, ease: 'power1.out' },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [current, reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Current image always visible */}
      <div className="absolute inset-0 ken-burns-current" style={{ willChange: 'transform' }}>
        <Image
          src={current.src}
          alt={current.alt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          style={{ filter: 'brightness(0.72) saturate(0.9)' }}
        />
      </div>

      {/* Next image revealed via clip-path */}
      {next && (
        <div
          ref={revealRef}
          className="absolute inset-0"
          style={{ willChange: 'clip-path' }}
        >
          <Image
            src={next.src}
            alt={next.alt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            style={{ filter: 'brightness(0.72) saturate(0.9)' }}
          />
        </div>
      )}
    </div>
  );
}