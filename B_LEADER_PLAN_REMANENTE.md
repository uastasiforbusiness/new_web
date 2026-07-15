# B LEADER — Plan de Acción Completo

> Proyecto: `C:\Users\gabri\Desktop\new_web`
> Live: https://bleader-italy.uastasiforbusiness.workers.dev
> Repo: github.com/uastasiforbusiness/new_web
> Ultima actualización: 13 Julio 2026
>
> **Publico objetivo**: #1 Turistas USA de alto poder adquisitivo → vacaciones en Salento, Italia. #2 Publico italiano local.

---

## 🔴 PRIORIDAD 1 — HOY/MAÑANA

### ✅ 1.1 Dominios comprados
`bleaderitaly.com` y `bleaderitaly.it` adquiridos. Pendiente configurar DNS en Cloudflare.

### □ 1.2 Google Search Console
- Verificar `bleaderitaly.com`
- Subir sitemap: `https://bleader-italy.uastasiforbusiness.workers.dev/sitemap.xml`
- Request indexing de la home

### □ 1.3 Google Business Profile
- Crear perfil "B LEADER" en Salento, Puglia
- Categoría: Car rental / Luxury experience
- Fotos: Ferrari rossa, Maserati, barco

---

## 🟠 PRIORIDAD 2 — UX & CONVERSIÓN (público USA)

> Los turistas americanos que gastan €890–2000/día necesitan sentirse seguros antes de reservar.

### □ 2.1 i18n — Inglés principal + Italiano secundario
- Rutas: `/(en)/...` (default) y `/it/...`
- Middleware de Next.js para detección automática por `Accept-Language`
- Selector de idioma sutil en el nav (banderita, nada intrusivo)
- Emails de confirmación también en el idioma detectado
- **Archivos a crear/modificar**: `middleware.ts`, `src/i18n/`, layout.tsx, nav

### □ 2.2 Página de Testimonios / Reviews
- Los americanos leen reviews antes de reservar. Crítico para conversión.
- Quotes con foto, nombre real, fecha y experiencia
- Posible integración futura con Google Reviews o TripAdvisor
- Schema `Review` en JSON-LD para estrellas en search results
- **Nueva página**: `/testimonials` + sección resumen en home

### □ 2.3 Página de FAQ
- "Do I need an international driver's license?"
- "Is insurance included?" / "What's the deposit?"
- "What happens if it rains on my booking day?"
- "Can I drive the Ferrari myself or is there a chauffeur?"
- "How do I pay? Credit cards accepted?"
- Schema `FAQPage` en JSON-LD (sale en search results directamente)
- **Nueva página**: `/faq`

### □ 2.4 Chat de WhatsApp funcional
- Schema ya existe (`ChatSession`, `ChatMessage` en Prisma)
- API routes ya implementadas (send, messages, webhook)
- Botón flotante de WhatsApp visible en toda la web
- Meta Cloud API en producción

### □ 2.5 Precios en doble moneda (EUR + USD)
- Toggle discreto EUR ↔ USD (tasa de cambio aprox., actualizable)
- Mostrar ambos en la ficha de vehículo: "€890 / ~$980 USD"
- Si se implementa Stripe después, la moneda real será la que cobre

### □ 2.6 Badges de confianza adicionales
- Si hay afiliación a cámara de comercio italiana, asociación de turismo, etc.
- "5-star rated on Google" (cuando tengas reviews)
- "Secure payment" / "Licensed & insured"

---

## 🟡 PRIORIDAD 3 — CONTENIDO & PÁGINAS NUEVAS

| Página | Propósito | Keywords target |
|---|---|---|
| `/fleet` | Flota completa con specs técnicas (ya implementado) | "Ferrari driving experience Salento" |
| `/yacht` | Experiencias en barco (ya implementado) | "yacht tour Puglia US tourists" |
| `/locations/salento` | Guía de viaje para US: cómo llegar, qué hacer, rutas costeras | "Salento luxury travel guide" |
| `/services` | Concierge, airport delivery, seguro, fotógrafo (ya implementado) | — |
| `/about` | Quiénes son, historia, valores (ya implementado) | — |
| `/blog` o `/experiences` | Contenido largo SEO: guías, rutas, experiencias | "Top 10 coastal routes Salento supercar", "Ultimate guide Ferrari Puglia" |

---

## 🟡 PRIORIDAD 4 — MEDIA & PERFORMANCE

### □ 4.1 Optimización de imágenes con `next/image`
- **AHORA**: Las imágenes de vehículos usan `<img>` nativo → sin optimización WebP automática, sin lazy loading inteligente, riesgo de CLS
- **CAMBIAR** a `<Image>` de `next/image` con:
  - `priority` en la hero image (above the fold)
  - `lazy` por defecto en el resto
  - `placeholder="blur"` o `blurDataURL` para evitar layout shift
- Archivos: `data.ts` (referencias) + componentes de fleet/cards

### □ 4.2 Carga de assets pesados
- hero-frames/ (257 WebP): lazy loading con IntersectionObserver
- loading-frames/ (60 WebP): ídem
- 360° views (Ferrari rossa, blanca, Maserati, Mercedes, Yacht): cargar bajo demanda

---

## 🟢 PRIORIDAD 5 — TECH DEBT & MANTENIMIENTO

### □ 5.1 Panel de administración (MVP)
- Las reservas se guardan en la DB pero no hay forma de verlas sin D1 directo
- Mínimo viable: listado de reservas con filtro por fecha/vehículo
- Ideal: status (pending/confirmed/completed/cancelled) + notificaciones
- **Nueva ruta**: `/admin/reservations`

### □ 5.2 Tests
- Cero tests actualmente. Para un sistema con reservas reales conviene:
- Test de integración en `/api/reserve` (validación, rate limiting, respuesta)
- Test unitario de `lib/email.ts` (plantillas, demo mode)
- Test unitario de `lib/rate-limit.ts` (fallback en memoria)

### □ 5.3 Arreglar placeholders en `seo.ts`
- Teléfono: `+39-XXX-XXXXXXX` → valor real desde `NEXT_PUBLIC_PHONE`
- Email: `info@bleader.com` → valor real desde `NEXT_PUBLIC_EMAIL`
- Consistencia con lo que ya se usa en `ReserveSection`

### □ 5.4 Completar o quitar sección "features"
- Tres tarjetas con "COMING SOON" en `data.ts` → se ven incompletas
- Opción A: ocultar la sección hasta tener contenido real
- Opción B: reemplazar con servicios reales ya operativos

### □ 5.5 `generateMetadata` en page.tsx
- `buildPageMeta` ya existe y está listo pero no se llama desde `page.tsx`
- Agregar: `export const metadata = buildPageMeta({ title, description, path: '/' })`

---

## 🔵 PRIORIDAD 6 — MANTENIMIENTO CONTINUO

□ Analytics (Cloudflare Web Analytics o Plausible)
□ Teléfono y email reales en `src/lib/seo.ts`
□ Verification tag de Google Search Console en `layout.tsx`
□ Backlinks básicos (Google Business Profile, redes)
□ Instagram @bleader.luxury
□ Schema `FAQPage` y `Review` en JSON-LD (cuando haya FAQ y testimonios)
□ Monitoreo de errores (Sentry o Cloudflare Tail Workers)

---

## ✅ YA COMPLETADO

```
src/lib/seo.ts                     — utility SEO con metadatos, JSON-LD (LocalBusiness + Product + Breadcrumb)
src/app/sitemap.ts                 — sitemap.xml dinámico (5 URLs reales)
src/app/robots.ts                  — robots.txt dinámico
src/app/layout.tsx                 — metadataBase corregido, keywords US, JSON-LD
src/app/not-found.tsx              — 404 con branding gold
src/app/opengraph-image.tsx        — OG image dinámica
src/components/velox/ui/json-ld.tsx — Componente JsonLd para inyectar schemas
src/lib/csrf.ts                    — Protección CSRF
src/lib/whatsapp.ts                — Meta Cloud API client
public/hero-video.mp4              — comprimido 6.1MB → 1.7MB
prisma/schema.prisma               — Modelos: Reservation, ChatSession, ChatMessage
src/lib/email.ts                   — Sistema de emails con Resend + DEMO_MODE
src/lib/rate-limit.ts              — Rate limiting Upstash Redis + fallback en memoria
src/components/velox/              — Componentes UI: chat, sections, ui, animaciones GSAP
API WhatsApp                       — Webhook Meta Cloud API + endpoints send/messages
Infra Cloudflare                   — Pages + Workers + D1 operando
```
