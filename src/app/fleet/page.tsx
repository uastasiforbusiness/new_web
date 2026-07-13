import { buildPageMeta } from '@/lib/seo';
import { FleetShowcase } from '@/components/velox/sections/fleet-showcase';

export const metadata = buildPageMeta({
  title: 'Fleet',
  description:
    'Discover B LEADER\'s exclusive collection: Ferrari California T (560HP), Ferrari California (460HP), Maserati Ghibli, Mercedes E220d Cabrio, and Cranchi Atlantique 50 Flybridge yacht. Specs, photos, and pricing.',
  path: '/fleet',
  keywords: [
    'Ferrari driving experience Salento Italy',
    'Ferrari rental Puglia',
    'supercar rental Italy',
    'Maserati Ghibli Salento',
    'luxury car rental Puglia',
    'Cranchi yacht Puglia',
  ],
});

export default function FleetPage() {
  return <FleetShowcase />;
}
