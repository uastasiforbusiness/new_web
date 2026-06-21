'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Timer, Gauge, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { MagneticButton } from './magnetic-button';
import { CarGallery } from './car-gallery';
import type { FleetVehicle } from '../data';

export function DisplacementCard({ car }: { car: FleetVehicle }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastFrameRef = useRef<string | null>(null);
  const specTriggerRef = useRef<HTMLDivElement>(null);
  const hpRef = useRef<HTMLSpanElement>(null);
  const accelRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const specsAnimated = useRef(false);

  const isYacht = car.name.includes('Cranchi');

  // ─── En touch devices, mostrar valores finales desde el inicio ───
  const [isTouch] = useState(() => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));

  // Spec counter animation on scroll
  useEffect(() => {
    const accelNum = parseFloat(car.acceleration);
    const speedNum = parseInt(car.topSpeed);

    // En touch devices, establecemos los valores finales inmediatamente
    if (isTouch) {
      if (hpRef.current) hpRef.current.textContent = String(car.hp);
      if (accelRef.current) accelRef.current.textContent = car.acceleration.replace('s', '');
      if (speedRef.current) speedRef.current.textContent = String(speedNum);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: specTriggerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          if (specsAnimated.current) return;
          specsAnimated.current = true;

          const hpVal = { val: 0 };
          const accelVal = { val: 0 };
          const speedVal = { val: 0 };

          gsap.to(hpVal, {
            val: car.hp,
            duration: 1.4,
            ease: 'power3.out',
            onUpdate: () => {
              if (hpRef.current) hpRef.current.textContent = String(Math.round(hpVal.val));
            },
          });

          gsap.to(accelVal, {
            val: accelNum,
            duration: 1.4,
            ease: 'power3.out',
            delay: 0.1,
            onUpdate: () => {
              if (accelRef.current) accelRef.current.textContent = accelVal.val.toFixed(1);
            },
          });

          gsap.to(speedVal, {
            val: speedNum,
            duration: 1.4,
            ease: 'power3.out',
            delay: 0.2,
            onUpdate: () => {
              if (speedRef.current) speedRef.current.textContent = String(Math.round(speedVal.val));
            },
          });
        },
      });
    }, specTriggerRef);

    return () => ctx.revert();
  }, [car.hp, car.acceleration, car.topSpeed, isTouch]);

  // ─── En touch devices no aplicamos efecto 3D tilt ───
  const isTouchDevice = useRef(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)).current;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // No hacer nada en touch devices — el efecto 3D no funciona y consume GPU
    if (isTouchDevice) return;
    if (!cardRef.current || !imageRef.current || !shineRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    lastMouse.current = { x: e.clientX, y: e.clientY };

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(cardRef.current, {
      rotateX, rotateY,
      transformPerspective: 1200,
      duration: 0.5, ease: 'power2.out',
    });

    gsap.to(shineRef.current, {
      background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(201,169,110,0.18) 0%, ${car.color}22 40%, transparent 65%)`,
      duration: 0.3,
    });

    gsap.to(imageRef.current, {
      x: (x - centerX) / centerX * 8,
      y: (y - centerY) / centerY * 6,
      scale: 1.04,
      duration: 0.5, ease: 'power2.out',
    });

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: (x - centerX) / centerX * -5,
        duration: 0.5, ease: 'power2.out',
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.8,
        duration: 0.3,
      });
    }

    // Hover angle effect: map mouse X to frame index
    if (car.images.length > 0 && hoverImageRef.current) {
      const frameIndex = Math.floor((x / rect.width) * car.images.length);
      const clampedIndex = Math.min(frameIndex, car.images.length - 1);
      const frameSrc = car.images[clampedIndex].src;

      if (frameSrc !== lastFrameRef.current) {
        lastFrameRef.current = frameSrc;

        const imgEl = hoverImageRef.current.querySelector('img');
        if (imgEl) {
          gsap.to(hoverImageRef.current, {
            opacity: 1,
            duration: 0.25,
            ease: 'power1.out',
            onStart: () => { imgEl.src = frameSrc; },
          });
        }
      }
    }
  }, [car.images, car.color, isTouchDevice]);

  const handleMouseLeave = useCallback(() => {
    // En touch devices no aplicamos efecto 3D
    if (isTouchDevice) return;
    if (!cardRef.current || !imageRef.current || !shineRef.current || !titleRef.current || !glowRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.8, ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(imageRef.current, {
      x: 0, y: 0, scale: 1,
      duration: 0.7, ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(titleRef.current, {
      x: 0,
      duration: 0.7, ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(shineRef.current, {
      background: 'transparent',
      duration: 0.4,
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4,
    });

    lastFrameRef.current = null;
    if (hoverImageRef.current) {
      gsap.to(hoverImageRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.in',
      });
    }
  }, [isTouchDevice]);

  return (
    <>
      {galleryOpen && <CarGallery car={car} onClose={() => setGalleryOpen(false)} />}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer group relative bg-[#0d0d0d] border border-[#222] overflow-hidden transition-colors duration-500 hover:border-[#c9a96e]/25"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          ref={glowRef}
          className="absolute -inset-[1px] rounded-none z-0 pointer-events-none"
          style={{
            opacity: 0,
            background: `linear-gradient(135deg, ${car.color}22, #c9a96e22, ${car.color}22)`,
          }}
        />

        <div className="h-[2px] w-full" style={{ background: `linear-gradient(to right, ${car.color}, #c9a96e, ${car.color})` }} />

        {/* Image — click to open gallery */}
        {car.image && (
        <div
          className="relative aspect-[16/9] overflow-hidden bg-[#0a0a0a] cursor-pointer group/image"
          onClick={() => setGalleryOpen(true)}
        >
          <div ref={imageRef} className="relative w-full h-full">
            <Image 
              src={car.image} 
              alt={`${car.name} ${car.variant}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`${car.name.includes('Ferrari') ? 'object-contain p-4' : 'object-cover'}`}
            />
          </div>
          {/* Hover angle layer */}
          <div ref={hoverImageRef} className="absolute inset-0 z-[1]" style={{ opacity: 0 }}>
            <Image src={car.image} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />
          <div ref={shineRef} className="absolute inset-0 z-[2] pointer-events-none" />

          {/* Hover overlay — activates on whole image */}
          <div className="absolute inset-0 z-[3] bg-black/0 group-hover/image:bg-black/35 transition-all duration-500 flex items-center justify-center">
            <span className="text-[10px] font-heading tracking-[0.3em] text-white/0 group-hover/image:text-white/95 transition-all duration-500 border border-white/0 group-hover/image:border-white/30 px-4 py-2">
              VIEW GALLERY
            </span>
          </div>

          <div className="absolute top-4 left-4 z-[3]">
            <span
              className="text-[8px] font-heading tracking-[0.4em] px-3 py-1.5 backdrop-blur-sm"
              style={{ color: '#c9a96e', backgroundColor: `${car.color}33` }}
            >
              {car.tagline}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-[3]">
            {/* Price removed as per luxury brand strategy */}
          </div>
        </div>
        )}

        <div className="p-5 sm:p-6 relative z-10">
          <div className="mb-4">
            <h3 ref={titleRef} className="text-lg sm:text-xl font-elegant font-semibold tracking-wide text-white italic">
              {car.name}
            </h3>
            <p className="text-xs font-elegant tracking-[0.15em] text-[#666] mt-1">{car.variant}</p>
          </div>

          {/* Specs with animated counters */}
          <div ref={specTriggerRef} className="flex items-center gap-5 mb-5">
            <div className="flex items-center gap-1.5">
              <Zap size={12} style={{ color: `${car.color}bb` }} />
              <span className="text-[11px] font-body text-[#888]">
                <span ref={hpRef}>0</span> {isYacht ? 'HP total' : 'HP'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer size={12} style={{ color: `${car.color}bb` }} />
              <span className="text-[11px] font-body text-[#888]">
                {isYacht ? (
                  <><span ref={accelRef}>0</span> kn</>
                ) : (
                  <><span ref={accelRef}>0</span>s 0-100</>
                )}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge size={12} style={{ color: `${car.color}bb` }} />
              <span className="text-[11px] font-body text-[#888]">
                <span ref={speedRef}>0</span> {isYacht ? 'knots' : 'km/h'}
              </span>
            </div>
          </div>

          <MagneticButton
            className="w-full justify-center py-3 border text-[10px] font-heading font-bold tracking-[0.25em] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,110,0.2)]"
            style={{
              borderColor: `${car.color}66`,
              color: '#c9a96e',
            }}
            strength={0.1}
          >
            RESERVE <ChevronRight size={12} className="ml-1" />
          </MagneticButton>
        </div>
      </div>
    </>
  );
}
