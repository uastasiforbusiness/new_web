'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Experience } from '@/data/experiences';

interface Props {
  experience: Experience;
}

export function ExperienceCTA({ experience }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLSpanElement>(null);
  const [animatedPrice, setAnimatedPrice] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Section entrance
      gsap.fromTo(
        '.cta-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      );

      // Price counter animation
      const numericPrice = parseInt(experience.price.replace(/[€,\s]/g, ''));
      if (!isNaN(numericPrice) && priceRef.current) {
        ScrollTrigger.create({
          trigger: priceRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.fromTo(
              { val: 0 },
              { val: 0 },
              {
                val: numericPrice,
                duration: 1.5,
                ease: 'power2.out',
                onUpdate: () => {
                  const current = Math.round(gsap.getProperty(
                    { val: 0 },
                    'val',
                  ) as number);
                  setAnimatedPrice(
                    `€${current.toLocaleString()}`,
                  );
                },
                onComplete: () => {
                  setAnimatedPrice(experience.price);
                },
              },
            );
          },
          once: true,
        });
      } else {
        setAnimatedPrice(experience.price);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [experience.price]);

  // WhatsApp link
  const waMessage = encodeURIComponent(
    `Hi B LEADER! I'm interested in the ${experience.title} (${experience.subtitle}).`,
  );
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393331234567';

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-[#0a0a0a] border-t border-white/5"
    >
      <div className="cta-content max-w-3xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
        {/* Eyebrow */}
        <p
          className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-semibold mb-6"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          Secure Your Date
        </p>

        {/* Headline */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-[1.05] mb-3"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          This Experience{' '}
          <span
            className="italic"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              color: experience.color,
            }}
          >
            Books Quickly
          </span>
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          {experience.duration} · Private · Concierge included
        </p>

        {/* Price reveal — the "wow" moment */}
        <div className="mb-10">
          <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mb-2">
            From
          </p>
          <span
            ref={priceRef}
            className="text-5xl sm:text-6xl md:text-7xl font-bold inline-block"
            style={{ color: experience.color }}
          >
            {animatedPrice || (
              <span className="inline-block w-32 h-12 bg-white/5 rounded animate-pulse" />
            )}
          </span>
          {experience.priceLabel && (
            <span className="text-gray-500 text-sm ml-2">
              / {experience.priceLabel}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${waNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(201,169,110,0.3)]"
          >
            <span>Book Now</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </a>
          <a
            href="/#reserve"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/15 hover:border-[#c9a96e]/40 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
          >
            Request Details
          </a>
        </div>

        {/* Trust signal */}
        <p className="mt-6 text-gray-600 text-[10px] tracking-[0.15em]">
          ✦ Private experience · Professional photographer · Concierge service
        </p>
      </div>
    </section>
  );
}