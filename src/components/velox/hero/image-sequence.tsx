'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { HERO_SLIDES, type HeroImageSlide } from './hero-images';
import { TextReel } from './text-reel';

export function ImageSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const current: HeroImageSlide = HERO_SLIDES[0];

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      }
    ).connection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');

    if (prefersReducedMotion || connection?.saveData || slowConnection) return;

    // Render the poster first. Deferring motion by a moment protects the LCP
    // while preserving the cinematic hero for capable connections.
    const timer = window.setTimeout(() => setShouldLoadVideo(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Muted autoplay can still be blocked by a browser policy.
      });
    }

    return () => {
      video.pause();
    };
  }, [shouldLoadVideo]);

  return (
    <>
      {/* The optimized poster is the LCP image; motion upgrades after first paint. */}
      <Image
        src="/images/hero-video-poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          poster="/images/hero-video-poster.webp"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          controls={false}
          aria-hidden="true"
        />
      )}

      {/* Fixed overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

      {/* Text overlay */}
      <TextReel
        headline={current.headline}
        subtitle={current.subtitle}
        description={current.description}
        tagline="Est. 2023 — Puglia, Italy"
        reducedMotion={false}
      />
    </>
  );
}
