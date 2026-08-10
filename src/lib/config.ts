/**
 * B LEADER — brand constants & contact channels.
 * Values fall back gracefully when env vars are not provided.
 */

export const BRAND = "B LEADER";
export const TAGLINE = "Luxury in motion — Salento, Italy";

export const CONTACT = {
  email: "info@bleaderitaly.com",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bleaderitaly.com";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/experiences", label: "Experiences" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
