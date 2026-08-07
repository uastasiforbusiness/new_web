'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoadingScreen } from '@/components/velox/ui/loading-screen';
import { HeroScaleDown } from '@/components/velox/sections/hero-scale-down';

import Marquee from '@/components/Marquee';
import SignatureJourneys from '@/components/SignatureJourneys';
import FleetStrip from '@/components/FleetStrip';
import YachtSection from '@/components/YachtSection';
import PrivateOccasions from '@/components/PrivateOccasions';
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

  /*
    One continuous, sequentially numbered narrative for the US luxury traveler:
      01 — The arrival        (hero)
      — The fleet in motion   (marquee divider)
      02 — Signature journeys (land & sea index)
      03 — The fleet          (compact strip → /fleet)
      04 — The yacht          (charter packages)
      05 — Private occasions  (single quiet band → /services)
      06 — The concierge      (reserve / WhatsApp)
  */
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
          {/* 01 — The arrival */}
          <SectionReveal accentLine>
            <HeroScaleDown />
          </SectionReveal>

          {/* Divider — the fleet in motion */}
          <SectionReveal>
            <Marquee />
          </SectionReveal>

          {/* 02 — Signature journeys: one continuous land-and-sea index */}
          <SectionReveal>
            <SignatureJourneys />
          </SectionReveal>

          {/* 03 — The fleet */}
          <SectionReveal>
            <FleetStrip />
          </SectionReveal>

          {/* 04 — The yacht */}
          <SectionReveal accentLine>
            <YachtSection />
          </SectionReveal>

          {/* 05 — Private occasions */}
          <SectionReveal>
            <PrivateOccasions />
          </SectionReveal>

          {/* 06 — The concierge */}
          <SectionReveal>
            <CTASection />
          </SectionReveal>
        </motion.div>
      )}
    </>
  );
}
