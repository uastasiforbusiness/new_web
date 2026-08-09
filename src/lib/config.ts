/**
 * B LEADER — brand constants & contact channels.
 * Values fall back gracefully when env vars are not provided.
 */

export const BRAND = "B LEADER";
export const TAGLINE = "Luxury in motion — Salento, Italy";

export const CONTACT = {
  email: "bookings@bleaderitaly.com",
} as const;

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "393516667788";

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bleaderitaly.com";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/experiences", label: "Experiences" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
