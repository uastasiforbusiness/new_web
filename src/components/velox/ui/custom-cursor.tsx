'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const TRAIL_COUNT = 6;
const PARTICLE_COUNT = 8;
const PARTICLE_DURATION = 600; // ms

interface Particle {
  el: HTMLDivElement;
  angle: number;
  distance: number;
}

/**
 * CustomCursor — Cursor personalizado de lujo para B LEADER.
 * - Dot + Ring + Trail dots con GSAP
 * - Se oculta sobre elementos interactivos (a, button, input, [data-cursor-hide])
 * - Mini explosión de partículas doradas al hacer click
 * - Solo visible en dispositivos con pointer:fine (no touch)
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);

  // Crear partículas una sola vez
  const initParticles = useCallback(() => {
    if (particles.current.length > 0 || !containerRef.current) return;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'fixed top-0 left-0 w-1 h-1 bg-[#c9a96e] rounded-full pointer-events-none z-[9996] opacity-0 hidden lg:block';
      el.style.transform = 'translate(-100px, -100px)';
      containerRef.current.appendChild(el);
      particles.current.push({
        el,
        angle: (Math.PI * 2 * i) / PARTICLE_COUNT,
        distance: 15 + Math.random() * 25,
      });
    }
  }, []);

  // Explosión de partículas
  const burst = useCallback((x: number, y: number) => {
    particles.current.forEach((p) => {
      const tx = Math.cos(p.angle) * p.distance;
      const ty = Math.sin(p.angle) * p.distance;
      gsap.fromTo(
        p.el,
        { x: x - 2, y: y - 2, opacity: 0.8, scale: 1 },
        {
          x: x - 2 + tx, y: y - 2 + ty,
          opacity: 0, scale: 0,
          duration: PARTICLE_DURATION / 1000,
          ease: 'power3.out',
        }
      );
    });
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    initParticles();

    // ── Seguimiento del mouse ──
    const handleMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });
      gsap.to(ring, {
        x: mouseX - 20, y: mouseY - 20,
        duration: 0.35, ease: 'power2.out',
      });
      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        gsap.to(trail, {
          x: mouseX - 3, y: mouseY - 3,
          duration: 0.5 + i * 0.08,
          ease: 'power2.out',
        });
      });
    };

    // ── Click → partículas ──
    const handleClick = (e: MouseEvent) => {
      burst(e.clientX, e.clientY);
    };

    // ── Ocultar en interactivos ──
    const hideCursor = () => {
      gsap.to([dot, ring, ...trailRefs.current.filter(Boolean)], {
        opacity: 0, duration: 0.2,
      });
    };
    const showCursor = () => {
      gsap.to([dot, ring, ...trailRefs.current.filter(Boolean)], {
        opacity: 1, duration: 0.2,
      });
    };

    const interactives = 'a, button, input, select, textarea, [data-cursor-hide]';
    document.querySelectorAll(interactives).forEach((el) => {
      el.addEventListener('mouseenter', hideCursor);
      el.addEventListener('mouseleave', showCursor);
    });

    // MutationObserver para catch nuevos elementos
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactives).forEach((el) => {
        el.removeEventListener('mouseenter', hideCursor);
        el.removeEventListener('mouseleave', showCursor);
        el.addEventListener('mouseenter', hideCursor);
        el.addEventListener('mouseleave', showCursor);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleClick);
      observer.disconnect();
      document.querySelectorAll(interactives).forEach((el) => {
        el.removeEventListener('mouseenter', hideCursor);
        el.removeEventListener('mouseleave', showCursor);
      });
      // Limpiar partículas
      particles.current.forEach((p) => p.el.remove());
      particles.current = [];
    };
  }, [initParticles, burst]);

  return (
    <>
      <div ref={containerRef} aria-hidden="true" />
      {/* Dot — centro del cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#c9a96e] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      {/* Ring — anillo exterior */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#c9a96e]/60 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      {/* Trail dots */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#c9a96e]/40 rounded-full pointer-events-none z-[9997] hidden lg:block"
          style={{ transform: 'translate(-100px, -100px)' }}
        />
      ))}
    </>
  );
}
