'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { features } from './data';

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotateX: 5 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 lg:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">WHY B LEADER</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic">The Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-[#0d0d0d] border border-[#1a1a1a] p-8 sm:p-10 text-center hover:border-[#c9a96e]/20 transition-all duration-500 relative overflow-hidden"
                style={{ opacity: 0 }}
              >
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-heading tracking-[0.2em] text-[#c9a96e]/40 bg-[#c9a96e]/5 px-2 py-1">
                    {feature.stat}
                  </span>
                </div>

                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c9a96e]/20 rounded-full mb-7 group-hover:bg-[#c9a96e]/5 group-hover:border-[#c9a96e]/40 transition-all duration-500">
                  <Icon size={24} className="text-[#c9a96e]/80 group-hover:text-[#c9a96e] transition-colors duration-500" />
                </div>

                <h3 className="text-sm sm:text-base font-elegant font-semibold tracking-wide text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm font-body font-light text-[#999] leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af37] group-hover:w-full transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
