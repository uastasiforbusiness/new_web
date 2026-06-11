'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    // ─── Detectar si es touch device ───
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ─── En táctiles usamos scroll NATIVO: Lenis interceptando el touch
    //     entra en conflicto con ScrollTrigger.normalizeScroll(true)
    //     y degrada el rendimiento en móvil ───
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
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
