'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail } from 'lucide-react';
import { ReservationForm } from './reservation-form';

const PARTICLE_COUNT = 35;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: ((i * 31 + 17) % 100),
  top: ((i * 47 + 11) % 100),
  size: (i % 3) + 1,
  baseOpacity: (i % 5 + 1) * 0.04 + 0.03,
  duration: 4 + (i % 7) * 1.5,
  delay: (i % 5) * 0.6,
}));

export function ReserveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blobTopRef = useRef<HTMLDivElement>(null);
  const blobBottomRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      // Parallax on background blobs
      if (blobTopRef.current && blobBottomRef.current) {
        gsap.to(blobTopRef.current, {
          y: -60,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
        gsap.to(blobBottomRef.current, {
          y: 50,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        });
      }

      // Subtle noise texture parallax
      if (noiseRef.current) {
        gsap.to(noiseRef.current, {
          y: 30,
          ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 2 },
        });
      }

      // Animate gold particles — only when section is in view
      if (particlesRef.current) {
        const dots = Array.from(particlesRef.current.querySelectorAll('.reserve-particle'));
        const particleTweens: gsap.core.Tween[] = [];

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => {
            particleTweens.length = 0;
            dots.forEach((dot, i) => {
              const p = particles[i];
              if (!p) return;
              const tween = gsap.to(dot, {
                y: `random(-25, 25)`,
                x: `random(-15, 15)`,
                opacity: `random(0.05, 0.3)`,
                duration: p.duration,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: p.delay,
              });
              particleTweens.push(tween);
            });
          },
          onLeave: () => particleTweens.forEach((t) => t.kill()),
          onLeaveBack: () => particleTweens.forEach((t) => t.kill()),
          onEnterBack: () => {
            particleTweens.length = 0;
            dots.forEach((dot, i) => {
              const p = particles[i];
              if (!p) return;
              const tween = gsap.to(dot, {
                y: `random(-25, 25)`,
                x: `random(-15, 15)`,
                opacity: `random(0.05, 0.3)`,
                duration: p.duration,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                delay: p.delay,
              });
              particleTweens.push(tween);
            });
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reserve" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden">
      {/* Noise texture overlay for depth */}
      <div
        ref={noiseRef}
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Animated gold particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[1] pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="reserve-particle absolute rounded-full"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, #c9a96e 0%, transparent 70%)`,
              opacity: p.baseOpacity,
            }}
          />
        ))}
      </div>

      {/* Background glow blobs with parallax */}
      <div className="absolute inset-0 z-0">
        <div
          ref={blobTopRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, rgba(201,169,110,0.01) 50%, transparent 70%)' }}
        />
        <div
          ref={blobBottomRef}
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 60%)' }}
        />
      </div>

      <div ref={ctaRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6" style={{ opacity: 0 }}>
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">YOUR JOURNEY AWAITS</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white mb-4 italic">
            Reserve Your
            <br />
            <span className="shimmer-text">Dream Car</span>
          </h2>
          <p className="text-base font-body font-light text-[#999] max-w-lg mx-auto tracking-wide">
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
