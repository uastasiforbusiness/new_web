'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      if (video.paused && video.readyState >= 2) {
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', attemptPlay, { once: true });
    }

    const handleInteraction = () => {
      attemptPlay();
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(titleRef.current,
        { opacity: 0, scale: 0.02 },
        { opacity: 1, scale: 1, duration: 2, ease: 'power1.out' },
        0,
      );

      gsap.to(titleRef.current, {
        backgroundPosition: '200% center',
        duration: 6,
        ease: 'none',
        repeat: -1,
      });

      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 12 },
        { opacity: 0.6, y: 0, duration: 1, ease: 'power2.out' },
        1.6,
      );

      tl.to(sectionRef.current,
        { opacity: 0, duration: 1, ease: 'power2.inOut' },
        3.8,
      );

      tl.call(() => onComplete(), [], 4.8);
    }, sectionRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <section ref={sectionRef} className="fixed inset-0 z-[90] h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <video
        ref={videoRef}
        src="/videos/Red_Ferrari_California_rotating_202606212205.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-bg.webp"
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 10, 10, 0.35) 0%, rgba(10, 10, 10, 0.78) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-6">
        <h1
          ref={titleRef}
          className="font-elegant text-[64px] md:text-[120px] font-light leading-none"
          style={{
            background: 'linear-gradient(110deg, #c9a96e 0%, #f5e6c8 50%, #c9a96e 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            opacity: 0,
          }}
        >
          B LEADER
        </h1>
        <p
          ref={subtitleRef}
          className="font-sans text-[10px] md:text-[12px] tracking-[0.45em] md:tracking-[0.6em] uppercase mt-4"
          style={{ opacity: 0 }}
        >
          The Apex of Movement
        </p>
      </div>
    </section>
  );
}
