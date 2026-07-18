import { buildPageMeta, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { Shield, Heart, MapPin, Award } from 'lucide-react';
import { Navigation } from '@/components/velox/sections/navigation';

export const metadata = buildPageMeta({
  title: 'About B LEADER — Luxury Experience Curator in Salento, Puglia',
  description:
    'B LEADER is a luxury experience curator based in Salento, Puglia. Founded in 2023, we specialize in Ferrari driving tours, yacht charters, and premium concierge services for discerning travelers from around the world.',
  path: '/about',
  keywords: [
    'about B LEADER',
    'luxury experience curator Salento',
    'Puglia luxury travel',
    'B LEADER team',
    'Italian luxury experiences',
    'Salento Ferrari tours',
  ],
});

const values = [
  {
    icon: Shield,
    title: 'Excellence',
    description:
      'Every vehicle is meticulously maintained, every itinerary carefully planned. We accept nothing less than perfection.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description:
      'Born from a love for Italian automotive heritage and the breathtaking landscapes of Puglia. We share what moves us.',
  },
  {
    icon: MapPin,
    title: 'Local Mastery',
    description:
      'Deep roots in Salento mean we know the hidden coves, the scenic roads, and the best vineyards that tourists never find.',
  },
  {
    icon: Award,
    title: 'Discretion',
    description:
      'White-glove service from booking to drop-off. Your privacy and comfort are our highest priority.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        {/* Nav spacer */}
        <div className="h-20" />

        {/* Hero */}
        <section className="relative py-20 sm:py-28 border-b border-[#222]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
              <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">
                EST. 2023
              </p>
              <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-elegant font-light tracking-wide text-white mb-6 italic">
              The B LEADER
              <br />
              <span className="shimmer-text not-italic">Story</span>
            </h1>
            <p className="text-base sm:text-lg font-body font-light text-[#999] max-w-2xl mx-auto leading-relaxed">
              Born in the heart of Salento, Puglia, B LEADER brings the world&apos;s most discerning travelers to discover what few have the privilege to experience: the Ionian and Adriatic coasts of Salento — among the most spectacular and iconic in the Mediterranean — through automotive and nautical experiences of absolute excellence.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 sm:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="group bg-[#0d0d0d] border border-[#1a1a1a] p-8 sm:p-10 hover:border-[#c9a96e]/20 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 flex items-center justify-center border border-[#c9a96e]/20 rounded-full group-hover:bg-[#c9a96e]/5 transition-all duration-500">
                        <Icon size={20} className="text-[#c9a96e]/80" />
                      </div>
                      <h3 className="text-lg font-elegant font-semibold tracking-wide text-white">
                        {v.title}
                      </h3>
                    </div>
                    <p className="text-sm font-body font-light text-[#999] leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-[#222]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-elegant font-light tracking-wide text-white mb-6 italic">
              Ready to experience Puglia your way?
            </h2>
            <Link
              href="/#reserve"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#c9a96e] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] hover:bg-[#d4af37] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,169,110,0.3)]"
            >
              RESERVE YOUR EXPERIENCE
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
