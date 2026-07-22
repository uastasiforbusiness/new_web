'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FRAME_COUNT = 257;
const FRAME_DURATION = 17100; // ms (257 frames / 15 fps ≈ 17.1s)

/* ─── Shimmer keyframes inyectados ─── */
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ═══════════ GSAP scroll scale-down ═══════════ */
  useEffect(() => {
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

      tl.fromTo(
        textPanelRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -80, ease: 'none', duration: 0.5 },
        0,
      );

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

    return () => ctx.revert();
  }, []);

  /* ═══════════ Canvas frame-loop (sin <video>, sin autoplay issues) ═══════════ */
  useEffect(() => {
    /* Inyectar keyframes shimmer */
    const styleEl = document.createElement('style');
    styleEl.textContent = shimmerKeyframes;
    document.head.appendChild(styleEl);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d', { alpha: false });
    if (!ctx2d) return;

    let raf = 0;
    let startTime = 0;
    let viewW = 0;
    let viewH = 0;

    /* Cargar frames */
    const frames: HTMLImageElement[] = [];
    const ready = new Array<boolean>(FRAME_COUNT).fill(false);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const n = String(i + 1).padStart(4, '0');
      img.src = `/images/hero-frames/frame_${n}.webp`;
      img.onload = () => { ready[i] = true; };
      frames.push(img);
    }

    /* object-fit: cover */
    const drawFrame = (img: HTMLImageElement) => {
      if (!img.naturalWidth || !viewW || !viewH) return;
      const scale = Math.max(viewW / img.naturalWidth, viewH / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (viewW - w) / 2;
      const y = (viewH - h) / 2;
      ctx2d.drawImage(img, x, y, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      viewW = canvas.parentElement?.clientWidth ?? window.innerWidth;
      viewH = canvas.parentElement?.clientHeight ?? window.innerHeight;
      canvas.width = viewW * dpr;
      canvas.height = viewH * dpr;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) % FRAME_DURATION; // loop continuo
      const pos = (elapsed / FRAME_DURATION) * FRAME_COUNT;
      const idxA = Math.floor(pos) % FRAME_COUNT;
      const idxB = (idxA + 1) % FRAME_COUNT;
      const mix = pos - Math.floor(pos);

      /* Fondo negro base */
      ctx2d.fillStyle = '#0a0a0a';
      ctx2d.fillRect(0, 0, viewW, viewH);

      /* Grayscale + brightness via CSS filter en el canvas */
      ctx2d.filter = 'grayscale(0.2) brightness(0.75)';

      if (ready[idxA]) drawFrame(frames[idxA]);
      if (ready[idxB]) {
        ctx2d.globalAlpha = mix;
        drawFrame(frames[idxB]);
        ctx2d.globalAlpha = 1;
      }

      ctx2d.filter = 'none';
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
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
          <p
            className="text-[#b8943e] tracking-[0.4em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] uppercase"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            Est. 2023 — Puglia, Italy
          </p>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9] tracking-tighter"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            ELEVATE
            <br />
            YOUR
            <br />
            <span
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

          <p className="text-gray-400 font-light max-w-xs sm:max-w-sm leading-relaxed text-sm sm:text-base">
            B LEADER defines the new standard of Mediterranean luxury.
            Precision-engineered rentals for those who demand the extraordinary.
          </p>
        </div>

        {/* Page counter */}
        <div className="absolute bottom-8 sm:bottom-10 left-6 sm:left-12 md:left-14 lg:left-20">
          <div className="flex items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] tracking-widest text-gray-500 font-medium">
            <span>01</span>
            <div className="w-8 sm:w-10 h-px bg-[#333]" />
            <span>INTRO</span>
          </div>
        </div>
      </div>

      {/* ═══════════ PANEL DERECHO: CANVAS FRAME-LOOP ═══════════ */}
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
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Overlay degradado inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80 pointer-events-none" />

        {/* Overlay izquierdo mobile */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent md:hidden pointer-events-none" />
      </div>
    </section>
  );
}
