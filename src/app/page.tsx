'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
  Shield,
  ConciergeBell,
  Truck,
  Gauge,
  Timer,
  Zap,
  ArrowRight,
} from 'lucide-react';

/* ─── Data ─── */
const cars = [
  {
    name: 'Ferrari California',
    variant: 'Bianca Avus',
    image: '/images/ferrari_california_bianca.png',
    hp: 460,
    acceleration: '3.9s',
    topSpeed: '310 km/h',
    price: 890,
  },
  {
    name: 'Ferrari California',
    variant: 'Rossa Corsa',
    image: '/images/ferrari_california_rossa.png',
    hp: 460,
    acceleration: '3.9s',
    topSpeed: '310 km/h',
    price: 890,
  },
  {
    name: 'Maserati Ghibli',
    variant: 'Nero Ribelle',
    image: '/images/maserati_ghibli.png',
    hp: 350,
    acceleration: '5.0s',
    topSpeed: '263 km/h',
    price: 650,
  },
  {
    name: 'Mercedes E220d',
    variant: 'Cabriolet',
    image: '/images/mercedes_e220d_cabrio.png',
    hp: 194,
    acceleration: '7.8s',
    topSpeed: '240 km/h',
    price: 420,
  },
];

const features = [
  {
    icon: ConciergeBell,
    title: 'CONCIERGE SERVICE',
    description: '24/7 personal assistance for every aspect of your journey, from restaurant reservations to route planning.',
  },
  {
    icon: Shield,
    title: 'PREMIUM INSURANCE',
    description: 'Full comprehensive coverage with zero excess. Drive with complete peace of mind on every road.',
  },
  {
    icon: Truck,
    title: 'HOTEL DELIVERY',
    description: 'Your dream car delivered directly to your hotel or residence. Seamless luxury, from arrival to departure.',
  },
];

const navLinks = [
  { label: 'FLEET', href: '#fleet' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'RESERVE', href: '#reserve' },
  { label: 'CONTACT', href: '#contact' },
];

/* ─── Animated Section Wrapper ─── */
function FadeInSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Navigation ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'nav-glass bg-[#0a0a0a]/95 border-b border-[#333]/50'
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
          <motion.div
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[11px] sm:text-xs font-heading font-semibold tracking-[0.4em] text-[#c9a96e] mb-4 sm:mb-6"
        >
          EXPERIENCE LUXURY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading font-black tracking-wide text-white leading-none mb-4 sm:mb-6"
        >
          DRIVE YOUR
          <br />
          <span className="text-[#c9a96e]">DREAM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-base sm:text-lg font-body font-light text-[#999] max-w-xl mx-auto mb-8 sm:mb-10"
        >
          Premium fleet. Unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#fleet"
            className="px-8 py-3.5 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] transition-all duration-300 flex items-center gap-2"
          >
            EXPLORE FLEET
            <ArrowRight size={14} />
          </a>
          <a
            href="#experience"
            className="px-8 py-3.5 border border-white/30 hover:border-white text-white text-[11px] font-heading font-bold tracking-[0.25em] transition-all duration-300"
          >
            WATCH REEL
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-heading tracking-[0.3em] text-[#666]">
          SCROLL
        </span>
        <ChevronDown size={16} className="text-[#666] animate-bounce-slow" />
      </motion.div>
    </section>
  );
}

/* ─── Fleet Section ─── */
function FleetSection() {
  return (
    <section id="fleet" className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-[11px] font-heading font-semibold tracking-[0.4em] text-[#c9a96e] mb-3">
            OUR COLLECTION
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-wide text-white">
            THE FLEET
          </h2>
          <div className="w-16 h-[2px] bg-[#c9a96e] mx-auto mt-6" />
        </FadeInSection>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cars.map((car, index) => (
            <FadeInSection key={car.variant} delay={index * 0.15}>
              <div className="car-card-glow group relative bg-[#111]/80 border border-[#333]/60 overflow-hidden">
                {/* Car Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
                  <img
                    src={car.image}
                    alt={`${car.name} ${car.variant}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Name & Variant */}
                  <div className="mb-4">
                    <h3 className="text-lg sm:text-xl font-heading font-bold tracking-wider text-white">
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
                      <span className="text-xs font-body text-[#999]">
                        {car.hp} HP
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Timer size={13} className="text-[#c9a96e]" />
                      <span className="text-xs font-body text-[#999]">
                        {car.acceleration} 0-100
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gauge size={13} className="text-[#c9a96e]" />
                      <span className="text-xs font-body text-[#999]">
                        {car.topSpeed}
                      </span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-heading tracking-[0.2em] text-[#666]">
                        FROM
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl sm:text-2xl font-heading font-bold text-[#c9a96e]">
                          €{car.price}
                        </span>
                        <span className="text-xs font-body text-[#666]">
                          /DAY
                        </span>
                      </div>
                    </div>
                    <button className="reserve-btn px-5 py-2.5 border border-[#c9a96e]/50 text-[#c9a96e] text-[10px] font-heading font-bold tracking-[0.25em] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300">
                      RESERVE
                    </button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience Section ─── */
function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-20 sm:py-28 lg:py-36 section-gradient"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeInSection className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-[11px] font-heading font-semibold tracking-[0.4em] text-[#c9a96e] mb-3">
            WHY VELOX
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-wide text-white">
            THE EXPERIENCE
          </h2>
          <div className="w-16 h-[2px] bg-[#c9a96e] mx-auto mt-6" />
        </FadeInSection>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <FadeInSection key={feature.title} delay={index * 0.2}>
                <div className="group bg-[#111]/60 border border-[#333]/40 p-8 sm:p-10 text-center hover:border-[#c9a96e]/30 transition-all duration-300">
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
              </FadeInSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Reserve / CTA Section ─── */
function ReserveSection() {
  return (
    <section
      id="reserve"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c9a96e]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <FadeInSection>
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
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-[12px] font-heading font-bold tracking-[0.25em] transition-all duration-300"
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
        </FadeInSection>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
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
            <a
              href="#"
              className="text-[#666] hover:text-[#c9a96e] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="text-[#666] hover:text-[#c9a96e] transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="text-[#666] hover:text-[#c9a96e] transition-colors duration-300"
              aria-label="Twitter"
            >
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

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Navigation />
      <HeroSection />
      <FleetSection />
      <ExperienceSection />
      <ReserveSection />
      <Footer />
    </main>
  );
}
