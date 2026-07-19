import {
  buildPageMeta,
  breadcrumbSchema,
  faqSchema,
  experienceSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { ExperienceLanding } from '@/components/velox/ui/experience-landing';

const path = '/experiences/yacht-charter-salento';

const faqs = [
  {
    question: 'Is a Salento yacht charter good for a US honeymoon?',
    answer:
      'Yes. Private charters suit couples who want the coast without crowded beach clubs — sunset light, swimming stops, and a celebration pace. We coordinate boarding times around your hotel or villa plans.',
  },
  {
    question: 'Where do charters typically depart?',
    answer:
      'Departures are arranged along the Salento coast depending on sea conditions and your preferred stretch of Adriatic or Ionian water. Exact marina details are confirmed after your request.',
  },
  {
    question: 'Do we need boating experience?',
    answer:
      'No. Charters are hosted experiences. You relax; professional crew handle the vessel. Tell us if you want a quiet swim day, a photographer on board, or a champagne sunset.',
  },
  {
    question: 'Can we combine yacht and Ferrari in one trip?',
    answer:
      'Absolutely. Many international guests pair a coastal drive day with a sea day. Ask for a two-experience sequence when you reserve — we schedule recovery time between thrills.',
  },
];

export const metadata = buildPageMeta({
  title: 'Private Yacht Charter in Salento, Italy | Luxury for US Travelers',
  description:
    'Private yacht experiences on the Adriatic and Ionian coasts of Salento. Sunset sails, couples charters, and celebration days for American travelers — English concierge, photographer optional.',
  path,
  keywords: [
    'yacht charter Salento',
    'private yacht Puglia honeymoon',
    'sunset yacht tour Adriatic',
    'luxury yacht charter for Americans Italy',
    'Ionian yacht experience Salento',
  ],
});

export default function YachtCharterSalentoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experiences', path: '/experiences' },
          { name: 'Yacht Charter Salento', path },
        ])}
      />
      <JsonLd
        data={experienceSchema({
          name: 'Private Yacht Charter — Salento',
          description:
            'Private yacht charter on the Adriatic and Ionian seas of Salento for luxury couples and international travelers.',
          path,
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <ExperienceLanding
        eyebrow="YACHT · ADRIATIC · IONIAN"
        title="Private waters,"
        titleAccent="Salento light"
        lead="A charter here is not a party boat. It is silence, turquoise shelves of water, and the slow theater of a Puglian sunset — reserved for you and whoever you choose to share it with."
        paragraphs={[
          'US travelers often discover Salento after Amalfi feels crowded. The payoff is space: coves that still feel personal, cliffs that catch late gold, and a sea that photographs like a private campaign.',
          'B LEADER arranges the day around your mood — long swim anchors, a leisurely loop, or a timed sunset return. English-speaking coordination means you are never guessing which pier, which hour, which bottle.',
          'Pair it with a Ferrari morning if you want the full heel-of-Italy story: land and sea, engine and hush, in a single trip that feels designed rather than improvised.',
        ]}
        highlights={[
          {
            label: 'MOOD',
            detail: 'Couples, proposals, intimate celebrations, and friends who travel well together.',
          },
          {
            label: 'SEA',
            detail: 'Adriatic and Ionian options shaped by weather and season — beauty first, bravado never.',
          },
          {
            label: 'EXTRAS',
            detail: 'Photographer, champagne service, and multi-day villa + sea sequences on request.',
          },
          {
            label: 'PLANNING',
            detail: 'Easy to arrange from the US by WhatsApp or email before you travel — hotel or villa timing coordinated with your charter day.',
          },
        ]}
        faqs={faqs}
        primaryCta={{ href: '/#reserve', label: 'REQUEST YACHT DATES' }}
        secondaryCta={{ href: '/yacht', label: 'YACHT DETAILS' }}
      />
    </>
  );
}
