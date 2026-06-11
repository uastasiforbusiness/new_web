'use client';

/* ═══════════════════════════════════════════════════════════════════════
   B LEADER — Premium Car Rental
   Stack: Next.js 16 + GSAP ScrollTrigger + Lenis + Tailwind
   ═══════════════════════════════════════════════════════════════════════ */

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from '@/components/velox/use-lenis';
import { CustomCursor } from '@/components/velox/custom-cursor';
import { FilmGrain, SvgFilters } from '@/components/velox/film-grain';
import { LoadingScreen } from '@/components/velox/loading-screen';
import { Navigation } from '@/components/velox/navigation';
import { HeroScaleDown } from '@/components/velox/hero-scale-down';
import { MarqueeText } from '@/components/velox/marquee-text';
import { ScrollDrivenPlayback } from '@/components/velox/scroll-driven-playback';
import { FleetSection } from '@/components/velox/fleet-section';
import { FleetDetailSection } from '@/components/velox/fleet-detail-section';
import { VirtualTourSection } from '@/components/velox/virtual-tour-section';
import { YachtExperienceSection } from '@/components/velox/yacht-experience-section';
import { ServiceLinesSection } from '@/components/velox/service-lines-section';
import { CoverageSection } from '@/components/velox/coverage-section';
import { FeaturesSection } from '@/components/velox/features-section';
import { ReserveSection } from '@/components/velox/reserve-section';
import { Footer } from '@/components/velox/footer';
import { WhatsAppButton } from '@/components/velox/whatsapp-button';

// ─── Registrar GSAP plugins ───
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // ─── iOS Safari fix: ignora resize causado por ocultación de barra de direcciones ───
  ScrollTrigger.config({ ignoreMobileResize: true });
}


/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useLenis();

  useEffect(() => {
    const criticalImages = ['/images/hero-bg.webp', '/images/logo-white.webp'];
    criticalImages.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // ─── Fix crítico para iOS/móvil: evita saltos por la barra de direcciones ───
    // normalizeScroll(true) unifica el scroll en iOS previniendo conflictos
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      ScrollTrigger.normalizeScroll(true);
    } else {
      // En desktop también refresh al resize por si cambia el viewport
      ScrollTrigger.config({ ignoreMobileResize: false });
    }

    const timeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    // Asynchronously prefetch the 360 tour frame images once the page has loaded and is interactive
    const prefetch360Images = () => {
      const tourFrames = [
        '/images/ferrari_bianca_360/frame_001.webp',
        '/images/ferrari_bianca_360/frame_002.webp',
        '/images/ferrari_bianca_360/frame_003.webp',
        '/images/ferrari_bianca_360/frame_004.webp',
        '/images/ferrari_bianca_360/frame_005.webp',
        '/images/ferrari_rossa_360/frame_001.webp',
        '/images/ferrari_rossa_360/frame_002.webp',
        '/images/ferrari_rossa_360/frame_03.webp',
        '/images/ferrari_rossa_360/frame_004.webp',
        '/images/ferrari_rossa_360/frame_005.webp',
        '/images/ferrari_rossa_360/frame_006.webp',
        '/images/ferrari_rossa_360/frame_007.webp',
        '/images/ferrari_rossa_360/frame_008.webp',
        '/images/ferrari_rossa_360/frame_009.webp',
      ];
      
      // Load them using requestIdleCallback if available, or a slight delay to avoid blocking any initial page load interactive scripts
      const load = () => {
        tourFrames.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => load());
      } else {
        setTimeout(load, 1500);
      }
    };

    prefetch360Images();

    return () => clearTimeout(timeout);
  }, [loaded]);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <SvgFilters />
      <FilmGrain />
      <CustomCursor />

      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navigation />
        <HeroScaleDown />
        <MarqueeText />
        <ScrollDrivenPlayback />

        {/* Elegant gold separator */}
        <div className="relative py-10 sm:py-14">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
          <div className="relative flex justify-center">
            <span className="text-[#c9a96e]/40 text-[8px] bg-[#0a0a0a] px-4">◆</span>
          </div>
        </div>

        <FleetSection />
        <FleetDetailSection />
        <VirtualTourSection />
        <MarqueeText />
        <YachtExperienceSection />
        <ServiceLinesSection />
        <CoverageSection />
        <MarqueeText />
        <FeaturesSection />
        <ReserveSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </main>
  );
}
