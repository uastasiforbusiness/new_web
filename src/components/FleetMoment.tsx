"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const FLEET_GALLERY = [
  {
    src: "/images/ferrari_rossa_360/rossa_front.webp",
    alt: "Red Ferrari California from the front",
    layout: "col-span-2 min-h-64 md:row-span-2 md:min-h-0",
  },
  {
    src: "/images/ferrari_bianca_360/bianca_lat.webp",
    alt: "White Ferrari California in profile",
    layout: "",
  },
  {
    src: "/images/maserati_ghibli_360/mase_4.webp",
    alt: "Maserati Ghibli in the B LEADER collection",
    layout: "",
  },
  {
    src: "/images/mercedes_e220d_360/frame_009.webp",
    alt: "Mercedes E 220d Cabrio in the B LEADER collection",
    layout: "",
  },
  {
    src: "/images/ferrari_rossa_360/rossa_profilo.webp",
    alt: "Red Ferrari California in profile",
    layout: "",
  },
] as const;

/**
 * Home-page fleet moment — an image-only overview of the collection.
 * Full names, prices, and specifications remain on /fleet.
 */
export default function FleetMoment() {
  return (
    <section
      id="fleet"
      className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36"
    >
      {/* heading */}
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
        <div>
          <Reveal>
            <p className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-gold md:text-[11px]">
              <span className="h-px w-12 bg-gold/70" /> 01 — The fleet
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-serif text-5xl font-light leading-[1.02] text-ivory md:text-7xl">
              Machines with
              <br />
              <em className="gold-text pr-2">an accent.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link
            href="/fleet"
            className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-sand transition-colors hover:text-ivory"
          >
            The complete fleet
            <ArrowRight
              size={14}
              className="text-gold transition-transform duration-500 group-hover:translate-x-2"
            />
          </Link>
        </Reveal>
      </div>

      {/* Image-only collection overview — details live on the Fleet page. */}
      <Reveal y={64}>
        <div className="grid grid-cols-2 gap-px border border-line bg-line md:h-[34rem] md:grid-cols-4 md:grid-rows-2">
          {FLEET_GALLERY.map((image, index) => (
            <div
              key={image.src}
              className={`group relative min-h-40 overflow-hidden bg-coal ${image.layout ?? ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className="img-cine img-hover-zoom absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
