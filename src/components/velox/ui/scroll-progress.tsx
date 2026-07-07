'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollProgress — Línea dorada superior con glow en la punta.
 * Se actualiza con requestAnimationFrame para máxima fluidez.
 * Usa las clases CSS definidas en globals.css.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      bar.style.width = `${progress}%`;
    };

    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress-bar" />;
}
