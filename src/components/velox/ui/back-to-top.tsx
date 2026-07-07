'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * BackToTop — Botón flotante circular dorado.
 * Aparece después de 400px de scroll y usa Lenis para scroll suave.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    // Intenta usar Lenis si está disponible en el scope global
    const lenis = (window as unknown as Record<string, { scrollTo: (t: string, o?: object) => void }>).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo('top', { duration: 1.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${visible ? 'visible' : ''}`}
      aria-label="Volver arriba"
    >
      <ArrowUp size={18} strokeWidth={1.5} />
    </button>
  );
}
