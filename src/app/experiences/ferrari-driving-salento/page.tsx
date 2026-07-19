import {
  buildPageMeta,
  breadcrumbSchema,
  faqSchema,
  experienceSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/velox/ui/json-ld";
import { ExperienceLanding } from "@/components/velox/ui/experience-landing";

const path = "/experiences/ferrari-driving-salento";

const faqs = [
  {
    question: "Can US tourists drive a Ferrari in Italy?",
    answer:
      "Yes. Guests typically need a valid full driving license held for the required period, and many US visitors carry an International Driving Permit alongside their state license. We confirm requirements before your date so the day is seamless.",
  },
  {
    question: "What is the driving route?",
    answer:
      "The route spans the Ionian and Adriatic coasts of Salento: Gallipoli → Zinzulusa Cave (Castro) → Ciolo Canyon → Santa Maria di Leuca — the southernmost tip of Puglia. Coastal corniches, cliffside curves, and a private boat stop inside a sea cave.",
  },
  {
    question: "Is this a track day or a coastal road experience?",
    answer:
      "B LEADER focuses on curated open-road coastal and countryside routes — Adriatic light, Ionian cliffs, white towns — not a closed circuit. It is the Italian driving dream, not a race school.",
  },
  {
    question: "What is included for international guests?",
    answer:
      "Vehicle preparation, English briefing, route guidance, welcome coffee, private boat entry to Zinzulusa Cave, a seated aperitivo-lunch with local wines at Ciolo Canyon, and a celebratory photo session at the Leuca lighthouse. Photographer and champagne packages are available on request.",
  },
];

export const metadata = buildPageMeta({
  title: "Ferrari Driving Experience in Salento, Italy | Full-Day Itinerary",
  description:
    "A curated full-day Ferrari itinerary from Gallipoli to Santa Maria di Leuca: Adriatic corniches, a private sea-cave boat stop, cliffside aperitivo, and a lighthouse finale. English-speaking — built for US travelers.",
  path,
  keywords: [
    "Ferrari driving experience Salento",
    "Ferrari rental Puglia US tourists",
    "drive Ferrari Italy vacation",
    "Ferrari California Salento",
    "supercar experience Southern Italy Americans",
    "Ferrari itinerary Salento coast",
    "Gallipoli to Leuca Ferrari drive",
  ],
});

/* ─── Itinerary timeline section ─── */

const stops = [
  {
    time: "09:00",
    title: "Roaring Departure from Porto Gaio",
    description:
      "Welcome coffee at the Porto Gaio marina in Gallipoli. A short technical and emotional briefing before ignition. The Ferraris come alive and you cut through the Salento interior from the Ionian toward the Adriatic.",
  },
  {
    time: "10:00",
    title: "Private Adventure at the Zinzulusa Cave",
    description:
      "Arrive in Castro to reserved parking for the supercars. Descend to the small harbor and board a private traditional boat. Glide inside the majestic Zinzulusa Cave — stalactites, turquoise waters, and a silence broken only by oars.",
  },
  {
    time: "11:30",
    title: "The Spectacular Drive on the Castro–Ciolo",
    description:
      "Back behind the wheel on the SP358 — an iconic coastal road suspended above the sea. Breathtaking curves, towering cliffs, and the Ferrari responding to every contour like it was designed for this exact stretch of Italian asphalt.",
  },
  {
    time: "12:00",
    title: "Tasting on the Ciolo Canyon",
    description:
      "Stop at the legendary Ciolo Bridge. A panoramic terrace perched over the sea sets the stage for a seated aperitivo-lunch: fried polpette, potato pitta, fresh burrata, sun-dried tomatoes, paired with chilled Negroamaro Rosato.",
  },
  {
    time: "14:00",
    title: "Finis Terrae: Santa Maria di Leuca",
    description:
      "The final stretch — spectacular coastal driving to the edge of the Italian peninsula. Arrive at the Sanctuary of Santa Maria de Finibus Terrae, where the Adriatic and Ionian seas meet. Celebratory photo session with the cars in front of the grand white lighthouse.",
  },
];

function ItineraryTimeline() {
  return (
    <section className="py-16 sm:py-20 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-heading font-semibold tracking-[0.45em] text-[#c9a96e] mb-4">
          THE DAY
        </p>
        <h2 className="text-3xl sm:text-4xl font-elegant font-light text-white mb-12 tracking-wide italic">
          Adriatic route & the caves
        </h2>

        <div className="relative pl-8 sm:pl-12 border-l border-[#1a1a1a] space-y-14">
          {stops.map((stop) => (
            <div key={stop.time} className="relative">
              {/* Time dot */}
              <div className="absolute -left-[calc(2rem+5px)] sm:-left-[calc(3rem+5px)] top-1 w-[10px] h-[10px] rounded-full bg-[#c9a96e] ring-4 ring-[#0a0a0a]" />
              <p className="text-[11px] font-heading font-bold tracking-[0.3em] text-[#c9a96e] mb-2">
                {stop.time}
              </p>
              <h3 className="text-xl sm:text-2xl font-elegant font-light text-white mb-3">
                {stop.title}
              </h3>
              <p className="text-[#888] font-body font-light leading-relaxed text-base">
                {stop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */

export default function FerrariDrivingSalentoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Experiences", path: "/experiences" },
          { name: "Ferrari Driving Salento", path },
        ])}
      />
      <JsonLd
        data={experienceSchema({
          name: "Ferrari Driving Experience — Salento",
          description:
            "Self-drive Ferrari experience on the coasts of Salento, Puglia, for luxury and international travelers.",
          path,
          image: "/images/rossa_card.webp",
        })}
      />
      <JsonLd data={faqSchema(faqs)} />
      <ExperienceLanding
        eyebrow="FERRARI EXPERIENCE · SALENTO · PUGLIA"
        title="Adriatic route"
        titleAccent="& the caves"
        lead="A full-day Ferrari itinerary from Gallipoli to the southernmost tip of Italy. Coastal corniches, a private sea cave, cliffside aperitivo, and a lighthouse finale. The drive Americans book Italy for."
        paragraphs={[
          "This is not a rental with a map. It is a curated day built by Salento locals who know which cliff road delivers the best light at noon, which cove hides a grotto worth stopping for, and which terrace pours a Negroamaro Rosato cold enough for a summer afternoon.",
          "Every stop is pre-arranged. The cave boatman is waiting. The table at Ciolo Canyon is yours. The lighthouse photo is framed before you park. All you have to do is drive — and remember the sound of a Ferrari echoing off limestone cliffs.",
          "The route crosses the heel of Italy from the Ionian to the Adriatic and back, covering approximately 100 km of the most cinematic coastline in the Mediterranean. Plan a full day. Dress for sun, sea spray, and the occasional standing ovation from a village piazza.",
        ]}
        highlights={[
          {
            label: "FLEET",
            detail:
              "Ferrari California T and Ferrari California — curated, presented, and maintained to a private-client standard.",
          },
          {
            label: "ROUTE",
            detail:
              "Gallipoli → Castro → Ciolo Canyon → Santa Maria di Leuca. Coastal corniches, cliffside curves, and a private sea-cave stop.",
          },
          {
            label: "INCLUSIONS",
            detail:
              "Welcome coffee, English briefing, private boat to Zinzulusa Cave, seated aperitivo-lunch with wine at Ciolo Canyon, lighthouse photo session.",
          },
          {
            label: "FOR US GUESTS",
            detail:
              "License and insurance guidance, English concierge from first message to keys-in-hand. USD indicative pricing available on inquiry.",
          },
        ]}
        faqs={faqs}
        primaryCta={{ href: "/#reserve", label: "RESERVE THIS DRIVE" }}
        secondaryCta={{ href: "/fleet", label: "VIEW FLEET" }}
      >
        <ItineraryTimeline />
      </ExperienceLanding>
    </>
  );
}
