'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ─── Estilos encapsulados: shimmer text ─── */
const shimmerKeyframes = `
@keyframes elegant-shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

export function HeroScaleDown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textPanelRef = useRef<HTMLDivElement>(null);
  const videoPanelRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    /* ─── Inyectar keyframes del shimmer ─── */
    const styleEl = document.createElement('style');
    styleEl.textContent = shimmerKeyframes;
    document.head.appendChild(styleEl);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* Panel izquierdo (texto) se desvanece hacia arriba */
      tl.fromTo(
        textPanelRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -80, ease: 'none', duration: 0.5 },
        0,
      );

      /* Panel derecho (video) escala hacia adentro con bordes redondeados */
      tl.fromTo(
        videoPanelRef.current,
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1 },
        {
          clipPath: 'inset(3% 3% 3% 3% round 24px)',
          scale: 0.88,
          ease: 'none',
          duration: 1,
        },
        0,
      );
    }, containerRef);

    /* Auto-play del video cuando entra en viewport */
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      },
      { threshold: 0.3 },
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      ctx.revert();
      observer.disconnect();
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex border-b border-[#222]"
    >
      {/* ═══════════ PANEL IZQUIERDO: TEXTO ═══════════ */}
      <div
        ref={textPanelRef}
        className="
          w-full md:w-[40%] bg-[#0a0a0a]
          flex flex-col justify-center
          px-6 sm:px-12 md:px-14 lg:px-20
          relative z-20
          border-r border-[#222]
        "
      >
        <div className="space-y-5 sm:space-y-6">
          {/* ─── Tagline ─── */}
          <p
            className="text-[var(--color-gold-dark,#b8943e)] tracking-[0.4em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] uppercase"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            Est. 2023 — Puglia, Italy
          </p>

          {/* ─── Título con shimmer en "JOURNEY." ─── */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9] tracking-tighter"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            ELEVATE
            <br />
            YOUR
            <br />
            <span
              className="shimmer-hero"
              style={{
                background:
                  'linear-gradient(110deg, #c9a96e 0%, #e6c875 20%, #f5e6c8 40%, #e6c875 60%, #c9a96e 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'elegant-shimmer 6s ease-in-out infinite',
              }}
            >
              JOURNEY.
            </span>
          </h1>

          {/* ─── Descripción ─── */}
          <p className="text-gray-400 font-light max-w-xs sm:max-w-sm leading-relaxed text-sm sm:text-base">
            B LEADER defines the new standard of Mediterranean luxury.
            Precision-engineered rentals for those who demand the extraordinary.
          </p>
        </div>

        {/* ─── Page counter (abajo izquierda) ─── */}
        <div className="absolute bottom-8 sm:bottom-10 left-6 sm:left-12 md:left-14 lg:left-20">
          <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] tracking-widest text-gray-500 font-medium">
            <span>01</span>
            <div className="w-8 sm:w-10 h-px bg-[#333]" />
            <span>INTRO</span>
          </div>
        </div>
      </div>

      {/* ═══════════ PANEL DERECHO: VIDEO ═══════════ */}
      <div
        ref={videoPanelRef}
        className="
          absolute md:relative
          inset-0 md:inset-auto
          w-full md:w-[60%]
          overflow-hidden
        "
        style={{ willChange: 'clip-path, transform' }}
      >
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          poster="/hero-video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(0.2) brightness(0.75)' }}
        />

        {/* ─── Overlay degradado inferior ─── */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80" />

        {/* ─── Overlay izquierdo (solo mobile: funde el texto con el video) ─── */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent md:hidden" />
      </div>
    </section>
  );
}
