import { ImageResponse } from 'next/og';

export const alt = 'B LEADER — Luxury Driving & Yacht Experiences in Salento, Italy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Subtle gold radial glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 50% 30%, rgba(201,169,110,0.10) 0%, transparent 70%)',
          }}
        />
        {/* Top divider */}
        <div
          style={{
            width: '60%',
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
            marginBottom: 32,
          }}
        />
        {/* Brand name */}
        <div
          style={{
            fontSize: 80,
            fontStyle: 'italic',
            color: '#c9a96e',
            letterSpacing: '0.08em',
            marginBottom: 8,
            lineHeight: 1.1,
          }}
        >
          B LEADER
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: '#999',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            marginBottom: 4,
            fontWeight: 300,
          }}
        >
          Luxury Driving &amp; Yacht Experiences
        </div>
        {/* Location */}
        <div
          style={{
            fontSize: 14,
            color: '#666',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginTop: 16,
            fontWeight: 300,
          }}
        >
          Salento · Puglia · Italy
        </div>
        {/* Bottom divider */}
        <div
          style={{
            width: '40%',
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)',
            marginTop: 32,
          }}
        />
        {/* Small brand mark bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            right: 32,
            fontSize: 10,
            color: '#444',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          bleader.it
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
