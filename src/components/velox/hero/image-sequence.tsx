'use client';

import { useRef, useEffect } from 'react';
import { HERO_SLIDES, type HeroImageSlide } from './hero-images';
import { TextReel } from './text-reel';

export function ImageSequence() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const current: HeroImageSlide = HERO_SLIDES[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video plays (autoplay may be blocked without user gesture on some browsers)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay prevented — the video will wait for interaction or muted autoplay policy
      });
    }

    return () => {
      video.pause();
    };
  }, []);

  return (
    <>
      {/* Video background */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controls={false}
      />

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
