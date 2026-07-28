import { type Experience } from '@/data/experiences';
import Link from 'next/link';

interface Props {
  experience: Experience;
}

export function ExperienceCTA({ experience }: Props) {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
        <p
          className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase font-semibold mb-4"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          Ready to Go?
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-outfit), Outfit, sans-serif' }}
        >
          Book Your{' '}
          <span
            className="italic"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              color: experience.color,
            }}
          >
            {experience.title}
          </span>
        </h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto mb-4">
          {experience.duration} · From{' '}
          <span className="text-white font-semibold">{experience.price}</span>
          {experience.priceLabel && (
            <span className="text-gray-500"> / {experience.priceLabel}</span>
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}?text=I'm interested in the ${experience.title}`}
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a96e] hover:bg-[#d4af37] text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
          >
            Book via WhatsApp
          </Link>
          <Link
            href="/#reserve"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-[#c9a96e]/50 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
          >
            Send Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}