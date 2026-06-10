'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Final immersive transition: Zoom into the logo to "enter" the site
          gsap.to(containerRef.current, {
            scale: 4,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            onComplete: onComplete
          });
        },
      });

      // 1. GAUSSIAN AWAKENING: Start with heavy blur and clarify
      tl.fromTo(containerRef.current,
        { opacity: 0, filter: 'blur(30px) brightness(0)' },
        { opacity: 1, filter: 'blur(0px) brightness(1)', duration: 3, ease: 'power2.inOut' },
        0
      );

      // 2. AMBIENT BLOOM: Moving gold gas clouds
      tl.to(glowRef.current, { opacity: 0.2, duration: 2 }, 0);
      gsap.to(glowRef.current, {
        scale: 1.8,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 3. LOGO CRYSTALLIZATION: Fades in from a blurred shadow
      tl.fromTo(logoWrapRef.current,
        { 
          opacity: 0, 
          scale: 0.85,
          filter: 'blur(20px) brightness(0)'
        },
        { 
          opacity: 1, 
          scale: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 2.5, 
          ease: 'expo.out' 
        },
        0.5
      );

      // 4. ELEGANT TAGLINE REVEAL: Stretching from wide spacing
      tl.fromTo(taglineRef.current,
        { opacity: 0, letterSpacing: '1.5em', filter: 'blur(10px)' },
        { opacity: 0.7, letterSpacing: '0.45em', filter: 'blur(0px)', duration: 2, ease: 'power3.out' },
        1.5
      );

      // 5. PROGRESS & COUNTER: Smooth synchronization
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0');
          if (barRef.current) barRef.current.style.transform = `scaleX(${counter.val / 100})`;
        },
      }, 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden select-none origin-center"
    >
      {/* Background ethereal light clouds */}
      <div
        ref={glowRef}
        className="absolute w-[150%] h-[150%] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(201,169,110,0.3) 0%, rgba(10,10,10,0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Main Content Group */}
      <div className="relative flex flex-col items-center">
        {/* Logo Container with Crystallization Effect */}
        <div
          ref={logoWrapRef}
          className="relative mb-12"
        >
          <img
            src="/images/logo-white.webp"
            alt="B LEADER"
            className="h-28 sm:h-36 md:h-44 w-auto"
            draggable={false}
          />
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-[10px] font-elegant tracking-[0.45em] text-[#c9a96e] italic uppercase mb-16"
        >
          Luxury Automotive
        </p>
      </div>

      {/* Minimalist Progress Indicator */}
      <div className="absolute bottom-20 flex flex-col items-center">
        <div className="w-32 h-[1px] bg-white/5 relative overflow-hidden mb-4">
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-[#c9a96e] to-[#d4af37] origin-left scale-x-0"
          />
        </div>
        <div className="flex items-baseline gap-1">
          <span ref={counterRef} className="text-[12px] font-heading font-light tracking-[0.2em] text-[#c9a96e]">000</span>
          <span className="text-[8px] font-heading tracking-[0.1em] text-white/20">%</span>
        </div>
      </div>
    </div>
  );
}
