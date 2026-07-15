'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gauge, Cpu, Zap } from 'lucide-react';
import Image from 'next/image';
import { cars, fleetSpecs } from '../data';

// ─── Helper: extract brand name for watermark ───
function getBrand(name: string): string {
  if (name.toLowerCase().startsWith('ferrari')) return 'FERRARI';
  if (name.toLowerCase().startsWith('maserati')) return 'MASERATI';
  if (name.toLowerCase().startsWith('mercedes')) return 'MERCEDES';
  if (name.toLowerCase().startsWith('cranchi')) return 'CRANCHI';
  return name.split(' ')[0].toUpperCase();
}

export function FleetShowcase() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // ─── Horizontal scroll gallery ───
  useEffect(() => {
    if (!galleryRef.current) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLDivElement>('.fleet-slide');
      if (slides.length === 0) return;

      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          const container = containerRef.current;
          if (!container) return () => {};

          const st = gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: galleryRef.current,
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
          return () => {};
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  // ─── Table entrance animation ───
  useEffect(() => {
    if (!tableRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tableRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      const cards = gsap.utils.toArray<HTMLDivElement>('.fleet-spec-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.08,
          },
        );
      });
    }, tableRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          PART 1 — HORIZONTAL SCROLL GALLERY (ex IdolsGallery)
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={galleryRef}
        className="relative bg-[#0a0a0a] overflow-hidden"
      >
        <div
          ref={containerRef}
          className="flex flex-col w-full lg:flex-row lg:flex-nowrap lg:h-screen"
        >
          {/* SLIDE 0 — INTRO */}
          <div className="fleet-slide w-full lg:w-screen lg:h-screen lg:flex-shrink-0 flex items-center px-6 sm:px-10 lg:px-24 py-24 lg:py-0 relative overflow-hidden bg-[#0a0a0a]">
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
              <div className="flex items-center gap-4 mb-5 lg:mb-6">
                <div className="w-8 h-[1px] bg-[#c9a96e]/60" />
                <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#c9a96e]">
                  ✦&nbsp; Our Fleet
                </span>
              </div>

              <h2 className="font-elegant text-4xl sm:text-5xl lg:text-7xl xl:text-[80px] font-light leading-[1.1] tracking-wide text-white">
                The Idol&apos;s{' '}
                <br className="hidden sm:block" />
                <span className="shimmer-text">Gallery</span>
              </h2>

              <p className="font-body text-sm sm:text-base text-[#888] mt-6 lg:mt-8 max-w-md leading-relaxed">
                Each vehicle is treated as a masterpiece, preserved and
                presented with the reverence it deserves. Experience the
                pinnacle of Italian engineering and design.
              </p>

              <div className="hidden lg:flex items-center gap-4 mt-12">
                <div className="w-12 h-[1px] bg-gradient-to-r from-[#c9a96e] to-transparent" />
                <span className="font-heading text-[9px] tracking-[0.3em] uppercase text-[#555]">
                  Scroll to explore →
                </span>
              </div>
            </div>
          </div>

          {/* CAR SLIDES — blueprint spec style */}
          {cars.map((car, idx) => {
            const isLeftSpec = idx % 2 === 0;
            const brand = getBrand(car.name);

            return (
              <div
                key={car.name}
                className={`fleet-slide w-full lg:w-screen lg:h-screen lg:flex-shrink-0 flex items-center justify-center relative px-6 sm:px-10 lg:px-24 py-16 lg:py-0 ${
                  idx % 2 === 0 ? 'bg-[#0d0d0d]' : 'bg-[#0a0a0a]'
                }`}
              >
                {/* Desktop watermark */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none items-center justify-center hidden lg:flex">
                  <span className="font-elegant text-[clamp(200px,30vw,600px)] leading-none text-white tracking-wider">
                    {brand}
                  </span>
                </div>

                {/* Mobile watermark */}
                <div className="absolute top-6 right-6 opacity-[0.025] pointer-events-none select-none lg:hidden">
                  <span className="font-elegant text-[120px] leading-none text-white tracking-wider">
                    {brand}
                  </span>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-4 right-4 w-6 h-6 lg:top-8 lg:right-8 lg:w-12 lg:h-12 border-t border-r border-[#c9a96e]/10" />
                <div className="absolute bottom-4 left-4 w-6 h-6 lg:bottom-8 lg:left-8 lg:w-12 lg:h-12 border-b border-l border-[#c9a96e]/10" />

                <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-center gap-6 sm:gap-8 lg:gap-12 z-10">
                  {/* Image */}
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
<Image
                        src={car.image}
                        alt={`${car.name} ${car.variant} \u2014 luxury ${car.name.toLowerCase().includes('cranchi') ? 'yacht' : 'car'} rental in Salento, Puglia`}
                        width={800}
                        height={600}
                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] lg:drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                        style={{
                          display: 'block',
                          maxHeight: '100%',
                          maxWidth: '100%',
                          margin: '0 auto',
                        }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={idx < 2}
                      />
                    </div>
                  </div>

                  {/* Specs — Blueprint Style */}
                  <div
                    className={`${
                      isLeftSpec
                        ? 'lg:col-span-5 order-2 lg:order-1'
                        : 'lg:col-span-5 order-2 lg:order-2'
                    }`}
                  >
                    <div className="car-specs-blueprint pl-4 lg:pl-6">
                      <span className="font-heading text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-[#c9a96e] mb-2 lg:mb-3 block">
                        {car.variant}
                      </span>

                      <h3 className="font-elegant text-2xl sm:text-3xl lg:text-5xl font-light text-white mb-1 lg:mb-2 italic">
                        {car.tagline}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-[#666] mb-6 lg:mb-10 tracking-wide">
                        {car.name}
                      </p>

                      <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-8">
                        {[
                          { icon: Gauge, label: 'Acceleration', value: car.acceleration, unit: '0-100 KM/H' },
                          { icon: Cpu, label: 'Engine', value: car.engine, unit: '' },
                          { icon: Zap, label: 'Power', value: `${car.hp} HP`, unit: car.torque || '' },
                        ].map((spec) => (
                          <div
                            key={spec.label}
                            className="flex flex-col items-center lg:flex-row lg:items-center gap-2 lg:gap-6"
                          >
                            <div className="w-8 h-8 lg:w-auto lg:h-auto flex items-center justify-center border border-[#c9a96e]/20 rounded-full lg:border-none lg:rounded-none shrink-0">
                              <spec.icon
                                size={14}
                                className="text-[#c9a96e]/70 lg:text-[#c9a96e] lg:opacity-70 lg:text-xl"
                              />
                            </div>
                            <div className="text-center lg:text-left">
                              <p className="font-heading text-[8px] lg:text-[9px] tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#555] mb-0.5">
                                {spec.label}
                              </p>
                              <p className="font-body text-xs lg:text-sm text-white">
                                {spec.value}
                                {spec.unit && (
                                  <span className="hidden lg:inline opacity-30 text-[#888]">
                                    {' '}{spec.unit}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide counter */}
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

      {/* ═══════════════════════════════════════════════════════
          PART 2 — SPECS TABLE + CARDS (ex FleetDetailSection)
          ═══════════════════════════════════════════════════════ */}
      <section
        ref={tableRef}
        id="fleet"
        className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a]"
        style={{ opacity: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-14 sm:mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
              <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">
                TECHNICAL DETAILS
              </p>
              <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic">
              Fleet Specs
            </h2>
          </div>

          {/* Comparison Table — Desktop */}
          <div className="hidden lg:block mb-16">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#c9a96e]/20">
                    <th className="text-left py-4 px-4 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">
                      VEHICLE
                    </th>
                    <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">
                      SEATS
                    </th>
                    <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">
                      0-100
                    </th>
                    <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">
                      TOP SPEED
                    </th>
                    <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">
                      FUEL
                    </th>
                    <th className="text-left py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">
                      TRUNK / CABINS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fleetSpecs.map((spec) => (
                    <tr
                      key={spec.name}
                      className="border-b border-[#1a1a1a] hover:bg-[#c9a96e]/[0.03] transition-colors duration-300"
                    >
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/10"
                            style={{ backgroundColor: spec.colorHex }}
                          />
                          <span className="text-sm font-elegant font-semibold text-white">
                            {spec.name}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 px-3 text-center text-sm font-body text-[#999]">
                        {spec.seats}
                      </td>
                      <td className="py-4 px-3 text-center text-sm font-body text-[#999]">
                        {spec.acceleration}
                      </td>
                      <td className="py-4 px-3 text-center text-sm font-body text-[#999]">
                        {spec.topSpeed}
                      </td>
                      <td className="py-4 px-3 text-center text-sm font-body text-[#999]">
                        {spec.consumption}
                      </td>
                      <td className="py-4 px-3 text-sm font-body text-[#999]">
                        {spec.trunk}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {fleetSpecs.map((spec) => (
              <div
                key={spec.name}
                className="fleet-spec-card group bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8 hover:border-[#c9a96e]/20 transition-all duration-500 relative overflow-hidden"
                style={{ opacity: 0 }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a96e]/0 via-[#c9a96e]/40 to-[#c9a96e]/0 group-hover:via-[#c9a96e]/70 transition-all duration-700" />

                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-white/10"
                      style={{ backgroundColor: spec.colorHex }}
                    />
                    <h3 className="text-sm sm:text-base font-elegant font-semibold tracking-wide text-white">
                      {spec.name}
                    </h3>
                  </div>
                  {spec.name.includes('Cranchi') && (
                    <span className="text-[8px] font-heading tracking-[0.15em] text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-1">
                      YACHT
                    </span>
                  )}
                </div>

                <p className="text-xs font-body text-[#666] mb-4">
                  {spec.engine}
                </p>

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: '0-100', value: spec.acceleration },
                    { label: 'VMAX', value: spec.topSpeed },
                    { label: 'FUEL', value: spec.consumption },
                    { label: 'SEATS', value: spec.seats },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-[#111] p-3 border border-[#1a1a1a]"
                    >
                      <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/60 mb-1">
                        {s.label}
                      </p>
                      <p className="text-sm font-body text-white">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#1a1a1a] pt-4">
                  <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/60 mb-2">
                    HIGHLIGHTS
                  </p>
                  <p className="text-xs font-body text-[#888] leading-relaxed">
                    {spec.keyFeatures}
                  </p>
                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af37] group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
