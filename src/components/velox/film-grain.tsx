'use client';

export function FilmGrain() {
  return (
    <div
      className="fixed inset-0 z-[90] pointer-events-none opacity-[0.03] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

export function SvgFilters() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="heat-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="3" result="turbulence" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="heat-distortion-intense">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="4" result="turbulence" seed="3" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
