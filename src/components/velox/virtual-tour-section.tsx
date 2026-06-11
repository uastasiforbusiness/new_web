'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FERRARI_SPRITES } from './data';

export function VirtualTourSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [activeCar, setActiveCar] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [spritesLoaded, setSpritesLoaded] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const dragStartX = useRef<number>(0);
  const dragStartFrame = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const spriteImagesRef = useRef<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIndexRef = useRef(0);
  const activeCarRef = useRef(0);

  const car = FERRARI_SPRITES[activeCar];
  const totalFrames = car.frameCount;

  // Animate section header on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(viewerRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }, delay: 0.2 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ─── IntersectionObserver: cargar sprites solo cuando la sección entra en viewport ───
  //     rootMargin: 200px para empezar a cargar ANTES de que el usuario llegue
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

  // ─── Helper: elegir sprite responsive según viewport ───
  function getSpriteSrc(i: number) {
    const sprite = FERRARI_SPRITES[i];
    if (window.innerWidth < 768 && sprite.srcMobile) return sprite.srcMobile;
    return sprite.src;
  }

  // ─── Cargar sprites solo cuando la sección está visible ───
  //     Usa srcMobile en viewports < 768px (reduce payload ~75%)
  useEffect(() => {
    if (!sectionInView) return;

    const images: HTMLImageElement[] = [];
    let loaded = 0;

    FERRARI_SPRITES.forEach((sprite, i) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === FERRARI_SPRITES.length) {
          spriteImagesRef.current = images;
          setSpritesLoaded(true);
        }
      };
      img.src = getSpriteSrc(i);
      images[i] = img;
    });

    return () => {
      images.forEach((img) => { img.onload = null; });
    };
  }, [sectionInView]);

  // ─── drawFrame: extraer frame del sprite y dibujarlo en el canvas ───
  // DEFINIDO ANTES de los effects que lo usan (evita TDZ con const)
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const images = spriteImagesRef.current;
    const carIdx = activeCarRef.current;
    if (!canvas || !images[carIdx]) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sprite = FERRARI_SPRITES[carIdx];
    const slotW = sprite.slotW;
    const slotH = sprite.slotH;
    const dpr = window.devicePixelRatio || 1;
    const canvasW = canvas.width / dpr;
    const canvasH = canvas.height / dpr;

    // Clear
    ctx.clearRect(0, 0, canvasW, canvasH);

    // Calcular escala manteniendo aspect ratio (object-contain)
    const scale = Math.min(canvasW / slotW, canvasH / slotH);
    const destW = slotW * scale;
    const destH = slotH * scale;
    const dx = (canvasW - destW) / 2;
    const dy = (canvasH - destH) / 2;

    ctx.drawImage(
      images[carIdx],
      index * slotW, 0, slotW, slotH,
      dx, dy, destW, destH
    );
  }, []);

  // ─── Actualizar refs en cada render ───
  useEffect(() => {
    frameIndexRef.current = frameIndex;
    activeCarRef.current = activeCar;
  });

  // ─── Resetear frame al cambiar de auto ───
  useEffect(() => {
    setFrameIndex(0);
  }, [activeCar]);

  // ─── Dibujar cuando cambia frame o sprites cargados ───
  useEffect(() => {
    if (!spritesLoaded) return;
    drawFrame(frameIndex);
  }, [frameIndex, activeCar, spritesLoaded, drawFrame]);

  // ─── Resize observer para canvas responsivo (estable, sin dep de frameIndex) ───
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        drawFrame(frameIndexRef.current);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [drawFrame]);

  // Update label
  useEffect(() => {
    if (labelRef.current) {
      const angle = Math.round((frameIndex / totalFrames) * 360);
      labelRef.current.textContent = `${angle}°`;
    }
  }, [frameIndex, totalFrames]);

  /* ── Drag handlers ── */
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartFrame.current = frameIndex;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX.current;
    const sensitivity = 6; // pixels per frame
    const delta = Math.round(dx / sensitivity);
    const next = ((dragStartFrame.current - delta) % totalFrames + totalFrames) % totalFrames;
    if (next !== frameIndex) setFrameIndex(next);
  };

  const handlePointerUp = () => setIsDragging(false);

  /* ── Auto-rotate hint on mount ── */
  useEffect(() => {
    let i = 0;
    const spin = setInterval(() => {
      i++;
      setFrameIndex(f => (f + 1) % FERRARI_SPRITES[activeCar].frameCount);
      if (i >= 3) clearInterval(spin);
    }, 120);
    return () => clearInterval(spin);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCar]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setFrameIndex(f => (f + 1) % totalFrames);
      if (e.key === 'ArrowLeft') setFrameIndex(f => (f - 1 + totalFrames) % totalFrames);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [totalFrames]);

  return (
    <section
      ref={sectionRef}
      id="virtual-tour"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 60%, ${car.color}0a 0%, transparent 70%)`,
          transition: 'background 1s ease',
        }}
      />

      {/* Thin top border line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">360° VIRTUAL TOUR ✦</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic mb-4">
            Explore Every Angle
          </h2>
          <p className="text-sm font-body text-[#666] max-w-md mx-auto">
            Drag to rotate. Experience the car in full 360° before you decide.
          </p>
        </div>          {/* Car selector tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {FERRARI_SPRITES.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCar(i)}
              className={`text-[10px] font-heading font-semibold tracking-[0.25em] px-5 py-2.5 border transition-all duration-500 ${
                activeCar === i
                  ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/8'
                  : 'border-[#333] text-[#555] hover:border-[#c9a96e]/40 hover:text-[#c9a96e]/60'
              }`}
            >
              {i === 0 ? 'BIANCA AVUS' : 'ROSSA CORSA'}
            </button>
          ))}
        </div>

        {/* Viewer */}
        <div
          ref={viewerRef}
          className="relative max-w-4xl mx-auto select-none"
          style={{ opacity: 0 }}
        >
          {/* Color accent bar */}
          <div
            className="h-[2px] w-full mb-0 transition-colors duration-700"
            style={{ background: `linear-gradient(to right, transparent, ${car.color}, #c9a96e, ${car.color}, transparent)` }}
          />

          {/* Image stage */}
          <div
            ref={containerRef}
            className={`relative bg-[#080808] border border-[#1a1a1a] overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ aspectRatio: '16/9' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Vignette overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(8,8,8,0.7) 100%)' }}
            />

            {/* ─── Canvas: dibuja el frame desde el sprite ───
                  Renderiza solo el slice correspondiente del sprite,
                  manteniendo aspect ratio (object-contain).
                  Sin <img> individuales → 1 HTTP request por auto. */}
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ display: 'block' }}
            />

            {/* Drag hint — fades after first drag */}
            {!isDragging && frameIndex === 0 && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-3 text-white/30 animate-pulse">
                  <span className="text-lg">←</span>
                  <span className="text-[10px] font-heading tracking-[0.3em]">DRAG TO ROTATE</span>
                  <span className="text-lg">→</span>
                </div>
              </div>
            )}

            {/* Frame indicator bottom-left */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
              <div className="w-4 h-[1px] bg-[#c9a96e]/60" />
              <span className="text-[9px] font-heading tracking-[0.3em] text-[#c9a96e]/70">
                <span ref={labelRef}>0°</span>
              </span>
            </div>

            {/* Frame dots bottom-right */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 pointer-events-none">
              {Array.from({ length: totalFrames }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === frameIndex ? '16px' : '4px',
                    height: '3px',
                    background: i === frameIndex ? '#c9a96e' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom accent */}
          <div
            className="h-[2px] w-full mt-0 transition-colors duration-700"
            style={{ background: `linear-gradient(to right, transparent, ${car.color}55, transparent)` }}
          />

          {/* Car label */}
          <div className="mt-6 flex items-center justify-between px-1">
            <div>
              <p className="text-[10px] font-heading tracking-[0.35em] text-[#c9a96e] mb-1">FERRARI CALIFORNIA</p>
              <h3 className="text-xl sm:text-2xl font-elegant font-light italic text-white tracking-wide">
                {activeCar === 0 ? 'Bianca Avus' : 'Rossa Corsa'}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-heading tracking-[0.2em] text-[#555] mb-1">HORSEPOWER</p>
              <p className="text-2xl font-heading font-light text-[#c9a96e]">
                {activeCar === 0 ? '560' : '460'}<span className="text-[12px] text-[#555] ml-1">HP</span>
              </p>
            </div>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-[9px] font-heading tracking-[0.25em] text-[#444] mt-5">
            ← → KEYS ALSO WORK
          </p>
        </div>
      </div>
    </section>
  );
}
