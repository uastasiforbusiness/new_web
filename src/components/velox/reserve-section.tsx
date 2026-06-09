'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Phone, Mail } from 'lucide-react';
import { ReservationForm } from './reservation-form';

export function ReserveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reserve" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#c9a96e]/3 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#c9a96e]/2 rounded-full blur-[120px]" />
      </div>

      <div ref={ctaRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6" style={{ opacity: 0 }}>
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">YOUR JOURNEY AWAITS</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white mb-4">
            RESERVE YOUR
            <br />
            <span className="bg-gradient-to-r from-[#c9a96e] via-[#e6c875] to-[#c9a96e] bg-clip-text text-transparent">DREAM CAR</span>
          </h2>
          <p className="text-base font-body font-light text-[#888] max-w-lg mx-auto">
            Fill in the form below and our concierge team will confirm your booking within 1 hour
          </p>
        </div>

        <ReservationForm />

        <div id="contact" className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mt-14 sm:mt-16 pt-10 border-t border-[#222]">
          <a href="tel:+393331234567" className="flex items-center gap-2 text-[#888] hover:text-[#c9a96e] transition-colors duration-300 cursor-hover">
            <Phone size={14} /> <span className="text-sm font-body">+39 333 123 4567</span>
          </a>
          <a href="mailto:reserve@bleader.com" className="flex items-center gap-2 text-[#888] hover:text-[#c9a96e] transition-colors duration-300 cursor-hover">
            <Mail size={14} /> <span className="text-sm font-body">reserve@bleader.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
