'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from '@/components/velox/use-lenis';
import { FilmGrain, SvgFilters } from '@/components/velox/ui/film-grain';
import { LoadingScreen } from '@/components/velox/ui/loading-screen';
import { HeroScaleDown } from '@/components/velox/sections/hero-scale-down';
import { MarqueeText } from '@/components/velox/ui/marquee-text';

import { FleetShowcase } from '@/components/velox/sections/fleet-showcase';
import { YachtExperienceSection } from '@/components/velox/sections/yacht-experience-section';
import { ServiceLinesSection } from '@/components/velox/sections/service-lines-section';
import { CoverageSection } from '@/components/velox/sections/coverage-section';
import { ReserveSection } from '@/components/velox/sections/reserve-section';
import { ScrollProgress } from '@/components/velox/ui/scroll-progress';
import { BackToTop } from '@/components/velox/ui/back-to-top';
import { BackgroundAurora } from '@/components/velox/ui/background-aurora';
import { UsTravelersSection } from '@/components/velox/sections/us-travelers-section';

export function HomeClient() {
  const [loaded, setLoaded] = useState(false);

  useLenis();

  useEffect(() => {
    const criticalImages = ['/images/hero-bg.webp', '/images/logo-white.webp'];
    criticalImages.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // Lock scroll while the cinematic loader covers the page (incl. global chrome)
  useEffect(() => {
    if (loaded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      ScrollTrigger.normalizeScroll(true);
    } else {
      ScrollTrigger.config({ ignoreMobileResize: false });
    }

    const timeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => clearTimeout(timeout);
  }, [loaded]);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <SvgFilters />
      <BackgroundAurora />
      <FilmGrain />
      <ScrollProgress />

      <div>
        <HeroScaleDown />
        <MarqueeText />

        <div className="relative py-10 sm:py-14">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
          <div className="relative flex justify-center">
            <span className="text-[#c9a96e]/40 text-[8px] bg-[#0a0a0a] px-4">◆</span>
          </div>
        </div>

        <FleetShowcase />
        <MarqueeText />
        <YachtExperienceSection />
        <ServiceLinesSection />
        <CoverageSection />
        <UsTravelersSection />
        <MarqueeText />
        <ReserveSection />
        <BackToTop />
      </div>

      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>
    </main>
  );
}
