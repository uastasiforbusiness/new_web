'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoadingScreen } from '@/components/velox/ui/loading-screen';
import { HeroScaleDown } from '@/components/velox/sections/hero-scale-down';

import Marquee from '@/components/Marquee';
import LuxuryWheelCarousel from '@/components/LuxuryWheelCarousel';
import YachtSection from '@/components/YachtSection';
import ExperiencesSection from '@/components/ExperiencesSection';
import ServicesPreview from '@/components/ServicesPreview';
import CTASection from '@/components/CTASection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export function HomeClient() {
  const [loaded, setLoaded] = useState(false);

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
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <>
          <HeroScaleDown />
          <Marquee />
          <LuxuryWheelCarousel />
          <YachtSection />
          <ExperiencesSection />
          <ServicesPreview />
          <CTASection />
        </>
      )}
    </>
  );
}
