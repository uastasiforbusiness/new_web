'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { MagneticButton } from './magnetic-button';

export function HeroScaleDown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: ((i * 37 + 13) % 100),
    top: ((i * 53 + 7) % 100),
    opacity: (i % 5 + 1) * 0.06 + 0.05,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      tl.fromTo(imageRef.current,
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1 },
        {
          clipPath: 'inset(3% 3% 3% 3% round 24px)',
          scale: 0.82,
          ease: 'none', duration: 1,
        },
        0
      );

      tl.fromTo(glowRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 0.6 },
        0.3
      );

      tl.fromTo(textRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -80, ease: 'none', duration: 0.5 },
        0
      );

      tl.fromTo(revealRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.5 },
        0.55
      );

      if (particlesRef.current) {
        const dots = particlesRef.current.querySelectorAll('.ambient-dot');
        dots.forEach((dot) => {
          gsap.to(dot, {
            y: `random(-30, 30)`,
            x: `random(-20, 20)`,
            opacity: `random(0.1, 0.4)`,
            duration: `random(3, 6)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: `random(0, 3)`,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 z-[5] pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="ambient-dot absolute w-[2px] h-[2px] bg-[#c9a96e] rounded-full"
            style={{ left: `${p.left}%`, top: `${p.top}%`, opacity: p.opacity }}
          />
        ))}
      </div>

      <div ref={imageRef} className="hero-scale-container absolute inset-0">
        <img
          src="/images/hero-bg.webp"
          alt="Ferrari California in luxury showroom"
          className="w-full h-full object-cover scale-100"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div
        ref={glowRef}
        className="absolute inset-[3%] rounded-3xl border border-[#c9a96e]/20 z-[3] pointer-events-none"
        style={{ opacity: 0, boxShadow: '0 0 60px rgba(201,169,110,0.08), inset 0 0 60px rgba(201,169,110,0.03)' }}
      />

      <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <p className="text-[10px] sm:text-xs font-heading font-semibold tracking-[0.6em] text-[#c9a96e] mb-5 sm:mb-8 uppercase">
            ✦&nbsp;&nbsp;Experience Luxury&nbsp;&nbsp;✦
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] xl:text-[9rem] font-elegant font-light tracking-wide text-white leading-[0.85] mb-5 sm:mb-8 italic">
            <span className="block">Drive</span>
            <span className="block shimmer-text">Your Dream</span>
          </h1>
          <p className="text-sm sm:text-base font-body font-light text-[#999] max-w-md mx-auto mb-8 sm:mb-12 tracking-wide">
            Premium fleet. Unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="#fleet"
              className="px-9 py-4 bg-gradient-to-r from-[#c9a96e] to-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] hover:shadow-[0_0_35px_rgba(201,169,110,0.35)] transition-shadow duration-500"
              strength={0.15}
            >
              EXPLORE FLEET <ArrowRight size={14} className="ml-2" />
            </MagneticButton>
            <MagneticButton
              href="#experience"
              className="px-9 py-4 border border-white/25 hover:border-[#c9a96e]/50 text-white text-[11px] font-heading font-bold tracking-[0.25em] transition-all duration-500 hover:bg-white/5"
              strength={0.15}
            >
              <Play size={12} className="mr-2" /> WATCH REEL
            </MagneticButton>
          </div>
        </div>
      </div>

      <div ref={revealRef} className="absolute bottom-10 sm:bottom-14 left-0 right-0 z-10 px-4" style={{ opacity: 0 }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <p className="text-[9px] font-heading tracking-[0.4em] text-[#c9a96e] mb-2">FEATURED VEHICLE</p>
            <h3 className="text-2xl sm:text-4xl font-elegant font-light tracking-wide text-white italic">Ferrari California</h3>
            <p className="text-sm font-body text-[#777] mt-1">Rossa Corsa — From €890/day</p>
          </div>
          <div className="flex items-center gap-8 sm:gap-10">
            {[
              { val: '460', label: 'HP' },
              { val: '3.9s', label: '0-100' },
              { val: '310', label: 'KM/H' },
            ].map((spec, i) => (
              <div key={spec.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-[1px] h-10 bg-[#333]" />}
                <div className="text-right">
                  <p className="text-2xl sm:text-3xl font-heading font-bold bg-gradient-to-b from-[#c9a96e] to-[#b8943e] bg-clip-text text-transparent">{spec.val}</p>
                  <p className="text-[9px] font-heading tracking-[0.2em] text-[#555]">{spec.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[8px] font-heading tracking-[0.4em] text-[#444]">SCROLL</span>
        <ChevronDown size={12} className="text-[#c9a96e]/50 animate-bounce-slow" />
      </div>
    </section>
  );
}
