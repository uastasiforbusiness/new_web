export type CarSpec = { label: string; value: string };

export type Car = {
  slug: string;
  name: string;
  kind: string;
  years?: string;
  tagline: string;
  image: string;
  price: string;
  priceNote: string;
  seats: string;
  exterior: string;
  detail: string;
  specs: CarSpec[];
  heroNote: string;
};

// 4 cars. image paths point to real files under public/images/.
// Prices/specs come from existing new_web content (src/components/velox/data.ts).
export const CARS: Car[] = [
  {
    slug: "ferrari-california-t",
    name: "Ferrari California T",
    kind: "Gran Turismo Spider",
    years: "2014 – 2017",
    tagline: "Twin-turbo thunder, roof down, Adriatic ahead.",
    image: "/images/rossa_card.webp",
    price: "€2,450",
    priceNote: "per day",
    seats: "2",
    exterior: "Pininfarina lines · vertical LED optics · Rosso Corsa",
    detail: "Retractable hard-top in 14 s · Magnetic Ride · F1-Trac · Manettino",
    specs: [
      { label: "Engine", value: "3.9L V8 Biturbo" },
      { label: "Power", value: "560 hp" },
      { label: "Torque", value: "755 Nm" },
      { label: "Gearbox", value: "F1 DCT · 7-speed" },
      { label: "0–100 km/h", value: "3.6 s" },
      { label: "Top speed", value: "316 km/h" },
    ],
    heroNote: "Our flag-bearer. The 90° biturbo V8 with grand-touring ease.",
  },
  {
    slug: "ferrari-california",
    name: "Ferrari California",
    kind: "Convertible GT",
    tagline: "The naturally-aspirated icon that started it all.",
    image: "/images/ferrari_blanca_card.webp",
    price: "€1,950",
    priceNote: "per day",
    seats: "2",
    exterior: "Bianco Avus · bi-tone Gloss Black roof · diamond-cut alloys",
    detail: "Carbon-ceramic Brembo brakes · 100–0 km/h in 32.5 m",
    specs: [
      { label: "Engine", value: "4.3L V8 · 4,297 cc" },
      { label: "Power", value: "460 hp" },
      { label: "Torque", value: "485-505 Nm" },
      { label: "Gearbox", value: "Getrag DCT · 7-speed" },
      { label: "0–100 km/h", value: "3.9 s" },
      { label: "Top speed", value: "310 km/h" },
    ],
    heroNote: "Front-mid V8, 3.55 kg per hp and a voice that needs no turbo.",
  },
  {
    slug: "maserati-ghibli",
    name: "Maserati Ghibli",
    kind: "Executive Sports Sedan",
    tagline: "Trident-badged poise — whisper-quiet, 600 Nm strong.",
    image: "/images/maserati_card.jpg",
    price: "€890",
    priceNote: "per day",
    seats: "5",
    exterior: "Blu Nobile tri-coat pearl · deep metallic lustre",
    detail: "Maserati Active Sound exhaust · limited-slip differential",
    specs: [
      { label: "Engine", value: "3.0L V6 Turbodiesel" },
      { label: "Power", value: "250 hp" },
      { label: "Torque", value: "600 Nm" },
      { label: "Gearbox", value: "ZF 8-speed automatic" },
      { label: "0–100 km/h", value: "6.3 s" },
      { label: "Top speed", value: "250 km/h" },
    ],
    heroNote: "The chauffeur favourite. Discreet outside, symphonic inside.",
  },
  {
    slug: "mercedes-e-cabrio",
    name: "Mercedes E 220d Cabrio",
    kind: "Four-Seat Cabriolet",
    tagline: "Open-air elegance for slow Salento afternoons.",
    image: "/images/mercedes_e220d_cabrio.webp",
    price: "€590",
    priceNote: "per day",
    seats: "4",
    exterior: "Polar White · multi-layer acoustic canvas hood",
    detail: "Roof opens in 20 s at up to 50 km/h · ~1,150 km range",
    specs: [
      { label: "Engine", value: "2.0L 4-cyl Turbodiesel" },
      { label: "Power", value: "194 hp" },
      { label: "Torque", value: "400 Nm" },
      { label: "Gearbox", value: "9G-TRONIC · 9-speed" },
      { label: "0–100 km/h", value: "7.7 s" },
      { label: "Top speed", value: "237 km/h" },
    ],
    heroNote: "Four real seats, Aircap serenity and silent cabrio cruising.",
  },
];

export type YachtPackage = {
  id: string;
  name: string;
  duration: string;
  price: string;
  note: string;
};

export const YACHT = {
  slug: "cranchi-atlantique-50",
  name: "Cranchi Atlantique 50",
  kind: "Flybridge Motor Yacht",
  tagline: "Fifteen metres of Italian craftsmanship between two seas.",
  image: "https://images.pexels.com/photos/10514509/pexels-photo-10514509.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  imageCruise: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  imageDinner: "https://images.pexels.com/photos/7766408/pexels-photo-7766408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  imageSailing: "https://images.pexels.com/photos/7873392/pexels-photo-7873392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  specs: [
    { label: "Length", value: "15.60 m — teak deck" },
    { label: "Engines", value: "2 × Volvo Penta D9-575" },
    { label: "Power", value: "1,150 hp combined" },
    { label: "Cruise", value: "24.5 kn · 30 kn max" },
    { label: "Guests", value: "10 by day · 6 berths / 3 cabins" },
  ],
  included: [
    "Licensed skipper & stewardess",
    "Fuel for both-seas itineraries",
    "Welcome prosecco & aperitivo at anchor",
    "SUP boards, snorkel sets & sea towels",
    "Air-conditioned saloon, galley & cabins",
  ],
};

export const YACHT_PACKAGES: YachtPackage[] = [
  { id: "golden-hour", name: "Golden Hour Cruise", duration: "2.5 hours", price: "€950", note: "Champagne sunset off Gallipoli." },
  { id: "half-day", name: "Half Day — Ionian", duration: "4 hours", price: "€1,450", note: "Swim stops at Punta Suina." },
  { id: "dinner-on-board", name: "Dinner at Anchor", duration: "3 hours", price: "€1,800", note: "Private chef, catch of the day." },
  { id: "full-day", name: "Full Day — Two Seas", duration: "8 hours", price: "€2,600", note: "Gallipoli to Porto Cesareo and back." },
];

export type Experience = {
  slug: string;
  index: string;
  name: string;
  category: string;
  type: "land" | "sea";
  description: string;
  image: string;
  price: string;
  duration: string;
  highlights: string[];
};

// Unified hub — ALL 7 experiences (3 land + 4 sea).
export const EXPERIENCES: Experience[] = [
  // ── LAND (cars) ─────────────────────────────────────────────
  {
    slug: "adriatic-morning",
    index: "N°1",
    name: "Adriatic Morning",
    category: "Coastal drive",
    type: "land",
    description: "Ferrari along the clifftop SP358, sea caves at Castro and Finis Terrae at Santa Maria di Leuca — the coast at its wildest.",
    image: "https://images.pexels.com/photos/7995539/pexels-photo-7995539.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "€890",
    duration: "4 hours · 10:00 – 14:00",
    highlights: ["Clifftop SP358", "Grotta della Zinzulusa", "Finis Terrae — Leuca"],
  },
  {
    slug: "salento-supercar-tour",
    index: "N°2",
    name: "Salento Supercar Tour",
    category: "Signature tour",
    type: "land",
    description: "The roar of a Ferrari along the Ionian coast, a cliffside photoshoot at Porto Selvaggio and fresh orecchiette with a local nonna.",
    image: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "€890",
    duration: "4 hours · 10:00 – 14:00",
    highlights: ["Drive. Dine. Dolce Vita.", "Porto Selvaggio photoshoot", "Pasta making at a masseria"],
  },
  {
    slug: "sea-and-road",
    index: "N°3",
    name: "Sea & Road",
    category: "Combo experience",
    type: "land",
    description: "The afternoon boat experience: supercar to Porto Gaio, then board the flybridge for swim stops at Punta della Suina.",
    image: "https://images.pexels.com/photos/36610228/pexels-photo-36610228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "On request",
    duration: "4 hours · 15:00 – 19:00",
    highlights: ["Supercar + yacht combo", "Punta della Suina", "Aperitivo at anchor"],
  },
  // ── SEA (boat) ──────────────────────────────────────────────
  {
    slug: "full-day-two-seas",
    index: "N°4",
    name: "Full Day — Two Seas",
    category: "Yacht experience",
    type: "sea",
    description: "Board the Atlantique 50 at dawn, cross where the Ionian pours into the Adriatic, and anchor over the sandbanks of Punta Suina.",
    image: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €2,600",
    duration: "8 hours",
    highlights: ["Two seas in one day", "Lunch cooked on board", "Sunset return into Gallipoli"],
  },
  {
    slug: "half-day-ionian",
    index: "N°5",
    name: "Half Day — Ionian",
    category: "Yacht experience",
    type: "sea",
    description: "Swim stops at Punta Suina and a slow cruise of the Ionian coast — barefoot, prosecco in hand.",
    image: "https://images.pexels.com/photos/7873392/pexels-photo-7873392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,450",
    duration: "4 hours",
    highlights: ["Punta Suina swim stops", "Ionian coast cruise", "Aperitivo at anchor"],
  },
  {
    slug: "dinner-at-anchor",
    index: "N°6",
    name: "Dinner at Anchor",
    category: "Yacht experience",
    type: "sea",
    description: "A private chef, the catch of the day, and the anchor down off Gallipoli — dinner afloat, lit by the sunset.",
    image: "https://images.pexels.com/photos/7766408/pexels-photo-7766408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,800",
    duration: "3 hours",
    highlights: ["Private chef on board", "Catch of the day", "Sunset dining at anchor"],
  },
  {
    slug: "golden-hour",
    index: "N°7",
    name: "Golden Hour",
    category: "Sunset ritual",
    type: "sea",
    description: "Champagne sunset off Gallipoli — the flybridge at golden hour, two-and-a-half hours of pure light.",
    image: "https://images.pexels.com/photos/36610228/pexels-photo-36610228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €950",
    duration: "2.5 hours",
    highlights: ["Champagne at sunset", "Gallipoli skyline", "Flybridge at golden hour"],
  },
];

export type Service = {
  slug: string;
  name: string;
  description: string;
  image: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "weddings",
    name: "Weddings",
    description: "Uniformed chauffeurs, ribbon-styled cars, and timing rehearsed to the minute.",
    image: "https://images.pexels.com/photos/32632277/pexels-photo-32632277.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    features: ["Dedicated wedding coordinator", "Floral & ribbon styling", "Guest shuttles", "Photo-time built into the route"],
  },
  {
    slug: "corporate",
    name: "Corporate & Business",
    description: "Board-grade logistics for retreats, launches and visiting delegations.",
    image: "https://images.pexels.com/photos/13741320/pexels-photo-13741320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    features: ["Airport & station meet-and-greet", "Fleet coordination up to 40 guests", "NDA-grade discretion", "VAT invoicing"],
  },
  {
    slug: "social-events",
    name: "Social Events",
    description: "Anniversaries, proposals, birthdays on deck — styled to the last sparkler.",
    image: "https://images.pexels.com/photos/17041994/pexels-photo-17041994.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    features: ["Proposal & celebration set-ups", "Yacht dinner partnerships", "Photographer on request", "Late-return flexibility"],
  },
];

export const ALL_EXPERIENCE_OPTIONS = [
  ...CARS.map((c) => ({ type: "car" as const, value: c.name, label: c.name })),
  ...YACHT_PACKAGES.map((p) => ({ type: "yacht" as const, value: `${YACHT.name} — ${p.name}`, label: `Yacht · ${p.name}` })),
  ...EXPERIENCES.map((e) => ({ type: "tour" as const, value: e.name, label: e.name })),
  ...SERVICES.map((s) => ({ type: "event" as const, value: s.name, label: `Service · ${s.name}` })),
];

export const HERO_VIDEO = "https://videos.pexels.com/video-files/8443860/8443860-uhd_3840_2160_30fps.mp4";
export const HERO_POSTER = "/images/rossa_card.webp";
