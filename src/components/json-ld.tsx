import { SITE } from "@/lib/seo";

/**
 * ═══════════════════════════════════════════════════════════════════════
 *  JSON-LD structured data for B LEADER.
 *  Rendered server-side in the root layout so it lands in the initial HTML
 *  and is immediately readable by Googlebot, the Rich Results parser and
 *  voice assistants (Google Assistant, Siri, Alexa).
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Includes:
 *    - LocalBusiness / AutoRental (entity + NAP + geo + openingHours)
 *    - WebSite (helps sitelinks search box, brand entity)
 *    - Service catalog (yacht charter, wedding, transfers, ...)
 *
 *  TODO when the site is finished:
 *    - Add a `Car` / `Product` node per vehicle (with `offers`) here or in
 *      the fleet section. See the parked task in the todo list.
 *    - Replace `openingHours` once you have a real schedule.
 *    - Add `aggregateRating` / `review` after collecting GBP reviews.
 */

type LocalBusinessSchema = {
  "@context": "https://schema.org";
  "@type": string | string[];
  "@id": string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  image: string;
  logo: string;
  priceRange: string;
  currenciesAccepted: string;
  paymentAccepted: string;
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  areaServed: string[];
  knowsLanguage: string[];
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  sameAs: string[];
  hasOfferCatalog: {
    "@type": "OfferCatalog";
    name: string;
    itemListElement: {
      "@type": "Offer";
      itemOffered: {
        "@type": "Service";
        name: string;
        description: string;
      };
    }[];
  };
};

type WebSiteSchema = {
  "@context": "https://schema.org";
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  publisher: { "@id": string };
  inLanguage: string;
};

function buildLocalBusiness(): LocalBusinessSchema {
  const sameAs = [SITE.social.instagram, SITE.social.facebook, SITE.social.twitter].filter(
    Boolean
  ) as string[];

  return {
    "@context": "https://schema.org",
    // AutoRental is the most specific type; LocalBusiness is implied.
    "@type": ["AutoRental", "LocalBusiness", "TravelAgency"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/opengraph-image`,
    logo: `${SITE.url}/logo.svg`,
    priceRange: SITE.priceRange,
    currenciesAccepted: "EUR, USD, GBP",
    paymentAccepted: "Credit Card, Bank Transfer, Cash",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed,
    knowsLanguage: ["en", "it"],
    // 24/7 concierge — adjust when you have a real schedule.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Luxury Car Rental",
            description:
              "Ferrari, Maserati and Mercedes rentals in Puglia with hotel delivery and concierge service.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Yacht Charter",
            description:
              "Cranchi Atlantique 50 flybridge charters departing from Porto Gaio, Gallipoli along the Salento coast.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Car Rental",
            description:
              "Bridal vehicle with uniformed chauffeur and wedding decoration included.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport & Private Transfers",
            description:
              "Door-to-door transfers from Bari (BRI), Brindisi (BDS) and Lamezia Terme (SUF) airports.",
          },
        },
      ],
    },
  };
}

function buildWebSite(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    publisher: { "@id": `${SITE.url}/#business` },
    inLanguage: SITE.lang,
  };
}

/**
 * Server component rendered in <body>. Emits one <script type="application/ld+json">
 * with a @graph that links all entities together (recommended pattern).
 */
export function LocalBusinessJsonLd() {
  const graph = [buildLocalBusiness(), buildWebSite()];

  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here: all values are static, developer-controlled.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  );
}
