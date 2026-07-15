import { buildPageMeta, breadcrumbSchema } from '@/lib/seo';
import { ServiceLinesSection } from '@/components/velox/sections/service-lines-section';
import { CoverageSection } from '@/components/velox/sections/coverage-section';
import { JsonLd } from '@/components/velox/ui/json-ld';

export const metadata = buildPageMeta({
  title: 'Luxury Concierge & Event Services in Southern Italy',
  description:
    'B LEADER premium services in Salento, Puglia: luxury car rental with chauffeur, yacht charter, wedding car, corporate events, and party service. English-speaking chauffeurs across Southern Italy.',
  path: '/services',
  keywords: [
    'luxury concierge Salento',
    'wedding car rental Puglia',
    'corporate car service Italy',
    'luxury event rental Puglia',
    'B LEADER services',
    'chauffeur service Puglia',
    'private driver Southern Italy',
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <ServiceLinesSection />
      <CoverageSection />
    </>
  );
}
