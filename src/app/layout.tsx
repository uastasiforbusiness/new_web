import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "VELOX — Luxury Car Rental",
  description:
    "Experience luxury driving. Premium fleet of Ferrari, Maserati, and Mercedes vehicles available for rent. Concierge service, premium insurance, hotel delivery.",
  keywords: [
    "luxury car rental",
    "Ferrari rental",
    "Maserati rental",
    "Mercedes rental",
    "premium cars",
    "VELOX",
  ],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "VELOX — Luxury Car Rental",
    description:
      "Experience luxury driving. Premium fleet available for rent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-[#0a0a0a] text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
