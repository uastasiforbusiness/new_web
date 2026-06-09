'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function TextReveal({
  text,
  className = '',
  delay = 0,
  trigger,
}: {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = text.split('');

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const spans = containerRef.current?.querySelectorAll('.char');
      if (!spans) return;

      const config = {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.6, ease: 'power3.out',
        stagger: 0.03, delay,
      };

      const fromVars = { opacity: 0, y: 40, rotateX: -90 };

      if (trigger) {
        gsap.fromTo(spans, fromVars, {
          ...config,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      } else {
        gsap.fromTo(spans, fromVars, config);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ opacity: 0 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
