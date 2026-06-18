'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MagneticButton } from './magnetic-button';
import { navLinks } from './data';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'nav-glass bg-[#0a0a0a]/85 border-b border-[#c9a96e]/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex-shrink-0 cursor-pointer">
            <img src="/images/logo-white.webp" alt="B LEADER" className="h-12 sm:h-14 w-auto transition-opacity duration-300 hover:opacity-70" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-pointer relative text-[11px] font-heading font-semibold tracking-[0.25em] text-[#999] hover:text-[#c9a96e] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a96e] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              href="#reserve"
              className="hidden sm:inline-flex px-7 py-2.5 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,169,110,0.3)]"
              strength={0.2}
            >
              BOOK NOW
            </MagneticButton>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-[#0a0a0a]/98 nav-glass border-t border-[#c9a96e]/10"
          >
            <div className="px-6 pt-8 pb-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-center gap-4 py-3.5 border-b border-[#1a1a1a] hover:border-[#c9a96e]/15 transition-colors duration-500"
                  >
                    <span className="text-[9px] font-heading tracking-[0.2em] text-[#c9a96e]/40 group-hover:text-[#c9a96e]/70 transition-colors duration-500 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base font-elegant tracking-wide text-[#999] group-hover:text-[#c9a96e] transition-colors duration-500 italic">
                      {link.label}
                    </span>
                    <span className="ml-auto text-[10px] text-[#c9a96e]/0 group-hover:text-[#c9a96e]/40 transition-all duration-500 translate-x-[-4px] group-hover:translate-x-0">
                      →
                    </span>
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + navLinks.length * 0.07, ease: [0.23, 1, 0.32, 1] }}
                className="mt-8"
              >
                <a
                  href="#reserve"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#c9a96e] to-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] hover:shadow-[0_0_30px_rgba(201,169,110,0.25)] transition-shadow duration-500"
                >
                  BOOK NOW
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
