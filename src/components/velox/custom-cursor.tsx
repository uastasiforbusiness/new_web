'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TRAIL_COUNT = 6;

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const handleMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });

      gsap.to(ring, {
        x: mouseX - 20, y: mouseY - 20,
        duration: 0.35, ease: 'power2.out',
      });

      // Trail dots follow with staggered delay
      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        gsap.to(trail, {
          x: mouseX - 3, y: mouseY - 3,
          duration: 0.5 + i * 0.08,
          ease: 'power2.out',
        });
      });
    };

    const handleEnter = () => gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.3 });
    const handleLeave = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', handleMove);

    const interactives = document.querySelectorAll('a, button, .cursor-hover');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
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
      {/* Trail dots — siguen al cursor con delay escalonado */}
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
