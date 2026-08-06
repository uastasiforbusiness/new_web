'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoadingScreen } from '@/components/velox/ui/loading-screen';
import { HeroScaleDown } from '@/components/velox/sections/hero-scale-down';

import Marquee from '@/components/Marquee';
import TravelCarousel from '@/components/TravelCarousel';
import YachtSection from '@/components/YachtSection';
import ServicesPreview from '@/components/ServicesPreview';
import CTASection from '@/components/CTASection';
import SectionReveal from '@/components/SectionReveal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export function HomeClient() {
  const [loaded, setLoaded] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

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

  const handleComplete = () => {
    setLoaded(true);
    setHeroReady(true);
  };

  const exitTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  const heroTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={exitTransition}
          >
            <LoadingScreen onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>
      {heroReady && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={heroTransition}
        >
          <SectionReveal accentLine>
            <HeroScaleDown />
          </SectionReveal>
          <SectionReveal>
            <Marquee />
          </SectionReveal>
          <SectionReveal accentLine>
            <TravelCarousel />
          </SectionReveal>
          <SectionReveal>
            <YachtSection />
          </SectionReveal>
          <SectionReveal accentLine>
            <ServicesPreview />
          </SectionReveal>
          <SectionReveal>
            <CTASection />
          </SectionReveal>
        </motion.div>
      )}
    </>
  );
}
