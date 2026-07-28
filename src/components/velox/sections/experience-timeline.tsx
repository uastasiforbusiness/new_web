'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Experience } from '@/data/experiences';

interface Props {
  experience: Experience;
}

/** Subtle color shifts for each step to create a visual journey */
const STEP_ACCENTS = [
  'rgba(212,0,0,0.03)',
  'rgba(201,169,110,0.03)',
  'rgba(74,103,65,0.03)',
  'rgba(201,169,110,0.03)',
  'rgba(26,82,118,0.03)',
  'rgba(201,169,110,0.02)',
];

export function ExperienceTimeline({ experience }: Props) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const steps = timelineRef.current?.querySelectorAll('.tl-step');
      if (!steps?.length) return;

      // Golden thread — grows as user scrolls
      const thread = timelineRef.current?.querySelector('.golden-thread');
      if (thread) {
        gsap.set(thread, { scaleY: 0, transformOrigin: 'top center' });
        gsap.to(thread, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 10%',
            end: 'bottom 80%',
            scrub: 1,
          },
        });
      }

      // Each step reveals + dot pulses
      steps.forEach((step, i) => {
        const dot = step.querySelector('.tl-dot');
        const content = step.querySelector('.tl-content');

        gsap.set(step, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: step as HTMLElement,
          start: 'top 85%',
          onEnter: () => {
            const tl = gsap.timeline({
              defaults: { ease: 'power3.out' },
            });
            tl.to(step, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.08 });
            if (dot) {
              tl.to(
                dot,
                { scale: 1.3, duration: 0.3, ease: 'back.out(2)' },
                '-=0.6',
              ).to(dot, { scale: 1, duration: 0.4, ease: 'power1.out' });
            }
            if (content) {
              tl.fromTo(
                content,
                { x: 15, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6 },
                '-=0.5',
              );
            }
          },
          once: true,
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p
            className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-semibold mb-4"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            The Itinerary
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
          >
            Your Journey,
            <br />
            <span
              className="italic text-[#c9a96e]"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              moment by moment
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-10 sm:pl-14">
          {/* Golden thread */}
          <div
            className="golden-thread absolute left-[15px] sm:left-[21px] top-0 bottom-0 w-[1px] origin-top"
            style={{
              background:
                'linear-gradient(180deg, #c9a96e 0%, #e6c875 30%, #c9a96e 60%, rgba(201,169,110,0.2) 100%)',
            }}
          />

          {/* Steps */}
          {experience.itinerary.map((step, i) => (
            <div
              key={i}
              className="tl-step relative mb-16 last:mb-0 rounded-lg p-5 -ml-5 sm:-ml-7"
              style={{
                background: i % 2 === 0 ? STEP_ACCENTS[i] : 'transparent',
              }}
            >
              {/* Dot */}
              <div
                className="tl-dot absolute -left-10 sm:-left-14 top-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm border-2 shadow-lg"
                style={{
                  borderColor: experience.color,
                  backgroundColor: '#0a0a0a',
                  color: experience.color,
                }}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="tl-content pt-1">
                <span
                  className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase mb-1"
                  style={{ color: experience.color }}
                >
                  {step.time}
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base max-w-xl">
                  {step.description}
                </p>

                {/* Optional highlight box */}
                {step.highlight && (
                  <div
                    className="mt-4 p-4 rounded-lg border"
                    style={{
                      background: `linear-gradient(135deg, ${experience.color}12, transparent)`,
                      borderColor: `${experience.color}25`,
                    }}
                  >
                    <span
                      className="inline-block text-[9px] font-semibold tracking-[0.2em] uppercase px-2 py-1 rounded mb-2"
                      style={{
                        background: `${experience.color}25`,
                        color: experience.color,
                      }}
                    >
                      {step.highlight.tag}
                    </span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.highlight.text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}