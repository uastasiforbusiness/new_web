'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { yachtFrames, YACHT_SPRITE_FRAMES, frameLabels } from './data';

export function ScrollDrivenPlayback() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [sectionInView, setSectionInView] = useState(false);

  // ─── IntersectionObserver lazy loading + responsive ───
  //     Carga el sprite del yate solo cuando la sección entra en viewport.
  //     En móvil (< 768px) usa el sprite a 50% de resolución.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setSectionInView(true); obs.disconnect(); } },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ─── Lazy load individual frames only when section is in view ───
  useEffect(() => {
    if (!sectionInView) return;
    // Preload all 6 images so they're ready when GSAP transitions
    yachtFrames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [sectionInView]);

  useEffect(() => {
    if (!sectionInView) return;
    const ctx = gsap.context(() => {
      const frames = frameRefs.current.filter(Boolean);

      const overlap = 0.04;
      frames.forEach((frame, i) => {
        if (!frame) return;
        const segStart = Math.max(0, (i / frames.length) - overlap);
        const segEnd = Math.min(1, ((i + 1) / frames.length) + overlap);

        gsap.fromTo(frame,
          { opacity: 0, scale: 1.1 }, // Start slightly zoomed for parallax
          {
            opacity: 1,
            scale: 1, // Zoom in as it becomes active
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${segStart * 100}% top`,
              end: `${segEnd * 100}% top`,
              scrub: 0.8,
            },
          }
        );

        // Add a subtle "Engine Shake" when the boat is moving fast (frames 2 and 3)
        // Aplica al div del sprite (ya no hay <img> individual)
        // Desactivado en táctiles y con prefers-reduced-motion (ahorro de batería)
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isCoarse = window.matchMedia('(pointer: coarse)').matches;
        if ((i === 1 || i === 2) && !reduceMotion && !isCoarse) {
          gsap.to(frame, {
            x: 'random(-1, 1)',
            y: 'random(-1, 1)',
            duration: 0.1,
            repeat: -1,
            yoyo: true,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${segStart * 100}% top`,
              end: `${segEnd * 100}% top`,
              toggleActions: 'play pause resume pause'
            }
          });
        }
      });

      // Lens Flare dynamic movement
      gsap.to('.yacht-lens-flare', {
        x: '100px',
        y: '-50px',
        opacity: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
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
  }, [sectionInView]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#0a0a0a]"
      style={{ height: `${YACHT_SPRITE_FRAMES * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-10">
        {/* Cinematic Viewport Frame with Feathered Edges */}
        <div 
          className="relative w-full max-w-[90vw] h-[60vh] sm:h-[70vh] lg:h-[75vh] overflow-hidden bg-[#060606]"
          style={{
            maskImage: 'radial-gradient(circle, black 50%, transparent 90%)',
            WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 90%)',
          }}
        >
          {/* Dynamic Lens Flare Overlay */}
          <div 
            className="yacht-lens-flare absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full z-20 pointer-events-none opacity-0"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,110,0.3) 0%, rgba(201,169,110,0.1) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* ─── 6 frames individuales crossfadeados por GSAP ───
                Cada div usa su propia imagen de fondo. GSAP se encarga
                de la transición de opacidad al hacer scroll. */}
          {Array.from({ length: YACHT_SPRITE_FRAMES }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { frameRefs.current[i] = el; }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: sectionInView ? `url(${yachtFrames[i]})` : undefined,
                opacity: i === 0 ? 1 : 0,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
          <div className="w-full px-4 sm:px-8 lg:px-16 pb-16 sm:pb-20">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-[#c9a96e]" />
                <p className="text-[9px] font-elegant tracking-[0.5em] text-[#c9a96e] italic">Yacht Experience</p>
              </div>
              <div
                ref={labelRef}
                className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic"
              >
                Nautical Adventure
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#222] relative overflow-hidden">
              <div ref={progressRef} className="h-full bg-gradient-to-r from-[#c9a96e] to-[#d4af37] origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-[9px] font-heading tracking-[0.3em] text-[#555]">SCROLL TO NAVIGATE</span>
              <span className="text-[10px] font-heading tracking-[0.2em] text-[#555]">
                <span ref={counterRef} className="text-[#c9a96e]">01</span>
                <span className="mx-1">/</span>
                0{YACHT_SPRITE_FRAMES}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
