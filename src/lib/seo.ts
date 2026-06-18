/**
 * ═══════════════════════════════════════════════════════════════════════
 *  B LEADER — Central SEO configuration
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Single source of truth for everything SEO-related. When the site goes
 *  live and you open a Google Business Profile, edit ONLY the values
 *  below — metadata, sitemap, robots and JSON-LD will all update
 *  automatically.
 *
 *  TODO before launch:
 *    1. Replace `geo` coordinates with the exact GBP values.
 *    2. Replace `address.street` with the real street (if different).
 *    3. Fill `social.*` with the real profile URLs.
 */

export const SITE = {
  /** Production URL — NO trailing slash. */
  url: 'https://bleader.it',

  /** Brand name shown in <title>, OG, JSON-LD. */
  name: 'B LEADER',
  shortName: 'B LEADER',
  tagline: 'Luxury Car & Yacht Rental in Puglia',

  /** Primary locale + language (USA audience, English content). */
  locale: 'en_US',
  lang: 'en',

  /** Default SEO meta for the home page. */
  title: 'Luxury Car Rental in Puglia | Ferrari, Maserati & Yacht Charter',
  description:
    'Rent luxury cars in Puglia, Italy — Ferrari California, Maserati Ghibli, Mercedes Cabriolet — plus yacht charters from Gallipoli. Concierge service, hotel delivery & English-speaking chauffeurs for US travelers.',

  keywords: [
    'luxury car rental Puglia',
    'Ferrari rental Italy',
    'Maserati Ghibli rental',
    'Mercedes convertible rental Lecce',
    'yacht charter Gallipoli',
    'wedding car rental Puglia',
    'airport transfer Bari Brindisi',
    'luxury car rental Italy',
  ],

  /** Contact details — MUST match Google Business Profile exactly. */
  phone: '+39 339 542 5284',
  phoneHref: '+393395425284',
  email: 'info@bleader.it',

  /** Headquarters — used for LocalBusiness JSON-LD & NAP consistency. */
  address: {
    street: 'Via Roma 1',
    locality: 'Carmiano',
    region: 'LE', // Provincia di Lecce
    postalCode: '73040',
    country: 'IT',
    countryName: 'Italy',
  },

  /** Geo coordinates of the HQ (update with the real GBP values). */
  geo: {
    latitude: 40.3589,
    longitude: 18.043,
  },

  /** Service area — drives `areaServed` in JSON-LD. */
  areaServed: [
    'Puglia',
    'Lecce',
    'Gallipoli',
    'Basilicata',
    'Calabria',
    'Southern Italy',
  ],

  /** Airports served for transfer service. */
  airports: [
    { code: 'BRI', name: 'Bari Karol Wojtyła' },
    { code: 'BDS', name: 'Brindisi Salento' },
    { code: 'SUF', name: 'Lamezia Terme' },
  ],

  /** Price positioning (used by LocalBusiness `priceRange`). */
  priceRange: '€€€€',

  /** Official social profiles (fill before launch). */
  social: {
    instagram: 'https://www.instagram.com/bleader',
    facebook: 'https://www.facebook.com/bleader',
    twitter: '',
  },

  /** Twitter handle for `twitter:creator` (leave '' until created). */
  twitterHandle: '',
} as const;

/** Image used for OpenGraph / Twitter cards (absolute URL). */
export const OG_IMAGE = {
  url: `${SITE.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: 'B LEADER — Luxury Car & Yacht Rental in Puglia, Italy',
};

/** Canonical URL for the home page. */
export const CANONICAL = SITE.url;
