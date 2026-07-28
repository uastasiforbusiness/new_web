export interface ItineraryStep {
  time: string;
  icon: string;
  title: string;
  description: string;
  highlight?: {
    tag: string;
    text: string;
  };
}

export interface Experience {
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  priceLabel?: string;
  location: string;
  tagline: string;
  heroImage: string;
  concept: string;
  itinerary: ItineraryStep[];
  includes: string[];
  color: string; // accent color for this experience
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const experiences: Experience[] = [
  {
    slug: 'supercar-tour',
    title: 'Salento Supercar Tour',
    subtitle: 'The Art of Driving & Pasta Making',
    duration: '4 hours · 10:00 – 14:00',
    price: '€890',
    location: 'Porto Gaio, Gallipoli',
    tagline: 'Drive. Dine. Dolce Vita.',
    heroImage: '/images/experiences/supercar-tour-hero.jpg',
    concept:
      'The roar of a Ferrari along the Ionian coast, a cliffside photoshoot at Porto Selvaggio, and the warmth of a Salento farmhouse where you roll fresh orecchiette with a local nonna. This is not a tour — it is an immersion into the Italian soul, by way of its two greatest loves: beautiful cars and unforgettable food.',
    color: '#d40000',
    itinerary: [
      {
        time: '10:00',
        icon: '🔊',
        title: 'Departure from Porto Gaio',
        description:
          'Meet at the Porto Gaio marina in Gallipoli for a private technical briefing. Keys in hand, engines ignite, and the convoy rolls out along the breathtaking SP108 coastal road.',
      },
      {
        time: 'Photo Stop',
        icon: '📸',
        title: 'Porto Selvaggio & Torre Uluzzo',
        description:
          'A dramatic stop at the Porto Selvaggio Natural Park — turquoise sea, pine forest, and your Ferrari poised on the cliffs of Torre Uluzzo. Your personal photographer captures the moment.',
      },
      {
        time: 'Arrival',
        icon: '🌿',
        title: 'Winery Among the Olive Groves',
        description:
          'Leaving the coast, the Ferraris wind through dry-stone walls and vineyards to a historic estate. A chilled glass of Negroamaro rosé welcomes you to the courtyard.',
      },
      {
        time: 'Masterclass',
        icon: '🥟',
        title: '"Hands in Flour" — Pasta Making',
        description:
          'In the estate\'s ancient halls, a local nonna teaches the art of durum wheat dough. Shape orecchiette and minchiareddi by hand — the same way Pugliese families have for generations.',
      },
      {
        time: 'Lunch',
        icon: '🍷',
        title: 'Traditional Lunch & Wine Pairing',
        description:
          'Sit down to the pasta you just made, dressed in tomato sugo and cacioricotta, paired with the estate\'s Primitivo and Negroamaro. A masterclass in Puglian hospitality.',
        highlight: {
          tag: 'Menu',
          text: 'Fresh handmade pasta · Cacioricotta · Primitivo & Negroamaro degustation · Local olive oil',
        },
      },
      {
        time: '14:00',
        icon: '🏎️',
        title: 'Return to Porto Gaio',
        description:
          'The final stretch: countryside roads, sea breeze, and the Ferrari\'s V8 soundtrack leading you back to Porto Gaio. Arrival with a smile that lasts all day.',
      },
    ],
    includes: [
      'Ferrari California T or equivalent',
      'Professional photographer at key stops',
      'Pasta masterclass with local nonna',
      'Wine tasting (Primitivo & Negroamaro)',
      'Traditional Puglian lunch',
      'Private briefing and guided convoy',
      'Fuel and insurance',
    ],
    seo: {
      title: 'Salento Supercar Tour — Ferrari Driving & Pasta Making in Puglia',
      description:
        'Drive a Ferrari along the Ionian coast, master pasta-making with a local nonna, and taste Primitivo wine. The ultimate luxury experience in Salento, Puglia.',
      keywords: [
        'Ferrari tour Puglia',
        'supercar experience Italy',
        'pasta making class Ferrari',
        'luxury driving tour Salento',
      ],
    },
  },
  {
    slug: 'adriatic-morning',
    title: 'Adriatic Morning Tour',
    subtitle: 'Sea Caves, Coastal Roads & Finis Terrae',
    duration: '4 hours · 10:00 – 14:00',
    price: '€890',
    location: 'Porto Gaio, Gallipoli',
    tagline: 'Caves. Curves. Culinary. Coast.',
    heroImage: '/images/experiences/adriatic-morning-hero.jpg',
    concept:
      'From the Ionian to the Adriatic — a Ferrari journey across the heel of Italy. Explore the majestic Zinzulusa sea cave by private boat, carve through the legendary SP358 coastal road, toast at the Ciolo Bridge canyon, and stand at Italy\'s very tip: Santa Maria di Leuca, where two seas meet.',
    color: '#d40000',
    itinerary: [
      {
        time: '10:00',
        icon: '10',
        title: 'Departure from Porto Gaio',
        description:
          'Morning espresso at Porto Gaio, then the Ferraris cut across the Salento countryside eastward — from the Ionian to the Adriatic in under an hour.',
      },
      {
        time: 'Adventure',
        icon: '🕳️',
        title: 'Grotta della Zinzulusa — Castro',
        description:
          'Arrive at Castro with reserved Ferrari parking. A private wooden boat glides into the Zinzulusa cave — 200 meters of stalactites, emerald water, and absolute wonder.',
      },
      {
        time: 'Scenic Drive',
        icon: '🏁',
        title: 'SP358 — The Clifftop Road',
        description:
          'Back in the cockpit for the region\'s most spectacular drive: the SP358 hugs sheer cliffs, each bend revealing a deeper shade of Adriatic blue. This is why you came to Puglia.',
      },
      {
        time: 'Tasting',
        icon: '🍷',
        title: 'Ciolo Bridge — Canyon Aperitivo',
        description:
          'Stop at the legendary Ciolo Bridge. A private terrace perched over the canyon becomes your dining room: fried polpette, burrata, sundried tomatoes, and chilled Negroamaro rosé.',
      },
      {
        time: 'Arrival',
        icon: '🌅',
        title: 'Santa Maria di Leuca — Finis Terrae',
        description:
          'The final act: the white lighthouse of Santa Maria di Leuca, where the Ionian and Adriatic meet. Photo with the cars at the End of the Earth, then the return drive to Gallipoli.',
      },
    ],
    includes: [
      'Ferrari California T or equivalent',
      'Private boat tour of Grotta della Zinzulusa',
      'Cliffside aperitivo at Ciolo Bridge',
      'Professional photographer',
      'Private briefing and guided convoy',
      'Fuel and insurance',
    ],
    seo: {
      title: 'Adriatic Morning Tour — Ferrari Coastal Drive & Sea Caves in Puglia',
      description:
        'Drive a Ferrari to the Adriatic coast, explore the Zinzulusa sea cave by boat, and toast at the Ciolo Bridge canyon. An unforgettable luxury tour in Salento.',
      keywords: [
        'Ferrari coastal tour Puglia',
        'Adriatic coast Ferrari drive',
        'Zinzulusa cave private tour',
        'luxury car tour Salento',
      ],
    },
  },
  {
    slug: 'ferrari-sea-combo',
    title: 'Ferrari & Sea Combination',
    subtitle: 'The Afternoon Boat Experience',
    duration: '4 hours · 15:00 – 19:00',
    price: 'On request',
    location: 'Porto Gaio, Gallipoli',
    tagline: 'From Horsepower to Horsepower at Sea.',
    heroImage: '/images/experiences/ferrari-sea-combo-hero.jpg',
    concept:
      'The perfect second act after a morning of driving. Swap four wheels for a private boat and explore Gallipoli\'s coastline from the water. Swim in the turquoise bay of Punta della Suina, snorkel at Sant\'Andrea Island, and sip prosecco as the sun lowers over the Ionian Sea.',
    color: '#1a5276',
    itinerary: [
      {
        time: '15:00',
        icon: '🛥️',
        title: 'Boarding at Porto Gaio',
        description:
          'Step from the Ferrari onto the boat at Porto Gaio. Meet your skipper, settle into the comfort of a private vessel, and cast off into the Ionian.',
      },
      {
        time: 'Swim Stop',
        icon: '🏖️',
        title: 'Punta della Suina',
        description:
          'First stop: the stunning bay of Punta della Suina. Turquoise water framed by Mediterranean pine forest. Jump in, float, and let the salt water wash away the morning\'s adrenaline.',
      },
      {
        time: 'Exploration',
        icon: '🗼',
        title: 'Torre del Pizzo & Coastal Gems',
        description:
          'Cruise along the most iconic stretches of coast — historic watchtowers, hidden coves, and rugged cliffs that only the sea can reveal.',
      },
      {
        time: 'Relax',
        icon: '🏝️',
        title: 'Scoglio di Sant\'Andrea',
        description:
          'Anchor at the Scoglio di Sant\'Andrea. Snorkel in crystal-clear water, lounge on deck with a drink, or paddle the SUP. Prosecco and Spritz served as the sun begins its descent.',
      },
      {
        time: '19:00',
        icon: '🌅',
        title: 'Return to Porto Gaio',
        description:
          'A gentle cruise back as the sky turns gold. Arrive at Porto Gaio refreshed, sun-kissed, and perfectly on time for a Gallipoli evening.',
      },
    ],
    includes: [
      'Private boat with professional skipper',
      'Onboard assistant',
      'Traditional Salento aperitif',
      'Prosecco, wine & soft drinks',
      'Snorkeling gear, SUP & inflatable mattress',
      'Beach towels',
    ],
    seo: {
      title:
        'Ferrari & Sea Combination — Supercar & Boat Experience in Puglia',
      description:
        'Combine a Ferrari morning with a private boat afternoon. Swim in Punta della Suina, snorkel at Sant\'Andrea, sip prosecco. The ultimate Puglia luxury day.',
      keywords: [
        'Ferrari and boat tour Italy',
        'supercar and yacht experience',
        'Gallipoli private boat tour',
        'luxury day trip Puglia',
      ],
    },
  },
  {
    slug: 'yacht-charter',
    title: 'Private Yacht Charter',
    subtitle: 'Cranchi 50 Atlantique Flybridge',
    duration: 'Full day (8h) · Half day (4h)',
    price: 'From €1,300',
    priceLabel: 'half day',
    location: 'Porto Gaio, Gallipoli',
    tagline: 'Your Private Mediterranean.',
    heroImage: '/images/experiences/yacht-charter-hero.jpg',
    concept:
      'The Ionian Sea as your playground. Aboard the Cranchi 50 Atlantique — a 15.6m flybridge yacht that blends Italian design with open-water capability — explore Gallipoli Bay, Sant\'Andrea Island, and Punta della Suina in total privacy. Professional crew, premium catering, and the freedom to set your own pace.',
    color: '#1a5276',
    itinerary: [
      {
        time: '10:00 / 15:00',
        icon: '🛥️',
        title: 'Welcome Aboard — Porto Gaio',
        description:
          'Board at Porto Gaio. Meet your captain and assistant, settle into the flybridge lounge, and review the day\'s itinerary over a glass of prosecco.',
      },
      {
        time: 'Navigation',
        icon: '🗺️',
        title: 'Gallipoli Bay & Sant\'Andrea Island',
        description:
          'Cruise the pristine waters of Gallipoli Bay. Circumnavigate the Scoglio di Sant\'Andrea, with its dramatic rock formations and crystalline shallows — the postcard image of the Salento coast.',
      },
      {
        time: 'Swim & Lunch',
        icon: '🏖️',
        title: 'Punta della Suina — Swim & Aperitivo',
        description:
          'Anchor in the turquoise cove of Punta della Suina. Swim, snorkel, or paddleboard. The crew serves a premium aperitif with local specialties, followed by a light lunch of fresh pasta, mozzarella, and basil — all paired with chilled wine.',
      },
      {
        time: 'Relax',
        icon: '☀️',
        title: 'Leisurely Cruise & Sundowners',
        description:
          'A slow cruise along the coast as the afternoon deepens. Sink into the bow sun pads with a book, or chat with your party over a Negroni. The flybridge offers the best view on the water.',
      },
      {
        time: '18:00 / 19:00',
        icon: '🌅',
        title: 'Return to Porto Gaio',
        description:
          'Approach Gallipoli at golden hour — the old town glowing over the water. Disembark at Porto Gaio, already planning your next day on the water.',
      },
    ],
    includes: [
      'Cranchi 50 Atlantique Flybridge (15.6m)',
      'Professional skipper & onboard assistant',
      'Fuel',
      'Premium Salento aperitif & lunch (full day)',
      'Prosecco, wine & soft drinks',
      'Snorkeling gear, SUP, canoe, inflatable mattress',
      'Beach towels',
      'Max 12 guests',
    ],
    seo: {
      title:
        'Private Yacht Charter Puglia — Cranchi 50 Luxury Boat Rental Gallipoli',
      description:
        'Rent the Cranchi 50 Atlantique for a private yacht charter in Gallipoli. Full or half day with crew, lunch, prosecco, and water sports. Luxury on the Ionian Sea.',
      keywords: [
        'private yacht charter Puglia',
        'luxury boat rental Gallipoli',
        'Cranchi 50 Atlantique',
        'yacht tour Salento coast',
      ],
    },
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function getRelatedExperiences(slug: string): Experience[] {
  return experiences.filter((e) => e.slug !== slug);
}