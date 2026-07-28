'use client';

export type TransitionType =
  | 'circle-reveal'
  | 'golden-sweep'
  | 'organic-ripple'
  | 'scale-blur';

export interface HeroImageSlide {
  src: string;
  alt: string;
  headline: string;
  subtitle: string;
  description: string;
  duration: number;
}

export const HERO_SLIDES: HeroImageSlide[] = [
  {
    src: '/images/hero-sequence/torre-santandrea_120642f4_230525154310_1200x653.jpg',
    alt: "Torre Sant'Andrea — Salento coastline",
    headline: 'ELEVATE',
    subtitle: 'YOUR JOURNEY.',
    description:
      'B LEADER defines the new standard of Mediterranean luxury. Precision-engineered rentals for those who demand the extraordinary.',
    duration: 6000,
  },
  {
    src: '/images/hero-sequence/yatch.jpeg',
    alt: 'Luxury yacht sailing the Mediterranean',
    headline: 'SAIL',
    subtitle: 'BEYOND HORIZONS.',
    description:
      'Private yacht charters along the pristine Salento coastline. Champagne sunset cruises included.',
    duration: 6000,
  },
  {
    src: '/images/hero-sequence/Couple_walking_to_beach_2K_202607280030.jpeg',
    alt: 'Couple walking to a Mediterranean beach',
    headline: 'LIVE',
    subtitle: 'THE DREAM.',
    description:
      'Curated experiences for those who demand the extraordinary. Every moment crafted to perfection.',
    duration: 6000,
  },
  {
    src: '/images/hero-sequence/paisaje_drone.jpg',
    alt: 'Drone aerial view of Salento coast',
    headline: 'DISCOVER',
    subtitle: 'PARADISE.',
    description:
      "From the cliffs of Torre Sant'Andrea to the crystal waters of Gallipoli — explore untouched beauty.",
    duration: 6000,
  },
  {
    src: '/images/hero-sequence/atardecer-en-bahia-verde-galipoli-puglia.webp',
    alt: 'Sunset over Gallipoli bay, Puglia',
    headline: 'WHERE LUXURY',
    subtitle: 'MEETS THE SEA.',
    description: 'Est. 2023 — Puglia, Italy. The Mediterranean awaits.',
    duration: 6000,
  },
];

/** Pick a random transition type each cycle */
export function getRandomTransition(): TransitionType {
  const types: TransitionType[] = [
    'circle-reveal',
    'golden-sweep',
    'organic-ripple',
    'scale-blur',
  ];
  return types[Math.floor(Math.random() * types.length)];
}
