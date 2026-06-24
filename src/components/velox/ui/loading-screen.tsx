'use client';

import { useEffect, useRef } from 'react';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const attemptPlay = () => {
      if (video.paused && video.readyState >= 2) {
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', attemptPlay, { once: true });
    }

    const handleInteraction = () => {
      attemptPlay();
    };

    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <video
        ref={videoRef}
        src="/videos/Red_Ferrari_California_rotating_202606212205.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
      />

      <div
        className="absolute inset-0 hero-overlay"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.35) 0%, rgba(10, 10, 10, 0.78) 100%)',
        }}
      />

      <div className="relative z-10 text-center px-6">
        <h1 className="shimmer-text font-elegant text-[64px] md:text-[120px] font-light leading-none">
          B LEADER
        </h1>
        <p className="reveal-sub font-sans text-[10px] md:text-[12px] tracking-[0.45em] md:tracking-[0.6em] uppercase mt-4">
          The Apex of Movement
        </p>
      </div>

      <style jsx>{`
        .font-elegant {
          font-family: 'Cormorant Garamond', serif;
        }
        .font-sans {
          font-family: 'Outfit', sans-serif;
        }
        .shimmer-text {
          background: linear-gradient(110deg, #c9a96e 0%, #f5e6c8 50%, #c9a96e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation:
            shimmer 6s ease-in-out infinite,
            zoomIn 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(0.02);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .reveal-sub {
          opacity: 0;
          animation: fadeUp 1s ease 1.6s forwards;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 0.6;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
