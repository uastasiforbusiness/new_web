'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check, Loader2, Sparkles, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { DatePicker } from './date-picker';
import { bookableExperiences } from '@/lib/experiences';

type FormData = {
  experienceIndex: number;
  customerName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  message: string;
  consentAccepted: boolean;
};

const initialForm: FormData = {
  experienceIndex: 0,
  customerName: '',
  email: '',
  phone: '',
  startDate: '',
  endDate: '',
  message: '',
  consentAccepted: false,
};

export function ReservationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');
  const [experienceDropdownOpen, setExperienceDropdownOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const selectedExperience = bookableExperiences[form.experienceIndex] ?? bookableExperiences[0];

  useEffect(() => {
    if (!success) return;
    const timeout = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(timeout);
  }, [success]);

  // ─── Abort in-flight request on unmount ────────────────────────────
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const update = (field: keyof FormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'startDate' || field === 'endDate') {
      setDateError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDateError('');

    if (!selectedExperience) {
      setError('Please select an experience');
      return;
    }

    // ─── Client-side date validation before network round-trip ───────
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      if (end < start) {
        setDateError('End date must be on or after the start date');
        return;
      }
    }

    setSubmitting(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          experience_name: selectedExperience.name,
          experience_category: selectedExperience.category,
          customer_name: form.customerName,
          email: form.email,
          phone: form.phone,
          pickup_date: form.startDate,
          return_date: form.endDate,
          message: form.message || undefined,
          consent_accepted: form.consentAccepted,
        }),
      });

      if (!res.ok) {
        let message = 'Something went wrong';
        try {
          const data = await res.json() as { error?: string };
          message = data.error || message;
        } catch {
          // Response wasn't JSON — keep generic message
        }
        throw new Error(message);
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Failed to submit reservation');
    } finally {
      setSubmitting(false);
      abortRef.current = null;
    }
  };

  // ─── iOS Safari fix: inputs con font-size < 16px hacen zoom al enfocar ───
  //     El font-size 16px está forzado globalmente en globals.css
  const inputClass = "w-full bg-[#0a0a0a] border border-[#333] text-white font-body py-3 px-4 focus:border-[#c9a96e] focus:outline-none transition-colors duration-300 placeholder:text-[#555]";
  const labelClass = "block text-[10px] font-elegant font-semibold tracking-[0.15em] text-[#888] mb-2";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Experience selector */}
        <div className="relative">
          <label className={labelClass}>SELECT EXPERIENCE</label>
          <button
            type="button"
            onClick={() => setExperienceDropdownOpen(!experienceDropdownOpen)}
            className={`${inputClass} flex items-center justify-between`}
            aria-haspopup="listbox"
            aria-expanded={experienceDropdownOpen}
          >
            <span className="flex items-center gap-3 min-w-0">
              <Sparkles size={14} className="text-[#c9a96e] shrink-0" />
              <span className="truncate text-left">
                {selectedExperience.name}
                <span className="text-[#888]"> — {selectedExperience.category}</span>
              </span>
            </span>
            <ChevronDown size={14} className={`text-[#c9a96e] shrink-0 transition-transform duration-300 ${experienceDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {experienceDropdownOpen && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#111] border border-[#333] shadow-2xl max-h-72 overflow-y-auto" role="listbox">
              {bookableExperiences.map((experience, i) => (
                <button
                  key={experience.id}
                  type="button"
                  role="option"
                  aria-selected={i === form.experienceIndex}
                  onClick={() => { update('experienceIndex', i); setExperienceDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-sm font-body transition-colors duration-200 ${
                    i === form.experienceIndex ? 'bg-[#c9a96e]/10 text-[#c9a96e]' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <span className="font-elegant font-semibold block">{experience.name}</span>
                  <span className="text-[#555] font-elegant text-xs">
                    {experience.category}
                    {experience.duration ? ` · ${experience.duration}` : ''}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Personal info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}><User size={11} className="inline mr-1 text-[#c9a96e]" /> FULL NAME</label>
            <input
              type="text"
              value={form.customerName}
              onChange={(e) => update('customerName', e.target.value)}
              placeholder="Your name"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}><Mail size={11} className="inline mr-1 text-[#c9a96e]" /> EMAIL</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="your@email.com"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}><Phone size={11} className="inline mr-1 text-[#c9a96e]" /> PHONE</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+39 333 123 4567"
              pattern="[+]?[\d\s().-]{5,23}"
              title="Enter a valid phone number (digits, spaces, +, -, parentheses)"
              required
              className={inputClass}
            />
          </div>
          <div>
            <DatePicker
              value={form.startDate}
              onChange={(v) => update('startDate', v)}
              label="START DATE"
              placeholder="Select start date"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <DatePicker
              value={form.endDate}
              onChange={(v) => update('endDate', v)}
              label="END DATE"
              placeholder="Select end date"
              required
              min={form.startDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}><MessageSquare size={11} className="inline mr-1 text-[#c9a96e]" /> SPECIAL REQUESTS</label>
          <textarea
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Preferred vehicle, guest count, or other details..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Consent */}
        <div className="rounded-xl border border-[#c9a96e]/20 bg-[#111]/70 px-4 py-3">
          <label className="flex items-start gap-3 text-[11px] font-body leading-5 text-[#bbb]">
            <input
              type="checkbox"
              checked={form.consentAccepted}
              onChange={(e) => update('consentAccepted', e.target.checked)}
              required
              className="mt-0.5 size-4 accent-[#c9a96e]"
            />
            <span>
              I agree to B LEADER processing my data to manage this reservation request.
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || success}
          className="w-full py-4 bg-gradient-to-r from-[#c9a96e] to-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] hover:shadow-[0_0_35px_rgba(201,169,110,0.3)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <><Loader2 size={14} className="animate-spin" /> SUBMITTING...</>
          ) : success ? (
            <><Check size={14} /> RESERVATION CONFIRMED</>
          ) : (
            <>CONFIRM RESERVATION</>
          )}
        </button>

        {/* Success message */}
        {success && (
          <p className="text-center text-[#c9a96e] text-sm font-body mt-2">
            ✓ Your reservation request has been received. We&apos;ll contact you shortly.
          </p>
        )}

        {/* Date validation error */}
        {dateError && (
          <p className="text-center text-red-400 text-sm font-body mt-2">
            {dateError}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p className="text-center text-red-400 text-sm font-body mt-2">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
