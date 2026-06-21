'use client';

import { useRef } from 'react';
import { Calendar } from 'lucide-react';

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const monthIndex = parseInt(m, 10) - 1;
  const day = parseInt(d, 10);
  return `${day} ${MONTHS[monthIndex]} ${y}`;
}

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
  min?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  label,
  required = false,
  min,
}: DatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const displayText = value ? formatDisplayDate(value) : '';
  const hasValue = !!value;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <label className="block text-[10px] font-elegant font-semibold tracking-[0.15em] text-[#888] mb-2">
        <Calendar size={11} className="inline mr-1 text-[#c9a96e]" /> {label}
      </label>

      {/*
        ─── Estrategia: input VISIBLE + overlay de display encima ───
        El input nativo type="date" está totalmente funcional (opacity-100),
        pero un div absoluto encima muestra el texto con formato lujoso.
        El input recibe clicks y abre el date picker nativo correctamente
        en todos los navegadores (Chrome, Edge, Firefox, Safari, iOS).
        El overlay tiene pointer-events-none para no bloquear el input.
      */}
      <div className="relative w-full bg-[#0a0a0a] border border-[#333] focus-within:border-[#c9a96e] transition-colors duration-300" style={{ minHeight: '48px' }}>
        {/* Input nativo — funcional y clicable */}
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={handleInputChange}
          required={required}
          min={min}
          className="w-full bg-transparent text-transparent caret-transparent py-3 px-4 cursor-pointer"
          style={{
            fontSize: '16px', // Previene zoom en iOS
            colorScheme: 'dark',
            height: '48px',
          }}
          aria-label={label}
        />

        {/* Overlay de display — tapa el input pero deja pasar clicks */}
        <div className="absolute inset-0 flex items-center gap-3 px-4 pointer-events-none">
          <Calendar size={14} className={`flex-shrink-0 ${hasValue ? 'text-[#c9a96e]' : 'text-[#555]'}`} />
          {hasValue ? (
            <span className="text-white font-body tracking-wide">{displayText}</span>
          ) : (
            <span className="text-[#555] font-body">{placeholder}</span>
          )}
        </div>

        {/* Badge sutil cuando hay fecha */}
        {hasValue && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-[#c9a96e]/60" />
          </div>
        )}
      </div>
    </div>
  );
}
