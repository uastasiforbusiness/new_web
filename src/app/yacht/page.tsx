import { buildPageMeta, breadcrumbSchema, productSchema } from '@/lib/seo';
import { YachtExperienceSection } from '@/components/velox/sections/yacht-experience-section';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { yachtData } from '@/components/velox/data';

export const metadata = buildPageMeta({
  title: 'Yacht',
  description:
    'Luxury yacht experiences in Salento, Puglia. Full-day, half-day, sunset aperitivo, and dinner cruises aboard Cranchi Atlantique 50 Flybridge. Depart from Porto Gaio, Gallipoli.',
  path: '/yacht',
  keywords: [
    'luxury yacht experience Puglia',
    'sunset yacht tour Salento',
    'yacht dinner experience Adriatic',
    'yacht charter Gallipoli',
    'boat rental Salento Italy',
  ],
});

export default function YachtPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Yacht', path: '/yacht' },
        ])}
      />
      <JsonLd
        data={productSchema({
          name: yachtData.name,
          brand: 'Cranchi',
          category: 'Yacht',
          image: '/images/floating_last.webp',
          pricePerDay: 2000,
          currency: 'EUR',
          description: `Luxury yacht ${yachtData.name} (${yachtData.length}). Capacity: ${yachtData.capacity}. Departure: ${yachtData.departure}. Season: ${yachtData.season}.`,
        })}
      />
      <YachtExperienceSection />
    </>
  );
}
