'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { navLinks, type NavLink } from '../data';

function getHref(link: NavLink, isHome: boolean): string {
  if (isHome) return link.href;
  return link.pageHref ?? `/${link.href}`;
}

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="bg-[#080808] border-t border-[#c9a96e]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-shrink-0">
            <Image src="/images/logo-white.webp" alt="B LEADER" width={32} height={32} className="h-7 sm:h-8 w-auto opacity-70" />
          </div>
          <div className="flex items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={getHref(link, isHome)} className="cursor-pointer text-[10px] font-heading font-semibold tracking-[0.2em] text-[#555] hover:text-[#c9a96e] transition-colors duration-300">
                {link.label}
              </Link>
            ))}
            <div className="w-[1px] h-4 bg-[#333] hidden sm:block" />
            <Link href={isHome ? '#reserve' : '/#reserve'} className="text-[10px] font-elegant tracking-wider text-[#c9a96e]/60 hover:text-[#c9a96e] transition-colors duration-300 hidden sm:block italic">Book Now</Link>
          </div>
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="cursor-pointer w-9 h-9 flex items-center justify-center border border-[#222] rounded-full text-[#555] hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all duration-300" aria-label="Social">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-heading tracking-[0.2em] text-[#444]">© 2026 B LEADER. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-[1px] bg-[#c9a96e]/20" />
            <p className="text-[9px] font-elegant tracking-wider text-[#555] italic">Milano — Roma — Monaco</p>
            <div className="w-6 h-[1px] bg-[#c9a96e]/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}
