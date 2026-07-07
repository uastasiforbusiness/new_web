import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "B LEADER — Premium Car Rental",
  description:
    "Experience premium driving. Exclusive fleet of high-performance vehicles available for rent. Concierge service, premium insurance, hotel delivery.",
  keywords: [
    "premium car rental",
    "B LEADER",
    "luxury cars",
    "exclusive fleet",
    "car rental",
    "high-performance rental",
    "Ferrari rental",
    "Lamborghini rental",
  ],
  metadataBase: new URL("https://bleader.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "B LEADER — Premium Car Rental",
    description:
      "Experience premium driving. Exclusive fleet of high-performance vehicles available for rent. Concierge service, premium insurance, hotel delivery.",
    url: "https://bleader.com",
    siteName: "B LEADER",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "B LEADER — Premium Car Rental",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "B LEADER — Premium Car Rental",
    description:
      "Experience premium driving. Exclusive fleet of high-performance vehicles available for rent.",
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
};

/**
 * JSON-LD Structured Data — Organization + WebSite schema
 * Mejora el rich snippet en Google: logo, sitio, buscador.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "B LEADER",
  url: "https://bleader.com",
  logo: "https://bleader.com/images/logo-white.webp",
  description:
    "Premium car rental with an exclusive fleet of high-performance vehicles.",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
