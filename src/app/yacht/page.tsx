import { buildPageMeta } from '@/lib/seo';
import { YachtExperienceSection } from '@/components/velox/sections/yacht-experience-section';

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
  return <YachtExperienceSection />;
}
