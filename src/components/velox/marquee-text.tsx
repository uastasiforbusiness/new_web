'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function MarqueeText() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const items = ['FERRARI', 'MASERATI', 'MERCEDES-BENZ', 'PREMIUM RENTAL', 'B LEADER', 'EXCLUSIVE DRIVE'];

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="py-6 sm:py-8 border-y border-[#c9a96e]/10 overflow-hidden bg-[#0a0a0a]">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-[0.08em] text-[#181818] mx-4 sm:mx-6 select-none cursor-hover hover:text-[#222] transition-colors duration-300">
            {item}
            <span className="text-[#c9a96e]/20 mx-3 sm:mx-5 text-xl">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
