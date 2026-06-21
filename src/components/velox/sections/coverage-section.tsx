'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Plane } from 'lucide-react';
import { coverageRegions, airports } from '../data';

export function CoverageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 } }
      );

      cardsRef.current.filter(Boolean).forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="coverage" className="relative py-20 sm:py-28 lg:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 sm:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">WHERE WE OPERATE</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic">
            Coverage
          </h2>
        </div>

        {/* Region Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-14">
          {coverageRegions.map((region, index) => (
            <div
              key={region.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`group p-6 sm:p-7 border transition-all duration-500 relative overflow-hidden ${
                region.primary
                  ? 'bg-[#0d0d0d] border-[#c9a96e]/20 hover:border-[#c9a96e]/40'
                  : 'bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#c9a96e]/15'
              }`}
              style={{ opacity: 0 }}
            >
              {region.primary && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a96e]/0 via-[#c9a96e]/60 to-[#c9a96e]/0" />
              )}

              <MapPin size={18} className={`mb-4 ${region.primary ? 'text-[#c9a96e]' : 'text-[#c9a96e]/40 group-hover:text-[#c9a96e]/60'} transition-colors duration-300`} />

              <h3 className="text-sm font-elegant font-semibold text-white mb-1">{region.name}</h3>
              <p className="text-[10px] font-heading tracking-[0.1em] text-[#c9a96e]/50 mb-2">{region.role}</p>
              {region.detail && (
                <p className="text-[10px] font-body text-[#666]">{region.detail}</p>
              )}

              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a96e]/40 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Airports */}
        <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-5">
            <Plane size={16} className="text-[#c9a96e]/60" />
            <h3 className="text-sm font-elegant font-semibold tracking-wide text-white">NEARBY AIRPORTS</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {airports.map((ap) => (
              <div key={ap.code} className="flex items-center gap-2 bg-[#111] border border-[#1a1a1a] px-4 py-2.5 hover:border-[#c9a96e]/15 transition-colors duration-300">
                <span className="text-sm font-heading font-bold text-[#c9a96e]">{ap.code}</span>
                <span className="text-xs font-body text-[#888]">{ap.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
