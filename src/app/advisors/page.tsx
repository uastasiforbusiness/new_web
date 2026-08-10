import Link from "next/link";
import { ArrowRight, CalendarCheck, MessageCircle, Percent, Timer } from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import { buildPageMeta, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Reveal from "@/components/Reveal";

export const metadata = buildPageMeta({
  title: "Travel Advisors — Partner with B LEADER in Salento",
  description:
    "Commission-based private Ferrari and yacht experiences in Puglia for your clients. Dedicated advisor line, 24-hour quotes, net rates on request.",
  path: "/advisors",
});

const REASONS = [
  {
    icon: Percent,
    title: "Net rates, on request",
    body: "Confidential net rates for advisors and agencies. Your markup, your margin — agreed directly, never published.",
  },
  {
    icon: Timer,
    title: "24-hour quote turnaround",
    body: "Send the dates, we return a firm proposal within one working day — even in peak season.",
  },
  {
    icon: CalendarCheck,
    title: "One point of contact",
    body: "The same advisor-facing concierge handles every booking: quotes, amendments, and day-of changes.",
  },
  {
    icon: MessageCircle,
    title: "Advisor-only channel",
    body: "A dedicated WhatsApp line so client inquiries and advisor requests never mix.",
  },
];

const OFFERINGS = [
  "Ferrari Grand Tour — full-day Adriatic drive",
  "Supercar & Pasta Day — estate, cooking class, wine",
  "The Ultimate Day — land and sea in one",
  "Cranchi Atlantique 50 charters — half day, full day, sunset",
  "Weddings & celebrations — chauffeured fleet",
  "Corporate transfers — board-grade logistics",
];

export default function AdvisorsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Travel Advisors", path: "/advisors" },
        ])}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> For travel advisors
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            Your clients,
            <br />
            <em className="text-gold-light">our coast.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-sand">
            Private Ferrari drives and flybridge charters across Puglia, sold
            through your agency on confidential net rates. Licensed skippers,
            no deposits online, and a concierge who answers in two hours — so
            your clients are looked after, and you keep the relationship.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href={whatsappUrl("Hello B LEADER — travel advisor inquiry. I would like net rates for my clients.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep group flex items-center gap-3 border border-gold px-9 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
            >
              <MessageCircle size={15} className="text-gold" />
              Talk to the advisor desk
            </a>
            <Link
              href="/trust"
              className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
            >
              How we work
              <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-2" />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* ── Why partner ──────────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-serif text-4xl font-light text-ivory md:text-5xl">
              Why advisors <em className="text-gold-light">work with us</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} y={30} delay={i * 0.06}>
                <div className="flex gap-6">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-gold/30 text-gold">
                    <r.icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ivory">{r.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-sand">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What you can sell ────────────────────────────────────────── */}
      <section className="border-t border-line bg-ink/60">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> The collection
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl font-light text-ivory md:text-5xl">
              What your clients <em className="text-gold-light">can book</em>
            </h2>
          </Reveal>
          <ul className="mt-12 grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
            {OFFERINGS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-ivory/85">
                <ArrowRight size={14} className="mt-1 flex-none text-gold" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Next step ────────────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 py-20 text-center md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-serif text-4xl font-light text-ivory md:text-6xl">
              One message, <em className="text-gold-light">net rates back.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-8 text-sand">
              Tell us your typical season and volume; we respond with a rate
              sheet and a dedicated contact within one working day.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={whatsappUrl("Hello B LEADER — travel advisor. Requesting a rate sheet and advisor terms.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep group mt-10 inline-flex items-center gap-3 border border-gold px-9 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
            >
              Request the rate sheet
              <ArrowRight size={14} className="text-gold transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}