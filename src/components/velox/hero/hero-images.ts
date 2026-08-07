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
    src: '/hero-video.mp4',
    alt: 'B LEADER — Private luxury driving and yacht experiences in Salento, Puglia',
    headline: 'SALENTO,',
    subtitle: 'FROM THE DRIVER\u2019S SEAT.',
    description:
      'One private itinerary across land and sea — a Ferrari along the Adriatic cliffs, a sunset charter off Gallipoli, and a concierge who answers in English.',
    duration: 0,
  },
];
