"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { whatsappUrl } from "@/lib/config";

/**
 * Floating concierge — opens a short intake, then hands off to WhatsApp
 * with a pre-filled message. No server call; nothing is persisted.
 */

const QUICK = [
  "Fleet availability",
  "Yacht charter",
  "Wedding chauffeur",
  "Speak to the concierge",
] as const;

type Bubble = { dir: "guest" | "concierge"; body: string };

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [draft, setDraft] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [sending, setSending] = useState(false);

  const chooseQuick = (q: string) => setDraft(`Hello B LEADER — ${q.toLowerCase()}, please.`);

  const send = () => {
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setBubbles((b) => [...b, { dir: "guest", body }]);
    setDraft("");
    setBubbles((b) => [
      ...b,
      { dir: "concierge", body: "Certo. Continuing on WhatsApp — a concierge replies within minutes." },
    ]);
    setSending(false);
    window.open(whatsappUrl(`${name ? `Hi, I'm ${name}. ` : "Hi! "}${body}`), "_blank", "noopener");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[95] flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden border border-line bg-coal shadow-[0_32px_90px_rgba(0,0,0,0.65)] md:right-8"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-line bg-carbon px-5 py-4">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold/15">
                <MessageCircle size={16} className="text-gold" strokeWidth={1.5} />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-carbon bg-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-medium tracking-[0.14em] text-ivory">
                  CONCIERGE
                </p>
                <p className="text-[11px] text-sand">Replies within minutes · 08:00–22:00</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-sand hover:text-ivory">
                <X size={17} strokeWidth={1.5} />
              </button>
            </div>

            {/* conversation */}
            <div className="max-h-56 space-y-3 overflow-y-auto px-5 py-5">
              <div className="w-fit max-w-[85%] border border-line bg-ink px-4 py-2.5 text-[13px] leading-relaxed text-sand">
                Buongiorno. Tell us the moment you are planning — we will handle the rest.
              </div>
              {bubbles.map((b, i) => (
                <div
                  key={i}
                  className={`w-fit max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed ${
                    b.dir === "guest"
                      ? "ml-auto bg-gold text-ink"
                      : "border border-line bg-ink text-sand"
                  }`}
                >
                  {b.body}
                </div>
              ))}
            </div>

            {/* quick prompts */}
            <div className="flex flex-wrap gap-2 px-5 pb-3">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => chooseQuick(q)}
                  className="border border-line px-3 py-1.5 text-[11px] text-sand transition-all duration-300 hover:border-gold/50 hover:text-gold"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* composer */}
            <div className="border-t border-line px-5 py-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="field !py-2 text-[13px]"
                aria-label="Your name"
              />
              <div className="mt-2 flex items-end gap-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void send();
                    }
                  }}
                  rows={1}
                  placeholder="Write your message…"
                  className="field flex-1 resize-none !py-2 text-[13px]"
                  aria-label="Message"
                />
                <button
                  onClick={() => void send()}
                  disabled={!draft.trim() || sending}
                  aria-label="Send to WhatsApp"
                  className="mb-1 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gold text-ink transition-all duration-300 hover:bg-gold-light disabled:opacity-40"
                >
                  <Send size={14} strokeWidth={1.8} />
                </button>
              </div>
              <p className="mt-3 text-[10px] leading-relaxed tracking-[0.08em] text-mute">
                Continues on WhatsApp with your message pre-written.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* floating trigger */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with the concierge on WhatsApp"
        className="group fixed bottom-6 right-4 z-[95] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_12px_40px_rgba(200,162,78,0.35)] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_16px_50px_rgba(200,162,78,0.5)] md:right-8"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-gold/25 [animation-duration:2.6s]" />
        {open ? <X size={20} strokeWidth={1.8} /> : <MessageCircle size={21} strokeWidth={1.6} />}
      </motion.button>
    </>
  );
}
