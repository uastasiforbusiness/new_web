'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DisplacementCard } from './displacement-card';
import { cars } from './data';

export function FleetSection() {
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
        const fromLeft = i % 2 === 0;
        gsap.fromTo(card,
          { opacity: 0, x: fromLeft ? -60 : 60, y: 40, scale: 0.95, rotateX: fromLeft ? 5 : -5 },
          { opacity: 1, x: 0, y: 0, scale: 1, rotateX: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="fleet" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-14 sm:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">OUR COLLECTION ✦</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic">Our Fleet</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cars.map((car, index) => (
            <div key={car.variant} ref={(el) => { cardsRef.current[index] = el; }} style={{ opacity: 0 }}>
              <DisplacementCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
