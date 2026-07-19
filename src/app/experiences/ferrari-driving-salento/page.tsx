import {
  buildPageMeta,
  breadcrumbSchema,
  faqSchema,
  experienceSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/velox/ui/json-ld';
import { ExperienceLanding } from '@/components/velox/ui/experience-landing';

const path = '/experiences/ferrari-driving-salento';

const faqs = [
  {
    question: 'Can US tourists drive a Ferrari in Italy?',
    answer:
      'Yes. Guests typically need a valid full driving license held for the required period, and many US visitors carry an International Driving Permit alongside their state license. We confirm requirements before your date so arrival day is seamless.',
  },
  {
    question: 'Where does the Ferrari experience start in Salento?',
    answer:
      'Hand-over is arranged in the Salento area with English-speaking support. Pickup timing can align with arrivals via Brindisi (BDS) or Bari (BRI) and your hotel or villa.',
  },
  {
    question: 'Is this a track day or a coastal road experience?',
    answer:
      'B LEADER focuses on curated open-road coastal and countryside routes — Adriatic light, Ionian cliffs, white towns — not a closed circuit. It is the Italian driving dream, not a race school.',
  },
  {
    question: 'What is included for international guests?',
    answer:
      'Vehicle preparation, briefing, route guidance, and concierge coordination. Photographer and champagne packages are available on request for proposals, anniversaries, and celebrations.',
  },
];

export const metadata = buildPageMeta({
  title: 'Ferrari Driving Experience in Salento, Italy | For US Travelers',
  description:
    'Drive a Ferrari along the Adriatic and Ionian coasts of Salento. English-speaking luxury self-drive experiences for American travelers — near Brindisi and Bari airports, concierge included.',
  path,
  keywords: [
    'Ferrari driving experience Salento',
    'Ferrari rental Puglia US tourists',
    'drive Ferrari Italy vacation',
    'Ferrari California Salento',
    'supercar experience Southern Italy Americans',
  ],
});

export default function FerrariDrivingSalentoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Experiences', path: '/experiences' },
          { name: 'Ferrari Driving Salento', path },
        ])}
      />
      <JsonLd
        data={experienceSchema({
          name: 'Ferrari Driving Experience — Salento',
          description:
            'Self-drive Ferrari experience on the coasts of Salento, Puglia, for luxury and international travelers.',
          path,
          image: '/images/rossa_card.webp',
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <ExperienceLanding
        eyebrow="SUPERCAR · SALENTO · PUGLIA"
        title="Ferrari driving"
        titleAccent="on the Salento coast"
        lead="The fantasy Americans book flights for: open air, red bodywork, and the heel of Italy unspooling ahead of you — hosted with quiet luxury, not tourist chaos."
        paragraphs={[
          'Salento sits where the Adriatic meets the Ionian. The light is different here. The roads braid through olive groves, baroque towns, and cliff edges that make a Ferrari California feel like it was designed for this exact geometry.',
          'B LEADER is not a desk-rental agency. We prepare the car, brief you in English, and shape a route that matches your pace — golden-hour coastal runs, village pauses, and the kind of photos that survive the group chat back home.',
          'Whether you are landing from New York, Miami, or Los Angeles for a long weekend or a honeymoon chapter, the experience is built around arrival logistics, clear insurance language, and a vehicle that looks as serious as the memory you came for.',
        ]}
        highlights={[
          {
            label: 'FLEET',
            detail: 'Ferrari California T and Ferrari California — curated, presented, and maintained to a private-client standard.',
          },
          {
            label: 'ROUTES',
            detail: 'Adriatic corniches, Ionian overlooks, Lecce approaches, and quieter inland ribbons when you want the engine note without the crowd.',
          },
          {
            label: 'FOR US GUESTS',
            detail: 'License guidance, airport-aware timing (BDS/BRI), and English concierge from first WhatsApp to keys-in-hand.',
          },
          {
            label: 'OCCASIONS',
            detail: 'Birthdays, proposals, milestone anniversaries, and “we finally did Italy right” trips.',
          },
        ]}
        faqs={faqs}
        primaryCta={{ href: '/#reserve', label: 'REQUEST FERRARI DATES' }}
        secondaryCta={{ href: '/fleet', label: 'VIEW FLEET' }}
      />
    </>
  );
}
