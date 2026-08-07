import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { WhatsAppButton } from "@/components/velox/chat/whatsapp-button";
import { ReserveProvider } from "@/components/ReserveModal";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/seo";
import ScrollToTop from "@/components/ScrollToTop";

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
  : "https://bleaderitaly.com";

export const metadata: Metadata = {
  title: "B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy",
  description:
    "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht. Curated luxury experiences in Salento — concierge, professional photographer, champagne included.",
  keywords: [
    "Ferrari driving experience Salento Italy",
    "luxury yacht experience Puglia",
    "Ferrari tour Puglia US tourists",
    "luxury vacation experiences Salento",
    "drive Ferrari Salento coast Italy",
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
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
 * Viewport / PWA — theme-color meta preserved from the previous manual <head>.
 * appleWebApp + formatDetection live in `metadata` (Next 16 splits these).
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${outfit.variable} ${inter.variable}`}
    >
      <body className="grain bg-ink font-sans text-ivory antialiased">
        <JsonLd data={localBusinessSchema()} />
        <ReserveProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
          </SmoothScroll>
        </ReserveProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
