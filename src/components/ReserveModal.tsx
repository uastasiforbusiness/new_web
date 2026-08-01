"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BadgeCheck, Loader2, X } from "lucide-react";
import { ALL_EXPERIENCE_OPTIONS } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Context — any component can trigger the reservation flow           */
/* ------------------------------------------------------------------ */

type ReserveContextValue = { openReserve: (experience?: string) => void };

const ReserveContext = createContext<ReserveContextValue>({
  openReserve: () => undefined,
});

export const useReserve = () => useContext(ReserveContext);

export function ReserveProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>(undefined);

  const openReserve = useCallback((experience?: string) => {
    setPreset(experience);
    setOpen(true);
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
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <ReserveContext.Provider value={{ openReserve }}>
      {children}
      <ReserveModal open={open} preset={preset} onClose={() => setOpen(false)} />
    </ReserveContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal — two-step reservation                                       */
/* ------------------------------------------------------------------ */

type Errors = Partial<Record<string, string>>;

const inputWrap = "space-y-1.5";
const labelCls =
  "block text-[10px] uppercase tracking-[0.28em] text-mute";
const errCls = "text-[11px] text-red-400/90";

function ReserveModal({
  open,
  preset,
  onClose,
}: {
  open: boolean;
  preset?: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const presetApplied = useRef(false);

  useEffect(() => {
    if (open && !presetApplied.current) {
      if (preset) {
        const hit = ALL_EXPERIENCE_OPTIONS.find(
          (o) => o.value === preset || o.label === preset,
        );
        setExperience(hit ? hit.value : preset);
      }
      presetApplied.current = true;
    }
    if (!open) {
      presetApplied.current = false;
      setTimeout(() => {
        setStep(1);
        setStatus("idle");
        setErrors({});
        setApiError(null);
        setReference(null);
      }, 400);
    }
  }, [open, preset]);

  const selected = ALL_EXPERIENCE_OPTIONS.find((o) => o.value === experience);

  const validateStep = (s: number): boolean => {
    const next: Errors = {};
    if (s === 1) {
      if (!experience) next.experience = "Choose your experience";
      if (!date) next.date = "Pick a preferred date";
    }
    if (s === 2) {
      if (name.trim().length < 2) next.name = "Your name, please";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "A valid email is required";
      if (phone.trim().length < 6) next.phone = "A phone / WhatsApp number is required";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setStatus("loading");
    setApiError(null);

    try {
      // new_web's /api/reserve requires return_date > pickup_date (single-day
      // reservation => return is the day after pickup).
      const pickup = date; // "YYYY-MM-DD" from the form
      const pickupDate = new Date(pickup);
      const returnDate = new Date(pickupDate);
      returnDate.setDate(returnDate.getDate() + 1);

      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_name: selected?.label ?? experience,
          car_variant: selected?.type ?? "tour",
          customer_name: name,
          email,
          phone,
          pickup_date: pickup,
          return_date: returnDate.toISOString().slice(0, 10),
          consent_accepted: true,
          message: `${experience}\n\nGuests: ${guests}\n${notes}`,
        }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        reservationId?: string;
        error?: string;
      };
      if (!res.ok || !data.success) {
        setApiError(data.error ?? "Something interrupted the reservation. Try again.");
        setStatus("error");
        return;
      }
      setReference(data.reservationId ?? null);
      setStatus("success");
    } catch {
      setApiError("No connection. WhatsApp us instead — we reply in minutes.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/80 backdrop-blur-sm md:items-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Reserve an experience"
        >
          <motion.div
            initial={{ y: 64, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 48, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-line bg-coal shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >
            {/* top ornament */}
            <div className="h-1 w-full bg-gradient-to-r from-gold-deep via-gold to-gold-light" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-sand transition-colors hover:text-ivory"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="px-6 py-10 md:px-12 md:py-12">
              {status === "success" ? (
                <div className="py-6 text-center">
                  <BadgeCheck size={44} strokeWidth={1.2} className="mx-auto text-gold" />
                  <h3 className="mt-6 font-serif text-4xl font-light text-ivory">
                    Consider it <em className="text-gold-light">noted</em>.
                  </h3>
                  <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-sand">
                    Our concierge replies personally within two hours, 08:00–22:00 CET.
                    Your reference:
                  </p>
                  <p className="mt-4 inline-block border border-gold/40 px-6 py-3 font-display text-sm tracking-[0.35em] text-gold">
                    {reference}
                  </p>
                  <div className="mt-8">
                    <button
                      onClick={onClose}
                      className="btn-sweep border border-ivory/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:text-ink"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold">
                    B LEADER · Concierge
                  </p>
                  <h3 className="mt-3 font-serif text-4xl font-light text-ivory md:text-5xl">
                    {step === 1 ? (
                      <>The <em className="text-gold-light">experience</em></>
                    ) : (
                      <>And <em className="text-gold-light">you</em></>
                    )}
                  </h3>

                  {/* step indicator */}
                  <div className="mt-6 flex items-center gap-3">
                    {[1, 2].map((s) => (
                      <div key={s} className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] tracking-widest transition-colors duration-300 ${
                            step === s
                              ? "border-gold text-gold"
                              : "border-ivory/20 text-mute"
                          }`}
                        >
                          {s}
                        </span>
                        <span
                          className={`h-px w-16 transition-colors duration-500 ${
                            step >= s + 1 ? "bg-gold" : "bg-ivory/15"
                          } ${s === 2 ? "hidden" : ""}`}
                        />
                      </div>
                    ))}
                    <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-mute">
                      Step {step} / 2
                    </span>
                  </div>

                  <div className="mt-8 min-h-[240px]">
                    {step === 1 ? (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-7"
                      >
                        <div className={inputWrap}>
                          <label htmlFor="rs-exp" className={labelCls}>
                            Experience
                          </label>
                          <select
                            id="rs-exp"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="field bg-coal cursor-pointer"
                          >
                            <option value="" disabled>
                              Select from the collection…
                            </option>
                            <optgroup label="The supercar fleet">
                              {ALL_EXPERIENCE_OPTIONS.filter((o) => o.type === "car").map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.value}
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Yacht — Cranchi Atlantique 50">
                              {ALL_EXPERIENCE_OPTIONS.filter((o) => o.type === "yacht").map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Editorial experiences">
                              {ALL_EXPERIENCE_OPTIONS.filter((o) => o.type === "tour").map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.value}
                                </option>
                              ))}
                            </optgroup>
                            <optgroup label="Chauffeured services">
                              {ALL_EXPERIENCE_OPTIONS.filter((o) => o.type === "event").map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </optgroup>
                          </select>
                          {errors.experience && <p className={errCls}>{errors.experience}</p>}
                        </div>

                        <div className="grid gap-7 sm:grid-cols-2">
                          <div className={inputWrap}>
                            <label htmlFor="rs-date" className={labelCls}>
                              Preferred date
                            </label>
                            <input
                              id="rs-date"
                              type="date"
                              value={date}
                              min={new Date().toISOString().slice(0, 10)}
                              onChange={(e) => setDate(e.target.value)}
                              className="field"
                            />
                            {errors.date && <p className={errCls}>{errors.date}</p>}
                          </div>
                          <div className={inputWrap}>
                            <label htmlFor="rs-guests" className={labelCls}>
                              Guests
                            </label>
                            <input
                              id="rs-guests"
                              type="number"
                              min={1}
                              max={40}
                              value={guests}
                              onChange={(e) => setGuests(Number(e.target.value))}
                              className="field"
                            />
                            {errors.guests && <p className={errCls}>{errors.guests}</p>}
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-7"
                      >
                        <div className={inputWrap}>
                          <label htmlFor="rs-name" className={labelCls}>
                            Full name
                          </label>
                          <input
                            id="rs-name"
                            type="text"
                            autoComplete="name"
                            placeholder="Sofia Laurent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="field"
                          />
                          {errors.name && <p className={errCls}>{errors.name}</p>}
                        </div>
                        <div className="grid gap-7 sm:grid-cols-2">
                          <div className={inputWrap}>
                            <label htmlFor="rs-email" className={labelCls}>
                              Email
                            </label>
                            <input
                              id="rs-email"
                              type="email"
                              autoComplete="email"
                              placeholder="you@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="field"
                            />
                            {errors.email && <p className={errCls}>{errors.email}</p>}
                          </div>
                          <div className={inputWrap}>
                            <label htmlFor="rs-phone" className={labelCls}>
                              Phone / WhatsApp
                            </label>
                            <input
                              id="rs-phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="+39 …"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="field"
                            />
                            {errors.phone && <p className={errCls}>{errors.phone}</p>}
                          </div>
                        </div>
                        <div className={inputWrap}>
                          <label htmlFor="rs-notes" className={labelCls}>
                            Notes <span className="normal-case tracking-normal text-mute/70">(occasion, pickup point, timings…)</span>
                          </label>
                          <textarea
                            id="rs-notes"
                            rows={2}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="field resize-none"
                          />
                          {errors.notes && <p className={errCls}>{errors.notes}</p>}
                        </div>

                        {/* honeypot */}
                        <input
                          type="text"
                          name="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                          aria-hidden="true"
                          className="pointer-events-none absolute -left-[9999px] opacity-0"
                        />
                      </motion.div>
                    )}
                  </div>

                  {apiError && <p className={`${errCls} mt-4`}>{apiError}</p>}

                  <div className="mt-8 flex items-center justify-between gap-4">
                    {step === 2 ? (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-sand transition-colors hover:text-ivory"
                      >
                        <ArrowLeft size={13} /> Back
                      </button>
                    ) : (
                      <span className="text-[11px] tracking-[0.18em] text-mute">
                        No payment today — just the request.
                      </span>
                    )}

                    {step === 1 ? (
                      <button
                        type="button"
                        onClick={() => validateStep(1) && setStep(2)}
                        className="btn-sweep flex items-center gap-3 border border-gold/60 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink"
                      >
                        Continue <ArrowRight size={13} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-sweep flex items-center gap-3 border border-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={13} className="animate-spin" /> Sending…
                          </>
                        ) : (
                          <>
                            Request reservation <ArrowRight size={13} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
