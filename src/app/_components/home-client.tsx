'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LoadingScreen } from '@/components/velox/ui/loading-screen';
import { HeroScaleDown } from '@/components/velox/sections/hero-scale-down';

import Marquee from '@/components/Marquee';
import CarouselSection from '@/components/CarouselSection';
import SignatureJourneys from '@/components/SignatureJourneys';
import FleetStrip from '@/components/FleetStrip';
import YachtSection from '@/components/YachtSection';
import Testimonials from '@/components/Testimonials';
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
    Teaser-first homepage for the US luxury traveler.
    Each section is one mood, one image, one door deeper into the site —
    the specialized pages (/fleet, /experiences, /services, /contact)
    carry the real information.

      01 — The arrival        (hero — untouched)
      — The fleet in motion   (marquee divider)
      02 — The world we move in (3D carousel — intrigue, one door per card)
      03 — The journeys       (3 teaser tiles → /experiences)
      04 — The fleet          (one cinematic band → /fleet)
      05 — The sea            (yacht teaser → /experiences)
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

          {/* 02 — The world we move in */}
          <SectionReveal>
            <CarouselSection />
          </SectionReveal>

          {/* 03 — The journeys (teaser) */}
          <SectionReveal>
            <SignatureJourneys />
          </SectionReveal>

          {/* 04 — The fleet (teaser) */}
          <SectionReveal accentLine>
            <FleetStrip />
          </SectionReveal>

          {/* 05 — The sea */}
          <SectionReveal>
            <YachtSection />
          </SectionReveal>

          {/* Guest voices — renders when testimonials exist */}
          <SectionReveal>
            <Testimonials />
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
