'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sequenceFrames, frameLabels } from './data';

export function ScrollDrivenPlayback() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const frames = frameRefs.current.filter(Boolean);

      const overlap = 0.04; // 4% de overlap a cada lado → 8% de zona compartida
      frames.forEach((frame, i) => {
        if (!frame) return;
        // Segmentos extendidos para crear crossfade real entre frames
        const segStart = Math.max(0, (i / frames.length) - overlap);
        const segEnd = Math.min(1, ((i + 1) / frames.length) + overlap);

        gsap.fromTo(frame,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${segStart * 100}% top`,
              end: `${segEnd * 100}% top`,
              scrub: 0.8,
            },
          }
        );
      });

      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.3 } }
      );

      frames.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${(i / frames.length) * 100 + 3}% top`,
          onEnter: () => {
            if (labelRef.current) labelRef.current.textContent = frameLabels[i];
            if (counterRef.current) counterRef.current.textContent = String(i + 1).padStart(2, '0');
          },
          onEnterBack: () => {
            if (labelRef.current) labelRef.current.textContent = frameLabels[i];
            if (counterRef.current) counterRef.current.textContent = String(i + 1).padStart(2, '0');
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#0a0a0a]"
      style={{ height: `${sequenceFrames.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sequenceFrames.map((src, i) => (
          <div
            key={src}
            ref={(el) => { frameRefs.current[i] = el; }}
            className="scroll-seq-frame"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <img src={src} alt={`Ferrari frame ${i + 1}`} className="w-full h-full object-contain bg-[#060606]" loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/80" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
          <div className="w-full px-4 sm:px-8 lg:px-16 pb-16 sm:pb-20">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-[#c9a96e]" />
                <p className="text-[9px] font-elegant tracking-[0.5em] text-[#c9a96e] italic">360° Experience</p>
              </div>
              <div
                ref={labelRef}
                className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic"
              >
                Front View
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#222] relative overflow-hidden">
              <div ref={progressRef} className="h-full bg-gradient-to-r from-[#c9a96e] to-[#d4af37] origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-[9px] font-heading tracking-[0.3em] text-[#555]">SCROLL TO ROTATE</span>
              <span className="text-[10px] font-heading tracking-[0.2em] text-[#555]">
                <span ref={counterRef} className="text-[#c9a96e]">01</span>
                <span className="mx-1">/</span>
                0{sequenceFrames.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
