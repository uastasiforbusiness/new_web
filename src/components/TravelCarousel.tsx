"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Estructura para tus futuros datos — el interior de la tarjeta está diseñado
// para esta jerarquía editorial: label (eyebrow) → title (serif) → description (caption).
interface CardData {
  id: number;
  label: string;       // small-caps gold — rol de "PERU" en la referencia
  title: string;       // Cormorant grande — rol de "MACHU PICCHU"
  description: string; // línea apagada — rol de "Adventure is never far away"
  image?: string;      // fondo propio de la tarjeta (opcional)
}

// Placeholders on-brand; reemplázalos por tu contenido real.
const CAROUSEL_ITEMS: CardData[] = [
  {
    id: 1,
    label: "Step 01",
    title: "Select the fleet",
    description: "Ferrari, Maserati, and luxury supercars curated across Salento.",
    image: "/images/card1_collage.webp",
  },
  {
    id: 2,
    label: "Step 02",
    title: "Curate the journey",
    description: "Private flybridge charters and chauffeured service, arranged end to end.",
    image: "/images/card2_collage.webp",
  },
  {
    id: 3,
    label: "Step 03",
    title: "Impeccable motion",
    description: "A dedicated concierge orchestrates every detail, 24/7.",
    image: "/images/card3_collage.webp",
  },
  {
    id: 4,
    label: "Step 04",
    title: "Set sail",
    description: "Aboard the Cranchi Atlantique 50 — Ionian swims and dinners at anchor.",
    image: "/images/card4_collage.webp",
  },
  {
    id: 5,
    label: "Step 05",
    title: "Begin",
    description: "Your private itinerary, one conversation away on WhatsApp.",
    image: "/images/card5_collage.webp",
  },
];

export default function TravelCarousel() {
  const [cards] = useState<CardData[]>(CAROUSEL_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0); // La rueda empieza en la Step 01

  const ROTATE_STEP = 30; // ° de giro hacia dentro por paso
  const X_STEP = 150; // px de apertura horizontal por paso
  const DEPTH_STEP = 130; // px que se aleja en profundidad (negativa) por paso
  const SCALE_STEP = 0.12; // reducción de escala por paso

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
      {/* Fondo de la rueda: imagen personalizada + overlay oscuro para que las tarjetas destaquen */}
      <img
        src="/back_cards_whells.jpeg"
        alt=""
        draggable={false}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 bg-[#0d0c0a]/45" />
      {/* 1. Fondo difuminado (Misty background effect) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.3)_0%,rgba(15,23,42,0.8)_100%)] opacity-80 blur-3xl" />

      {/* 0. Header band — aligned with the five wheel cards */}
      <div className="relative z-20 mx-auto w-full max-w-5xl pt-14 md:pt-20">
        <div className="flex flex-col items-center text-center">
          <span className="h-px w-12 bg-gold/70" aria-hidden />
          <p className="mt-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
            What we do
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl">
            Five steps,
            <br className="md:hidden" /> <em className="gold-text">one standard.</em>
          </h2>
        </div>
      </div>

      {/* 2. Contenedor Principal del Carrusel con Perspectiva 3D */}
      <div
        className="relative z-10 flex h-[500px] w-full max-w-5xl items-center justify-center"
        style={{ perspective: "1200px" }} // Requerido para el efecto 3D
      >
        {[...Array(5)].map((_, slot) => {
          // Posición relativa de cada ranura respecto a la activa (-2..+2):
          // siempre 1 central + 2 por lado, con wrap circular para un loop infinito.
          const offset = slot - 2;
          const wrap = (i: number) => ((i % cards.length) + cards.length) % cards.length;
          const card = cards[wrap(currentIndex + offset)];
          const isActive = offset === 0;

          // Movimiento: abanico radial 3D — la central recta de frente;
          // las laterales giran hacia dentro, se alejan en profundidad y
          // se encogen, todo proporcional a su distancia al centro.
          const rotateY = -offset * ROTATE_STEP; // giro hacia el centro
          const translateX = offset * X_STEP; // apertura del abanico
          const translateZ = -Math.abs(offset) * DEPTH_STEP; // profundidad (negativa)
          const scale = 1 - Math.abs(offset) * SCALE_STEP; // más lejos, más pequeña
          const zIndex = 10 - Math.abs(offset);
          const opacity = isActive ? 1 : 0.35;

          return (
            <motion.div
              key={card.id}
              className={`absolute h-[420px] w-[280px] rounded-[20px] backdrop-blur-md transition-all duration-500 ease-out will-change-transform ${
                isActive
                  ? "border border-gold-500/30 shadow-[0_24px_80px_rgba(201,169,110,0.18)]"
                  : "border border-white/10 blur-[1px]"
              }`}
              initial={{ opacity: 0, scale: 0.8, rotateY: offset * 45 }}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY: rotateY,
                scale: scale,
                zIndex: zIndex,
                opacity: opacity,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.abs(offset) * 0.08,
              }}
              style={{
                transformStyle: "preserve-3d",
                background:
                  "linear-gradient(180deg, rgba(26,26,26,0.92) 0%, rgba(10,10,10,0.96) 100%)",
              }}
            >
              {/* Marco de la tarjeta: fondo propio (opcional) + hairline dorado + brillo */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
                {card.image && (
                  <>
                    <img
                      src={card.image}
                      alt=""
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Overlay oscuro ascendente para legibilidad del texto */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/45 to-[#0a0a0a]/20" />
                  </>
                )}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,110,0.08),transparent_60%)]" />
              </div>

              {/* Contenido: bloque inferior-izquierdo con ritmo editorial (como la referencia) */}
              <div className="relative flex h-full w-full flex-col justify-end p-8 pb-9">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-500">
                  {card.label}
                </span>
                <h3 className="mt-4 font-serif text-[28px] font-light leading-[1.15] text-ivory-100">
                  {card.title}
                </h3>
                <div className="mt-5 h-px w-10 bg-gold-500/60" />
                <p className="mt-4 font-sans text-[13.5px] leading-relaxed text-ivory-400 line-clamp-2">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Controles de Navegación Flechas (UI del mockup) */}
      <button
        onClick={handlePrev}
        className="absolute left-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-95"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-sm transition hover:bg-white/15 active:scale-95"
      >
        →
      </button>
    </div>
  );
}