import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import {
  localBusinessSchema,
  productSchema,
  breadcrumbSchema,
} from "@/lib/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://bleader.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy",
    template: "%s | B LEADER",
  },
  description:
    "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht. Curated luxury experiences in Salento — concierge, photographer, champagne, airport transfer included.",
  keywords: [
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
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "it-IT": "/it",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy",
    description:
      "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht. Curated luxury experiences in Salento — concierge, photographer, champagne, airport transfer included.",
    url: BASE_URL,
    siteName: "B LEADER",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "B LEADER — Luxury Driving & Yacht Experiences in Salento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B LEADER — Luxury Driving & Yacht Experiences",
    description:
      "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Automotive",
  verification: {
    // ── Añadir aquí el meta tag de Google Search Console cuando lo configures ──
    // google: "TU_CODIGO_DE_VERIFICACION",
  },
};

/**
 * JSON-LD Structured Data — LocalBusiness + Product + Breadcrumb
 * Ayuda a Google a mostrar Rich Snippets en resultados de búsqueda.
 */
const jsonLdSchemas = [
  localBusinessSchema(),
  // Product schemas para la flota principal
  productSchema({
    name: "Ferrari California T (Rossa Corsa)",
    brand: "Ferrari",
    category: "Car",
    image: `${BASE_URL}/images/ferrari_rossa_card.webp`,
    pricePerDay: 1200,
    currency: "EUR",
    description:
      "Ferrari California T 560HP — rossa corsa, 3.9s 0-100 km/h. Experiencia de conducción inolvidable en la costa de Salento.",
  }),
  productSchema({
    name: "Ferrari California (Bianca Avus)",
    brand: "Ferrari",
    category: "Car",
    image: `${BASE_URL}/images/ferrari_blanca_card.webp`,
    pricePerDay: 1000,
    currency: "EUR",
    description:
      "Ferrari California bianca avus 460HP. Elegancia y velocidad para recorrer Puglia con estilo.",
  }),
  productSchema({
    name: "Maserati Ghibli 250HP",
    brand: "Maserati",
    category: "Car",
    image: `${BASE_URL}/images/maserati_card.webp`,
    pricePerDay: 600,
    currency: "EUR",
    description:
      "Maserati Ghibli — lujo italiano, 250HP. Perfecta para viajes de negocios o placer por la costa adriática.",
  }),
  breadcrumbSchema([
    { name: "Home", path: "/" },
  ]),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data — LocalBusiness + Products + Breadcrumb */}
        {jsonLdSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* Theme color para PWA / status bar en mobile */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} ${cormorant.variable} antialiased bg-[#0a0a0a] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
