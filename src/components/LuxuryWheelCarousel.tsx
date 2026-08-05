'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';

interface CarouselItem {
  id: string;
  step: string;
  title: string;
  description: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: '1',
    step: '01',
    title: 'Select the fleet',
    description:
      'Choose from our exclusive collection of Ferrari, Maserati, and luxury supercars.',
  },
  {
    id: '2',
    step: '02',
    title: 'Customize experience',
    description:
      'Coordinate private flybridge yacht charters and professional chauffeured services across Salento.',
  },
  {
    id: '3',
    step: '03',
    title: 'Impeccable motion',
    description:
      'Your dedicated personal concierge arranges every detail, 24/7, to ensure true excellence.',
  },
  {
    id: '4',
    step: '04',
    title: 'Set sail',
    description:
      'Step aboard the Cranchi Atlantique 50 — flybridge cruises, Ionian swims and dinners at anchor.',
  },
];

/** Cylinder geometry: spacing between cards and wheel radius in CSS px. */
const ANGLE_STEP = 36;
const RADIUS = 300;
const DRAG_SENSITIVITY = 0.15;
const SNAP_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function LuxuryWheelCarousel() {
  const [activeIndex, setActiveIndex] = useState<number>(1); // start centered on card 2
  const [rotation, setRotation] = useState<number>(-ANGLE_STEP);
  const [dragging, setDragging] = useState<boolean>(false);

  const startX = useRef<number>(0);
  const currentRotation = useRef<number>(-ANGLE_STEP);
  const reducedMotion = useRef<boolean>(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
  }, []);

  const snapTo = useCallback(
    (index: number) => {
      const target = -index * ANGLE_STEP;
      currentRotation.current = target;
      setRotation(target);
      setActiveIndex(index);
    },
    [],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const next = currentRotation.current + (e.clientX - startX.current) * DRAG_SENSITIVITY;
    currentRotation.current = next;
    startX.current = e.clientX;
    setRotation(next);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    // Magnetic snap: nearest card to the front axis.
    const closest = Math.round(-currentRotation.current / ANGLE_STEP);
    const clamped = Math.max(0, Math.min(CAROUSEL_ITEMS.length - 1, closest));
    snapTo(clamped);
  };

  const handleCardClick = (index: number) => {
    if (dragging) return;
    snapTo(index);
  };

  return (
    <section className="w-full overflow-hidden border-t border-line bg-coal-950 py-28 md:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-center px-5 select-none md:px-10">
        {/* 3D stage */}
        <div
          className="relative flex h-[600px] w-full max-w-[1300px] touch-pan-y cursor-grab items-center justify-center active:cursor-grabbing"
          style={{ perspective: '1400px' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Cylinder */}
          <div
            className={clsx(
              'relative h-[520px] w-[260px] will-change-transform',
              !dragging &&
                !reducedMotion.current &&
                'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            )}
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {CAROUSEL_ITEMS.map((item, index) => {
              const cardAngle = index * ANGLE_STEP;
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${item.step} — ${item.title}`}
                  onClick={() => handleCardClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(index);
                    }
                  }}
                  className={clsx(
                    'absolute inset-0 h-full w-full rounded-3xl p-[4px] backface-hidden transition-all duration-500',
                    isActive
                      ? 'cursor-default brightness-100 blur-0 shadow-[0_15px_50px_rgba(212,175,55,0.25)]'
                      : 'cursor-pointer brightness-[0.35] blur-[1.5px]',
                  )}
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-400), var(--color-gold-600), var(--color-ivory-100), var(--color-gold-500))',
                    transform: `rotateY(${cardAngle}deg) translateZ(${RADIUS}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-[21px] bg-coal-900 p-10 text-center md:p-12">
                    <span className="mb-6 block font-serif text-sm tracking-[4px] text-gold-500">
                      {item.step}
                    </span>
                    <h3 className="mb-4 font-serif text-lg font-medium uppercase tracking-[2px] text-white">
                      {item.title}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-ivory-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex gap-2" role="tablist" aria-label="How it works steps">
          {CAROUSEL_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleCardClick(index)}
              aria-label={`Go to step ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex}
              className={clsx(
                'h-2 rounded-full transition-all duration-300',
                index === activeIndex ? 'w-[18px] bg-gold-500' : 'w-2 bg-white/30',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
