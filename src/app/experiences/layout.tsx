import { buildPageMeta } from '@/lib/seo';

export const metadata = buildPageMeta({
  title: 'Experiences — B LEADER Luxury Drives & Yacht Charters in Puglia',
  description:
    'Explore four exclusive ways to experience Salento: drive a Ferrari along the Ionian coast, explore the Adriatic sea caves, combine supercar and yacht, or charter a private Cranchi 50.',
  path: '/experiences',
});

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}