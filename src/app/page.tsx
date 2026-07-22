import { buildPageMeta } from '@/lib/seo';
import { HomeClient } from './_components/home-client';

// Home page uses the root layout's no title override needed.
// Subpages (fleet, yacht, services, about) pass their short title to buildPageMeta
// and the root layout's template adds "| B LEADER".
export const metadata = buildPageMeta({
  title: 'B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy',
  description:
    'Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht. Curated luxury experiences in Salento — concierge, professional photographer, champagne included.',
  path: '/',
});

export default function Home() {
  return <HomeClient />;
}
