'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from '@/components/velox/use-lenis';
import { FilmGrain, SvgFilters } from '@/components/velox/ui/film-grain';
import { LoadingScreen } from '@/components/velox/ui/loading-screen';
import { Navigation } from '@/components/velox/sections/navigation';
import { HeroScaleDown } from '@/components/velox/sections/hero-scale-down';
import { MarqueeText } from '@/components/velox/ui/marquee-text';
import { ScrollDrivenPlayback } from '@/components/velox/sections/scroll-driven-playback';
import { FleetSection } from '@/components/velox/sections/fleet-section';
import { FleetDetailSection } from '@/components/velox/sections/fleet-detail-section';
import { YachtExperienceSection } from '@/components/velox/sections/yacht-experience-section';
import { ServiceLinesSection } from '@/components/velox/sections/service-lines-section';
import { CoverageSection } from '@/components/velox/sections/coverage-section';
import { FeaturesSection } from '@/components/velox/sections/features-section';
import { ReserveSection } from '@/components/velox/sections/reserve-section';
import { Footer } from '@/components/velox/sections/footer';
import { WhatsAppButton } from '@/components/velox/chat/whatsapp-button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

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
      <FilmGrain />

      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {loaded && <div>
        <Navigation />
        <HeroScaleDown />
        <MarqueeText />
        <ScrollDrivenPlayback />

        <div className="relative py-10 sm:py-14">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/25 to-transparent" />
          <div className="relative flex justify-center">
            <span className="text-[#c9a96e]/40 text-[8px] bg-[#0a0a0a] px-4">◆</span>
          </div>
        </div>

        <FleetSection />
        <FleetDetailSection />
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
