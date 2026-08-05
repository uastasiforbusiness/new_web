"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { CONTACT, NAV_LINKS } from "@/lib/config";
import { useReserve } from "./ReserveModal";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const { openReserve } = useReserve();

  // Close the mobile menu when the route changes (render-time adjustment —
  // avoids a cascading setState inside an effect).
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-500 md:px-10 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="group flex items-center" aria-label="B LEADER home">
            <img
              src="/images/logo_oro.png"
              alt="B LEADER"
              className="h-15 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-[11px] font-medium uppercase tracking-[0.28em] transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:text-ivory hover:after:w-full ${
                    active ? "text-gold" : "text-sand"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={CONTACT.phoneHref}
              className="hidden items-center gap-2 text-[11px] tracking-[0.2em] text-sand transition-colors hover:text-ivory xl:flex"
            >
              <Phone size={12} className="text-gold" strokeWidth={1.5} />
              {CONTACT.phoneDisplay}
            </a>
            <button
              onClick={() => openReserve()}
              className="btn-sweep group hidden items-center gap-2 border border-gold/50 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.28em] text-gold transition-colors duration-500 hover:text-ink sm:flex"
            >
              Reserve
              <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:rotate-45" />
            </button>
            <button
              onClick={() => setOpen(true)}
              className="text-ivory lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] flex flex-col bg-ink"
          >
            <div className="flex h-20 items-center justify-between px-5 md:px-10">
              <span className="font-display text-xl font-light tracking-[0.32em] text-ivory">
                <span className="font-semibold text-gold">B</span> LEADER
              </span>
              <button onClick={() => setOpen(false)} className="text-ivory" aria-label="Close menu">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8 md:px-16" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block font-serif text-5xl font-light leading-[1.15] transition-colors duration-300 md:text-6xl ${
                      pathname === link.href ? "italic text-gold" : "text-ivory hover:italic hover:text-gold-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => openReserve(), 350);
                }}
                className="mt-8 flex w-fit items-center gap-3 border border-gold/50 px-8 py-4 text-xs uppercase tracking-[0.3em] text-gold"
              >
                Reserve an experience
                <ArrowUpRight size={14} />
              </motion.button>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="border-t border-line px-8 py-6 text-xs tracking-[0.18em] text-mute md:px-16"
            >
              <p>{CONTACT.address}</p>
              <p className="mt-1 text-sand">{CONTACT.phoneDisplay} · {CONTACT.email}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
