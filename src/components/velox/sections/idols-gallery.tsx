'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Cpu, Zap } from 'lucide-react';
import { cars } from '../data';

// ─── Helper: extract brand name for watermark ───
function getBrand(name: string): string {
  if (name.toLowerCase().startsWith('ferrari')) return 'FERRARI';
  if (name.toLowerCase().startsWith('maserati')) return 'MASERATI';
  if (name.toLowerCase().startsWith('mercedes')) return 'MERCEDES';
  if (name.toLowerCase().startsWith('cranchi')) return 'CRANCHI';
  return name.split(' ')[0].toUpperCase();
}

export function IdolsGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLDivElement>('.idol-slide');
      if (slides.length === 0) return;

      // ─── Responsive: desktop horizontal scroll, mobile vertical ───
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          const container = containerRef.current;
          if (!container) return () => {};

          const st = gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: 1,
              end: () => `+=${container.scrollWidth - window.innerWidth}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          return () => {
            st.scrollTrigger?.kill();
            st.kill();
          };
        },

        '(max-width: 1023px)': () => {
          // CSS handles vertical stacking
          return () => {};
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex flex-col w-full lg:flex-row lg:flex-nowrap lg:h-screen"
      >
        {/* ═══════════════════════════════════════════════════
            SLIDE 0 — INTRO
            ═══════════════════════════════════════════════════ */}
        <div className="idol-slide w-full lg:w-screen lg:h-screen lg:flex-shrink-0 flex items-center px-6 sm:px-10 lg:px-24 py-24 lg:py-0 relative overflow-hidden bg-[#0a0a0a]">
          {/* Background watermark */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none hidden lg:block">
            <span className="font-elegant text-[clamp(200px,40vw,500px)] leading-none text-white">
              01
            </span>
          </div>
          <div className="absolute -right-10 top-10 opacity-[0.02] pointer-events-none select-none lg:hidden">
            <span className="font-elegant text-[200px] leading-none text-white">
              01
            </span>
          </div>

          <div className="max-w-2xl relative z-10 w-full">
            {/* Label */}
            <div className="flex items-center gap-4 mb-5 lg:mb-6">
              <div className="w-8 h-[1px] bg-[#c9a96e]/60" />
              <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#c9a96e]">
                ✦&nbsp; Collection
              </span>
            </div>

            {/* Title */}
            <h2 className="font-elegant text-4xl sm:text-5xl lg:text-7xl xl:text-[80px] font-light leading-[1.1] tracking-wide text-white">
              The Idol's{' '}
              <br className="hidden sm:block" />
              <span className="shimmer-text">Gallery</span>
            </h2>

            {/* Description */}
            <p className="font-body text-sm sm:text-base text-[#888] mt-6 lg:mt-8 max-w-md leading-relaxed">
              Each vehicle is treated as a masterpiece, preserved and presented
              with the reverence it deserves. Experience the pinnacle of Italian
              engineering and design.
            </p>

            {/* Scroll hint */}
            <div className="hidden lg:flex items-center gap-4 mt-12">
              <div className="w-12 h-[1px] bg-gradient-to-r from-[#c9a96e] to-transparent" />
              <span className="font-heading text-[9px] tracking-[0.3em] uppercase text-[#555]">
                Scroll to explore →
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            CAR SLIDES — blueprint spec style
            ═══════════════════════════════════════════════════ */}
        {cars.map((car, idx) => {
          const isLeftSpec = idx % 2 === 0;
          const brand = getBrand(car.name);

          return (
            <div
              key={car.name}
              className={`idol-slide w-full lg:w-screen lg:h-screen lg:flex-shrink-0 flex items-center justify-center relative px-6 sm:px-10 lg:px-24 py-16 lg:py-0 ${
                idx % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'
              }`}
            >
              {/* ── Desktop watermark ── */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none items-center justify-center hidden lg:flex">
                <span className="font-elegant text-[clamp(200px,30vw,600px)] leading-none text-white tracking-wider">
                  {brand}
                </span>
              </div>

              {/* ── Mobile watermark ── */}
              <div className="absolute top-6 right-6 opacity-[0.025] pointer-events-none select-none lg:hidden">
                <span className="font-elegant text-[120px] leading-none text-white tracking-wider">
                  {brand}
                </span>
              </div>

              {/* ── Decorative corner accents ── */}
              <div className="absolute top-4 right-4 w-6 h-6 lg:top-8 lg:right-8 lg:w-12 lg:h-12 border-t border-r border-[#c9a96e]/10" />
              <div className="absolute bottom-4 left-4 w-6 h-6 lg:bottom-8 lg:left-8 lg:w-12 lg:h-12 border-b border-l border-[#c9a96e]/10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-6 sm:gap-8 lg:gap-12 z-10">
                {/* ── Image ── */}
                <div
                  className={`${
                    isLeftSpec
                      ? 'lg:col-span-7 order-1 lg:order-2'
                      : 'lg:col-span-7 order-1 lg:order-1'
                  }`}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: 'clamp(180px, 45vw, 60vh)' }}
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] lg:drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                      style={{
                        display: 'block',
                        maxHeight: '100%',
                        maxWidth: '100%',
                        margin: '0 auto',
                      }}
                      loading={idx < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>

                {/* ── Specs — Blueprint Style ── */}
                <div
                  className={`${
                    isLeftSpec
                      ? 'lg:col-span-5 order-2 lg:order-1'
                      : 'lg:col-span-5 order-2 lg:order-2'
                  }`}
                >
                  <div className="car-specs-blueprint pl-4 lg:pl-6">
                    {/* Variant label */}
                    <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] mb-2 lg:mb-3 block">
                      {car.variant}
                    </span>

                    {/* Title */}
                    <h3 className="font-elegant text-2xl sm:text-3xl lg:text-5xl font-light text-white mb-1 lg:mb-2 italic">
                      {car.tagline}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-[#666] mb-6 lg:mb-10 tracking-wide">
                      {car.name}
                    </p>

                    {/* ── Spec items — responsive ──
                        Mobile: 3-col grid with centered icons
                        Desktop: Single column blueprint flex-row
                    */}
                    <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-8">
                      {/* Acceleration */}
                      <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-6">
                        <div className="w-8 h-8 lg:w-auto lg:h-auto flex items-center justify-center border border-[#c9a96e]/20 rounded-full lg:border-none lg:rounded-none shrink-0">
                          <Gauge
                            size={14}
                            className="text-[#c9a96e]/70 lg:text-[#c9a96e] lg:opacity-70 lg:text-xl"
                          />
                        </div>
                        <div className="text-center lg:text-left">
                          <p className="font-heading text-[8px] lg:text-[9px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#555] mb-0.5">
                            Acceleration
                          </p>
                          <p className="font-body text-xs lg:text-sm text-white">
                            {car.acceleration}
                            <span className="hidden lg:inline opacity-30 text-[#888]">
                              {' '}0-100 KM/H
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Engine */}
                      <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-6">
                        <div className="w-8 h-8 lg:w-auto lg:h-auto flex items-center justify-center border border-[#c9a96e]/20 rounded-full lg:border-none lg:rounded-none shrink-0">
                          <Cpu
                            size={14}
                            className="text-[#c9a96e]/70 lg:text-[#c9a96e] lg:opacity-70 lg:text-xl"
                          />
                        </div>
                        <div className="text-center lg:text-left">
                          <p className="font-heading text-[8px] lg:text-[9px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#555] mb-0.5">
                            Engine
                          </p>
                          <p className="font-body text-xs lg:text-sm text-white leading-tight lg:leading-normal">
                            {car.engine}
                          </p>
                        </div>
                      </div>

                      {/* Power */}
                      <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-6">
                        <div className="w-8 h-8 lg:w-auto lg:h-auto flex items-center justify-center border border-[#c9a96e]/20 rounded-full lg:border-none lg:rounded-none shrink-0">
                          <Zap
                            size={14}
                            className="text-[#c9a96e]/70 lg:text-[#c9a96e] lg:opacity-70 lg:text-xl"
                          />
                        </div>
                        <div className="text-center lg:text-left">
                          <p className="font-heading text-[8px] lg:text-[9px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#555] mb-0.5">
                            Power
                          </p>
                          <p className="font-body text-xs lg:text-sm text-white">
                            {car.hp} HP{' '}
                            {car.torque && (
                              <span className="opacity-30 text-[#888]">
                                / {car.torque}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Slide counter — desktop ── */}
              <div className="hidden lg:flex absolute bottom-8 right-8 sm:right-12 items-center gap-3">
                <span className="font-heading text-[10px] tracking-[0.15em] text-[#c9a96e]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="w-6 h-[1px] bg-[#c9a96e]/30" />
                <span className="font-heading text-[10px] tracking-[0.15em] text-[#444]">
                  {String(cars.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
