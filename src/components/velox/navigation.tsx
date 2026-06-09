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
          <a href="#" className="flex-shrink-0 cursor-hover">
            <img src="/images/logo-white.webp" alt="B LEADER" className="h-8 sm:h-10 w-auto transition-opacity duration-300 hover:opacity-70" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-hover relative text-[11px] font-heading font-semibold tracking-[0.25em] text-[#999] hover:text-[#c9a96e] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a96e] hover:after:w-full after:transition-all after:duration-300"
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
              className="md:hidden text-white p-2 cursor-hover"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="md:hidden bg-[#0a0a0a]/98 nav-glass border-t border-[#c9a96e]/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-heading font-semibold tracking-[0.25em] text-[#999] hover:text-[#c9a96e] transition-colors duration-300 py-2"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reserve"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-6 py-3 bg-[#c9a96e] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] mt-4"
              >
                BOOK NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
