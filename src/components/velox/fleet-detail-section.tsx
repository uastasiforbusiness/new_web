'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fleetSpecs } from './data';

export function FleetDetailSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 } }
      );

      gsap.fromTo(tableRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: tableRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      cardsRef.current.filter(Boolean).forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            delay: i * 0.08,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="fleet-detail" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 sm:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">OUR ASSETS</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic">
            Fleet Specs
          </h2>
        </div>

        {/* Summary Table — Desktop */}
        <div ref={tableRef} className="hidden lg:block mb-16" style={{ opacity: 0 }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#c9a96e]/20">
                  <th className="text-left py-4 px-4 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">VEHICLE</th>
                  <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">SEATS</th>
                  <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">0-100</th>
                  <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">TOP SPEED</th>
                  <th className="text-center py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">FUEL</th>
                  <th className="text-left py-4 px-3 text-[10px] font-heading font-semibold tracking-[0.2em] text-[#c9a96e]">TRUNK / CABINS</th>
                </tr>
              </thead>
              <tbody>
                {fleetSpecs.map((spec, i) => (
                  <tr key={spec.name} className="border-b border-[#1a1a1a] hover:bg-[#c9a96e]/[0.03] transition-colors duration-300">
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/10" style={{ backgroundColor: spec.colorHex }} />
                        <span className="text-sm font-elegant font-semibold text-white">{spec.name}</span>
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center text-sm font-body text-[#999]">{spec.seats}</td>
                    <td className="py-4 px-3 text-center text-sm font-body text-[#999]">{spec.acceleration}</td>
                    <td className="py-4 px-3 text-center text-sm font-body text-[#999]">{spec.topSpeed}</td>
                    <td className="py-4 px-3 text-center text-sm font-body text-[#999]">{spec.consumption}</td>
                    <td className="py-4 px-3 text-sm font-body text-[#999]">{spec.trunk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {fleetSpecs.map((spec, index) => (
            <div
              key={spec.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8 hover:border-[#c9a96e]/20 transition-all duration-500 relative overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a96e]/0 via-[#c9a96e]/40 to-[#c9a96e]/0 group-hover:via-[#c9a96e]/70 transition-all duration-700" />

              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-white/10" style={{ backgroundColor: spec.colorHex }} />
                  <h3 className="text-sm sm:text-base font-elegant font-semibold tracking-wide text-white">{spec.name}</h3>
                </div>
                {spec.name.includes('Cranchi') && (
                  <span className="text-[8px] font-heading tracking-[0.15em] text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-1">YACHT</span>
                )}
              </div>

              <p className="text-xs font-body text-[#666] mb-4">{spec.engine}</p>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-[#111] p-3 border border-[#1a1a1a]">
                  <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/60 mb-1">0-100</p>
                  <p className="text-sm font-body text-white">{spec.acceleration}</p>
                </div>
                <div className="bg-[#111] p-3 border border-[#1a1a1a]">
                  <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/60 mb-1">VMAX</p>
                  <p className="text-sm font-body text-white">{spec.topSpeed}</p>
                </div>
                <div className="bg-[#111] p-3 border border-[#1a1a1a]">
                  <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/60 mb-1">FUEL</p>
                  <p className="text-sm font-body text-white">{spec.consumption}</p>
                </div>
                <div className="bg-[#111] p-3 border border-[#1a1a1a]">
                  <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/60 mb-1">SEATS</p>
                  <p className="text-sm font-body text-white">{spec.seats}</p>
                </div>
              </div>

              <div className="border-t border-[#1a1a1a] pt-4">
                <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/60 mb-2">HIGHLIGHTS</p>
                <p className="text-xs font-body text-[#888] leading-relaxed">{spec.keyFeatures}</p>
              </div>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af37] group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
