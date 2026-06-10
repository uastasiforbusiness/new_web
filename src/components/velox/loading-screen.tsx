'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const borderTopRef = useRef<HTMLDivElement>(null);
  const borderBottomRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setTimeout(onComplete, 400),
      });

      // 1. Golden glow fades in behind logo
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
        0
      );

      // 2. Logo scales up from small with a subtle bounce
      tl.fromTo(logoWrapRef.current,
        { opacity: 0, scale: 0.3, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power4.out' },
        0.1
      );

      // 3. Golden border corners draw in
      tl.fromTo(borderTopRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        0.4
      );
      tl.fromTo(borderBottomRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        0.4
      );

      // 4. Shimmer sweep across the logo
      tl.fromTo(shimmerRef.current,
        { x: '-120%' },
        { x: '220%', duration: 1.2, ease: 'power2.inOut' },
        0.6
      );

      // 5. Tagline fades in below with elegant serif entrance
      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 15, letterSpacing: '0.6em' },
        { opacity: 1, y: 0, letterSpacing: '0.45em', duration: 1, ease: 'power3.out' },
        1.8
      );

      // 5b. Decorative diamond fades in after tagline
      tl.fromTo(diamondRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 0.4, scale: 1, duration: 0.5, ease: 'back.out(2)' },
        2.3
      );

      // 6. Progress bar fills
      tl.fromTo(barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'expo.inOut' },
        0.8
      );

      // 7. Counter goes from 0 to 100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.5,
        ease: 'expo.inOut',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0');
        },
      }, 0.8);

      // 8. Background warms up slightly
      tl.fromTo(containerRef.current,
        { backgroundColor: '#0a0a0a' },
        { backgroundColor: '#0f0d09', duration: 0.3 },
        2.0
      );

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }} />

      {/* Vertical dividers */}
      <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c9a96e]/5 to-transparent" />
      <div className="absolute right-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c9a96e]/5 to-transparent" />

      {/* Logo section */}
      <div className="relative flex flex-col items-center mb-20">
        {/* Golden glow behind logo */}
        <div
          ref={glowRef}
          className="absolute -inset-20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,169,110,0.15) 0%, rgba(201,169,110,0.05) 40%, transparent 70%)',
          }}
        />

        {/* Top border line */}
        <div className="relative mb-6 overflow-hidden" style={{ width: '220px', height: '1px' }}>
          <div
            ref={borderTopRef}
            className="h-full bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Logo with shimmer */}
        <div
          ref={logoWrapRef}
          className="relative"
          style={{ opacity: 0 }}
        >
          <img
            src="/images/logo-white.webp"
            alt="B LEADER"
            className="h-24 sm:h-28 md:h-36 w-auto"
            draggable={false}
          />
          {/* Shimmer overlay */}
          <div
            ref={shimmerRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, transparent 30%, rgba(201,169,110,0.3) 45%, rgba(212,175,55,0.4) 50%, rgba(201,169,110,0.3) 55%, transparent 70%)',
              mixBlendMode: 'overlay',
            }}
          />
        </div>

        {/* Bottom border line */}
        <div className="relative mt-6 overflow-hidden" style={{ width: '220px', height: '1px' }}>
          <div
            ref={borderBottomRef}
            className="h-full bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-6 text-[9px] font-elegant tracking-[0.45em] text-[#c9a96e]/60 italic"
          style={{ opacity: 0 }}
        >
          Luxury Automotive
        </p>

        {/* Decorative diamond */}
        <div
          ref={diamondRef}
          className="mt-3 text-[#c9a96e] text-[6px]"
          style={{ opacity: 0 }}
        >
          ◆
        </div>
      </div>

      {/* Progress section */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-40 sm:w-52 h-[1px] bg-[#222] relative overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-[#c9a96e] to-[#d4af37] origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <div className="flex items-center gap-3 mt-4">
          <span ref={counterRef} className="text-[10px] font-heading tracking-[0.3em] text-[#c9a96e]">000</span>
          <span className="text-[9px] font-heading tracking-[0.2em] text-[#444]">/ 100</span>
        </div>
      </div>
    </div>
  );
}
