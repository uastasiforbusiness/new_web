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
    alt: 'B LEADER — Luxury driving & yacht experiences in Salento',
    headline: 'ELEVATE',
    subtitle: 'YOUR JOURNEY.',
    description:
      'B LEADER redefines Mediterranean luxury. Precision-engineered rentals for those who demand the extraordinary.',
    duration: 0,
  },
];
