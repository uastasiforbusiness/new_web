'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Car } from './data';

export function CarGallery({ car, onClose }: { car: Car; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [lensVisible, setLensVisible] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);

  const currentImage = car.images[currentIndex];

  const goTo = useCallback((index: number) => {
    if (transitioning.current || index === currentIndex) return;
    transitioning.current = true;

    const direction = index > currentIndex ? 1 : -1;
    const slideEl = slideRef.current;

    if (slideEl) {
      // Slide current image out
      gsap.to(slideEl, {
        x: -direction * 60,
        opacity: 0,
        scale: 0.97,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentIndex(index);
          // Immediately animate new image in
          gsap.set(slideEl, { x: direction * 60, opacity: 0, scale: 0.97 });
          gsap.to(slideEl, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
            onComplete: () => {
              transitioning.current = false;
            },
          });
        },
      });
    } else {
      setCurrentIndex(index);
      transitioning.current = false;
    }
  }, [currentIndex]);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % car.images.length);
  }, [currentIndex, car.images.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + car.images.length) % car.images.length);
  }, [currentIndex, car.images.length, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaX > 20) goNext();
      else if (e.deltaX < -20) goPrev();
    };
    const el = imageContainerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      if (el) el.removeEventListener('wheel', handleWheel);
    };
  }, [goNext, goPrev]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  // Lens zoom — track relative to the slide image element
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = imageWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });
  };

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Reset slide position on mount
  useEffect(() => {
    if (slideRef.current) {
      gsap.set(slideRef.current, { x: 0, opacity: 1, scale: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a]/98 flex flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-heading tracking-[0.2em] text-[#c9a96e]">
            {car.name}
          </span>
          <span className="text-[10px] font-heading text-[#555]">
            {car.variant}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white transition-colors duration-200 cursor-hover p-2"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main image */}
      <div
        ref={imageContainerRef}
        className="relative flex-1 w-full flex items-center justify-center overflow-hidden px-4"
        onMouseEnter={() => setLensVisible(true)}
        onMouseLeave={() => setLensVisible(false)}
      >
        <div
          ref={imageWrapRef}
          className={`relative w-full h-full flex items-center justify-center ${lensVisible ? 'cursor-none' : ''}`}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={slideRef}
            className="relative"
          >
            <img
              src={currentImage.src}
              alt={`${car.name} ${currentImage.label}`}
              className="max-h-[70vh] max-w-full object-contain select-none"
              draggable={false}
            />

            {/* Lens zoom overlay — follows cursor */}
            {lensVisible && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute border-2 border-[#c9a96e]/70 rounded-full pointer-events-none transition-[left,top] duration-75"
                  style={{
                    width: '130px',
                    height: '130px',
                    left: `calc(${lensPos.x}% - 65px)`,
                    top: `calc(${lensPos.y}% - 65px)`,
                    backgroundImage: `url(${currentImage.src})`,
                    backgroundSize: '300%',
                    backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                    boxShadow: '0 0 0 1px rgba(201,169,110,0.15), 0 8px 32px rgba(0,0,0,0.6), inset 0 0 12px rgba(201,169,110,0.15)',
                    backdropFilter: 'blur(1px)',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Nav arrows */}
        {car.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#111]/80 border border-[#333] hover:border-[#c9a96e]/50 text-white/60 hover:text-[#c9a96e] transition-all duration-300 cursor-hover z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#111]/80 border border-[#333] hover:border-[#c9a96e]/50 text-white/60 hover:text-[#c9a96e] transition-all duration-300 cursor-hover z-10"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Bottom: Thumbnails + controls */}
      <div className="w-full px-4 sm:px-8 pb-6 pt-4">
        {/* Label + counter */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] font-heading tracking-[0.3em] text-[#c9a96e]">
            {currentImage.label}
          </p>
          <span className="text-[10px] font-heading tracking-[0.15em] text-[#555]">
            <span className="text-[#c9a96e]">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-1">/</span>
            {String(car.images.length).padStart(2, '0')}
          </span>
        </div>

        {/* Progress dots */}
        {car.images.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {car.images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full cursor-hover ${
                  i === currentIndex
                    ? 'w-5 h-[3px] bg-[#c9a96e]'
                    : 'w-[3px] h-[3px] bg-[#444] hover:bg-[#666]'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Thumbnails strip */}
        {car.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#c9a96e #0a0a0a' }}>
            {car.images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                onMouseEnter={() => goTo(i)}
                className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 border-2 transition-all duration-300 overflow-hidden cursor-hover ${
                  i === currentIndex
                    ? 'border-[#c9a96e] opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
