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

      {/* ─── Container del date picker ───
            El input nativo invisible captura el tap directamente.
            No usamos onClick en el div porque iOS ya abre el picker
            al tocar un <input type="date"> y causaría doble apertura. */}
      <div
        className="relative w-full bg-[#0a0a0a] border border-[#333] text-white font-body py-3 px-4 focus-within:border-[#c9a96e] transition-colors duration-300 cursor-pointer select-none"
        style={{ minHeight: '48px' }}
      >
        {/* ─── Display personalizado con formato lujoso ─── */}
        <div className="flex items-center gap-3 pointer-events-none">
          <Calendar size={14} className={`flex-shrink-0 ${hasValue ? 'text-[#c9a96e]' : 'text-[#555]'}`} />
          {hasValue ? (
            <span className="text-white font-body tracking-wide">{displayText}</span>
          ) : (
            <span className="text-[#555] font-body">{placeholder}</span>
          )}
        </div>

        {/* ─── Si tiene fecha seleccionada, mostrar un badge sutil ─── */}
        {hasValue && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-[#c9a96e]/60" />
          </div>
        )}

        {/* ─── Input nativo INVISIBLE pero funcional ───
              En iOS, al hacer tap showPicker() abre el date picker nativo.
              En desktop, el input invisible captura el click y abre el picker. */}
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={handleInputChange}
          required={required}
          min={min}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          style={{
            // En iOS, el input debe ser visible para que funcione showPicker()
            // pero lo hacemos invisible manteniendo el hit area
            fontSize: '16px', // Previene zoom en iOS
          }}
          tabIndex={0}
          aria-label={label}
        />
      </div>
    </div>
  );
}
