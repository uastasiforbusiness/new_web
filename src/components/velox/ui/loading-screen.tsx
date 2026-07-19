'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 60;
const DURATION = 6000; // ms
const SCALE = 0.78; // zoom-out para que el Ferrari se vea completo y distante

/**
 * LoadingScreen — Pantalla de carga cinematográfica.
 * - Canvas con secuencia de 60 frames del Ferrari (crossfade suave)
 * - Overlay oscuro con gradiente
 * - Texto shimmer "B LEADER" con zoom-in
 * - Barra de carga dorada sutil en la base
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let startTime = 0;
    let viewW = 0;
    let viewH = 0;

    // Cargar frames
    const frames: HTMLImageElement[] = [];
    const ready = new Array<boolean>(FRAME_COUNT).fill(false);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const n = String(i + 1).padStart(4, '0');
      img.src = `/images/loading-frames/frame_${n}.webp`;
      img.onload = () => { ready[i] = true; };
      frames.push(img);
    }

    // object-fit: cover con SCALE aplicado (zoom-out)
    const drawFrame = (img: HTMLImageElement, alpha: number) => {
      if (!img.naturalWidth || !viewW || !viewH) return;
      const scale = Math.max(viewW / img.naturalWidth, viewH / img.naturalHeight) * SCALE;
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (viewW - w) / 2;
      const y = (viewH - h) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, x, y, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      viewW = window.innerWidth;
      viewH = window.innerHeight;
      canvas.width = viewW * dpr;
      canvas.height = viewH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      if (elapsed >= DURATION) { cancelAnimationFrame(raf); return; }

      // Posición continua sobre los 60 frames
      const pos = (elapsed / DURATION) * FRAME_COUNT;
      const idxA = Math.floor(pos) % FRAME_COUNT;
      const idxB = (idxA + 1) % FRAME_COUNT;
      const mix = pos - Math.floor(pos); // 0..1 cross-fade

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, viewW, viewH);

      if (ready[idxA]) drawFrame(frames[idxA], 1);
      if (ready[idxB]) drawFrame(frames[idxB], mix * 0.5);

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="fixed inset-0 z-[100] h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Canvas con la animación fluida */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full grayscale brightness-[0.45]"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Overlay oscuro con viñeta */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%),
            linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.75) 100%)
          `,
        }}
      />

      {/* Barra de carga sutil dorada en la base */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 md:w-64 h-[1px] bg-[#1a1a1a] overflow-hidden rounded-full">
        <div
          className="h-full rounded-full loader-bar-anim"
          style={{
            background: 'linear-gradient(90deg, transparent, #c9a96e 30%, #d4af37 50%, #c9a96e 70%, transparent)',
          }}
        />
      </div>

      {/* Texto animado */}
      <div className="relative z-10 text-center px-6">
        <h1 className="shimmer-text font-elegant text-[64px] md:text-[120px] font-light leading-none">
          B LEADER
        </h1>
        <p className="reveal-sub font-sans text-[10px] md:text-[12px] tracking-[0.45em] md:tracking-[0.6em] uppercase mt-4">
          The Apex of Movement
        </p>
      </div>

      <style jsx>{`
        .font-elegant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-sans {
          font-family: 'Outfit', sans-serif;
        }
        .shimmer-text {
          background: linear-gradient(110deg, #c9a96e 0%, #f5e6c8 50%, #c9a96e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation:
            shimmer 6s ease-in-out infinite,
            zoomIn 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        @keyframes zoomIn {
          0% { opacity: 0; transform: scale(0.02); }
          40% { opacity: 1; }
          100% { opacity: 1; transform: scale(1); }
        }
        .reveal-sub {
          opacity: 0;
          animation: fadeUp 1s ease 1.6s forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 0.6; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
