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
    question: 'How do US travelers usually reach Salento?',
    answer:
      'Most international guests fly into Puglia and continue to Salento by their own transfer or hotel arrangement. Plan buffer time after a long-haul flight before a supercar or yacht day.',
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
      'Lock experience dates early in peak season (late spring–early fall) and confirm license documents for driving days. Villas and hotels can sit on the same calendar as your B LEADER experiences.',
  },
];

export const metadata = buildPageMeta({
  title: 'Salento from the USA — Luxury Trip Guide & Experiences',
  description:
    'Planning Salento from the United States: sample 3-day luxury rhythm, Ferrari and yacht days, licenses, and English-speaking concierge with B LEADER in Puglia, Italy.',
  path,
  keywords: [
    'Salento from USA',
    'Puglia luxury trip Americans',
    '3 day Salento itinerary luxury',
    'Italy supercar vacation from US',
    'Salento yacht and Ferrari trip',
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
        lead="A practical luxury framework for Americans discovering Salento — pacing, documents, and the experiences that make the long-haul worth it."
        paragraphs={[
          'US search interest in Puglia and Salento keeps rising: travelers want Italy with more space, stronger food culture, and coasts that still feel cinematic. The friction is knowing what to book first. That is where B LEADER sits — Ferrari days and private yacht charters with English concierge.',
          'Think in chapters, not checklists. Day zero is arrival and light. Day one is the road: Ferrari, wind, villages. Day two is the water: private charter, swim, sunset. Everything else — Lecce stone, Gallipoli evenings, Otranto gold — fills the spaces between without stealing recovery time.',
          'You can plan most of this from the United States on WhatsApp or email. We confirm documents, deposits, and experience timing before you travel so your first full day in Italy is not spent decoding the fine print.',
        ]}
        highlights={[
          {
            label: 'FOCUS',
            detail: 'We curate driving and yacht experiences — not airport transfers. Arrange your own arrival; we handle the unforgettable days.',
          },
          {
            label: '3-DAY RHYTHM',
            detail: 'Arrive → supercar coast day → yacht day → optional town evening. Expand if you have a full week.',
          },
          {
            label: 'DOCUMENTS',
            detail: 'Valid license (+ IDP when applicable), passport, and card for deposit. We spell driving-day requirements before you fly.',
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
