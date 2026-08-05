import { Clock, Mail, MapPin, MessageCircle, type LucideIcon } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { buildPageMeta, breadcrumbSchema } from "@/lib/seo";
import { CONTACT, whatsappUrl } from "@/lib/config";

export const metadata = buildPageMeta({
  title: "Contact — Talk to the Concierge",
  description: "Speak with the B LEADER concierge in English or Italian. WhatsApp and email — replies within two hours.",
  path: "/contact",
});

type ContactRow = { Icon: LucideIcon; label: string; value: string; href?: string };

const ROWS: ContactRow[] = [
  { Icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { Icon: MapPin, label: "Studio", value: CONTACT.address },
  { Icon: Clock, label: "Hours", value: CONTACT.hours },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
        <Reveal>
          <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            <span className="h-px w-12 bg-gold/70" /> Home — Contact
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 font-serif text-6xl font-light leading-[0.98] text-ivory md:text-8xl">
            Talk to
            <br />
            <em className="gold-text">the concierge.</em>
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* info column */}
          <div>
            {ROWS.map(({ Icon, label, value, href }) => (
              <Reveal key={label}>
                <div className="flex items-start gap-5 border-b border-line py-6">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-mute">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1.5 block text-[15px] leading-7 text-ivory transition-colors hover:text-gold-light">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-[15px] leading-7 text-ivory">{value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.1}>
              <a
                href={whatsappUrl("Hello B LEADER — I would like to speak with the concierge.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 flex w-fit items-center gap-4 border border-ivory/15 px-7 py-4 transition-all duration-500 hover:border-gold/60"
              >
                <MessageCircle size={17} className="text-gold" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors hover:text-gold-light">
                  WhatsApp the concierge
                </span>
              </a>
            </Reveal>
          </div>

          {/* form column */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
