'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    // ─── Detectar si es touch device ───
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.4,          // menos duración en móvil = más responsive
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: isTouchDevice ? 1 : 2,       // 1 en móvil para evitar scroll nervioso
      // ─── En touch devices, Lenis intercepta el scroll nativo ───
      //     Esto puede causar conflicto con normalizeScroll de GSAP.
      //     Por eso reducimos la duración y touchMultiplier.
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
