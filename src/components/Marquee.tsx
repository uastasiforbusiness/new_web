const ITEMS = [
  "Ferrari California T",
  "Maserati Ghibli",
  "Mercedes E Cabrio",
  "Cranchi Atlantique 50",
  "Salento Supercar Tour",
  "Weddings · Corporate · Events",
];

/** Infinite editorial ticker — pure CSS, mirrored for a seamless loop. */
export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-line bg-coal py-5"
      aria-hidden
    >
      <div className="flex w-max animate-marquee items-center gap-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10">
            {ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-10">
                <span className="whitespace-nowrap font-display text-sm font-light uppercase tracking-[0.42em] text-sand">
                  {item}
                </span>
                <span className="diamond text-gold/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
