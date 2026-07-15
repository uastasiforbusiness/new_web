'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { X, Send, MessageSquare, Phone } from 'lucide-react';

// ─── Constants ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'bleader_chat_session';
const POLL_INTERVAL = 2500;
const GREETING = 'Good day. I am your B Leader concierge. How may I assist?';

interface ChatMsg {
  id: string;
  direction: 'inbound' | 'outbound';
  body: string;
  status?: string;
  ts: number;
}

interface MessagesApiResponse {
  messages: ChatMsg[];
  serverTime?: number;
}

interface SendApiResponse {
  error?: string;
  sessionId?: string;
  messageId?: string;
  reply?: string;
  success?: boolean;
}

/* ─── Gold Particles (same pattern as reserve-section) ─── */
const PARTICLE_COUNT = 12;
const popupParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: ((i * 31 + 17) % 100),
  top: ((i * 47 + 11) % 100),
  size: (i % 2) + 1,
  baseOpacity: (i % 4 + 1) * 0.03 + 0.02,
  duration: 3 + (i % 5) * 1.5,
  delay: (i % 4) * 0.5,
}));

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return 'ssr';
  const KEY = 'bleader_visitor_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = 'v_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(KEY, id);
  }
  return id;
}

interface StoredSession {
  sessionId: string;
  lastTs: number;
}

export function WhatsAppPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phase, setPhase] = useState<'closed' | 'greeting' | 'awaiting-phone' | 'chat' | 'phone-error'>('closed');
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [lastTs, setLastTs] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [conciergeTyping, setConciergeTyping] = useState(false);
  const [error, setError] = useState('');

  const popupRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // ─── Restore session from localStorage on open ─────────────────────────
  useEffect(() => {
    if (!open) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredSession = JSON.parse(stored);
        if (parsed.sessionId) {
          setSessionId(parsed.sessionId);
          setLastTs(parsed.lastTs || 0);
          setPhase('chat');
          return;
        }
      }
    } catch { /* ignore */ }
    // No session → greeting sequence
    setPhase('greeting');
    setDisplayedGreeting('');
  }, [open]);

  // ─── Greeting typing effect ─────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'greeting') return;
    let i = 0;
    setDisplayedGreeting('');
    const interval = setInterval(() => {
      i++;
      setDisplayedGreeting(GREETING.slice(0, i));
      if (i >= GREETING.length) {
        clearInterval(interval);
        setTimeout(() => setPhase('awaiting-phone'), 600);
      }
    }, 32);
    return () => clearInterval(interval);
  }, [phase]);

  // ─── Typing dots animation ──────────────────────────────────────────────
  useEffect(() => {
    if (!conciergeTyping || dotsRef.current.length < 3) return;
    const ctx = gsap.context(() => {
      dotsRef.current.forEach((dot, idx) => {
        if (!dot) return;
        gsap.set(dot, { scale: 0.6, opacity: 0.3 });
        gsap.to(dot, {
          scale: 1.2, opacity: 1,
          duration: 0.4, ease: 'power1.inOut',
          repeat: -1, yoyo: true, delay: idx * 0.15,
        });
      });
    });
    return () => ctx.revert();
  }, [conciergeTyping]);

  // ─── Gold particles ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!open || !particlesRef.current) return;
    const dots = Array.from(particlesRef.current.querySelectorAll('.popup-particle'));
    const tweens: gsap.core.Tween[] = [];
    dots.forEach((dot, i) => {
      const p = popupParticles[i];
      if (!p) return;
      tweens.push(gsap.to(dot, {
        y: 'random(-15, 15)', x: 'random(-10, 10)', opacity: 'random(0.04, 0.25)',
        duration: p.duration, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: p.delay,
      }));
    });
    return () => tweens.forEach((t) => t.kill());
  }, [open]);

  // ─── Popup entrance ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!open || !popupRef.current) return;
    gsap.fromTo(popupRef.current,
      { scale: 0.9, opacity: 0, y: 15 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' }
    );
  }, [open]);

  // ─── Auto-scroll on new messages ────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, conciergeTyping]);

  // Keep track of whether we've done the initial history load
  const initialLoadDone = useRef(false);

  // ─── Polling for new messages ───────────────────────────────────────────
  useEffect(() => {
    if (!open || !sessionId) return;
    let cancelled = false;

    // Reset initial load flag when session changes
    initialLoadDone.current = false;

    const doInitialLoad = async () => {
      if (cancelled) return;
      try {
        // Load last 50 messages to populate the chat history
        const res = await fetch(`/api/whatsapp/messages?sessionId=${sessionId}&since=0&limit=50`);
        if (!res.ok) return;
        const data: MessagesApiResponse = await res.json();
        if (cancelled) return;

        if (data.messages.length > 0) {
          setMessages(data.messages);
          const maxTs = Math.max(...data.messages.map((m: ChatMsg) => m.ts), 0);
          setLastTs(maxTs);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, lastTs: maxTs }));
          } catch { /* ignore */ }
        }
      } catch { /* retry next tick */ }
    };

    const poll = async () => {
      if (cancelled) return;
      try {
        const res = await fetch(`/api/whatsapp/messages?sessionId=${sessionId}&since=${lastTs}`);
        if (!res.ok) return;
        const data: MessagesApiResponse = await res.json();
        if (cancelled) return;

        const newOutbound = data.messages.filter((m: ChatMsg) => m.direction === 'outbound');
        if (newOutbound.length > 0) {
          setConciergeTyping(false);
        }

        if (data.messages.length > 0) {
          setMessages((prev) => {
            const existing = new Set(prev.map((m) => m.id));
            const fresh = data.messages.filter((m: ChatMsg) => !existing.has(m.id));
            return [...prev, ...fresh];
          });
          const maxTs = Math.max(...data.messages.map((m: ChatMsg) => m.ts), lastTs);
          setLastTs(maxTs);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, lastTs: maxTs }));
          } catch { /* ignore */ }
        }
      } catch { /* network blip — retry next tick */ }
    };

    // First fetch: full history load, then switch to delta polling
    doInitialLoad().then(() => {
      if (cancelled) return;
      initialLoadDone.current = true;
    });
    const interval = setInterval(poll, POLL_INTERVAL);
    return () => { cancelled = true; clearInterval(interval); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sessionId]);

  // ─── Close on Escape ────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // ─── Submit phone (onboarding step) ─────────────────────────────────────
  const submitPhone = useCallback(async () => {
    setError('');
    const trimmed = phoneInput.trim();
    if (trimmed.replace(/[^\d]/g, '').length < 8) {
      setPhase('phone-error');
      setError('Please enter a valid phone number with country code.');
      return;
    }

    const visitorId = getOrCreateVisitorId();
    setIsSending(true);
    try {
      // Create a session seed message so the backend initializes the session
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          visitorPhone: trimmed,
          body: `Hi, my number is ${trimmed}.`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as SendApiResponse;
        throw new Error(data.error || 'Failed to start chat');
      }

      const data: SendApiResponse = await res.json();
      if (!data.sessionId) throw new Error('No session id returned');
      setSessionId(data.sessionId);
      setMessages([{
        id: 'seed-' + Date.now(),
        direction: 'inbound',
        body: `Hi, my number is ${trimmed}.`,
        ts: Date.now(),
      }]);
      setLastTs(Date.now());
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          sessionId: data.sessionId, lastTs: Date.now(),
        }));
      } catch { /* ignore */ }
      setPhase('chat');
      setPhoneInput('');
      // Show typing indicator while concierge "replies"
      setTimeout(() => setConciergeTyping(true), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setPhase('phone-error');
    } finally {
      setIsSending(false);
    }
  }, [phoneInput]);

  // ─── Send a chat message ────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    const body = input.trim();
    if (!body || !sessionId || isSending) return;

    const optimistic: ChatMsg = {
      id: 'opt-' + Date.now(),
      direction: 'inbound',
      body,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput('');
    setIsSending(true);
    setConciergeTyping(true);

    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: getOrCreateVisitorId(),
          body,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({})) as SendApiResponse;
        throw new Error(data.error || 'Failed to send');
      }
      // Polling will pick up the concierge's reply (demo or real)
    } catch (err) {
      setConciergeTyping(false);
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setIsSending(false);
    }
  }, [input, sessionId, isSending]);

  // ─── Focus input on phase change ────────────────────────────────────────
  useEffect(() => {
    if (phase === 'awaiting-phone' || phase === 'phone-error') {
      setTimeout(() => phoneInputRef.current?.focus(), 100);
    } else if (phase === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [phase]);

  if (!open) return null;

  return (
    <>
      {/* Invisible backdrop */}
      <div className="fixed inset-0 z-[59]" onClick={onClose} aria-hidden="true" />

      {/* Popup */}
      <div
        ref={popupRef}
        className="fixed bottom-24 right-6 z-[60] w-[330px] rounded-2xl overflow-hidden"
        style={{
          opacity: 0,
          background: 'rgba(17, 17, 17, 0.92)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(201, 169, 110, 0.15)',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 60px rgba(201, 169, 110, 0.04)',
        }}
      >
        {/* Gold particles */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0">
          {popupParticles.map((p, i) => (
            <div
              key={i}
              className="popup-particle absolute rounded-full"
              style={{
                left: `${p.left}%`, top: `${p.top}%`,
                width: `${p.size}px`, height: `${p.size}px`,
                background: 'radial-gradient(circle, #c9a96e 0%, transparent 70%)',
                opacity: p.baseOpacity,
              }}
            />
          ))}
        </div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />

        <div className="relative z-10 flex flex-col max-h-[460px]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-[#0a0a0a] border border-[#c9a96e]/30 flex items-center justify-center">
                <MessageSquare size={13} className="text-[#c9a96e]" strokeWidth={1.5} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#c9a96e] border-2 border-[#111]">
                  <span className="absolute inset-0 rounded-full bg-[#c9a96e] animate-ping opacity-60" />
                </span>
              </div>
              <div>
                <h3 className="text-[#c9a96e] text-[11px] font-heading font-bold tracking-[0.2em]">
                  CONCIERGE
                </h3>
                <p className="text-[#555] text-[9px] font-heading tracking-[0.1em]">
                  B LEADER · Online now
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#555] hover:text-[#c9a96e] transition-colors duration-300 p-1 cursor-pointer"
              aria-label="Close"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* Separator */}
          <div className="mx-5 h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/15 to-transparent flex-shrink-0" />

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto px-5 py-4 min-h-[140px]">
            {/* Greeting phase */}
            {(phase === 'greeting' || phase === 'awaiting-phone' || phase === 'phone-error') && (
              <div className="flex items-start gap-2.5 mb-4">
                <span className="text-[#c9a96e]/40 text-[8px] mt-1.5">◆</span>
                <div className="bg-[#1a1a1a] border border-[#c9a96e]/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[230px]">
                  <p ref={greetingRef} className="text-[#bbb] text-[13px] font-elegant italic leading-relaxed">
                    {displayedGreeting}
                    {phase === 'greeting' && (
                      <span className="inline-block w-[2px] h-[14px] bg-[#c9a96e]/60 ml-[1px] align-middle animate-pulse" />
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Phone capture */}
            {(phase === 'awaiting-phone' || phase === 'phone-error') && (
              <div className="mb-3">
                <p className="text-[#888] text-[11px] mb-2 font-body leading-relaxed">
                  What's your WhatsApp number? (so our concierge can reply)
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a96e]/40" />
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => { setPhoneInput(e.target.value); setPhase('awaiting-phone'); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') submitPhone(); }}
                      placeholder="+52 441 213 2652"
                      className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg pl-8 pr-3 py-2.5 text-[12px] text-white placeholder-[#555] font-body focus:outline-none focus:border-[#c9a96e]/40 transition-colors duration-300"
                    />
                  </div>
                  <button
                    onClick={submitPhone}
                    disabled={isSending}
                    className="px-3.5 py-2.5 bg-[#c9a96e] text-[#0a0a0a] text-[10px] font-heading font-bold tracking-[0.15em] rounded-lg hover:bg-[#d4af37] transition-colors duration-300 disabled:opacity-30 cursor-pointer whitespace-nowrap"
                  >
                    {isSending ? '...' : 'START'}
                  </button>
                </div>
                {phase === 'phone-error' && (
                  <p className="text-red-400/70 text-[10px] mt-1.5 font-body">{error}</p>
                )}
              </div>
            )}

            {/* Chat phase — message bubbles */}
            {phase === 'chat' && (
              <div className="space-y-2.5">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}

                {/* Concierge typing indicator */}
                {conciergeTyping && (
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#c9a96e]/40 text-[8px] mt-1.5">◆</span>
                    <div className="bg-[#1a1a1a] border border-[#c9a96e]/8 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            ref={(el) => { dotsRef.current[i] = el; }}
                            className="inline-block w-[5px] h-[5px] rounded-full bg-[#c9a96e]/60"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input bar — only in chat phase */}
          {phase === 'chat' && (
            <div className="px-4 pb-4 pt-2 flex-shrink-0">
              {error && (
                <p className="text-red-400/70 text-[10px] mb-1.5 font-body">{error}</p>
              )}
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#0a0a0a] border border-[#333] rounded-lg px-3 py-2.5 text-[12px] text-white placeholder-[#555] font-body focus:outline-none focus:border-[#c9a96e]/40 transition-colors duration-300"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isSending}
                  className="w-9 h-9 flex items-center justify-center bg-[#c9a96e] text-[#0a0a0a] rounded-lg hover:bg-[#d4af37] transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send size={13} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-5 pt-1 pb-3 flex items-center gap-2 flex-shrink-0">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c9a96e]/12 to-transparent" />
            <p className="text-[#444] text-[8px] font-heading tracking-[0.15em] whitespace-nowrap">
              ◆ AVAILABLE 24/7
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Message bubble subcomponent ────────────────────────────────────────────
function MessageBubble({ msg }: { msg: ChatMsg }) {
  const isVisitor = msg.direction === 'inbound';

  if (isVisitor) {
    return (
      <div className="flex justify-end">
        <div className="bg-[#1a1a1a] border border-[#c9a96e]/8 rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[230px]">
          <p className="text-[#ddd] text-[12px] font-body leading-relaxed">{msg.body}</p>
          <p className="text-[#555] text-[8px] mt-1 text-right">
            {new Date(msg.ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5">
      <span className="text-[#c9a96e]/40 text-[8px] mt-1.5">◆</span>
      <div className="bg-[#c9a96e]/8 border border-[#c9a96e]/15 rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[230px]">
        <p className="text-[#e8d9b8] text-[12px] font-body leading-relaxed">{msg.body}</p>
        <p className="text-[#c9a96e]/40 text-[8px] mt-1">
          {new Date(msg.ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
