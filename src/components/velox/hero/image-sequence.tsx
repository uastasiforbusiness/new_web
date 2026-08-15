'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { HERO_SLIDES, type HeroImageSlide } from './hero-images';
import { TextReel } from './text-reel';

type ConnectionInfo = {
  effectiveType?: string;
  saveData?: boolean;
};

/**
 * The original hero film is the primary luxury experience. The poster paints
 * immediately, then native video playback takes over on capable connections.
 */
export function ImageSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const current: HeroImageSlide = HERO_SLIDES[0];

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: ConnectionInfo }).connection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');

    // The poster remains the complete experience when motion or data is limited.
    if (prefersReducedMotion || connection?.saveData || slowConnection) return;

    // Paint the poster first, then start the film immediately after first render.
    const timer = window.setTimeout(() => setShouldLoadVideo(true), 150);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Muted autoplay can still be blocked by a browser policy; the poster stays visible.
      });
    }

    return () => video.pause();
  }, [shouldLoadVideo]);

  return (
    <>
      {/* Immediate LCP and fallback; video takes over on capable devices. */}
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
          preload="auto"
          disablePictureInPicture
          controls={false}
          aria-hidden="true"
        />
      )}

      {/* Fixed overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

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
