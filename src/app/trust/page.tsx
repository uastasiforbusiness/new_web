import Link from "next/link";
import { BadgeCheck, Clock, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { YACHT } from "@/lib/data";
import { buildPageMeta, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import Reveal from "@/components/Reveal";

export const metadata = buildPageMeta({
  title: "How It Works — Trust, Safety & FAQs",
  description:
    "Licensed skippers, no deposits taken online, and a concierge who answers personally within two hours — how B LEADER works, and what every day includes.",
  path: "/trust",
});

const STEPS = [
  {
    title: "Describe the day",
    body: "Tell us what you have in mind — a Ferrari along the Adriatic, a sunrise charter off Gallipoli, a wedding, or a question. One message, on WhatsApp or the reservation form.",
  },
  {
    title: "A person answers",
    body: "Within two hours, 08:00–22:00 CET, in English or Italian. No call center, no script — an actual concierge who knows the coast.",
  },
  {
    title: "You arrive, we handle the rest",
    body: "Skipper, stewardess, itinerary, fuel, aperitivo — everything ready. You arrive at the pickup point; the day is already planned.",
  },
];

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured operation",
    body: "Italian Master–licensed skippers and chauffeurs who have driven these roads for years. Every itinerary is tested by us before you arrive.",
  },
  {
    icon: BadgeCheck,
    title: "No deposits taken online",
    body: "We never ask for a card or a deposit through the website. The reservation is confirmed by a person, and payment is agreed directly — transparently.",
  },
  {
    icon: Users,
    title: "Private, never shared",
    body: "No shared charters, no bundled groups. Your car, your yacht, your schedule — and your privacy is not negotiable.",
  },
  {
    icon: Clock,
    title: "A concierge, not a call center",
    body: "The same person who answers your first message sees the day through: reservations, changes, and the small details that matter.",
  },
];

const BOOKING_TERMS = [
  {
    title: "The reservation amount",
    body: "No payments are taken online. During your conversation, the concierge agrees a small reservation amount to hold the date — nothing is charged through the website.",
  },
  {
    title: "Cancellation",
    body: "That reservation amount is the only thing at risk: it is retained only if you cancel. Changing the hour or the day is always free.",
  },
  {
    title: "Where we meet",
    body: "The yacht is kept in Porto Gaio, Gallipoli. For boat and car experiences we agree a pickup point that is convenient for everyone — airports, stations and hotels included.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I reserve?",
    a: "Use the reservation form or message us on WhatsApp. No deposits are taken online; a concierge replies personally within two hours, 08:00–22:00 CET, and confirms the details with you directly.",
  },
  {
    q: "What does a yacht charter include?",
    a: `A ${YACHT.name} charter includes a licensed skipper and stewardess, fuel for the itinerary, a welcome prosecco and aperitivo at anchor, SUP boards, snorkel sets and sea towels, and an air-conditioned saloon, galley and cabins.`,
  },
  {
    q: "Where do departures start?",
    a: "The yacht is kept in Porto Gaio, Gallipoli. For boat and car experiences we agree a pickup point that is convenient for everyone — airports, stations and hotels can be arranged at booking.",
  },
  {
    q: "Can I cancel or reschedule?",
    a: "A small reservation amount is agreed during your conversation. That amount is retained only if you cancel; changing the hour or the day is always free.",
  },
  {
    q: "Can I combine land and sea in one day?",
    a: "Yes — the Ferrari & Sea Combination pairs a morning supercar drive with an afternoon flybridge charter, from 10:00 to 19:00.",
  },
  {
    q: "In which languages do you work?",
    a: "English and Italian. The concierge answers in either language, and bilingual chauffeurs are available for corporate delegations.",
  },
  {
    q: "Is a photographer available?",
    a: "On request, for weddings, proposals and celebrations. The route is built with photo time in mind.",
  },
];

export default function TrustPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "How It Works", path: "/trust" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> How it works
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
            No deposits. No call center.
            <br />
            <em className="text-gold-light pr-2">One person, two hours.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-sand">
            Luxury travel runs on trust. Here is exactly how B LEADER works, what
            every day includes, and the answers to the questions guests ask most.
          </p>
        </Reveal>
      </div>

      {/* ── Steps ────────────────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-serif text-4xl font-light text-ivory md:text-5xl">
              Three steps, <em className="text-gold-light">zero friction</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} y={40} delay={i * 0.08}>
                <div className="flex h-full flex-col bg-ink p-8 md:p-10">
                  <span className="font-display text-5xl font-bold text-outline-gold md:text-6xl">
                    0{i + 1}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl font-light text-ivory">{s.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-mute">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust points ─────────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-serif text-4xl font-light text-ivory md:text-5xl">
              How we <em className="text-gold-light">earn it</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {TRUST_POINTS.map((p, i) => (
              <Reveal key={p.title} y={30} delay={i * 0.06}>
                <div className="flex gap-6">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-gold/30 text-gold">
                    <p.icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ivory">{p.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-sand">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking terms ────────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> The fine print, in plain words
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl font-light text-ivory md:text-5xl">
              Simple terms, <em className="text-gold-light">no surprises</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
            {BOOKING_TERMS.map((t, i) => (
              <Reveal key={t.title} y={30} delay={i * 0.08}>
                <div>
                  <span className="font-display text-4xl font-bold text-outline-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-light text-ivory">{t.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-sand">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────────────── */}
      <section className="border-t border-line bg-ink/60">
        <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> Onboard, always
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 font-serif text-4xl font-light text-ivory md:text-5xl">
              What every {YACHT.name} charter <em className="text-gold-light">includes</em>
            </h2>
          </Reveal>
          <ul className="mt-12 grid max-w-4xl gap-x-10 gap-y-4 sm:grid-cols-2">
            {YACHT.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-ivory/85">
                <BadgeCheck size={15} className="mt-1 flex-none text-gold" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="border-t border-line" id="faq">
        <div className="mx-auto max-w-[900px] px-5 py-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="font-serif text-4xl font-light text-ivory md:text-5xl">
              Questions, <em className="text-gold-light">answered plainly</em>
            </h2>
          </Reveal>
          <div className="mt-12 space-y-px border border-line bg-line">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} y={20} delay={i * 0.04}>
                <details className="group bg-ink">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-6 font-serif text-xl font-light text-ivory transition-colors hover:text-gold-light md:px-8 md:text-2xl">
                    {f.q}
                    <span className="text-gold transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-7 text-[15px] leading-8 text-sand md:px-8">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="btn-sweep group flex items-center gap-3 border border-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
              >
                <MessageCircle size={14} className="text-gold" />
                Ask the concierge
              </Link>
              <Link
                href="/experiences"
                className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
              >
                Explore experiences →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}