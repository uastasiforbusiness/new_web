'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import { Anchor, MapPin, Clock, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { yachtData, yachtExperiences } from '../data';

export function YachtExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading entrance with elegant shimmer effect
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5
          }
        }
      );

      // Content reveal with staggered cards
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate yacht info cards with staggered delay
      gsap.fromTo(
        '.yacht-info-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate destination tags with subtle float
      gsap.fromTo(
        '.destination-tag',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'sine.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate equipment features with pulse effect
      gsap.fromTo(
        '.equipment-feature',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end: 'top 15%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate charter experience cards with smooth reveal
      gsap.fromTo(
        '.charter-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 45%',
            end: 'top -10%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Sunset cruise cards with gentle wave effect
      gsap.fromTo(
        '.sunset-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'sine.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'top -20%',
            toggleActions: 'play none none none'
          }
        }
      );

      // CTA button with subtle glow pulse
      gsap.fromTo(
        '#yacht-cta',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'top -30%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const charterExperiences = yachtExperiences.filter(
    (e) => e.id === 'full-day' || e.id === 'half-day'
  );
  const sunsetExperiences = yachtExperiences.filter(
    (e) => e.id === 'sunset-aperitivo' || e.id === 'sunset-dinner'
  );

  return (
    <section ref={sectionRef} id="yacht" className="relative py-20 sm:py-28 lg:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="yacht-container">
        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-14 sm:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">NAUTICAL EXPERIENCE</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-elegant font-light tracking-wide text-white italic">
            Yacht Experience
          </h2>
          <p className="mt-4 text-sm font-body text-[#999] max-w-2xl mx-auto">
            Luxury yacht rental for events, weddings and coastal experiences in Puglia
          </p>
        </div>

        <div ref={contentRef} style={{ opacity: 0 }}>
          {/* ── Yacht Info Bar with enhanced hover effects ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Anchor, label: 'VESSEL', value: yachtData.name, sub: yachtData.length },
              { icon: MapPin, label: 'DEPARTURE', value: yachtData.departure },
              { icon: Clock, label: 'SEASON', value: yachtData.season },
              { icon: Compass, label: 'CAPACITY', value: yachtData.capacity },
            ].map((item) => (
              <div key={item.label} className="bg-[#0d0d0d] border border-[#1a1a1a] p-5 hover:border-[#c9a96e]/15 transition-all duration-300 yacht-info-card">
                <item.icon size={16} className="text-[#c9a96e]/60 mb-3" />
                <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-1">{item.label}</p>
                <p className="text-xs font-body text-white leading-relaxed">{item.value}</p>
                {item.sub && <p className="text-[10px] font-body text-[#666] mt-0.5">{item.sub}</p>}
              </div>
            ))}
          </div>

          {/* ── Destinations + Features ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8">
              <h3 className="text-sm font-elegant font-semibold tracking-wide text-white mb-5">DESTINATIONS</h3>
              <div className="flex flex-wrap gap-2">
                {yachtData.destinations.map((dest) => (
                  <span key={dest} className="text-[10px] font-heading tracking-[0.1em] text-[#c9a96e] bg-[#c9a96e]/[0.06] border border-[#c9a96e]/10 px-3 py-1.5 hover:bg-[#c9a96e]/10 transition-colors duration-300 destination-tag">
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8">
              <h3 className="text-sm font-elegant font-semibold tracking-wide text-white mb-5">ONBOARD EQUIPMENT</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yachtData.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 equipment-feature">
                    <div className="w-1 h-1 rounded-full bg-[#c9a96e]/60 shrink-0" />
                    <p className="text-xs font-body text-[#999]">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              CHARTER EXPERIENCES — Full Day / Half Day
              ═══════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <h3 className="text-sm font-elegant font-semibold tracking-wide text-white mb-2 text-center">CHARTER EXPERIENCES</h3>
            <p className="text-[10px] font-body text-[#666] text-center mb-8 tracking-wide">SEASONAL PRICING · ALL INCLUSIVE</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {charterExperiences.map((exp) => {
                const isOpen = expandedId === exp.id;
                return (
                  <div
                    key={exp.id}
                    className={`bg-[#0d0d0d] border overflow-hidden transition-all duration-300 charter-card ${isOpen ? 'border-[#c9a96e]/20' : 'border-[#1a1a1a]'}`}
                  >
                    {/* Accordion header with hover and active states */}
                    <div
                      className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#c9a96e]/[0.02] transition-colors duration-300 yacht-info-card"
                      onClick={() => setExpandedId(isOpen ? null : exp.id)}
                      onMouseEnter={() => {
                        gsap.to(".charter-card-header", {
                          backgroundColor: "rgba(201, 169, 110, 0.08)",
                          duration: 0.3,
                          ease: "power2.out"
                        });
                      }}
                      onMouseLeave={() => {
                        gsap.to(".charter-card-header", {
                          backgroundColor: "transparent",
                          duration: 0.3,
                          ease: "power2.out"
                        });
                      }}
                    >
                      <div>
                        <h4 className="text-sm font-elegant font-semibold text-white">{exp.title}</h4>
                        <p className="text-[10px] font-body text-[#c9a96e]/50 mt-0.5 italic">{exp.tagline}</p>
                        <p className="text-xs font-body text-[#666] mt-1">{exp.duration}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[9px] font-heading tracking-[0.1em] text-[#c9a96e]/40">FROM</p>
                          <p className="text-lg font-elegant text-[#c9a96e]">€{Math.min(...exp.pricing.map(p => p.price))}</p>
                        </div>
                        {isOpen
                          ? <ChevronUp size={16} className="text-[#c9a96e]/60" />
                          : <ChevronDown size={16} className="text-[#c9a96e]/60" />
                        }
                      </div>
                    </div>

                    {/* Expanded content — animated reveal with smooth transition */}
                    <AnimatePresence initial={false} mode="wait">
                      {isOpen && (
                        <motion.div
                          key="expanded-content"
                          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                          exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <div className="border-t border-[#1a1a1a] p-6 space-y-5">
                        {/* Route */}
                        <div>
                          <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-1">ROUTE</p>
                          <p className="text-xs font-body text-[#999]">{exp.route}</p>
                        </div>

                        {/* Pricing table */}
                        <div>
                          <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-2">SEASONAL PRICING</p>
                          <div className="bg-[#0a0a0a] border border-[#1a1a1a]">
                            {exp.pricing.map((p, i) => (
                              <div key={p.period} className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? 'border-t border-[#1a1a1a]' : ''}`}>
                                <p className="text-[11px] font-body text-[#999]">{p.period}</p>
                                <p className="text-[13px] font-elegant text-[#c9a96e]">€{p.price.toLocaleString('en-US')}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Includes */}
                        <div>
                          <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-2">INCLUDED</p>
                          <ul className="space-y-1.5">
                            {exp.includes.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span className="text-[#c9a96e] text-[10px] mt-0.5">+</span>
                                <p className="text-xs font-body text-[#999]">{item}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Optionals */}
                        {exp.optionals && exp.optionals.length > 0 && (
                          <div>
                            <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-2">OPTIONAL EXTRAS</p>
                            <div className="flex flex-wrap gap-2">
                              {exp.optionals.map((opt) => (
                                <span key={opt} className="text-[10px] font-heading tracking-[0.08em] text-[#999] bg-[#ffffff08] border border-[#ffffff10] px-3 py-1.5">
                                  {opt} — on request
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              SUNSET CRUISES — Aperitivo / Dinner
              ═══════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <h3 className="text-sm font-elegant font-semibold tracking-wide text-white mb-2 text-center">SUNSET CRUISES</h3>
            <p className="text-[10px] font-body text-[#666] text-center mb-8 tracking-wide">2-HOUR EXPERIENCES · FIXED PRICE ALL SEASON</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sunsetExperiences.map((exp) => (
                <div key={exp.id} className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8 hover:border-[#c9a96e]/15 transition-all duration-300 sunset-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-elegant font-semibold text-white">{exp.title}</h4>
                      <p className="text-[10px] font-body text-[#c9a96e]/50 italic mt-0.5">{exp.tagline}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-[9px] font-heading tracking-[0.1em] text-[#c9a96e]/40">PRICE</p>
                      <p className="text-2xl font-elegant text-[#c9a96e]">€{exp.pricing[0].price.toLocaleString('en-US')}</p>
                    </div>
                  </div>

                  <p className="text-xs font-body text-[#666] mb-1">{exp.duration}</p>
                  <p className="text-xs font-body text-[#999] mb-4">{exp.route}</p>

                  <div className="border-t border-[#1a1a1a] pt-4">
                    <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-2">INCLUDED</p>
                    <ul className="space-y-1.5">
                      {exp.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-[#c9a96e] text-[10px] mt-0.5">+</span>
                          <p className="text-xs font-body text-[#999]">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-[10px] font-heading tracking-[0.08em] text-[#666] bg-[#ffffff06] border border-[#ffffff0c] px-3 py-1.5">
                      Tender — on request
                    </span>
                    <span className="text-[10px] font-heading tracking-[0.08em] text-[#666] bg-[#ffffff06] border border-[#ffffff0c] px-3 py-1.5">
                      Jet ski — on request
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA with enhanced animation ── */}
          <div className="text-center" id="yacht-cta">
            <a
              href="#reserve"
              id="yacht-cta-button"
              className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0a0a] font-heading font-semibold text-[11px] tracking-[0.2em] px-8 py-3.5 hover:bg-[#d4b77e] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,169,110,0.3)]"
            >
              BOOK YOUR EXPERIENCE
            </a>
            <p className="text-[10px] font-body text-[#666] mt-4 tracking-wide">
              Bespoke itineraries available · Custom packages on request
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
