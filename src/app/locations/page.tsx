import { buildPageMeta, breadcrumbSchema } from '@/lib/seo';
import Link from 'next/link';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { MapPin, Car, Ship } from 'lucide-react';

export const metadata = buildPageMeta({
  title: 'Luxury Travel Destinations in Salento & Puglia, Italy',
  description:
    'Explore the most exclusive travel destinations in Salento and Puglia, Italy. Discover luxury car experiences, yacht charters, and premium concierge services across Southern Italy.',
  path: '/locations',
  keywords: [
    'travel destinations Salento',
    'luxury travel Puglia',
    'Southern Italy destinations',
    'italy travel guide',
    'travel planning Salento',
    'destination guide Puglia',
  ],
});

const destinations = [
  {
    name: 'Salento',
    description: 'The ultimate boutique destination in Puglia. Where the Adriatic meets the Ionian Sea.',
    link: '/locations/salento',
    icon: MapPin,
  },
  {
    name: 'Ferrari Driving Tours',
    description: 'Experience the thrill of driving Ferrari across the stunning coastal routes of Puglia.',
    link: '/fleet',
    icon: Car,
  },
  {
    name: 'Yacht Charters',
    description: 'Sail the crystal waters of the Adriatic and Ionian seas aboard our luxury yacht fleet.',
    link: '/yacht',
    icon: Ship,
  },
];

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Destinations', path: '/locations' },
        ])}
      />
      <div className="py-20 bg-[#0a0a0a] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-elegant font-light text-white mb-6">Choose Your Destination</h1>
          <p className="text-[#888] text-lg max-w-2xl mb-16">
            Experience Southern Italy like never before. Each destination offers an curated luxury experience, from driving Ferrari along the Adriatic coast to sailing into a Puglian sunset on a private yacht.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => {
              const Icon = destination.icon;
              return (
                <Link
                  key={destination.name}
                  href={destination.link}
                  className="group bg-[#1a1a1a] border border-[#1a1a1a] hover:border-[#c9a96e]/30 transition-all duration-300 p-8 rounded-lg block"
                >
                  <Icon size={32} className="text-[#c9a96e] mb-6 group-hover:scale-110 transition-transform" />
                  <h2 className="text-2xl font-elegant text-white mb-4 group-hover:text-[#c9a96e] transition-colors">
                    {destination.name}
                  </h2>
                  <p className="text-[#888] group-hover:text-[#bbb] transition-colors">
                    {destination.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}