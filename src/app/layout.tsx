import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { WhatsAppButton } from "@/components/velox/chat/whatsapp-button";
import { ChatProvider } from "@/components/velox/chat/chat-context";
import { ReserveProvider } from "@/components/ReserveModal";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/seo";
import { faqSchema } from "@/lib/faq-schema";
import ScrollToTop from "@/components/ScrollToTop";

// Wave 1 fix: fuentes self-hosted en public/fonts (woff2, subset latin).
// Eliminan la descarga de fonts.gstatic.com durante el build de Turbopack,
// que fallaba con "Can't resolve @vercel/turbopack-next/internal/font/google/font"
// cuando Google devolvía 404 para algunas slices de Inter/Outfit.
const outfit = localFont({
  src: [
    { path: "../../public/fonts/outfit-300-normal.woff2", weight: "300" },
    { path: "../../public/fonts/outfit-400-normal.woff2", weight: "400" },
    { path: "../../public/fonts/outfit-500-normal.woff2", weight: "500" },
    { path: "../../public/fonts/outfit-600-normal.woff2", weight: "600" },
    { path: "../../public/fonts/outfit-700-normal.woff2", weight: "700" },
    { path: "../../public/fonts/outfit-800-normal.woff2", weight: "800" },
  ],
  variable: "--font-outfit",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../../public/fonts/inter-300-normal.woff2", weight: "300" },
    { path: "../../public/fonts/inter-400-normal.woff2", weight: "400" },
    { path: "../../public/fonts/inter-500-normal.woff2", weight: "500" },
    { path: "../../public/fonts/inter-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = localFont({
  src: [
    { path: "../../public/fonts/cormorant-garamond-300-normal.woff2", weight: "300" },
    { path: "../../public/fonts/cormorant-garamond-400-normal.woff2", weight: "400" },
    { path: "../../public/fonts/cormorant-garamond-500-normal.woff2", weight: "500" },
    { path: "../../public/fonts/cormorant-garamond-600-normal.woff2", weight: "600" },
    { path: "../../public/fonts/cormorant-garamond-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-cormorant",
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
    icon: [
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
  authors: [{ name: "UastasiProject", url: "https://github.com/uastasiforbusiness" }],
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
        <div
          aria-hidden
          className="hidden"
          dangerouslySetInnerHTML={{
            __html: "<!-- Designed & built by UastasiProject -->",
          }}
        />
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={faqSchema()} />
        <ChatProvider>
          <ReserveProvider>
            <SmoothScroll>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ScrollToTop />
            </SmoothScroll>
          </ReserveProvider>
          <WhatsAppButton />
        </ChatProvider>
      </body>
    </html>
  );
}
