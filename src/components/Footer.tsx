"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CARS } from "@/lib/data";
import { CONTACT, NAV_LINKS } from "@/lib/config";
import { useReserve } from "./ReserveModal";

export default function Footer() {
  const { openReserve } = useReserve();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-[#080706]">
      {/* Oversized wordmark */}
      <div className="pointer-events-none select-none px-5 pt-16 md:px-10" aria-hidden>
        <p className="text-outline whitespace-nowrap font-display text-[16vw] font-semibold leading-[0.85] tracking-[0.08em] opacity-60">
          B LEADER
        </p>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-4">
          <p className="font-serif text-3xl font-light leading-snug text-ivory">
            Luxury in motion,
            <br />
            <em className="text-gold-light">on land &amp; at sea.</em>
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-mute">
            Supercars, a flybridge yacht and chauffeured services across Salento.
            One concierge, one standard: impeccable.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {[
              { mark: "IG", label: "Instagram" },
              { mark: "FB", label: "Facebook" },
              { mark: "YT", label: "YouTube" },
            ].map(({ mark, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-display text-[10px] font-medium tracking-[0.18em] text-sand transition-all duration-300 hover:border-gold/60 hover:text-gold"
              >
                {mark}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="text-[10px] uppercase tracking-[0.32em] text-mute">Explore</p>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-sand transition-colors duration-300 hover:text-ivory"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.32em] text-mute">The fleet</p>
          <ul className="mt-5 space-y-3">
            {CARS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/fleet#${c.slug}`}
                  className="group flex items-center gap-2 text-sm text-sand transition-colors duration-300 hover:text-ivory"
                >
                  {c.name}
                  <ArrowUpRight
                    size={12}
                    className="text-gold opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.32em] text-mute">Concierge</p>
          <ul className="mt-5 space-y-3 text-sm text-sand">
            <li>{CONTACT.address}</li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-ivory">
                {CONTACT.email}
              </a>
            </li>
            <li className="text-mute">{CONTACT.hours}</li>
          </ul>
          <button
            onClick={() => openReserve()}
            className="btn-sweep mt-8 w-full border border-gold/50 px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
          >
            Begin a reservation
          </button>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-5 py-6 text-[11px] tracking-[0.18em] text-mute md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} B LEADER S.r.l. — P.IVA 04812390756</p>
          <p className="text-center">Taviano, Salento · Puglia · Italia</p>
          <p className="italic text-gold-deep">Designed for the few.</p>
        </div>
      </div>
    </footer>
  );
}
