'use client';

/* ═══════════════════════════════════════════════════════════════════════
   VELOX — Luxury Car Rental V2 — MAJOR UPGRADE
   Stack: Next.js 16 + GSAP ScrollTrigger + Lenis + Tailwind
   
   MEJORAS V2:
   - Custom premium cursor con trail dorado
   - Film grain overlay para look cinematográfico
   - 3D Tilt cards con perspectiva y brillo dinámico
   - Magnetic buttons que atraen al cursor
   - Text reveal character-by-character
   - Parallax floating elements
   - Loading screen dramática con logo reveal
   - Horizontal scroll fleet showcase
   - Smooth page transitions
   ═══════════════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion as framerMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Menu, X, Phone, Mail, Instagram, Facebook, Twitter,
  ChevronDown, Shield, ConciergeBell, Truck, Gauge,
  Timer, Zap, ArrowRight, Play, ChevronRight,
} from 'lucide-react';

// ─── Registrar GSAP plugins ───
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */
const cars = [
  {
    name: 'Ferrari California',
    variant: 'Bianca Avus',
    image: '/images/ferrari_california_bianca.webp',
    hp: 460, acceleration: '3.9s', topSpeed: '310 km/h', price: 890,
    tagline: 'PURE ELEGANCE',
    color: '#f5f5f0',
  },
  {
    name: 'Ferrari California',
    variant: 'Rossa Corsa',
    image: '/images/ferrari_california_rossa.webp',
    hp: 460, acceleration: '3.9s', topSpeed: '310 km/h', price: 890,
    tagline: 'ICONIC PASSION',
    color: '#8b0000',
  },
  {
    name: 'Maserati Ghibli',
    variant: 'Nero Ribelle',
    image: '/images/maserati_ghibli.webp',
    hp: 350, acceleration: '5.0s', topSpeed: '263 km/h', price: 650,
    tagline: 'ITALIAN CRAFT',
    color: '#1a1a2e',
  },
  {
    name: 'Mercedes E220d',
    variant: 'Cabriolet',
    image: '/images/mercedes_e220d_cabrio.webp',
    hp: 194, acceleration: '7.8s', topSpeed: '240 km/h', price: 420,
    tagline: 'REFINED LUXURY',
    color: '#0d0d0d',
  },
];

const sequenceFrames = [
  '/images/360/frame_001.webp', '/images/360/frame_002.webp', '/images/360/frame_003.webp',
  '/images/360/frame_004.webp', '/images/360/frame_005.webp', '/images/360/frame_006.webp',
  '/images/360/frame_007.webp', '/images/360/frame_008.webp',
];

const frameLabels = ['FRONT VIEW', 'PROFILE', 'IN MOTION', 'ON THE ROAD', 'REAR VIEW', 'COCKPIT', 'DETAIL', 'INTERIOR'];

const features = [
  { icon: ConciergeBell, title: 'CONCIERGE SERVICE', description: '24/7 personal assistance for every aspect of your journey, from restaurant reservations to bespoke route planning across Europe\'s most scenic drives.', stat: '24/7' },
  { icon: Shield, title: 'PREMIUM INSURANCE', description: 'Full comprehensive coverage with zero excess. Drive with complete peace of mind knowing every mile is protected by our elite insurance partnership.', stat: 'ZERO' },
  { icon: Truck, title: 'HOTEL DELIVERY', description: 'Your dream car delivered directly to your hotel or private residence. Seamless luxury, from the moment you arrive until the final farewell.', stat: '1HR' },
];

const navLinks = [
  { label: 'FLEET', href: '#fleet' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'RESERVE', href: '#reserve' },
  { label: 'CONTACT', href: '#contact' },
];


/* ═══════════════════════════════════════════════════════════
   HOOK: Lenis Smooth Scroll + GSAP Sync
   ═══════════════════════════════════════════════════════════ */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: CUSTOM PREMIUM CURSOR
   ─── Cursor dorado con trail que sigue al mouse.
   Solo visible en desktop (pointer: fine).
   ═══════════════════════════════════════════════════════════ */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Solo mostrar en dispositivos con cursor preciso
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot sigue inmediatamente
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });

      // Ring sigue con delay suave
      gsap.to(ring, {
        x: mouseX - 20, y: mouseY - 20,
        duration: 0.35, ease: 'power2.out',
      });
    };

    // Trail con delay escalonado
    const trails = trailRefs.current.filter(Boolean);
    trails.forEach((trail, i) => {
      if (!trail) return;
      gsap.to(trail, {
        x: mouseX - 3, y: mouseY - 3,
        duration: 0.5 + i * 0.08,
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 0.016,
      });
    });

    // Efecto hover: agrandar ring sobre elementos interactivos
    const handleEnter = () => gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.3 });
    const handleLeave = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', handleMove);

    const interactives = document.querySelectorAll('a, button, .cursor-hover');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — centro del cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#c9a96e] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      {/* Ring — anillo exterior */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#c9a96e]/60 rounded-full pointer-events-none z-[9998] hidden lg:block"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: FILM GRAIN OVERLAY
   ─── Textura de grano cinematográfico sutil que da
   un look premium de película. Animación CSS pura.
   ═══════════════════════════════════════════════════════════ */
function FilmGrain() {
  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none opacity-[0.03] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: SVG FILTERS (para Displacement + Grain)
   ═══════════════════════════════════════════════════════════ */
function SvgFilters() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="heat-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="3" result="turbulence" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="heat-distortion-intense">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="4" result="turbulence" seed="3" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: LOADING SCREEN V2
   ─── Pantalla de carga dramática con reveal del logo.
   ═══════════════════════════════════════════════════════════ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setTimeout(onComplete, 300),
      });

      // 1) Logo aparece con scale dramático
      tl.fromTo(logoRef.current,
        { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        0
      );

      // 2) Barra de progreso
      tl.fromTo(barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2, ease: 'expo.inOut' },
        0.3
      );

      // 3) Contador numérico
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 2,
        ease: 'expo.inOut',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0');
        },
      }, 0.3);

      // 4) Flash final dorado
      tl.fromTo(containerRef.current,
        { backgroundColor: '#0a0a0a' },
        { backgroundColor: '#0f0d09', duration: 0.2 },
        2.2
      );

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center">
      <div ref={logoRef} className="mb-10" style={{ opacity: 0 }}>
        <img src="/images/logo.webp" alt="VELOX" className="h-10 sm:h-12 w-auto" />
      </div>
      <div className="w-52 h-[1px] bg-[#222] relative overflow-hidden">
        <div ref={barRef} className="h-full bg-gradient-to-r from-[#c9a96e] to-[#d4af37] origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
      <div className="flex items-center gap-3 mt-5">
        <span ref={counterRef} className="text-[11px] font-heading tracking-[0.3em] text-[#c9a96e]">000</span>
        <span className="text-[10px] font-heading tracking-[0.2em] text-[#444]">/ 100</span>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: MAGNETIC BUTTON
   ─── Botón que se atrae sutilmente hacia el cursor
   cuando el mouse está cerca. Efecto premium.
   ═══════════════════════════════════════════════════════════ */
function MagneticButton({
  children,
  className = '',
  href,
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}) {
  const btnRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, {
      x: x * strength, y: y * strength,
      duration: 0.4, ease: 'power2.out',
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0, y: 0,
      duration: 0.6, ease: 'elastic.out(1, 0.4)',
    });
  }, []);

  const Tag = href ? 'a' : 'button';

  return (
    // @ts-expect-error - dynamic tag
    <Tag
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`cursor-hover inline-flex items-center ${className}`}
    >
      {children}
    </Tag>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: TEXT REVEAL
   ─── Texto que se revela carácter por carácter con GSAP.
   ═══════════════════════════════════════════════════════════ */
function TextReveal({
  text,
  className = '',
  delay = 0,
  trigger,
}: {
  text: string;
  className?: string;
  delay?: number;
  trigger?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = text.split('');

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const spans = containerRef.current?.querySelectorAll('.char');
      if (!spans) return;

      if (trigger) {
        gsap.fromTo(spans,
          { opacity: 0, y: 40, rotateX: -90 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.6, ease: 'power3.out',
            stagger: 0.03, delay,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      } else {
        gsap.fromTo(spans,
          { opacity: 0, y: 40, rotateX: -90 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.6, ease: 'power3.out',
            stagger: 0.03, delay,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ opacity: 0 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: NAVIGATION V2
   ═══════════════════════════════════════════════════════════ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'nav-glass bg-[#0a0a0a]/85 border-b border-[#c9a96e]/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex-shrink-0 cursor-hover">
            <img src="/images/logo-white.webp" alt="VELOX" className="h-8 sm:h-10 w-auto transition-opacity duration-300 hover:opacity-70" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-hover relative text-[11px] font-heading font-semibold tracking-[0.25em] text-[#999] hover:text-[#c9a96e] transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a96e] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              href="#reserve"
              className="hidden sm:inline-flex px-7 py-2.5 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,169,110,0.3)]"
              strength={0.2}
            >
              BOOK NOW
            </MagneticButton>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2 cursor-hover"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <framerMotion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="md:hidden bg-[#0a0a0a]/98 nav-glass border-t border-[#c9a96e]/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5">
              {navLinks.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-heading font-semibold tracking-[0.25em] text-[#999] hover:text-[#c9a96e] transition-colors duration-300 py-2"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reserve"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-6 py-3 bg-[#c9a96e] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] mt-4"
              >
                BOOK NOW
              </a>
            </div>
          </framerMotion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


/* ═══════════════════════════════════════════════════════════
   ╔═══════════════════════════════════════════════════════╗
   ║  EFECTO 1: HERO "SCALE DOWN & REVEAL" V2             ║
   ║  ─── Añadido: parallax layers, glow border,          ║
   ║  texto con split reveal, ambient particles            ║
   ╚═══════════════════════════════════════════════════════╝
   ═══════════════════════════════════════════════════════════ */
function HeroScaleDown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  // Partículas fijas con posiciones deterministas para evitar hydration mismatch
  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: ((i * 37 + 13) % 100),
    top: ((i * 53 + 7) % 100),
    opacity: (i % 5 + 1) * 0.06 + 0.05,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Timeline principal del Hero ───
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1) Scale down con clip-path más dramático
      tl.fromTo(imageRef.current,
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1 },
        {
          clipPath: 'inset(3% 3% 3% 3% round 24px)',
          scale: 0.82,
          ease: 'none', duration: 1,
        },
        0
      );

      // 2) Glow border aparece al reducir
      tl.fromTo(glowRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none', duration: 0.6 },
        0.3
      );

      // 3) Fade out del texto hero
      tl.fromTo(textRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -80, ease: 'none', duration: 0.5 },
        0
      );

      // 4) Reveal de specs con escala dramática
      tl.fromTo(revealRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'none', duration: 0.5 },
        0.55
      );

      // ─── Partículas ambientales flotantes ───
      if (particlesRef.current) {
        const dots = particlesRef.current.querySelectorAll('.ambient-dot');
        dots.forEach((dot) => {
          gsap.to(dot, {
            y: `random(-30, 30)`,
            x: `random(-20, 20)`,
            opacity: `random(0.1, 0.4)`,
            duration: `random(3, 6)`,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: `random(0, 3)`,
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Partículas ambientales — client-only */}
      <div ref={particlesRef} className="absolute inset-0 z-[5] pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="ambient-dot absolute w-[2px] h-[2px] bg-[#c9a96e] rounded-full"
            style={{ left: `${p.left}%`, top: `${p.top}%`, opacity: p.opacity }}
          />
        ))}
      </div>

      {/* Hero Image */}
      <div ref={imageRef} className="hero-scale-container absolute inset-0">
        <img
          src="/images/hero-bg.webp"
          alt="Ferrari California in luxury showroom"
          className="w-full h-full object-cover scale-100"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Glow Border (aparece al scale down) */}
      <div
        ref={glowRef}
        className="absolute inset-[3%] rounded-3xl border border-[#c9a96e]/20 z-[3] pointer-events-none"
        style={{ opacity: 0, boxShadow: '0 0 60px rgba(201,169,110,0.08), inset 0 0 60px rgba(201,169,110,0.03)' }}
      />

      {/* Hero Text */}
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <p className="text-[10px] sm:text-xs font-heading font-semibold tracking-[0.6em] text-[#c9a96e] mb-5 sm:mb-8 uppercase">
            Experience Luxury
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-[7rem] xl:text-[9rem] font-heading font-black tracking-tight text-white leading-[0.85] mb-5 sm:mb-8">
            <span className="block">DRIVE</span>
            <span className="block bg-gradient-to-r from-[#c9a96e] via-[#e6c875] to-[#c9a96e] bg-clip-text text-transparent">YOUR DREAM</span>
          </h1>
          <p className="text-sm sm:text-base font-body font-light text-[#888] max-w-md mx-auto mb-8 sm:mb-12">
            Premium fleet. Unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              href="#fleet"
              className="px-9 py-4 bg-gradient-to-r from-[#c9a96e] to-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] hover:shadow-[0_0_35px_rgba(201,169,110,0.35)] transition-shadow duration-500"
              strength={0.15}
            >
              EXPLORE FLEET <ArrowRight size={14} className="ml-2" />
            </MagneticButton>
            <MagneticButton
              href="#experience"
              className="px-9 py-4 border border-white/25 hover:border-[#c9a96e]/50 text-white text-[11px] font-heading font-bold tracking-[0.25em] transition-all duration-500 hover:bg-white/5"
              strength={0.15}
            >
              <Play size={12} className="mr-2" /> WATCH REEL
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Reveal Content */}
      <div ref={revealRef} className="absolute bottom-10 sm:bottom-14 left-0 right-0 z-10 px-4" style={{ opacity: 0 }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <p className="text-[9px] font-heading tracking-[0.4em] text-[#c9a96e] mb-2">FEATURED VEHICLE</p>
            <h3 className="text-2xl sm:text-4xl font-heading font-black tracking-wider text-white">FERRARI CALIFORNIA</h3>
            <p className="text-sm font-body text-[#777] mt-1">Rossa Corsa — From €890/day</p>
          </div>
          <div className="flex items-center gap-8 sm:gap-10">
            {[
              { val: '460', label: 'HP' },
              { val: '3.9s', label: '0-100' },
              { val: '310', label: 'KM/H' },
            ].map((spec, i) => (
              <div key={spec.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-[1px] h-10 bg-[#333]" />}
                <div className="text-right">
                  <p className="text-2xl sm:text-3xl font-heading font-bold bg-gradient-to-b from-[#c9a96e] to-[#b8943e] bg-clip-text text-transparent">{spec.val}</p>
                  <p className="text-[9px] font-heading tracking-[0.2em] text-[#555]">{spec.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[8px] font-heading tracking-[0.4em] text-[#444]">SCROLL</span>
        <ChevronDown size={12} className="text-[#c9a96e]/50 animate-bounce-slow" />
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: MARQUEE V2 — con speed change on hover
   ═══════════════════════════════════════════════════════════ */
function MarqueeText() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const items = ['FERRARI', 'MASERATI', 'MERCEDES-BENZ', 'LUXURY RENTAL', 'VELOX', 'PREMIUM DRIVE'];

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="py-6 sm:py-8 border-y border-[#c9a96e]/10 overflow-hidden bg-[#0a0a0a]">
      <div ref={marqueeRef} className="flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-[0.08em] text-[#181818] mx-4 sm:mx-6 select-none cursor-hover hover:text-[#222] transition-colors duration-300">
            {item}
            <span className="text-[#c9a96e]/20 mx-3 sm:mx-5 text-xl">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   ╔═══════════════════════════════════════════════════════╗
   ║  EFECTO 2: SCROLL-DRIVEN IMAGE PLAYBACK V2            ║
   ║  ─── Añadido: zoom sutil por frame, better UI,       ║
   ║  animated counter, mejor gradiente overlay             ║
   ╚═══════════════════════════════════════════════════════╝
   ═══════════════════════════════════════════════════════════ */
function ScrollDrivenPlayback() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const frames = frameRefs.current.filter(Boolean);

      frames.forEach((frame, i) => {
        if (!frame) return;
        const segStart = i / frames.length;
        const segEnd = (i + 1) / frames.length;

        // Crossfade con zoom sutil
        gsap.fromTo(frame,
          { opacity: 0, scale: 1.01 },
          {
            opacity: 1, scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${segStart * 100}% top`,
              end: `${segEnd * 100}% top`,
              scrub: 0.6,
            },
          }
        );
      });

      // Progreso
      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.3 } }
      );

      // Labels
      frames.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: `${(i / frames.length) * 100 + 3}% top`,
          onEnter: () => {
            if (labelRef.current) labelRef.current.textContent = frameLabels[i];
            if (counterRef.current) counterRef.current.textContent = String(i + 1).padStart(2, '0');
          },
          onEnterBack: () => {
            if (labelRef.current) labelRef.current.textContent = frameLabels[i];
            if (counterRef.current) counterRef.current.textContent = String(i + 1).padStart(2, '0');
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-[#0a0a0a]"
      style={{ height: `${sequenceFrames.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {sequenceFrames.map((src, i) => (
          <div
            key={src}
            ref={(el) => { frameRefs.current[i] = el; }}
            className="scroll-seq-frame"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <img src={src} alt={`Ferrari frame ${i + 1}`} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]/80" />
          </div>
        ))}

        {/* UI Overlay */}
        <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
          <div className="w-full px-4 sm:px-8 lg:px-16 pb-16 sm:pb-20">
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-[1px] bg-[#c9a96e]" />
                <p className="text-[9px] font-heading tracking-[0.5em] text-[#c9a96e]">360° EXPERIENCE</p>
              </div>
              <div
                ref={labelRef}
                className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-wider text-white"
              >
                FRONT VIEW
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#222] relative overflow-hidden">
              <div ref={progressRef} className="h-full bg-gradient-to-r from-[#c9a96e] to-[#d4af37] origin-left" style={{ transform: 'scaleX(0)' }} />
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-[9px] font-heading tracking-[0.3em] text-[#555]">SCROLL TO ROTATE</span>
              <span className="text-[10px] font-heading tracking-[0.2em] text-[#555]">
                <span ref={counterRef} className="text-[#c9a96e]">01</span>
                <span className="mx-1">/</span>
                0{sequenceFrames.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   ╔═══════════════════════════════════════════════════════╗
   ║  EFECTO 3: 3D TILT + DISPLACEMENT CARDS V2            ║
   ║  ─── Añadido: perspectiva 3D, brillo dinámico,       ║
   ║  color peek, mejor layout, glow en hover              ║
   ╚═══════════════════════════════════════════════════════╝
   ═══════════════════════════════════════════════════════════ */
function DisplacementCard({ car, index }: { car: typeof cars[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lastMouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current || !shineRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Velocidad
    const vx = e.clientX - lastMouse.current.x;
    const vy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };

    // ─── 3D Tilt con perspectiva ───
    const rotateX = ((y - centerY) / centerY) * -8;  // ±8° tilt
    const rotateY = ((x - centerX) / centerX) * 8;

    // Skew basado en velocidad
    const skewX = gsap.utils.clamp(-6, 6, vx * 0.25);

    gsap.to(cardRef.current, {
      rotateX, rotateY,
      transformPerspective: 1000,
      duration: 0.4, ease: 'power2.out',
    });

    // ─── Shine que sigue el cursor ───
    gsap.to(shineRef.current, {
      background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(201,169,110,0.15) 0%, transparent 60%)`,
      duration: 0.3,
    });

    // Imagen con parallax + skew
    gsap.to(imageRef.current, {
      x: (x - centerX) / centerX * 6,
      y: (y - centerY) / centerY * 4,
      skewX,
      scale: 1.02,
      duration: 0.4, ease: 'power2.out',
    });

    // Título con parallax invertido
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: (x - centerX) / centerX * -4,
        skewX: -skewX * 0.3,
        duration: 0.4, ease: 'power2.out',
      });
    }

    // Glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 0.3,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !imageRef.current || !shineRef.current || !titleRef.current || !glowRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.8, ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(imageRef.current, {
      x: 0, y: 0, skewX: 0, scale: 1,
      duration: 0.7, ease: 'elastic.out(1, 0.5)',
    });
    gsap.to(titleRef.current, {
      x: 0, skewX: 0,
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
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-hover group relative bg-[#0d0d0d] border border-[#222] overflow-hidden transition-colors duration-500 hover:border-[#c9a96e]/25"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute -inset-[1px] bg-gradient-to-r from-[#c9a96e]/20 via-transparent to-[#c9a96e]/20 rounded-none z-0"
        style={{ opacity: 0 }}
      />

      {/* Color accent bar */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(to right, ${car.color}, #c9a96e, ${car.color})` }} />

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
        <div ref={imageRef} className="w-full h-full">
          <img src={car.image} alt={`${car.name} ${car.variant}`} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent" />

        {/* Shine overlay */}
        <div ref={shineRef} className="absolute inset-0 z-[2] pointer-events-none" />

        {/* Tagline */}
        <div className="absolute top-4 left-4 z-[3]">
          <span className="text-[8px] font-heading tracking-[0.4em] text-[#c9a96e] bg-[#0a0a0a]/70 px-3 py-1.5 backdrop-blur-sm">
            {car.tagline}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute top-4 right-4 z-[3]">
          <span className="text-sm font-heading font-bold text-white bg-[#c9a96e] px-3 py-1.5">
            €{car.price}<span className="text-[9px] font-normal opacity-70">/DAY</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 relative z-10">
        <div className="mb-4">
          <h3 ref={titleRef} className="text-lg sm:text-xl font-heading font-bold tracking-wider text-white">
            {car.name}
          </h3>
          <p className="text-xs font-heading font-light tracking-[0.25em] text-[#555] mt-1">{car.variant}</p>
        </div>

        <div className="flex items-center gap-5 mb-5">
          {[
            { icon: Zap, val: `${car.hp} HP` },
            { icon: Timer, val: `${car.acceleration} 0-100` },
            { icon: Gauge, val: car.topSpeed },
          ].map((spec) => (
            <div key={spec.val} className="flex items-center gap-1.5">
              <spec.icon size={12} className="text-[#c9a96e]/70" />
              <span className="text-[11px] font-body text-[#888]">{spec.val}</span>
            </div>
          ))}
        </div>

        <MagneticButton
          className="w-full justify-center py-3 border border-[#c9a96e]/40 text-[#c9a96e] text-[10px] font-heading font-bold tracking-[0.25em] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,169,110,0.2)]"
          strength={0.1}
        >
          RESERVE <ChevronRight size={12} className="ml-1" />
        </MagneticButton>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: FLEET SECTION V2
   ═══════════════════════════════════════════════════════════ */
function FleetSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 50%', scrub: 1 } }
      );

      // Staggered card reveal
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="fleet" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center mb-14 sm:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">OUR COLLECTION</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">THE FLEET</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cars.map((car, index) => (
            <div key={car.variant} ref={(el) => { cardsRef.current[index] = el; }} style={{ opacity: 0 }}>
              <DisplacementCard car={car} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: FEATURES V2 — con stat badges
   ═══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60, rotateX: 5 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
            delay: i * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 lg:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
            <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">WHY VELOX</p>
            <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">THE EXPERIENCE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-[#0d0d0d] border border-[#1a1a1a] p-8 sm:p-10 text-center hover:border-[#c9a96e]/20 transition-all duration-500 relative overflow-hidden"
                style={{ opacity: 0 }}
              >
                {/* Stat badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-heading tracking-[0.2em] text-[#c9a96e]/40 bg-[#c9a96e]/5 px-2 py-1">
                    {feature.stat}
                  </span>
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#c9a96e]/20 rounded-full mb-7 group-hover:bg-[#c9a96e]/5 group-hover:border-[#c9a96e]/40 transition-all duration-500">
                  <Icon size={24} className="text-[#c9a96e]/80 group-hover:text-[#c9a96e] transition-colors duration-500" />
                </div>

                <h3 className="text-sm sm:text-base font-heading font-bold tracking-[0.2em] text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm font-body font-light text-[#888] leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#c9a96e] to-[#d4af37] group-hover:w-full transition-all duration-700" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: RESERVE V2
   ═══════════════════════════════════════════════════════════ */
function ReserveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reserve" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#c9a96e]/3 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#c9a96e]/2 rounded-full blur-[120px]" />
      </div>

      <div ref={ctaRef} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center" style={{ opacity: 0 }}>
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
          <p className="text-[10px] font-heading font-semibold tracking-[0.5em] text-[#c9a96e]">YOUR JOURNEY AWAITS</p>
          <div className="w-8 h-[1px] bg-[#c9a96e]/50" />
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white mb-5 sm:mb-6">
          READY TO EXPERIENCE
          <br />
          <span className="bg-gradient-to-r from-[#c9a96e] via-[#e6c875] to-[#c9a96e] bg-clip-text text-transparent">LUXURY?</span>
        </h2>
        <p className="text-base sm:text-lg font-body font-light text-[#888] max-w-lg mx-auto mb-8 sm:mb-10">
          Book your dream car today and elevate your journey
        </p>

        <MagneticButton
          href="#contact"
          className="px-12 py-5 bg-gradient-to-r from-[#c9a96e] to-[#d4af37] text-[#0a0a0a] text-[12px] font-heading font-bold tracking-[0.25em] hover:shadow-[0_0_40px_rgba(201,169,110,0.35)] transition-shadow duration-500"
          strength={0.15}
        >
          RESERVE NOW <ArrowRight size={16} className="ml-2" />
        </MagneticButton>

        <div id="contact" className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mt-14 sm:mt-16 pt-10 border-t border-[#222]">
          <a href="tel:+393331234567" className="flex items-center gap-2 text-[#888] hover:text-[#c9a96e] transition-colors duration-300 cursor-hover">
            <Phone size={14} /> <span className="text-sm font-body">+39 333 123 4567</span>
          </a>
          <a href="mailto:reserve@velox.com" className="flex items-center gap-2 text-[#888] hover:text-[#c9a96e] transition-colors duration-300 cursor-hover">
            <Mail size={14} /> <span className="text-sm font-body">reserve@velox.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENT: FOOTER V2
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#c9a96e]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-shrink-0">
            <img src="/images/logo-white.webp" alt="VELOX" className="h-7 sm:h-8 w-auto opacity-70" />
          </div>
          <div className="flex items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="cursor-hover text-[10px] font-heading font-semibold tracking-[0.2em] text-[#555] hover:text-[#c9a96e] transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="cursor-hover w-9 h-9 flex items-center justify-center border border-[#222] rounded-full text-[#555] hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all duration-300" aria-label="Social">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-heading tracking-[0.2em] text-[#333]">© 2026 VELOX. ALL RIGHTS RESERVED.</p>
          <p className="text-[9px] font-heading tracking-[0.15em] text-[#333]">MILANO — ROMA — MONACO</p>
        </div>
      </div>
    </footer>
  );
}


/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useLenis();

  useEffect(() => {
    const criticalImages = ['/images/hero-bg.webp', '/images/logo-white.webp'];
    criticalImages.forEach((src) => { const img = new Image(); img.src = src; });
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <SvgFilters />
      <FilmGrain />
      <CustomCursor />

      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navigation />
        <HeroScaleDown />
        <MarqueeText />
        <ScrollDrivenPlayback />
        <FleetSection />
        <MarqueeText />
        <FeaturesSection />
        <ReserveSection />
        <Footer />
      </div>
    </main>
  );
}
