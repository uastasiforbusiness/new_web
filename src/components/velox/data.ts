import {
  ConciergeBell, Shield, Truck,
} from 'lucide-react';

export const cars = [
  {
    name: 'Ferrari California',
    variant: 'Bianca Avus',
    image: '/images/ferrari_california_bianca.webp',
    images: [
      { src: '/images/ferrari_bianca_360/frame_001.webp', label: 'FRONT VIEW' },
      { src: '/images/ferrari_bianca_360/frame_002.webp', label: 'PROFILE' },
      { src: '/images/ferrari_bianca_360/frame_003.webp', label: 'REAR VIEW' },
      { src: '/images/ferrari_bianca_360/frame_004.webp', label: 'COCKPIT' },
      { src: '/images/ferrari_bianca_360/frame_005.webp', label: 'INTERIOR' },
    ],
    hp: 460, acceleration: '3.9s', topSpeed: '310 km/h', price: 890,
    tagline: 'PURE ELEGANCE',
    color: '#f5f5f0',
  },
  {
    name: 'Ferrari California',
    variant: 'Rossa Corsa',
    image: '/images/ferrari_california_rossa.webp',
    images: [
      { src: '/images/ferrari_rossa_360/frame_001.webp', label: 'FRONT VIEW' },
      { src: '/images/ferrari_rossa_360/frame_002.webp', label: 'PROFILE' },
      { src: '/images/ferrari_rossa_360/frame_03.webp', label: 'IN MOTION' },
      { src: '/images/ferrari_rossa_360/frame_004.webp', label: 'REAR VIEW' },
      { src: '/images/ferrari_rossa_360/frame_005.webp', label: 'COCKPIT' },
      { src: '/images/ferrari_rossa_360/frame_006.webp', label: 'INTERIOR' },
      { src: '/images/ferrari_rossa_360/frame_007.webp', label: 'DETAIL' },
      { src: '/images/ferrari_rossa_360/frame_008.webp', label: 'REAR QUARTER' },
      { src: '/images/ferrari_rossa_360/frame_009.webp', label: 'DYNAMIC' },
    ],
    hp: 460, acceleration: '3.9s', topSpeed: '310 km/h', price: 890,
    tagline: 'ICONIC PASSION',
    color: '#8b0000',
  },
  {
    name: 'Maserati Ghibli',
    variant: 'Nero Ribelle',
    image: '/images/maserati_ghibli.webp',
    images: [
      { src: '/images/maserati_ghibli_360/frame_001.webp', label: 'FRONT VIEW' },
      { src: '/images/maserati_ghibli_360/frame_002.webp', label: 'PROFILE' },
      { src: '/images/maserati_ghibli_360/frame_003.webp', label: 'IN MOTION' },
      { src: '/images/maserati_ghibli_360/frame_004.webp', label: 'REAR VIEW' },
      { src: '/images/maserati_ghibli_360/frame_005.webp', label: 'COCKPIT' },
      { src: '/images/maserati_ghibli_360/frame_006.webp', label: 'INTERIOR' },
      { src: '/images/maserati_ghibli_360/frame_007.webp', label: 'DETAIL' },
      { src: '/images/maserati_ghibli_360/frame_008.webp', label: 'REAR QUARTER' },
    ],
    hp: 350, acceleration: '5.0s', topSpeed: '263 km/h', price: 650,
    tagline: 'ITALIAN CRAFT',
    color: '#1a1a2e',
  },
  {
    name: 'Mercedes E220d',
    variant: 'Cabriolet',
    image: '/images/mercedes_e220d_cabrio.webp',
    images: [
      { src: '/images/mercedes_e220d_360/frame_003.webp', label: 'FRONT VIEW' },
      { src: '/images/mercedes_e220d_360/frame_007.webp', label: 'PROFILE' },
      { src: '/images/mercedes_e220d_360/frame_009.webp', label: 'IN MOTION' },
      { src: '/images/mercedes_e220d_360/frame_015.webp', label: 'REAR VIEW' },
      { src: '/images/mercedes_e220d_360/frame_018.webp', label: 'COCKPIT' },
      { src: '/images/mercedes_e220d_360/frame_020.webp', label: 'INTERIOR' },
      { src: '/images/mercedes_e220d_360/frame_024.webp', label: 'DETAIL' },
    ],
    hp: 194, acceleration: '7.8s', topSpeed: '240 km/h', price: 420,
    tagline: 'REFINED LUXURY',
    color: '#0d0d0d',
  },
];

export type Car = typeof cars[number];
export type CarImage = Car['images'][number];

export const sequenceFrames = [
  '/images/ferrari_rossa_360/frame_001.webp',
  '/images/ferrari_rossa_360/frame_002.webp',
  '/images/ferrari_rossa_360/frame_03.webp',
  '/images/ferrari_rossa_360/frame_004.webp',
  '/images/ferrari_rossa_360/frame_005.webp',
  '/images/ferrari_rossa_360/frame_006.webp',
  '/images/ferrari_rossa_360/frame_007.webp',
  '/images/ferrari_rossa_360/frame_008.webp',
  '/images/ferrari_rossa_360/frame_009.webp',
];

export const frameLabels = ['FRONT VIEW', 'PROFILE', 'IN MOTION', 'REAR VIEW', 'COCKPIT', 'INTERIOR', 'DETAIL', 'REAR QUARTER', 'DYNAMIC'];

export const features = [
  { icon: ConciergeBell, title: 'CONCIERGE SERVICE', description: '24/7 personal assistance for every aspect of your journey, from restaurant reservations to bespoke route planning across Europe\'s most scenic drives.', stat: '24/7' },
  { icon: Shield, title: 'PREMIUM INSURANCE', description: 'Full comprehensive coverage with zero excess. Drive with complete peace of mind knowing every mile is protected by our elite insurance partnership.', stat: 'ZERO' },
  { icon: Truck, title: 'HOTEL DELIVERY', description: 'Your dream car delivered directly to your hotel or private residence. Seamless luxury, from the moment you arrive until the final farewell.', stat: '1HR' },
];

export const navLinks = [
  { label: 'FLEET', href: '#fleet' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'RESERVE', href: '#reserve' },
  { label: 'CONTACT', href: '#contact' },
];
