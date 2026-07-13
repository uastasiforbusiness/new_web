/**
 * SEO utilities for B LEADER
 * Next.js App Router — metadata, JSON-LD schemas, canonical helpers.
 */

export const SITE = {
  name: "B LEADER",
  tagline: "Luxury Driving & Yacht Experiences in Salento",
  // ── CAMBIAR cuando compres el dominio ──
  url: "https://bleader.vercel.app",
  // ──────────────────────────────────────
  locale: "en_US",
  localeAlternate: "it_IT",
  defaultTitle: "B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy",
  defaultDescription:
    "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht. Curated luxury experiences in Salento — concierge, professional photographer, champagne included.",
  defaultKeywords: [
    "Ferrari driving experience Salento Italy",
    "luxury yacht experience Puglia",
    "Ferrari tour Puglia US tourists",
    "luxury vacation experiences Salento",
    "drive Ferrari along Amalfi Coast",
    "sunset yacht tour Salento",
    "exotic car experience Italy",
    "B LEADER luxury experiences",
    "Puglia supercar experience",
    "yacht dinner experience Adriatic",
    "Salento luxury travel curator",
    "Ferrari California tour Italy",
  ],
  ogImage: "/og-image.jpg",
  twitterHandle: undefined,
};

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
};

/**
 * Construye metadatos consistentes para cada página.
 * El sufijo "| B LEADER" lo añade el root layout via title.template.
 * Uso: export const metadata = buildPageMeta({ title: "Fleet", path: "/fleet" });
 */
export function buildPageMeta(page: PageMeta) {
  const title = page.path === '/'
    ? page.title
    : `${page.title} | ${SITE.name}`;
  const description = page.description || SITE.defaultDescription;
  const images = page.ogImage
    ? [{ url: page.ogImage, width: 1200, height: 630, alt: title }]
    : [{ url: SITE.ogImage, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    keywords: [...SITE.defaultKeywords, ...(page.keywords ?? [])],
    metadataBase: new URL(SITE.url),
    alternates: { canonical: page.path },
    openGraph: {
      title,
      description,
      url: `${SITE.url}${page.path}`,
      siteName: SITE.name,
      type: "website" as const,
      images,
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: images.map((i) => i.url),
    },
    robots: page.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
          },
        },
  };
}

// ──────────────────────────────────────────────
// JSON-LD Schema helpers
// ──────────────────────────────────────────────

/**
 * Organization + LocalBusiness schema.
 * Google usa LocalBusiness para aparecer en el Local Pack / Google Maps.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo-white.webp`,
    description: SITE.defaultDescription,
    image: `${SITE.url}/images/hero-bg.webp`,
    priceRange: "$$$$",
    telephone: "+39-XXX-XXXXXXX",      // ── reemplazar con nº real ──
    email: "info@bleader.com",          // ── reemplazar ──
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salento",
      addressRegion: "Puglia",
      addressCountry: "IT",
    },
    areaServed: [
      { "@type": "City", name: "Lecce" },
      { "@type": "City", name: "Gallipoli" },
      { "@type": "City", name: "Otranto" },
      { "@type": "City", name: "Brindisi" },
      { "@type": "City", name: "Bari" },
      { "@type": "City", name: "Santa Maria di Leuca" },
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
    ],
    sameAs: [],
  };
}

export type Vehicle = {
  name: string;
  image: string;
  pricePerDay?: number;
  currency?: string;
  description: string;
  brand: string;
  category: "Car" | "Yacht";
};

/**
 * Product schema paraota.
 * Google puede mostrar precio, disponibilidad y reviews en rich snippet.
 */
export function productSchema(vehicle: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: vehicle.name,
    brand: { "@type": "Brand", name: vehicle.brand },
    category: `${vehicle.category} Rental`,
    image: vehicle.image,
    description: vehicle.description,
    offers: {
      "@type": "Offer",
      priceCurrency: vehicle.currency ?? "EUR",
      price: vehicle.pricePerDay ?? undefined,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

/** BreadcrumbList schema — ayuda a Google a entender la jerarquía del sitio */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
