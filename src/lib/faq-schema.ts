/**
 * Wave 1: FAQPage JSON-LD para AI search (GPT/Perplexity/Gemini).
 * Los viajeros de lujo de EE. UU. planifican cada vez más con asistentes de IA,
 * por lo que este bloque maximiza la citabilidad de B LEADER en respuestas
 * generadas por IA (AEO/GEO).
 */
import { SITE } from "./seo";

export const faqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to rent a Ferrari in Salento, Puglia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B LEADER offers Ferrari experiences in Salento from €1,950 per day for the Ferrari California and €2,450 per day for the Ferrari F12 Berlinetta, with a professional chauffeur option, concierge service, champagne, and a professional photographer included. Multi-day bookings and combined car + yacht packages are available.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an International Driving Permit (IDP) to drive in Puglia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "U.S. citizens can drive in Italy with a valid U.S. driver's license for up to one year, but Italian authorities strongly recommend (and many rental companies require) an International Driving Permit (IDP) obtained from AAA or AATA before departure, costing about $20. New York State license holders are exempt from the IDP requirement in Italy. On B LEADER chauffeur-led experiences, no IDP is needed.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best time to visit Salento, Puglia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Salento is at its best from April to June and September to October, when the coast is warm but not crowded. July and August are the peak season with the liveliest beach clubs and nightlife in Gallipoli and Otranto. B LEADER runs Ferrari coastal tours and yacht charters year-round.",
      },
    },
    {
      "@type": "Question",
      name: "Which airport should I fly into to visit Salento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The main airports for Salento are Brindisi Airport (BDS, Salento Airport), about 45 minutes from Lecce, and Bari Karol Wojtyła Airport (BRI), about 2 hours north. B LEADER offers airport transfers between Brindisi or Bari and Lecce, Otranto and Gallipoli as part of its chauffeured services.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a private yacht charter cost in Salento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Private yacht charters in Salento with B LEADER start from €1,200 per day on a Cranchi Atlantique 50 flybridge motor yacht. A full-day charter (8 hours, 10:00 – 18:00) from Porto Selvaggio or Otranto starts from €1,600 and includes captain, concierge service, champagne and a professional photographer.",
      },
    },
    {
      "@type": "Question",
      name: "Is Salento worth visiting for luxury travelers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Salento is the fastest-growing luxury destination in southern Italy, known for its Maldivian-like beaches (Porto Selvaggio, Punta Suina, Baia dei Turchi), baroque Lecce, and masserie hotels. Puglia welcomed a record 6.7 million visitors in 2025, with international luxury stays growing 16% — and the United States is now the second-largest source market for Italy.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in a B LEADER Ferrari experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every B LEADER Ferrari experience includes a curated coastal route along the Adriatic and Ionian coasts of Salento, a professional chauffeur or self-drive option, a concierge who arranges lunch at a local trattoria or beach club, champagne, and a professional photographer capturing the day. Custom itineraries for Lecce, Otranto, Gallipoli and Porto Selvaggio are available.",
      },
    },
  ],
});
