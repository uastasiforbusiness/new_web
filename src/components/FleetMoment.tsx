"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type FleetStoryImage = {
  src: string;
  alt: string;
};

type FleetStory = {
  label: string;
  side: "left" | "right";
  hero: FleetStoryImage;
  moments: readonly [FleetStoryImage, FleetStoryImage];
};

/**
 * This is intentionally a visual-only home-page introduction. The nine images
 * are organised into three cinematic vehicle stories; vehicle names, prices,
 * and specifications remain on /fleet.
 */
const FLEET_STORIES: readonly FleetStory[] = [
  {
    label: "White Ferrari California visual story",
    side: "left",
    hero: {
      src: "/images/ferrari_bianca_360/bianca_lat.webp",
      alt: "White Ferrari California with the roof down",
    },
    moments: [
      {
        src: "/images/ferrari_bianca_360/bianca_tetto.webp",
        alt: "White Ferrari California convertible roof in motion",
      },
      {
        src: "/images/ferrari_bianca_360/bianca.webp",
        alt: "White Ferrari California in profile",
      },
    ],
  },
  {
    label: "Red Ferrari California visual story",
    side: "right",
    hero: {
      src: "/images/rossa_card.webp",
      alt: "Red Ferrari California in profile",
    },
    moments: [
      {
        src: "/images/ferrari_rossa_360/frame_009.webp",
        alt: "Red Ferrari California with the roof down",
      },
      {
        src: "/images/ferrari_rossa_360/frame_006.webp",
        alt: "Ferrari badge detail on the red Ferrari California",
      },
    ],
  },
  {
    label: "Maserati Ghibli visual story",
    side: "left",
    hero: {
      src: "/images/maserati_ghibli_360/mase_4.webp",
      alt: "Maserati Ghibli in the B LEADER fleet",
    },
    moments: [
      {
        src: "/images/maserati_ghibli_360/frame_003.webp",
        alt: "Maserati Ghibli headlamp detail",
      },
      {
        src: "/images/maserati_ghibli_360/frame_002.webp",
        alt: "Maserati trident badge detail",
      },
    ],
  },
];

function DesktopStory({ story, index }: { story: FleetStory; index: number }) {
  const isRight = story.side === "right";
  const heroPosition = isRight ? "right-[3.5%]" : "left-[3.5%]";
  const momentsPosition = isRight ? "left-[3.5%]" : "right-[3.5%]";
  const firstMomentMotion = isRight ? "-10" : "10";
  const secondMomentMotion = isRight ? "10" : "-10";

  return (
    <article
      aria-label={story.label}
      data-fleet-desktop-story
      className="absolute inset-0 overflow-hidden"
      style={index === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.09),transparent_52%)]" />

      <figure
        data-fleet-hero
        className={`absolute top-[7%] h-[86%] w-[63%] overflow-hidden border border-line bg-ink ${heroPosition}`}
      >
        <span className="pointer-events-none absolute left-0 top-0 z-10 h-16 w-16 border-l border-t border-gold/45" />
        <span className="pointer-events-none absolute bottom-0 right-0 z-10 h-16 w-16 border-b border-r border-gold/45" />
        <img
          src={story.hero.src}
          alt={story.hero.alt}
          loading={index === 0 ? "eager" : "lazy"}
          className="h-full w-full object-contain p-4 md:p-7"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
      </figure>

      <figure
        data-fleet-moment
        data-fleet-shift={firstMomentMotion}
        className={`absolute top-[11%] h-[35%] w-[28%] overflow-hidden border border-line bg-carbon ${momentsPosition}`}
      >
        <img
          src={story.moments[0].src}
          alt={story.moments[0].alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
      </figure>

      <figure
        data-fleet-moment
        data-fleet-shift={secondMomentMotion}
        className={`absolute bottom-[11%] h-[35%] w-[28%] overflow-hidden border border-line bg-carbon ${momentsPosition}`}
      >
        <img
          src={story.moments[1].src}
          alt={story.moments[1].alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
      </figure>
    </article>
  );
}

function MobileStory({ story, index }: { story: FleetStory; index: number }) {
  return (
    <article
      aria-label={story.label}
      data-fleet-mobile-story
      className="relative overflow-hidden border border-line bg-coal p-2 sm:p-3"
    >
      <div className="grid min-h-[29rem] grid-cols-12 grid-rows-2 gap-2 sm:min-h-[34rem]">
        <figure
          data-fleet-mobile-panel
          className="relative col-span-12 overflow-hidden border border-line bg-ink"
        >
          <span className="pointer-events-none absolute left-0 top-0 z-10 h-10 w-10 border-l border-t border-gold/40" />
          <img
            src={story.hero.src}
            alt={story.hero.alt}
            loading={index === 0 ? "eager" : "lazy"}
            className="h-full w-full object-contain p-3"
          />
        </figure>
        <figure
          data-fleet-mobile-panel
          className="relative col-span-7 overflow-hidden border border-line bg-carbon"
        >
          <img
            src={story.moments[0].src}
            alt={story.moments[0].alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
        <figure
          data-fleet-mobile-panel
          className="relative col-span-5 overflow-hidden border border-line bg-carbon"
        >
          <img
            src={story.moments[1].src}
            alt={story.moments[1].alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
    </article>
  );
}

/**
 * Scroll-driven, image-only fleet editorial. Desktop pins a single visual stage
 * and recomposes every group of three images as the visitor scrolls. Mobile
 * keeps the same visual rhythm with individual scroll reveals rather than a
 * pinned interaction that could fight touch scrolling.
 */
export default function FleetMoment() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      media.add("(min-width: 1024px)", () => {
        const stories = gsap.utils.toArray<HTMLElement>("[data-fleet-desktop-story]");
        if (reducedMotion || stories.length === 0) return;

        gsap.set(stories, { autoAlpha: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * stories.length}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        stories.forEach((story, index) => {
          const hero = story.querySelector<HTMLElement>("[data-fleet-hero]");
          const moments = gsap.utils.toArray<HTMLElement>("[data-fleet-moment]", story);
          const storyStart = index * 3;

          if (!hero || moments.length !== 2) return;

          gsap.set(hero, {
            autoAlpha: 0,
            clipPath: "inset(8% 50% 8% 50%)",
            scale: 0.92,
          });
          gsap.set(moments, {
            autoAlpha: 0,
            scale: 0.94,
            y: 44,
          });
          gsap.set(moments[0], { xPercent: Number(moments[0].dataset.fleetShift) });
          gsap.set(moments[1], { xPercent: Number(moments[1].dataset.fleetShift) });

          timeline
            .set(story, { autoAlpha: 1 }, storyStart)
            .to(
              hero,
              {
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
              },
              storyStart,
            )
            .to(
              moments,
              {
                autoAlpha: 1,
                xPercent: 0,
                y: 0,
                scale: 1,
                duration: 0.72,
                stagger: 0.12,
                ease: "power3.out",
              },
              storyStart + 0.3,
            )
            .to(
              hero,
              {
                scale: 1.045,
                duration: 1.35,
                ease: "none",
              },
              storyStart + 1.1,
            )
            .to(
              moments,
              {
                yPercent: -5,
                duration: 1.15,
                stagger: 0.1,
                ease: "none",
              },
              storyStart + 1.1,
            );

          if (index < stories.length - 1) {
            timeline.to(
              story,
              {
                autoAlpha: 0,
                scale: 0.985,
                duration: 0.55,
                ease: "power2.inOut",
              },
              storyStart + 2.3,
            );
          }
        });
      });

      media.add("(max-width: 1023px)", () => {
        if (reducedMotion) return;

        const stories = gsap.utils.toArray<HTMLElement>("[data-fleet-mobile-story]");
        stories.forEach((story) => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-fleet-mobile-panel]", story);

          gsap.fromTo(
            panels,
            { autoAlpha: 0, y: 56, scale: 0.97 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              stagger: 0.11,
              ease: "power3.out",
              scrollTrigger: {
                trigger: story,
                start: "top 82%",
                once: true,
              },
            },
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="fleet"
      className="relative mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36"
    >
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

      <div
        ref={stageRef}
        className="relative hidden h-[min(74vw,48rem)] min-h-[36rem] overflow-hidden border border-line bg-coal lg:block"
      >
        {FLEET_STORIES.map((story, index) => (
          <DesktopStory key={story.label} story={story} index={index} />
        ))}
      </div>

      <div className="space-y-5 lg:hidden">
        {FLEET_STORIES.map((story, index) => (
          <MobileStory key={story.label} story={story} index={index} />
        ))}
      </div>
    </section>
  );
}
