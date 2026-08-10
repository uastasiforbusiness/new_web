"use client";

import { useState, type FormEvent } from "react";
import { BadgeCheck, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Name, email and message are needed.");
      return;
    }
    setStatus("loading");
    setError(null);

    // new_web's /api/reserve requires return_date > pickup_date (single-day
    // request => return is the day after pickup). Compute in UTC so DST
    // spring-forward days (e.g. 2026-03-29 in Europe) don't collapse the date.
    const pickup = new Date(Date.now() + 24 * 3600 * 1000); // tomorrow
    const returnDate = new Date(pickup);
    returnDate.setUTCDate(returnDate.getUTCDate() + 1);

    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car_name: "Concierge enquiry",
          car_variant: "contact",
          customer_name: name,
          email,
          phone: phone.trim() || "+39 000 000 0000",
          pickup_date: pickup.toISOString().slice(0, 10),
          return_date: returnDate.toISOString().slice(0, 10),
          consent_accepted: true,
          message,
        }),
      });
      const data = (await res.json()) as { success?: boolean; reservationId?: string; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? "Something interrupted the message. Try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("No connection — WhatsApp us instead, we reply in minutes.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center border border-line bg-ink p-10 text-center">
        <BadgeCheck size={40} strokeWidth={1.2} className="text-gold" />
        <h3 className="mt-5 font-serif text-3xl font-light text-ivory">
          Grazie — <em className="text-gold-light">message received.</em>
          <span className="sr-only"> (Thank you)</span>
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-7 text-sand">
          A concierge will write back within two hours, 08:00–22:00 CET.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="border border-line bg-ink p-7 md:p-10">
      <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Write to us</p>
      <h3 className="mt-3 font-serif text-3xl font-light text-ivory">
        No forms lost <em className="text-gold-light">in space.</em>
      </h3>

      <div className="mt-8 space-y-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          autoComplete="name"
          className="field"
          aria-label="Full name"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            autoComplete="email"
            className="field"
            aria-label="Email"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone (optional)"
            type="tel"
            autoComplete="tel"
            className="field"
            aria-label="Phone"
          />
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about the occasion…"
          rows={4}
          className="field resize-none"
          aria-label="Message"
        />
      </div>

      {error && <p className="mt-4 text-[11px] text-red-400/90">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-sweep mt-8 flex w-full items-center justify-center gap-3 border border-gold px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-gold transition-colors duration-500 hover:text-ink disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send the message <Send size={13} />
          </>
        )}
      </button>
    </form>
  );
}
