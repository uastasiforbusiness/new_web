'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor, MapPin, Clock, Compass, ChevronDown, ChevronUp } from 'lucide-react';
import { yachtData } from './data';

export function YachtExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [expandedItinerary, setExpandedItinerary] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 } }
      );

      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const itineraries = [
    {
      id: 'full-day',
      title: 'Full Day Charter',
      duration: '8 hours (10:00 AM - 6:00 PM)',
      route: "Sant'Andrea Island, Gallipoli Bay, Punta della Suina",
      includes: [
        'Professional skipper and assistant',
        'Fuel included',
        'Premium aperitif with local specialties',
        'Light lunch (cold pasta with cherry tomatoes, mozzarella & basil)',
        'Fresh seasonal fruit, 2 bottles prosecco/wine',
        'Water and soft drinks',
        'Snorkeling, SUP, canoe',
      ],
    },
    {
      id: 'half-day',
      title: 'Half Day Charter',
      duration: '4 hours (10:00 AM / 2:00 PM or 3:00 PM / 7:00 PM)',
      route: "Sant'Andrea Island, Gallipoli Bay",
      includes: [
        'Professional skipper and assistant',
        'Fuel included',
        'Traditional Salento aperitif',
        '2 bottles prosecco/wine',
        'Unlimited water',
        'Snorkeling, SUP, canoe',
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="yacht" className="relative py-20 sm:py-28 lg:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
          {/* Yacht Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Anchor, label: 'VESSEL', value: yachtData.name },
              { icon: MapPin, label: 'DEPARTURE', value: yachtData.departure },
              { icon: Clock, label: 'SEASON', value: yachtData.season },
              { icon: Compass, label: 'CAPACITY', value: yachtData.capacity },
            ].map((item) => (
              <div key={item.label} className="bg-[#0d0d0d] border border-[#1a1a1a] p-5 hover:border-[#c9a96e]/15 transition-all duration-300">
                <item.icon size={16} className="text-[#c9a96e]/60 mb-3" />
                <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-1">{item.label}</p>
                <p className="text-xs font-body text-white leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Destinations + Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Destinations */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8">
              <h3 className="text-sm font-elegant font-semibold tracking-wide text-white mb-5">DESTINATIONS</h3>
              <div className="flex flex-wrap gap-2">
                {yachtData.destinations.map((dest) => (
                  <span key={dest} className="text-[10px] font-heading tracking-[0.1em] text-[#c9a96e] bg-[#c9a96e]/[0.06] border border-[#c9a96e]/10 px-3 py-1.5 hover:bg-[#c9a96e]/10 transition-colors duration-300">
                    {dest}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-6 sm:p-8">
              <h3 className="text-sm font-elegant font-semibold tracking-wide text-white mb-5">ONBOARD EQUIPMENT</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yachtData.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#c9a96e]/60" />
                    <p className="text-xs font-body text-[#999]">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Itineraries */}
          <div className="mb-12">
            <h3 className="text-sm font-elegant font-semibold tracking-wide text-white mb-6 text-center">STANDARD ITINERARIES</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {itineraries.map((itin) => (
                <div key={itin.id} className="bg-[#0d0d0d] border border-[#1a1a1a] overflow-hidden">
                  <div
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#c9a96e]/[0.02] transition-colors duration-300"
                    onClick={() => setExpandedItinerary(expandedItinerary === itin.id ? null : itin.id)}
                  >
                    <div>
                      <h4 className="text-sm font-elegant font-semibold text-white">{itin.title}</h4>
                      <p className="text-xs font-body text-[#666] mt-1">{itin.duration}</p>
                    </div>
                    {expandedItinerary === itin.id ? (
                      <ChevronUp size={16} className="text-[#c9a96e]/60" />
                    ) : (
                      <ChevronDown size={16} className="text-[#c9a96e]/60" />
                    )}
                  </div>
                  {expandedItinerary === itin.id && (
                    <div className="border-t border-[#1a1a1a] p-6">
                      <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-2">ROUTE</p>
                      <p className="text-xs font-body text-[#999] mb-4">{itin.route}</p>
                      <p className="text-[9px] font-heading tracking-[0.15em] text-[#c9a96e]/50 mb-2">INCLUDED</p>
                      <ul className="space-y-1.5">
                        {itin.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-[#c9a96e] text-[10px] mt-0.5">+</span>
                            <p className="text-xs font-body text-[#999]">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Payment conditions removed as per no-price strategy */}

          <div className="text-center mt-12">
            <p className="text-xs font-body text-[#c9a96e]/60 uppercase tracking-[0.2em]">
              Bespoke luxury experiences. Contact us for a personalized quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
