"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

/**
 * Scroll-to-top button — appears after 50vh scroll.
 * Uses Lenis for smooth scroll-to-top.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;

    const onScroll = () => {
      const scrollY = lenis.scroll || window.scrollY;
      setVisible(scrollY > window.innerHeight / 2);
    };

    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Scroll to top"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 right-6 z-[65] flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-ink/80 backdrop-blur-sm text-gold transition-all duration-500 hover:border-gold/60 hover:bg-ink hover:shadow-[0_8px_30px_rgba(201,169,110,0.15)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-gold/50"
        >
          <ChevronUp size={16} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}