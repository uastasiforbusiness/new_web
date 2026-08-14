'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { HERO_SLIDES, type HeroImageSlide } from './hero-images';
import { TextReel } from './text-reel';

const FRAME_COUNT = 128;
const FRAME_DURATION = 5_246;

type ConnectionInfo = {
  effectiveType?: string;
  saveData?: boolean;
};

/**
 * Hero motion rendered as a lightweight frame sequence. It preserves the
 * cinematic rhythm of the original film while keeping an immediate poster
 * available for LCP and reduced-data contexts.
 */
export function ImageSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const current: HeroImageSlide = HERO_SLIDES[0];

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: ConnectionInfo }).connection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const slowConnection = ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');

    // The poster remains the complete experience when motion or data is limited.
    if (prefersReducedMotion || connection?.saveData || slowConnection) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    let animationFrame = 0;
    let startTime = 0;
    let viewWidth = 0;
    let viewHeight = 0;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const frames: HTMLImageElement[] = [];
    const ready = new Array<boolean>(FRAME_COUNT).fill(false);

    const drawCover = (frame: HTMLImageElement, alpha: number) => {
      if (!frame.naturalWidth || !viewWidth || !viewHeight) return;

      const scale = Math.max(viewWidth / frame.naturalWidth, viewHeight / frame.naturalHeight);
      const width = frame.naturalWidth * scale;
      const height = frame.naturalHeight * scale;
      const x = (viewWidth - width) / 2;
      const y = (viewHeight - height) / 2;

      context.globalAlpha = alpha;
      context.drawImage(frame, x, y, width, height);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      viewWidth = window.innerWidth;
      viewHeight = window.innerHeight;
      canvas.width = viewWidth * dpr;
      canvas.height = viewHeight * dpr;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    for (let index = 0; index < FRAME_COUNT; index += 1) {
      const frame = new window.Image();
      const number = String(index + 1).padStart(4, '0');
      frame.decoding = 'async';
      frame.src = `/images/hero-frames/frame_${number}.webp`;
      frame.onload = () => {
        ready[index] = true;
      };
      frames.push(frame);
    }

    const render = (now: number) => {
      if (!startTime) startTime = now;

      const elapsed = (now - startTime) % FRAME_DURATION;
      const position = (elapsed / FRAME_DURATION) * FRAME_COUNT;
      const currentIndex = Math.floor(position) % FRAME_COUNT;
      context.clearRect(0, 0, viewWidth, viewHeight);
      // One source frame per original video frame preserves the film's motion
      // and avoids the softened, ghosted look of crossfading at a low frame rate.
      if (ready[currentIndex]) drawCover(frames[currentIndex], 1);
      context.globalAlpha = 1;

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Immediate LCP and fallback; motion is upgraded by the frame canvas. */}
      <Image
        src="/images/hero-video-poster.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
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
