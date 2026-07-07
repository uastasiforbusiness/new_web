'use client';

/**
 * BackgroundAurora — Fondo ambiental animado sutil.
 * Un gradient mesh de tonos dorados que se mueve lentamente.
 * Totalmente no-interactivo (pointer-events: none), z-index: 0.
 * Acompañado de noise overlay para textura de grano fino.
 * Usa las clases CSS definidas en globals.css.
 */
export function BackgroundAurora() {
  return (
    <>
      {/* Aurora ambiental — posición fixed, detrás de todo */}
      <div className="aurora-bg" aria-hidden="true" />

      {/* Ruido sutil overlay — textura de grano fino */}
      <div className="noise-overlay" aria-hidden="true" />
    </>
  );
}
