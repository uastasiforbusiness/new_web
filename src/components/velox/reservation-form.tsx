'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Check, Loader2, Car, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { DatePicker } from './date-picker';
import { cars } from './data';

type FormData = {
  carIndex: number;
  customerName: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
  message: string;
  consentAccepted: boolean;
};

const initialForm: FormData = {
  carIndex: 0,
  customerName: '',
  email: '',
  phone: '',
  pickupDate: '',
  returnDate: '',
  message: '',
  consentAccepted: false,
};

export function ReservationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);

  const selectedCar = cars[form.carIndex];

  useEffect(() => {
    if (!success) return;
    const timeout = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(timeout);
  }, [success]);

  const update = (field: keyof FormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          carName: selectedCar.name,
          carVariant: selectedCar.variant,
          customerName: form.customerName,
          email: form.email,
          phone: form.phone,
          pickupDate: form.pickupDate,
          returnDate: form.returnDate,
          message: form.message || undefined,
          consentAccepted: form.consentAccepted,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit reservation');
    } finally {
      setSubmitting(false);
    }
  };

  // ─── iOS Safari fix: inputs con font-size < 16px hacen zoom al enfocar ───
  //     El font-size 16px está forzado globalmente en globals.css
  const inputClass = "w-full bg-[#0a0a0a] border border-[#333] text-white font-body py-3 px-4 focus:border-[#c9a96e] focus:outline-none transition-colors duration-300 placeholder:text-[#555]";
  const labelClass = "block text-[10px] font-elegant font-semibold tracking-[0.15em] text-[#888] mb-2";

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Car selector */}
        <div className="relative">
          <label className={labelClass}>SELECT VEHICLE</label>
          <button
            type="button"
            onClick={() => setCarDropdownOpen(!carDropdownOpen)}
            className={`${inputClass} flex items-center justify-between cursor-hover`}
          >
            <span className="flex items-center gap-3">
              <Car size={14} className="text-[#c9a96e]" />
              <span>{selectedCar.name} — <span className="text-[#888]">{selectedCar.variant}</span></span>
            </span>
            <ChevronDown size={14} className={`text-[#c9a96e] transition-transform duration-300 ${carDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {carDropdownOpen && (
            <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#111] border border-[#333] shadow-2xl">
              {cars.map((car, i) => (
                <button
                  key={car.variant}
                  type="button"
                  onClick={() => { update('carIndex', i); setCarDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-sm font-body transition-colors duration-200 cursor-hover ${
                    i === form.carIndex ? 'bg-[#c9a96e]/10 text-[#c9a96e]' : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <span className="font-elegant font-semibold">{car.name}</span>
                  <span className="text-[#555] font-elegant ml-2">— {car.variant}</span>
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
              required
              className={inputClass}
            />
          </div>
          <div>
            <DatePicker
              value={form.pickupDate}
              onChange={(v) => update('pickupDate', v)}
              label="PICKUP DATE"
              placeholder="Select pickup date"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <DatePicker
              value={form.returnDate}
              onChange={(v) => update('returnDate', v)}
              label="RETURN DATE"
              placeholder="Select return date"
              required
              min={form.pickupDate || new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}><MessageSquare size={11} className="inline mr-1 text-[#c9a96e]" /> SPECIAL REQUESTS</label>
          <textarea
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder="Any special requests or preferences..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Consent */}
        <label className="flex items-start gap-3 text-[11px] font-body leading-5 text-[#aaa]">
          <input
            type="checkbox"
            checked={form.consentAccepted}
            onChange={(e) => update('consentAccepted', e.target.checked)}
            required
            className="mt-0.5 size-4 accent-[#c9a96e] cursor-hover"
          />
          <span>
            I agree to B LEADER processing my data to manage this reservation request.
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting || success}
          className="w-full py-4 bg-gradient-to-r from-[#c9a96e] to-[#d4af37] text-[#0a0a0a] text-[11px] font-heading font-bold tracking-[0.25em] cursor-hover hover:shadow-[0_0_35px_rgba(201,169,110,0.3)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
