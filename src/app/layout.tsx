import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import {
  SITE,
  CONTACT,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/seo";
import { SiteChrome } from "@/components/velox/site-chrome";

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

const verificationOther: Record<string, string> = {};
if (process.env.NEXT_PUBLIC_BING_VERIFICATION) {
  verificationOther["msvalidate.01"] = process.env.NEXT_PUBLIC_BING_VERIFICATION;
}

export const metadata: Metadata = {
  // Titles are fully composed in buildPageMeta() per route (avoids double "| B LEADER")
  title: SITE.defaultTitle,
  description: SITE.defaultDescription,
  keywords: [...SITE.defaultKeywords],
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: SITE.locale,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Luxury Driving & Yacht Experiences`,
    description:
      "Live the Italian dream: drive a Ferrari along the Adriatic coast or sail into a Puglian sunset on a private yacht.",
    images: [SITE.ogImage],
    ...(SITE.twitterHandle
      ? { creator: SITE.twitterHandle, site: SITE.twitterHandle }
      : {}),
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
  category: "travel",
  other: {
    "geo.region": "IT-75",
    "geo.placename": "Salento, Puglia",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    ...(Object.keys(verificationOther).length > 0
      ? { other: verificationOther }
      : {}),
  },
};

/**
 * JSON-LD — Organization/LocalBusiness + WebSite on every page.
 * Product / Breadcrumb schemas inject from each route page.tsx.
 */
const jsonLdSchemas = [localBusinessSchema(), websiteSchema()];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE.htmlLang} className="dark" suppressHydrationWarning>
      <head>
        {jsonLdSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        {/* Prefer tel: links; avoid auto-link hijacking on iOS when no public phone */}
        <meta
          name="format-detection"
          content={CONTACT.phone ? "telephone=yes" : "telephone=no"}
        />
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
