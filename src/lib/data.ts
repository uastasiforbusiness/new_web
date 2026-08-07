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
// Prices/specs verified against existing new_web content / the reference catalogue.
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
    image: "/images/ferrari_california_white_background.png",
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
  tagline: "Fifty-one feet of Italian craftsmanship between two seas.",
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
  {
    id: "full-day-charter",
    name: "Full Day Charter",
    duration: "8 hours · 10:00 – 18:00",
    price: "from €1,600",
    note: "Sant'Andrea · Gallipoli bay · Punta della Suina. Seasonal: Aug 10–20 €2,200.",
  },
  {
    id: "half-day-charter",
    name: "Half Day Charter",
    duration: "4 hours · 10:00–14:00 or 15:00–19:00",
    price: "from €1,200",
    note: "Sant'Andrea & Gallipoli bay. Seasonal: Aug 10–20 €1,500.",
  },
  {
    id: "sunset-aperitif",
    name: "Sunset Cruise with Aperitif",
    duration: "2 hours",
    price: "€600",
    note: "Gallipoli coast & Punta della Suina. Salentino aperitif aboard.",
  },
  {
    id: "sunset-dinner",
    name: "Sunset Cruise with Dinner",
    duration: "2 hours",
    price: "€700",
    note: "Gallipoli coast & Punta della Suina. Full dinner aboard.",
  },
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
    slug: "ferrari-grand-tour",
    index: "N°1",
    name: "Ferrari Grand Tour",
    category: "Adriatic tour · La Rotta Adriatica & Le Grotte",
    type: "land",
    description: "Ferrari drive to the Adriatic coast, private boat to Grotta della Zinzulusa, scenic SP358, lunch-aperitif at Canyon del Ciolo, Santa Maria di Leuca sanctuary & lighthouse. From Porto Gaio.",
    image: "https://images.pexels.com/photos/7995539/pexels-photo-7995539.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,900",
    duration: "Full day · custom schedule",
    highlights: ["Grotta della Zinzulusa by private boat", "SP358 clifftop drive", "Canyon del Ciolo lunch-aperitif", "Finis Terrae sanctuary & lighthouse"],
  },
  {
    slug: "salento-supercar-tour",
    index: "N°2",
    name: "Salento Supercar Tour",
    category: "Signature tour · The Art of Driving & Pasta Making",
    type: "land",
    description: "Ferrari drive on the SP108 coastal road, Porto Selvaggio & Torre Uluzzo photo stop, historic estate with olive groves and vineyards, Negroamaro Rosato welcome, \"Mani in Farina\" cooking class, lunch with handmade pasta and Primitivo/Negroamaro tasting. From Porto Gaio.",
    image: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,900",
    duration: "4 hours · 10:00 – 14:00",
    highlights: ["Porto Selvaggio & Torre Uluzzo", "Historic estate & Negroamaro Rosato", "\"Mani in Farina\" cooking class", "Handmade orecchiette & minchiareddi", "Primitivo & Negroamaro tasting"],
  },
  {
    slug: "ferrari-sea-combination",
    index: "N°3",
    name: "Ferrari & Sea Combination",
    category: "Combo experience · The Ultimate Day",
    type: "land",
    description: "The Ultimate Day Experience. Ferrari drive on the Ionian coast, Porto Selvaggio & Torre Uluzzo photo stop, historic estate with olive groves and vineyards, Negroamaro Rosato welcome, \"Mani in Farina\" cooking class, lunch with handmade pasta and Primitivo/Negroamaro tasting, then Half Day Charter 15:00–19:00. From Porto Gaio.",
    image: "https://images.pexels.com/photos/36610228/pexels-photo-36610228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €3,200",
    duration: "9 hours · 10:00 – 19:00",
    highlights: ["Ferrari drive · Ionian coast", "Porto Selvaggio & Torre Uluzzo", "Historic estate & Negroamaro Rosato", "\"Mani in Farina\" cooking class", "Handmade orecchiette & minchiareddi", "Primitivo & Negroamaro tasting", "Half Day Charter 15:00–19:00"],
  },
  // ── SEA (boat) ──────────────────────────────────────────────
  {
    slug: "full-day-charter",
    index: "N°4",
    name: "Full Day Charter",
    category: "Yacht experience",
    type: "sea",
    description: "Sant'Andrea, Gallipoli bay and Punta della Suina. Skipper & stewardess, fuel, premium aperitif, light lunch, 2 bottles prosecco/wine, water/soft drinks, snorkel, SUP, canoe. Optional tender & jet ski.",
    image: "https://images.pexels.com/photos/38009036/pexels-photo-38009036.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,600",
    duration: "8 hours · 10:00 – 18:00",
    highlights: ["Sant'Andrea · Gallipoli bay · Punta della Suina", "Premium aperitif & light lunch aboard", "Prosecco, snorkel, SUP & canoe", "Optional tender & jet ski"],
  },
  {
    slug: "half-day-charter",
    index: "N°5",
    name: "Half Day Charter",
    category: "Yacht experience",
    type: "sea",
    description: "Sant'Andrea and the Gallipoli bay. Skipper & stewardess, fuel, Salentino traditional aperitif, 2 bottles prosecco/wine, unlimited water, snorkel, SUP, canoe. Optional tender & jet ski.",
    image: "https://images.pexels.com/photos/7873392/pexels-photo-7873392.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "from €1,200",
    duration: "4 hours · 10:00–14:00 or 15:00–19:00",
    highlights: ["Sant'Andrea & Gallipoli bay", "Salentino traditional aperitif", "Prosecco, snorkel, SUP & canoe", "Optional tender & jet ski"],
  },
  {
    slug: "sunset-aperitif",
    index: "N°6",
    name: "Sunset Cruise with Aperitif",
    category: "Sunset ritual",
    type: "sea",
    description: "Gallipoli coast and Punta della Suina at golden hour. Skipper, fuel, Salentino aperitif with local specialties, prosecco/wine, water/soft drinks.",
    image: "https://images.pexels.com/photos/36610228/pexels-photo-36610228.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "€600",
    duration: "2 hours",
    highlights: ["Gallipoli coast & Punta della Suina", "Salentino aperitif with local specialties", "Prosecco or wine"],
  },
  {
    slug: "sunset-dinner",
    index: "N°7",
    name: "Sunset Cruise with Dinner",
    category: "Sunset ritual",
    type: "sea",
    description: "Gallipoli coast and Punta della Suina. Skipper, fuel, full dinner aboard with local cuisine, prosecco/wine, water/soft drinks.",
    image: "https://images.pexels.com/photos/7766408/pexels-photo-7766408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    price: "€700",
    duration: "2 hours",
    highlights: ["Gallipoli coast & Punta della Suina", "Full dinner aboard with local cuisine", "Prosecco or wine"],
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
