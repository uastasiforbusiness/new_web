# B LEADER — Plan de Acción Completo

> Proyecto: `C:\Users\gabri\Desktop\new_web`
> Live: https://bleader.vercel.app
> Repo: github.com/uastasiforbusiness/new_web
> Última actualización: 13 Julio 2026
>
> **Público objetivo**: #1 Turistas USA de alto poder adquisitivo → vacaciones en Salento, Italia. #2 Público italiano local.

---

## CONFIGURACIÓN DEERFLOW RECOMENDADA

### Skills a activar

| Skill | Para qué |
|---|---|
| `frontend-design` | Implementar i18n, testimonios, FAQ, chat WhatsApp, nuevas páginas |
| `web-design-guidelines` | Revisar UX de conversión y layout antes de tocar código |
| `vercel-deploy` | Manejar deploys seguros a staging/producción |
| `code-documentation` | Documentar lo ya construido (útil porque el código no tiene comentarios) |

### Soul del agente (`AGENTS.md`)

> "Soy un desarrollador frontend senior especializado en sitios de lujo y hospitality. Stack: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4 + Prisma + GSAP. Priorizo performance, SEO y conversión. El producto es una agencia de experiencias de lujo en Salento, Italia, para público estadounidense de alto poder adquisitivo. Trato el código como si fuera parte de la marca: limpio, elegante, sin atajos. Todo el código se escribe en `C:/Users/gabri/Desktop/new_web` (montaje lectura/escritura del proyecto)."

### Modelos recomendados (ya en `config.yaml`)

| Tarea | Modelo sugerido |
|---|---|
| Código rápido / correcciones | Groq (Llama/Mixtral) o Together AI |
| Decisiones de arquitectura / razonamiento | DeepSeek (`supports_thinking: true`) |
| Tareas complejas multi-archivo | Claude Code vía ACP |

---

## 🔴 PRIORIDAD 1 — HOY/MAÑANA

### □ 1.1 Comprar dominios

| Dominio | Dónde | Año 1 | Renovación |
|---|---|---|---|
| `bleaderitaly.com` | Cloudflare ($9.77) | $9.77 | $9.77/año |
| `bleaderitaly.it` | Namecheap (~€8) | ~€8 | ~€15/año |

DNS: CNAME `@` → `cname.vercel-dns.com`

### □ 1.2 Vercel Pro ($20/mes)
Hobby NO permite dominios personalizados. Necesitas Pro sí o sí.

### □ 1.3 Google Search Console
- Verificar `bleaderitaly.com`
- Subir sitemap: `https://bleader.vercel.app/sitemap.xml`
- Request indexing de la home

### □ 1.4 Google Business Profile
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
- Falta implementar: API route para enviar/recibir, componente en frontend
- Botón flotante de WhatsApp visible en toda la web
- Los americanos en el extranjero usan mucho WhatsApp para confirmar — tenerlo roto o ausente da mala impresión

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
| `/fleet` | Flota completa con specs técnicas | "Ferrari driving experience Salento" |
| `/yacht` | Experiencias en barco (full/half day, sunset, dinner) | "yacht tour Puglia US tourists" |
| `/locations/salento` | Guía de viaje para US: cómo llegar, qué hacer, rutas costeras | "Salento luxury travel guide" |
| `/services` | Concierge, airport delivery, seguro, fotógrafo | — |
| `/about` | Quiénes son, historia, valores | — |
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
- Las reservas se guardan en la DB pero no hay forma de verlas sin PostgreSQL directo
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

□ Analytics (Vercel Analytics o Plausible)
□ Teléfono y email reales en `src/lib/seo.ts`
□ Verification tag de Google Search Console en `layout.tsx`
□ Backlinks básicos (Google Business Profile, redes)
□ Instagram @bleader.luxury
□ Schema `FAQPage` y `Review` en JSON-LD (cuando haya FAQ y testimonios)
□ Monitoreo de errores (Sentry o Vercel Error Monitoring)

---

## ✅ YA COMPLETADO

```
src/lib/seo.ts              — utility SEO con metadatos, JSON-LD (LocalBusiness + Product + Breadcrumb)
src/app/sitemap.ts          — sitemap.xml dinámico (7 URLs)
src/app/robots.ts           — robots.txt dinámico
src/app/layout.tsx          — metadataBase corregido, keywords US, JSON-LD
src/app/not-found.tsx       — 404 con branding gold
public/hero-video.mp4       — comprimido 6.1MB → 1.7MB
prisma/schema.prisma        — modelos: Reservation, ChatSession, ChatMessage
src/lib/email.ts            — sistema de emails con Resend + DEMO_MODE
src/lib/rate-limit.ts       — rate limiting Upstash Redis + fallback en memoria
src/components/velox/       — componentes UI: chat, sections, ui, animaciones GSAP
Copy renombrada de "rental" → "experience"
Git push → Vercel deploy automático
```

---

## 🗺️ ARQUITECTURA DEL PROYECTO

```
src/
├── app/
│   ├── api/reserve/route.ts     ← POST: validación Zod + rate limit + email
│   ├── _components/             ← Componentes server/page
│   │   └── home-client.tsx      ← Componente principal de la home
│   ├── layout.tsx               ← Metadata + JSON-LD + fuentes
│   ├── page.tsx                 ← Home page
│   ├── sitemap.ts               ← Sitemap dinámico
│   └── robots.ts                ← Robots dinámico
├── components/velox/
│   ├── sections/                ← Fleet, Reserve, Hero, Services, Yacht, Contact
│   ├── chat/                    ← Componentes de chat WhatsApp
│   ├── ui/                      ← Botones, inputs, cards, navbar, footer
│   ├── data.ts                  ← Datos de flota, servicios, experiencias
│   └── use-lenis.ts             ← Smooth scrolling
├── lib/
│   ├── db.ts                    ← Cliente Prisma
│   ├── email.ts                 ← Resend: sendReservationEmails
│   ├── rate-limit.ts            ← Upstash + fallback
│   └── seo.ts                   ← buildPageMeta, JSON-LD schemas
├── hooks/                       ← Custom hooks
└── scripts/                     ← Scripts de build/optimización
prisma/
└── schema.prisma                ← Modelos: Reservation, ChatSession, ChatMessage
```
