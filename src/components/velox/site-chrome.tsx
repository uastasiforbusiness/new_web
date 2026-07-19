'use client';

import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from '@/components/velox/sections/navigation';
import { Footer } from '@/components/velox/sections/footer';
import { WhatsAppButton } from '@/components/velox/chat/whatsapp-button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * Global chrome: nav + footer + WhatsApp on every public page.
 * Home keeps a full-bleed hero under the fixed nav (no top spacer).
 * Inner pages get a spacer matching nav height (h-16 / sm:h-20).
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <Navigation />
      {!isHome ? <div className="h-16 sm:h-20" aria-hidden="true" /> : null}
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
