'use client';

/* ═══════════════════════════════════════════════════════════════════════
   VELOX — Luxury Car Rental Premium Website
   Stack: Next.js 16 + GSAP ScrollTrigger + Lenis Smooth Scroll + Tailwind
   
   3 EFECTOS PREMIUM:
   1. Hero "Scale Down & Reveal" — Imagen full-viewport que reduce con scroll
   2. Scroll-Driven Image Playback — Secuencia de imágenes controlada por scroll
   3. Text & Asset Displacement — Distorsión por velocidad del mouse en hover
   ═══════════════════════════════════════════════════════════════════════ */

import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion as framerMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Menu, X, Phone, Mail, Instagram, Facebook, Twitter,
  ChevronDown, Shield, ConciergeBell, Truck, Gauge,
  Timer, Zap, ArrowRight, Play,
} from 'lucide-react';

// ─── Registrar GSAP plugins (solo una vez) ───
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════
   DATOS DE LA FLOTA
   ═══════════════════════════════════════════════════════════ */
const cars = [
  {
    name: 'Ferrari California',
    variant: 'Bianca Avus',
    image: '/images/ferrari_california_bianca.png',
    hp: 460,
    acceleration: '3.9s',
    topSpeed: '310 km/h',
    price: 890,
    tagline: 'PURE ELEGANCE',
  },
  {
    name: 'Ferrari California',
    variant: 'Rossa Corsa',
    image: '/images/ferrari_california_rossa.png',
    hp: 460,
    acceleration: '3.9s',
    topSpeed: '310 km/h',
    price: 890,
    tagline: 'ICONIC PASSION',
  },
  {
    name: 'Maserati Ghibli',
    variant: 'Nero Ribelle',
    image: '/images/maserati_ghibli.png',
    hp: 350,
    acceleration: '5.0s',
    topSpeed: '263 km/h',
    price: 650,
    tagline: 'ITALIAN CRAFT',
  },
  {
    name: 'Mercedes E220d',
    variant: 'Cabriolet',
    image: '/images/mercedes_e220d_cabrio.png',
    hp: 194,
    acceleration: '7.8s',
    topSpeed: '240 km/h',
    price: 420,
    tagline: 'REFINED LUXURY',
  },
];

/* Imágenes para la secuencia scroll-driven (Efecto 2) */
const sequenceFrames = [
  '/images/seq-front.png',
  '/images/hero-bg.png',
  '/images/seq-side.png',
  '/images/seq-driving.png',
  '/images/seq-rear.png',
  '/images/seq-interior.png',
];

const features = [
  {
    icon: ConciergeBell,
    title: 'CONCIERGE SERVICE',
    description: '24/7 personal assistance for every aspect of your journey, from restaurant reservations to bespoke route planning across Europe\'s most scenic drives.',
  },
  {
    icon: Shield,
    title: 'PREMIUM INSURANCE',
    description: 'Full comprehensive coverage with zero excess. Drive with complete peace of mind knowing every mile is protected by our elite insurance partnership.',
  },
  {
    icon: Truck,
    title: 'HOTEL DELIVERY',
    description: 'Your dream car delivered directly to your hotel or private residence. Seamless luxury, from the moment you arrive until the final farewell.',
  },
];

const navLinks = [
  { label: 'FLEET', href: '#fleet' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'RESERVE', href: '#reserve' },
  { label: 'CONTACT', href: '#contact' },
];


/* ═══════════════════════════════════════════════════════════
   HOOK: Smooth Scroll con Lenis + GSAP ScrollTrigger sync
   ─── Inicializa Lenis globalmente y lo sincroniza con
   GSAP ScrollTrigger para que ambos trabajen en armonía.
   Limpieza completa en el return del useEffect.
   ═══════════════════════════════════════════════════════════ */
function useLenis() {
  useEffect(() => {
    // Crear instancia de Lenis con configuración premium
    const lenis = new Lenis({
      duration: 1.2,           // Duración de la animación de scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sincronizar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Conectar Lenis al ticker de GSAP para renderizado optimizado
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Exponer lenis globalmente para debugging
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: LOADING SCREEN
   ─── Pantalla de carga premium con barra dorada animada.
   Se auto-oculta tras la carga de imágenes críticas.
   ═══════════════════════════════════════════════════════════ */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular progreso de carga con gsap
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 400);
      },
    });

    tl.to({ val: 0 }, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: function () {
        setProgress(Math.round(this.targets()[0].val));
      },
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center">
      <img
        src="/images/logo-white.png"
        alt="VELOX"
        className="h-10 sm:h-12 w-auto mb-8 opacity-90"
      />
      <div className="w-48 h-[1px] bg-[#333] relative overflow-hidden">
        <div
          className="h-full bg-[#c9a96e] loader-bar-anim"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] font-heading tracking-[0.4em] text-[#666] mt-4">
        {progress}%
      </p>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: SVG FILTERS (para Efecto 3 — Displacement)
   ─── Filtros SVG de distorsión que simulan efecto de calor
   y velocidad. Se aplican via CSS filter: url(#id).
   ═══════════════════════════════════════════════════════════ */
function SvgFilters() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        {/* Filtro suave — estado normal de las cards */}
        <filter id="heat-distortion">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="3"
            result="turbulence"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* Filtro intenso — estado hover con distorsión visible */}
        <filter id="heat-distortion-intense">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.015"
            numOctaves="3"
            result="turbulence"
            seed="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: NAVIGATION
   ─── Barra de navegación fija con efecto glassmorphism.
   Se vuelve sólida al hacer scroll. Incluye menú móvil.
   ═══════════════════════════════════════════════════════════ */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'nav-glass bg-[#0a0a0a]/90 border-b border-[#333]/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex-shrink-0">
            <img
              src="/images/logo-white.png"
              alt="VELOX"
              className="h-8 sm:h-10 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-heading font-semibold tracking-[0.25em] text-[#999] hover:text-[#c9a96e] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#reserve"
              className="hidden sm:inline-flex items-center px-6 py-2.5 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] transition-all duration-300"
            >
              BOOK NOW
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <framerMotion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0a0a0a]/98 nav-glass border-t border-[#333]/50 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-heading font-semibold tracking-[0.25em] text-[#999] hover:text-[#c9a96e] transition-colors duration-300 py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#reserve"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-6 py-3 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.2em] transition-all duration-300 mt-4"
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
   ║  EFECTO 1: HERO "SCALE DOWN & REVEAL"               ║
   ║  ─────────────────────────────────────────────────    ║
   ║  La imagen del carro ocupa 100% del viewport.        ║
   ║  Al hacer scroll, GSAP ScrollTrigger reduce la       ║
   ║  imagen (scale down) con clip-path inset, revelando  ║
   ║  la interfaz de reserva debajo con tipografía        ║
   ║  minimalista y elegante.                             ║
   ╚═══════════════════════════════════════════════════════╝
   ═══════════════════════════════════════════════════════════ */
function HeroScaleDown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Timeline principal del Hero ───
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',        // La animación dura exactamente 1 viewport de scroll
          scrub: 1,             // Scrub suave (1 segundo de delay para suavidad)
          pin: true,            // Fija la sección mientras se anima
          anticipatePin: 1,     // Pre-calcular el pin para evitar saltos
        },
      });

      // 1) Scale down de la imagen hero — de full a ~60% con bordes redondeados
      tl.fromTo(
        imageRef.current,
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1 },
        {
          clipPath: 'inset(4% 4% 4% 4% round 16px)',
          scale: 0.88,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 2) Fade out del texto hero principal
      tl.fromTo(
        textRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -60, ease: 'none', duration: 0.6 },
        0
      );

      // 3) Reveal del contenido debajo — información de reserva
      tl.fromTo(
        revealRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: 'none', duration: 0.5 },
        0.5
      );
    }, containerRef);

    // Limpieza: matar todas las animaciones y ScrollTriggers del contexto
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* ─── Imagen Hero Full Viewport ─── */}
      <div ref={imageRef} className="hero-scale-container absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="Ferrari California in luxury showroom"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* ─── Texto Hero Principal (desaparece al scroll) ─── */}
      <div ref={textRef} className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <p className="text-[11px] sm:text-xs font-heading font-semibold tracking-[0.5em] text-[#c9a96e] mb-4 sm:mb-6">
            EXPERIENCE LUXURY
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[9rem] font-heading font-black tracking-wide text-white leading-[0.9] mb-4 sm:mb-6">
            DRIVE
            <br />
            <span className="text-[#c9a96e]">YOUR DREAM</span>
          </h1>
          <p className="text-sm sm:text-base font-body font-light text-[#999] max-w-md mx-auto mb-8 sm:mb-10">
            Premium fleet. Unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#fleet"
              className="px-8 py-3.5 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] transition-all duration-300 flex items-center gap-2"
            >
              EXPLORE FLEET
              <ArrowRight size={14} />
            </a>
            <a
              href="#experience"
              className="px-8 py-3.5 border border-white/30 hover:border-white text-white text-[11px] font-heading font-bold tracking-[0.25em] transition-all duration-300 flex items-center gap-2"
            >
              <Play size={12} />
              WATCH REEL
            </a>
          </div>
        </div>
      </div>

      {/* ─── Contenido Reveal (aparece al hacer scroll) ─── */}
      <div ref={revealRef} className="absolute bottom-12 sm:bottom-16 left-0 right-0 z-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          {/* Info del vehículo destacado */}
          <div>
            <p className="text-[10px] font-heading tracking-[0.3em] text-[#c9a96e] mb-1">
              FEATURED VEHICLE
            </p>
            <h3 className="text-2xl sm:text-3xl font-heading font-black tracking-wider text-white">
              FERRARI CALIFORNIA
            </h3>
            <p className="text-sm font-body text-[#999] mt-1">
              Rosso Corsa — From €890/day
            </p>
          </div>
          {/* Specs mini */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-[#c9a96e]">460</p>
              <p className="text-[10px] font-heading tracking-[0.2em] text-[#666]">HP</p>
            </div>
            <div className="w-[1px] h-10 bg-[#333]" />
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-[#c9a96e]">3.9s</p>
              <p className="text-[10px] font-heading tracking-[0.2em] text-[#666]">0-100</p>
            </div>
            <div className="w-[1px] h-10 bg-[#333]" />
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-[#c9a96e]">310</p>
              <p className="text-[10px] font-heading tracking-[0.2em] text-[#666]">KM/H</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] font-heading tracking-[0.3em] text-[#555]">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown size={14} className="text-[#555] animate-bounce-slow" />
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   ╔═══════════════════════════════════════════════════════╗
   ║  EFECTO 2: SCROLL-DRIVEN IMAGE PLAYBACK              ║
   ║  ─────────────────────────────────────────────────    ║
   ║  Una secuencia de imágenes del vehículo que responden ║
   ║  directamente al scroll del usuario. Al bajar, el     ║
   ║  carro avanza/rotación; al subir, retrocede. Se usa   ║
   ║  GSAP ScrollTrigger con scrub para controlar la       ║
   ║  opacidad cruzada (crossfade) entre frames.           ║
   ╚═══════════════════════════════════════════════════════╝
   ═══════════════════════════════════════════════════════════ */
function ScrollDrivenPlayback() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  // Labels para cada frame de la secuencia
  const frameLabels = [
    'FRONT VIEW',
    'PROFILE',
    'IN MOTION',
    'ON THE ROAD',
    'REAR VIEW',
    'COCKPIT',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const frames = frameRefs.current.filter(Boolean);

      // ─── Animación scroll-driven para cada frame ───
      // Cada frame aparece y desaparece según la posición del scroll
      frames.forEach((frame, i) => {
        if (!frame) return;

        // Cada frame ocupa una fracción del scroll total
        const segmentStart = i / frames.length;
        const segmentEnd = (i + 1) / frames.length;

        gsap.fromTo(
          frame,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${segmentStart * 100}% top`,
              end: `${segmentEnd * 100}% top`,
              scrub: 0.8,
              // Pin la sección durante toda la animación
            },
          }
        );
      });

      // ─── Barra de progreso ───
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        }
      );

      // ─── Labels que cambian con scroll ───
      frames.forEach((_, i) => {
        if (!labelRef.current) return;
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${(i / frames.length) * 100 + 5}% top`,
              end: `${((i + 1) / frames.length) * 100}% top`,
              toggleActions: 'play reverse play reverse',
              onEnter: () => {
                if (labelRef.current) {
                  labelRef.current.textContent = frameLabels[i];
                }
              },
              onEnterBack: () => {
                if (labelRef.current) {
                  labelRef.current.textContent = frameLabels[i];
                }
              },
            },
          }
        );
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
      {/* ─── Contenedor sticky para las imágenes ─── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Capa de imágenes — cada frame se superpone */}
        {sequenceFrames.map((src, i) => (
          <div
            key={src}
            ref={(el) => { frameRefs.current[i] = el; }}
            className="scroll-seq-frame"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <img
              src={src}
              alt={`Ferrari California frame ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/30 via-transparent to-[#0a0a0a]/70" />
          </div>
        ))}

        {/* ─── UI Overlay ─── */}
        <div className="absolute inset-0 flex items-end z-10 pointer-events-none">
          <div className="w-full px-4 sm:px-8 lg:px-16 pb-20 sm:pb-24">
            {/* Frame label */}
            <div className="mb-4">
              <p className="text-[10px] font-heading tracking-[0.4em] text-[#c9a96e] mb-1">
                360° EXPERIENCE
              </p>
              <div
                ref={labelRef}
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-wider text-white"
              >
                FRONT VIEW
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="w-full h-[1px] bg-[#333] relative overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-[#c9a96e] origin-left"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>

            {/* Frame counter */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-[10px] font-heading tracking-[0.2em] text-[#666]">
                SCROLL TO ROTATE
              </span>
              <span className="text-[10px] font-heading tracking-[0.2em] text-[#666]">
                <span className="text-[#c9a96e]">01</span> / 0{sequenceFrames.length}
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
   ║  EFECTO 3: TEXT & ASSET DISPLACEMENT                  ║
   ║  ─────────────────────────────────────────────────    ║
   ║  Tarjetas de carros con distorsión visual fluida al   ║
   ║  hacer hover. Se aplica skew dinámico, traslación     ║
   ║  sutil y distorsión líquida (SVG feTurbulence)        ║
   ║  simulando reflejo de calor, viento o velocidad.      ║
   ║  La distorsión se basa en la velocidad del mouse.     ║
   ╚═══════════════════════════════════════════════════════╝
   ═══════════════════════════════════════════════════════════ */
function DisplacementCard({
  car,
  index,
}: {
  car: typeof cars[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const velocityX = useRef(0);
  const velocityY = useRef(0);

  // ─── Calcular velocidad del mouse y aplicar skew/distorsión ───
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;         // Posición X relativa a la card
    const y = e.clientY - rect.top;           // Posición Y relativa a la card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calcular velocidad del mouse (qué tan rápido se mueve)
    velocityX.current = e.clientX - lastMouseX.current;
    velocityY.current = e.clientY - lastMouseY.current;
    lastMouseX.current = e.clientX;
    lastMouseY.current = e.clientY;

    // ─── Skew dinámico basado en velocidad ───
    // Limitar el skew máximo a ±8 grados para elegancia
    const skewX = gsap.utils.clamp(-8, 8, velocityX.current * 0.3);
    const skewY = gsap.utils.clamp(-4, 4, velocityY.current * 0.2);

    // ─── Traslación parallax sutil ───
    const moveX = (x - centerX) / centerX * 8;   // ±8px de traslación
    const moveY = (y - centerY) / centerY * 5;    // ±5px de traslación

    // Aplicar transform a la imagen con GSAP (rendimiento GPU)
    gsap.to(imageRef.current, {
      skewX: skewX,
      skewY: skewY,
      x: moveX,
      y: moveY,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });

    // ─── Efecto de título con desplazamiento opuesto ───
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: -moveX * 0.5,
        y: -moveY * 0.3,
        skewX: -skewX * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, []);

  // ─── Reset al salir del hover ───
  const handleMouseLeave = useCallback(() => {
    if (!imageRef.current || !titleRef.current) return;

    gsap.to(imageRef.current, {
      skewX: 0,
      skewY: 0,
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });

    gsap.to(titleRef.current, {
      x: 0,
      y: 0,
      skewX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="displacement-card group relative bg-[#111]/60 border border-[#333]/40 overflow-hidden cursor-pointer hover:border-[#c9a96e]/30 transition-colors duration-500"
    >
      {/* Car Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
        <div ref={imageRef} className="w-full h-full">
          <img
            src={car.image}
            alt={`${car.name} ${car.variant}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />

        {/* Tagline overlay */}
        <div className="absolute top-4 left-4">
          <span className="text-[9px] font-heading tracking-[0.3em] text-[#c9a96e] bg-[#0a0a0a]/80 px-3 py-1.5">
            {car.tagline}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="mb-4">
          <h3
            ref={titleRef}
            className="text-lg sm:text-xl font-heading font-bold tracking-wider text-white"
          >
            {car.name}
          </h3>
          <p className="text-sm font-heading font-light tracking-widest text-[#666] mt-0.5">
            {car.variant}
          </p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 sm:gap-6 mb-5">
          <div className="flex items-center gap-1.5">
            <Zap size={13} className="text-[#c9a96e]" />
            <span className="text-xs font-body text-[#999]">{car.hp} HP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Timer size={13} className="text-[#c9a96e]" />
            <span className="text-xs font-body text-[#999]">{car.acceleration} 0-100</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge size={13} className="text-[#c9a96e]" />
            <span className="text-xs font-body text-[#999]">{car.topSpeed}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-heading tracking-[0.2em] text-[#666]">FROM</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-heading font-bold text-[#c9a96e]">
                €{car.price}
              </span>
              <span className="text-xs font-body text-[#666]">/DAY</span>
            </div>
          </div>
          <button className="reserve-btn px-5 py-2.5 border border-[#c9a96e]/50 text-[#c9a96e] text-[10px] font-heading font-bold tracking-[0.25em] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300">
            RESERVE
          </button>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: FLEET SECTION
   ─── Sección de la flota con las 4 cards que usan el
   Efecto 3 (Displacement). Título con animación GSAP.
   ═══════════════════════════════════════════════════════════ */
function FleetSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Animación del título de la sección ───
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="fleet" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 sm:mb-16 lg:mb-20" style={{ opacity: 0 }}>
          <p className="text-[11px] font-heading font-semibold tracking-[0.4em] text-[#c9a96e] mb-3">
            OUR COLLECTION
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-wide text-white">
            THE FLEET
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a96e] mx-auto mt-6" />
        </div>

        {/* Car Grid — Efecto 3: Displacement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cars.map((car, index) => (
            <DisplacementCard key={car.variant} car={car} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: MARQUEE TEXT
   ─── Texto infinito que se desplaza horizontalmente,
   dando sensación de movimiento y velocidad.
   ═══════════════════════════════════════════════════════════ */
function MarqueeText() {
  const items = ['FERRARI', 'MASERATI', 'MERCEDES-BENZ', 'LUXURY RENTAL', 'VELOX', 'PREMIUM EXPERIENCE'];

  return (
    <div className="py-8 sm:py-12 border-y border-[#333]/30 overflow-hidden bg-[#0a0a0a]">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-[0.1em] text-[#1a1a1a] mx-6 sm:mx-8 select-none"
          >
            {item}
            <span className="text-[#c9a96e]/30 mx-4 sm:mx-6">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: FEATURES SECTION
   ─── 3 tarjetas de características con animación GSAP.
   ═══════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Staggered reveal de las feature cards ───
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 lg:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-[11px] font-heading font-semibold tracking-[0.4em] text-[#c9a96e] mb-3">
            WHY VELOX
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-wide text-white">
            THE EXPERIENCE
          </h2>
          <div className="w-16 h-[1px] bg-[#c9a96e] mx-auto mt-6" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group bg-[#111]/60 border border-[#333]/40 p-8 sm:p-10 text-center hover:border-[#c9a96e]/30 transition-all duration-500"
                style={{ opacity: 0 }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 border border-[#c9a96e]/30 rounded-full mb-6 group-hover:bg-[#c9a96e]/10 transition-all duration-300">
                  <Icon size={22} className="text-[#c9a96e]" />
                </div>
                <h3 className="text-sm sm:text-base font-heading font-bold tracking-[0.2em] text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm font-body font-light text-[#999] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: RESERVE / CTA SECTION
   ─── Call to action con spotlight dorado y contacto.
   ═══════════════════════════════════════════════════════════ */
function ReserveSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reserve"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c9a96e]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#c9a96e]/3 rounded-full blur-[100px]" />
      </div>

      <div ref={ctaRef} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center" style={{ opacity: 0 }}>
        <p className="text-[11px] font-heading font-semibold tracking-[0.4em] text-[#c9a96e] mb-3">
          YOUR JOURNEY AWAITS
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-wide text-white mb-4 sm:mb-6">
          READY TO EXPERIENCE
          <br />
          <span className="text-[#c9a96e]">LUXURY?</span>
        </h2>
        <p className="text-base sm:text-lg font-body font-light text-[#999] max-w-lg mx-auto mb-8 sm:mb-10">
          Book your dream car today and elevate your journey
        </p>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-10 py-4 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[12px] font-heading font-bold tracking-[0.25em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
        >
          RESERVE NOW
          <ArrowRight size={16} />
        </a>

        {/* Contact Info */}
        <div
          id="contact"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-12 sm:mt-16 pt-10 border-t border-[#333]/40"
        >
          <a
            href="tel:+393331234567"
            className="flex items-center gap-2 text-[#999] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Phone size={15} />
            <span className="text-sm font-body">+39 333 123 4567</span>
          </a>
          <a
            href="mailto:reserve@velox.com"
            className="flex items-center gap-2 text-[#999] hover:text-[#c9a96e] transition-colors duration-300"
          >
            <Mail size={15} />
            <span className="text-sm font-body">reserve@velox.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   COMPONENTE: FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#333]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/logo-white.png"
              alt="VELOX"
              className="h-7 sm:h-8 w-auto opacity-80"
            />
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] font-heading font-semibold tracking-[0.2em] text-[#666] hover:text-[#c9a96e] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#666] hover:text-[#c9a96e] transition-colors duration-300" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-[#666] hover:text-[#c9a96e] transition-colors duration-300" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-[#666] hover:text-[#c9a96e] transition-colors duration-300" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#333]/20 text-center">
          <p className="text-[10px] font-heading tracking-[0.15em] text-[#444]">
            © 2026 VELOX. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}


/* ═══════════════════════════════════════════════════════════
   PÁGINA PRINCIPAL
   ─── Composición de todos los componentes y efectos.
   ─── Inicializa Lenis smooth scroll globalmente.
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // ─── Inicializar Lenis Smooth Scroll ───
  useLenis();

  // ─── Preload de imágenes críticas ───
  useEffect(() => {
    const criticalImages = [
      '/images/hero-bg.png',
      '/images/logo-white.png',
      '/images/ferrari_california_bianca.png',
    ];

    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      // No bloquear — el LoadingScreen maneja el timing
    };

    criticalImages.forEach((src) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = src;
    });
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    // Refrescar ScrollTrigger después de que todo sea visible
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* ─── SVG Filters para Efecto 3 ─── */}
      <SvgFilters />

      {/* ─── Loading Screen ─── */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* ─── Contenido principal (oculto hasta carga) ─── */}
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navigation />

        {/* EFECTO 1: Hero Scale Down & Reveal */}
        <HeroScaleDown />

        {/* Marquee divisor */}
        <MarqueeText />

        {/* EFECTO 2: Scroll-Driven Image Playback */}
        <ScrollDrivenPlayback />

        {/* EFECTO 3: Fleet con Displacement Cards */}
        <FleetSection />

        {/* Marquee divisor */}
        <MarqueeText />

        {/* Features */}
        <FeaturesSection />

        {/* Reserve CTA */}
        <ReserveSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
