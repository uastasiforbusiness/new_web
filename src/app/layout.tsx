import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { localBusinessSchema, CONTACT } from "@/lib/seo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://bleader.it";

export const metadata: Metadata = {
  title: "B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy",
  description:
    "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht. Curated luxury experiences in Salento — concierge, professional photographer, champagne included.",
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
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy",
    description:
      "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht. Curated luxury experiences in Salento — concierge, professional photographer, champagne included.",
    url: BASE_URL,
    siteName: "B LEADER",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
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
    images: ["/opengraph-image"],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
};

/**
 * JSON-LD Structured Data — ONLY LocalBusiness en root layout.
 * Los schemas de Product y Breadcrumb contextuales se inyectan
 * desde cada page.tsx (fleet, yacht, services, about).
 */
const jsonLdSchemas = [localBusinessSchema()];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data — LocalBusiness */}
        {jsonLdSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        {/* Theme color para PWA / status bar en mobile */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} ${cormorant.variable} antialiased bg-[#0a0a0a] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
