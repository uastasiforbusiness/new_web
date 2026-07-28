'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { type Experience } from '@/data/experiences';

interface Props {
  experience: Experience;
}

export function ExperienceIncludes({ experience }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      const items = sectionRef.current?.querySelectorAll('.include-item');
      if (!items?.length) return;

      items.forEach((item, i) => {
        gsap.set(item, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: item as HTMLElement,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: i * 0.08,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Title */}
          <div>
            <p
              className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-semibold mb-4"
              style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
            >
              What&apos;s Included
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
            >
              Everything You Need.
              <br />
              <span
                className="italic text-[#c9a96e]"
                style={{ fontFamily: 'var(--font-cormorant), serif' }}
              >
                Nothing You Don&apos;t.
              </span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              From the moment you arrive to the final farewell, every detail is
              curated. Just bring your sense of wonder.
            </p>
          </div>

          {/* Right: Items */}
          <div className="space-y-3">
            {experience.includes.map((item, i) => (
              <div
                key={i}
                className="include-item flex items-start gap-3 p-3 rounded-lg transition-colors duration-300 hover:bg-white/[0.02]"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: experience.color }}
                >
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}