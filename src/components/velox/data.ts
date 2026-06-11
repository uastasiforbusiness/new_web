import {
  ConciergeBell, Shield, Truck, Briefcase, Plane,
  Car, Sparkles, Ship,
} from 'lucide-react';

export const cars = [
  {
    name: 'Ferrari California T',
    variant: 'Bianca Avus',
    image: '/images/ferrari_blanca_card.webp',
    images: [
      { src: '/images/ferrari_bianca_360/frame_001.webp', label: 'FRONT VIEW' },
      { src: '/images/ferrari_bianca_360/frame_002.webp', label: 'PROFILE' },
      { src: '/images/ferrari_bianca_360/frame_003.webp', label: 'REAR VIEW' },
      { src: '/images/ferrari_bianca_360/frame_004.webp', label: 'COCKPIT' },
      { src: '/images/ferrari_bianca_360/frame_005.webp', label: 'INTERIOR' },
    ],
    hp: 560, acceleration: '3.6s', topSpeed: '316 km/h', price: 890,
    tagline: 'THE BEAST',
    color: '#f5f5f0',
    seats: 2, engine: 'V8 3.9 Biturbo', torque: '755 Nm',
    dimensions: '4.57 x 1.91 x 1.32 m',
    keyFeatures: 'Retractable hardtop, carbon-ceramic brakes, dual-zone climate, heated seats, 7-speed DCT RWD',
  },
  {
    name: 'Ferrari California',
    variant: 'Rossa Corsa',
    image: '/images/ferrari_rossa_card.webp',
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
    tagline: 'THE CLASSIC',
    color: '#8b0000',
    seats: 2, engine: 'V8 4.3 Atmosferico', torque: '485-505 Nm',
    dimensions: '4.56 x 1.91 x 1.32 m',
    keyFeatures: 'Classic naturally-aspirated V8 sound, retractable hardtop, carbon-ceramic brakes',
  },
  {
    name: 'Maserati Ghibli',
    variant: 'Nero Ribelle',
    image: '/images/maserati_card.webp',
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
    hp: 275, acceleration: '6.3s', topSpeed: '250 km/h', price: 650,
    tagline: 'THE SEDAN',
    color: '#1a1a2e',
    seats: 5, engine: 'V6 3.0 Turbodiesel', torque: '600 Nm',
    dimensions: '4.97 x 1.95 x 1.46 m',
    keyFeatures: 'Maserati V6 sound, Matrix LED headlights, Soft Close doors, Harman Kardon audio, 500 L trunk',
  },
  {
    name: 'Mercedes E 220d',
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
    hp: 194, acceleration: '7.7s', topSpeed: '237 km/h',
    tagline: 'REFINED LUXURY',
    color: '#0d0d0d',
    seats: 4, engine: '2.0L Turbodiesel', torque: '400 Nm',
    dimensions: '4.84 x 1.86 x 1.43 m',
    keyFeatures: 'AIRSCARF neck-level heating, AIRCAP wind deflector, acoustic soft top, 9G-TRONIC, ~1,150 km range',
  },
  {
    name: 'Cranchi Atlantique 50 Flybridge',
    variant: 'Luxury Yacht',
    image: '/images/floating_last.webp',
    images: [
      { src: '/images/floating_last.webp', label: 'AT SEA' },
    ],
    hp: 1150, acceleration: '24.5', topSpeed: '30 knots', price: 2000,
    tagline: 'NAUTICAL LUXURY',
    color: '#C9A96E',
    seats: 10, engine: '2x Volvo Penta D9-575 1,150 HP', torque: 'N/A',
    dimensions: '15.60 m',
    keyFeatures: 'Full flybridge, teak decking, hydraulic passerelle, bow thruster, AC, SUP/tender/jet ski, 6 beds / 2 bathrooms',
  },
];

export type Car = typeof cars[number];
export type CarImage = Car['images'][number];

// ═══════════════════════════════════════════════════════════════
// SPRITE SHEETS OPTIMIZADOS
// ═══════════════════════════════════════════════════════════════

// ─── Yate: 6 frames individuales ───
export const YACHT_SPRITE_FRAMES = 6;

export const yachtFrames = [
  '/images/real_15s.webp',
  '/images/real_25s.webp',
  '/images/real_35s.webp',
  '/images/real_55s.webp',
  '/images/real_75s.webp',
  '/images/real_95s.webp',
];

// Mantenemos compatibilidad con código legacy que importe sequenceFrames
export const sequenceFrames = yachtFrames;

export const frameLabels = ['NAUTICAL ADVENTURE', 'FULL SPEED', 'CRYSTAL WATERS', 'ELITE EXPERIENCE', 'PURE FREEDOM', 'OCEAN SUNSET'];

export const fleetSpecs = [
  {
    name: 'Ferrari California T',
    color: 'Red',
    colorHex: '#C41E3A',
    seats: 2,
    acceleration: '3.6 s',
    topSpeed: '316 km/h',
    consumption: '10.5 L/100km',
    trunk: '340 L',
    engine: 'V8 3.9 Biturbo 560 HP / 755 Nm',
    dimensions: '4.57 x 1.91 x 1.32 m',
    keyFeatures: 'Retractable hardtop, carbon-ceramic brakes, dual-zone climate, heated seats, 7-speed DCT RWD',
  },
  {
    name: 'Ferrari California',
    color: 'White',
    colorHex: '#F5F5F0',
    seats: 2,
    acceleration: '3.8 s',
    topSpeed: '310 km/h',
    consumption: '13.1 L/100km',
    trunk: '340 L',
    engine: 'V8 4.3 N/A 460-489 HP / 485-505 Nm',
    dimensions: '4.56 x 1.91 x 1.32 m',
    keyFeatures: 'Classic naturally-aspirated V8 sound, retractable hardtop, carbon-ceramic brakes',
  },
  {
    name: 'Maserati Ghibli',
    color: 'Blue',
    colorHex: '#1E3A5F',
    seats: 5,
    acceleration: '6.3 s',
    topSpeed: '250 km/h',
    consumption: '6.0 L/100km',
    trunk: '500 L',
    engine: 'V6 3.0 Turbodiesel 275 HP / 600 Nm',
    dimensions: '4.97 x 1.95 x 1.46 m',
    keyFeatures: 'Maserati V6 sound, Matrix LED headlights, Soft Close doors, Harman Kardon audio, 500 L trunk',
  },
  {
    name: 'Mercedes E 220d Cabrio',
    color: 'White',
    colorHex: '#F5F5F0',
    seats: 4,
    acceleration: '7.7 s',
    topSpeed: '237 km/h',
    consumption: '5.7 L/100km',
    trunk: '310-385 L',
    engine: '2.0L Turbodiesel 194 HP / 400 Nm',
    dimensions: '4.84 x 1.86 x 1.43 m',
    keyFeatures: 'AIRSCARF neck-level heating, AIRCAP wind deflector, acoustic soft top, 9G-TRONIC, ~1,150 km range',
  },
  {
    name: 'Cranchi Atlantique 50 Flybridge',
    color: 'White',
    colorHex: '#C9A96E',
    seats: 10,
    acceleration: '24-25 knots (cruise)',
    topSpeed: '28-30 knots',
    consumption: '~180 L/h',
    trunk: '6 beds, 2 bathrooms',
    engine: '2x Volvo Penta D9-575 (diesel) 1,150 HP total',
    dimensions: '15.60 m',
    keyFeatures: 'Full flybridge, teak decking, hydraulic passerelle, bow thruster, 11.8 kW generator, AC, SUP/tender/jet ski',
  },
];

export const yachtData = {
  name: 'Cranchi Atlantique 50 Flybridge',
  length: '15.60 m',
  capacity: '10 guests + crew (skipper + assistant)',
  season: 'May - September 2026',
  departure: 'Porto Gaio, Gallipoli',
  features: [
    'Full flybridge',
    'Teak decking',
    'Hydraulic passerelle',
    'Bow thruster',
    '11.8 kW generator',
    'AC reverse cycle',
    'Fully equipped galley',
    'TV/stereo system',
    'SUP, tender, jet ski',
  ],
  destinations: [
    'Punta della Suina', 'Porto Cesareo', 'Isola S. Andrea',
    'Porto Selvaggio', 'Punta Prosciutto', 'Santa Maria di Leuca', 'Greece',
  ],
  options: ['Half day', 'Full day', 'Sunset cruise', 'Romantic dinner', 'Overnight', 'Mini cruise'],
};

export const serviceLines = [
  {
    icon: Ship,
    title: 'YACHT CHARTER',
    subtitle: 'Nautical Experiences',
    description: 'Luxury yacht rentals along the Salento coast. Depart from Porto Gaio, Gallipoli, and explore Punta della Suina, Porto Cesareo, Santa Maria di Leuca, and Greece. Half-day, full-day, sunset cruises, and overnight options with professional skipper.',
    stat: 'PREMIUM',
  },
  {
    icon: Car,
    title: 'WEDDING CAR RENTAL',
    subtitle: 'Weddings',
    description: 'Bridal vehicle (arrival/departure), uniformed professional chauffeur, wedding decoration included, coordination with your wedding planner.',
    stat: 'AWARDS 2023',
  },
  {
    icon: Briefcase,
    title: 'LUXURY CAR',
    subtitle: 'Corporate / Business',
    description: 'Executive rentals for companies, executives, and congresses. Premium corporate image. English-speaking professional chauffeurs.',
    stat: 'B2B',
  },
  {
    icon: Sparkles,
    title: 'PARTY SERVICE',
    subtitle: 'Social Events',
    description: 'Luxury cars for non-wedding celebrations. Birthdays, baptisms, communions, private parties. Custom packages available.',
    stat: 'SOCIAL',
  },
  {
    icon: Plane,
    title: 'TRANSFER SERVICE',
    subtitle: 'Airport & Private Transfers',
    description: 'Door-to-door pickup and drop-off. Airport, port, station to destination. Business and luxury tourism transfers.',
    stat: '24/7',
  },
];

export const coverageRegions = [
  { name: 'Puglia', role: 'Headquarters', detail: 'Lecce / Carmiano', primary: true },
  { name: 'Basilicata', role: 'Extended coverage', detail: '', primary: false },
  { name: 'Calabria', role: 'Extended coverage', detail: '', primary: false },
  { name: 'All Southern Italy', role: 'Upon request', detail: '', primary: false },
];

export const airports = [
  { code: 'BRI', name: 'Bari' },
  { code: 'BDS', name: 'Brindisi' },
  { code: 'SUF', name: 'Lamezia Terme' },
];

export const features = [
  { icon: ConciergeBell, title: 'COMING SOON', description: 'We are curating exclusive experiences to elevate your journey. Stay tuned for something extraordinary.', stat: 'SOON' },
  { icon: Shield, title: 'COMING SOON', description: 'We are curating exclusive experiences to elevate your journey. Stay tuned for something extraordinary.', stat: 'SOON' },
  { icon: Truck, title: 'COMING SOON', description: 'We are curating exclusive experiences to elevate your journey. Stay tuned for something extraordinary.', stat: 'SOON' },
];

export const navLinks = [
  { label: 'FLEET', href: '#fleet' },
  { label: 'YACHT', href: '#yacht' },
  { label: 'SERVICES', href: '#services' },
  { label: 'RESERVE', href: '#reserve' },
  { label: 'CONTACT', href: '#contact' },
];
