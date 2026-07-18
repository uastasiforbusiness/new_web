'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { serviceLines } from '../data';

export function ServiceLinesSection() {
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
          { opacity: 0, y: 50, rotateX: 5 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14 sm:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">CURATED SERVICES</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic">
            B LEADER Experiences
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {serviceLines.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-[#0d0d0d] border border-[#1a1a1a] p-7 sm:p-8 text-center hover:border-[#c9a96e]/30 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(201,169,110,0.1)] transition-all duration-500 ease-out relative overflow-hidden flex flex-col"
                style={{ opacity: 0 }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c9a96e]/0 via-[#c9a96e]/30 to-[#c9a96e]/0 group-hover:via-[#c9a96e]/60 transition-all duration-700" />

                {/* Stat badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[8px] font-heading tracking-[0.2em] text-[#c9a96e]/40 bg-[#c9a96e]/[0.05] px-2 py-1">
                    {service.stat}
                  </span>
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 border border-[#c9a96e]/20 rounded-full mb-6 group-hover:bg-[#c9a96e]/[0.05] group-hover:border-[#c9a96e]/40 transition-all duration-500 mx-auto">
                  <Icon size={22} className="text-[#c9a96e]/70 group-hover:text-[#c9a96e] transition-colors duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-[11px] sm:text-xs font-heading font-bold tracking-[0.15em] text-white mb-1.5">
                  {service.title}
                </h3>
                <p className="text-[10px] font-heading tracking-[0.1em] text-[#c9a96e]/60 mb-4">
                  {service.subtitle}
                </p>
                <p className="text-xs font-body font-light text-[#888] leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Bottom glow — crece desde el centro hacia los bordes */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af37] group-hover:w-full transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
