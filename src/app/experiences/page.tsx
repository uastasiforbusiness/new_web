import { buildPageMeta, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { Navigation } from '@/components/velox/sections/navigation';
import { Footer } from '@/components/velox/sections/footer';
import { UsTravelersSection } from '@/components/velox/sections/us-travelers-section';
import { Car, Ship, Compass } from 'lucide-react';

export const metadata = buildPageMeta({
  title: 'Luxury Experiences in Salento for US Travelers',
  description:
    'Ferrari driving, private yacht charters, and concierge-led Salento itineraries designed for American and international luxury travelers. English-speaking service in Puglia, Italy.',
  path: '/experiences',
  keywords: [
    'Salento luxury experiences US travelers',
    'Ferrari driving Puglia Americans',
    'yacht charter Salento honeymoon',
    'luxury vacation Southern Italy from USA',
  ],
});

const cards = [
  {
    href: '/experiences/ferrari-driving-salento',
    icon: Car,
    title: 'Ferrari Driving Experience',
    body: 'Self-drive Ferrari days on Adriatic and Ionian coastal roads — the Italian dream, properly hosted.',
  },
  {
    href: '/experiences/yacht-charter-salento',
    icon: Ship,
    title: 'Private Yacht Charter',
    body: 'Sunset sails, couples escapes, and celebration charters on crystal Salento waters.',
  },
  {
    href: '/experiences/salento-from-usa',
    icon: Compass,
    title: 'Salento from the USA',
    body: 'How US travelers plan the trip: pacing, licenses, and a sample 3-day luxury rhythm.',
  },
];

export default function ExperiencesHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experiences', path: '/experiences' },
        ])}
      />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Navigation />
        <div className="h-20" />

        <section className="py-16 sm:py-24 border-b border-[#1a1a1a]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[10px] font-heading font-semibold tracking-[0.45em] text-[#c9a96e] mb-5">
              B LEADER EXPERIENCES
            </p>
            <h1 className="text-4xl sm:text-6xl font-elegant font-light text-white tracking-wide mb-6 italic">
              Salento, curated
              <br />
              <span className="not-italic shimmer-text">for those who fly in</span>
            </h1>
            <p className="text-[#888] font-body font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              High-intent journeys for US and international guests: supercars, yachts, and a concierge
              that respects your time and your standards.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
            {cards.map(({ href, icon: Icon, title, body }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-xl border border-[#1a1a1a] bg-[#111]/50 p-8 hover:border-[#c9a96e]/30 transition-all duration-300"
              >
                <Icon size={28} className="text-[#c9a96e] mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl font-elegant text-white mb-3 group-hover:text-[#c9a96e] transition-colors">
                  {title}
                </h2>
                <p className="text-sm font-body text-[#888] leading-relaxed">{body}</p>
                <p className="mt-6 text-[10px] font-heading tracking-[0.25em] text-[#c9a96e]/70 group-hover:text-[#c9a96e]">
                  EXPLORE →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <UsTravelersSection compact />
        <Footer />
      </main>
    </>
  );
}
