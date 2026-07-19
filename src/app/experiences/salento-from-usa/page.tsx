import {
  buildPageMeta,
  breadcrumbSchema,
  faqSchema,
  experienceSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { ExperienceLanding } from '@/components/velox/ui/experience-landing';

const path = '/experiences/salento-from-usa';

const faqs = [
  {
    question: 'Which airport should US travelers use for Salento?',
    answer:
      'Brindisi (BDS) is usually the closest gateway to Salento. Bari (BRI) also works with a longer transfer and more long-haul connection options. We help sequence your experience days around wheels-down time.',
  },
  {
    question: 'How many days do I need for Ferrari + yacht?',
    answer:
      'A refined minimum is three full days on the ground: arrival buffer, one supercar day, one sea day. Five days lets you add Lecce, Gallipoli or Otranto without rushing.',
  },
  {
    question: 'Do you price in USD?',
    answer:
      'Quotes are in EUR (standard in Italy). We can share an indicative USD range when you inquire so finance feels clear before you commit. Final settlement follows the confirmed EUR total.',
  },
  {
    question: 'What should I book before leaving the United States?',
    answer:
      'Lock experience dates early in peak season (late spring–early fall), confirm license documents for driving days, and share flight arrivals so handovers are timed. Villas and hotels can be coordinated around the same calendar.',
  },
];

export const metadata = buildPageMeta({
  title: 'Salento from the USA — Luxury Trip Guide & Experiences',
  description:
    'Planning Salento from the United States: Brindisi & Bari airports, sample 3-day luxury rhythm, Ferrari and yacht days, licenses, and English-speaking concierge with B LEADER.',
  path,
  keywords: [
    'Salento from USA',
    'Puglia luxury trip Americans',
    'Brindisi airport luxury transfer experiences',
    '3 day Salento itinerary luxury',
    'Italy supercar vacation from US',
  ],
});

export default function SalentoFromUsaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experiences', path: '/experiences' },
          { name: 'Salento from the USA', path },
        ])}
      />
      <JsonLd
        data={experienceSchema({
          name: 'Salento Luxury Trip Planning for US Travelers',
          description:
            'Guide and concierge framework for American travelers visiting Salento for Ferrari and yacht experiences.',
          path,
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <ExperienceLanding
        eyebrow="US TRAVELERS · SALENTO PLAYBOOK"
        title="Fly in."
        titleAccent="Drive. Sail. Remember."
        lead="A practical luxury framework for Americans discovering Salento — airports, pacing, and the experiences that make the long-haul worth it."
        paragraphs={[
          'US search interest in Puglia and Salento keeps rising: travelers want Italy with more space, stronger food culture, and coasts that still feel cinematic. The friction is logistics. That is where B LEADER sits — between your itinerary and the keys or the gangway.',
          'Think in chapters, not checklists. Day zero is arrival and light. Day one is the road: Ferrari, wind, villages. Day two is the water: private charter, swim, sunset. Everything else — Lecce stone, Gallipoli evenings, Otranto gold — fills the spaces between without stealing recovery time.',
          'You can plan most of this from the United States on WhatsApp or email. We confirm documents, deposits, and timing before you board the transatlantic leg so your first morning in Italy is not spent translating rental desks.',
        ]}
        highlights={[
          {
            label: 'AIRPORTS',
            detail: 'BDS (Brindisi) for proximity; BRI (Bari) for broader connections. Share your flight — we reverse-engineer handovers.',
          },
          {
            label: '3-DAY RHYTHM',
            detail: 'Arrive → supercar coast day → yacht day → optional town evening. Expand if you have a full week.',
          },
          {
            label: 'DOCUMENTS',
            detail: 'Valid license (+ IDP when applicable), passport, and card for deposit. We spell requirements before you fly.',
          },
          {
            label: 'WHEN TO COME',
            detail: 'May–October for sea days; shoulder months for quieter roads and softer light. Holidays book out early.',
          },
        ]}
        faqs={faqs}
        primaryCta={{ href: '/#reserve', label: 'PLAN MY DATES' }}
        secondaryCta={{ href: '/experiences/ferrari-driving-salento', label: 'FERRARI EXPERIENCE' }}
        showUsBlock
      />
    </>
  );
}
