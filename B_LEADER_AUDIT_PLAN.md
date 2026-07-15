# B LEADER — Plan de Acción: Auditoría Crítica

> Basado en auditoría del 13 Julio 2026.
> Project: `C:\Users\gabri\Desktop\new_web` · Live: https://bleader-italy.uastasiforbusiness.workers.dev

---

## NOTA DE INFRAESTRUCTURA

**Decisión**: Cloudflare Pages + Workers (gratis) con D1 database.
**Dominios personalizados**: `bleaderitaly.com` y `bleaderitaly.it` (configuración DNS pendiente).

- ✅ **Cloudflare Pages** → hosting del sitio Next.js 16 via `@opennextjs/cloudflare`
- ✅ **Cloudflare Workers** → API routes (reservas, WhatsApp webhook)
- ✅ **Cloudflare D1** → base de datos SQLite serverless (WhatsApp, reservas)
- ✅ **Meta Cloud API** → WhatsApp en producción
- ✅ **Upstash Redis** → rate limiting distribuido
- ✅ Migrar a dominio personalizado es **gratis** en Cloudflare (sin Vercel Pro)

## Fases

Cada fase es autónoma y entrega valor medible sin depender de la siguiente.

---

## FASE 0 — LIMPIEZA INICIAL (30 min)

### □ 0.1 Eliminar componentes muertos

| Archivo | Motivo |
|---|---|
| `src/components/velox/sections/fleet-section.tsx` | Reemplazado por FleetShowcase |
| `src/components/velox/sections/features-section.tsx` | 3 tarjetas "COMING SOON", no importado |
| `src/components/velox/sections/idols-gallery.tsx` | Reemplazado por FleetShowcase |
| `src/components/velox/sections/fleet-detail-section.tsx` | Reemplazado por FleetShowcase |
| `src/components/velox/sections/scroll-driven-playback.tsx` | No se usa |
| `src/components/velox/sections/coverage-section.tsx` | Verificar si se usa (sí, en home-client) — mantener |
| `src/hooks/use-mobile.ts` | No importado |
| `src/lib/utils.ts` | No importado |

**Criterio**: Que el build compile sin errores y el bundle sea ~5% más pequeño.

### □ 0.2 Arreglar keys de React en fleet-showcase

- Los `.fleet-slide` internos usan `key={car.name}` → bien.
- Verificar que no haya children sin key en los specs grid y stat rows.

### □ 0.3 Verificar existencia de `/og-image.jpg`

- Si no existe, crear un placeholder mínimo o actualizar layout.tsx para no referenciarlo.

---

## FASE 1 — RUTAS REALES (Prioridad Máxima)

> Estado actual: sitemap declara 7 URLs que NO existen como rutas en Next.js.
> Google no indexa anchors de hash. Sin rutas reales, el SEO es esencialmente cero.

### □ 1.1 Migrar contenido existente a rutas Next.js

Crear las siguientes páginas, cada una con su `page.tsx`, `generateMetadata` usando `buildPageMeta`, y el contenido extraído de los componentes actuales:

```
src/app/fleet/page.tsx            ← FleetShowcase (horizontal gallery + specs table)
src/app/yacht/page.tsx            ← YachtExperienceSection + datos de yate
src/app/services/page.tsx         ← ServiceLinesSection + CoverageSection
src/app/about/page.tsx            ← Quiénes son, historia (nuevo contenido)
src/app/locations/salento/page.tsx ← Guía de viaje (nuevo contenido)
```

**Cada página debe**:
- Usar `export const metadata = buildPageMeta({...})`
- Tener su propio JSON-LD (breadcrumbs + schema específico)
- Mantener las animaciones GSAP existentes
- Seguir existiendo en la home vía `#` anchors para scroll interno

### □ 1.2 Actualizar sitemap.ts

- Las URLs ya existirán, el sitemap debe ser dinámico y reflejar las rutas reales.
- Considerar generar desde una fuente de datos centralizada.

### □ 1.3 Checkpoint de verificación

- `GET /fleet` → 200 con HTML real
- `GET /yacht` → 200 con HTML real
- `GET /sitemap.xml` → URLs que no devuelven 404
- Lighthouse: todas las páginas indexables

---

## FASE 2 — SEO POR PÁGINA

### □ 2.1 Implementar `buildPageMeta` en todas las pages

- `page.tsx` (home): ya debería usarlo
- Fleet, Yacht, Services, About, Salento: cada una llama `buildPageMeta` con título/descripción especifica

### □ 2.2 Arreglar placeholders de seo.ts (BLOQUEADO)

**⚠️ Requires cliente**: teléfono real + email real.

- `telephone: "+39-XXX-XXXXXXX"` → valor desde `NEXT_PUBLIC_PHONE`
- `email: "info@bleader.com"` → valor desde `NEXT_PUBLIC_EMAIL`
- Debe ser consistente con `ReserveSection` que ya usa las env vars

### □ 2.3 Google Search Console verification tag

- Descomentar `verification.google` en `layout.tsx`
- Necesita el código de verificación (cliente)

---

## FASE 3 — PERFORMANCE: OPTIMIZACIÓN DE IMÁGENES

### □ 3.1 Migrar `<img>` → `next/image` en FleetShowcase

Archivos afectados:
- `src/components/velox/sections/fleet-showcase.tsx` (línea 209: `<img src={car.image}>`)
- `src/components/velox/ui/displacement-card.tsx` (si usa `<img>`)

**Requerimientos**:
- `priority` para el primer slide visible
- `placeholder="blur"` con `blurDataURL` generado con `plaiceholder` o manual
- `sizes` para responsive: `(max-width: 768px) 100vw, 50vw`

### □ 3.2 Hero canvas: lazy loading de frames

- **Problema**: 257 WebP frames cargados al montar el componente. En 3G/4G móvil puede ser ~10-15MB.
- **Fix**: Implementar carga progresiva:
  1. Frame visible inmediato → precargar primeros 5 frames
  2. Cargar batches de 30 frames por segundo mientras se reproduce
  3. Si el usuario hace scroll rápido, cancelar carga de frames no necesarios
  4. Mostar placeholder estático (first frame) hasta que el canvas esté listo

### □ 3.3 WebP de imágenes 360° bajo demanda

- Las vistas 360° (ferrari_rossa_360, ferrari_bianca_360, etc.) no se muestran actualmente en ningún componente activo → si se reactivan, lazy loading con IntersectionObserver.

---

## FASE 4 — WHATSAPP: MODO REAL CON NÚMERO DE PRUEBA

> Quieres probar con un número de prueba de Meta antes de dar la versión final al cliente.

### □ 4.1 Setup del entorno de pruebas

Meta Cloud API ofrece un **número de teléfono de prueba** para developers:

1. Ir a https://developers.facebook.com → My Apps → crear app tipo "Business"
2. Agregar producto "WhatsApp" → configurar
3. Usar el número de prueba que Meta asigna automáticamente (termina en @test)
4. Enviar mensajes desde tu WhatsApp real al número de prueba

**Variables de entorno para pruebas**:
```env
WHATSAPP_TOKEN=<token_de_prueba>
WHATSAPP_PHONE_NUMBER_ID=<id_del_numero_de_prueba>
WHATSAPP_APP_SECRET=<app_secret>
WHATSAPP_VERIFY_TOKEN=<tu_token_personal>
WHATSAPP_DEMO_MODE=false
WHATSAPP_GRAPH_API_VERSION=v21.0
```

### □ 4.2 Verificar flujo completo

1. Webhook recibe mensaje entrante (GET verification + POST message)
2. Guarda en DB con `ChatSession` + `ChatMessage`
3. Demo reply schedule funciona o se desactiva
4. Admin puede responder desde su WhatsApp y el webhook captura el outbound
5. Frontend polling trae los mensajes nuevos

### □ 4.3 Desconectar demo mode

- `DEMO_MODE = false` activa llamadas reales a Meta Cloud API
- El webhook deja de ser no-op
- Se puede eliminar `scheduleDemoReply` o mantenerlo como fallback

---

## FASE 5 — TESTS

### □ 5.1 Test de integración: `/api/reserve`

- POST con body válido → 201 + reservationId
- POST sin consent → 400
- POST con fecha pasada → 400
- POST con rate limiting excedido → 429
- Verificar que email se "envía" (mock Resend)

### □ 5.2 Test unitario: `lib/email.ts`

- Templates HTML se renderizan con datos reales
- Demo mode redirige a ADMIN_TO

### □ 5.3 Test unitario: `lib/rate-limit.ts`

- Fallback en memoria funciona
- Upstash mode funciona

### □ 5.4 Test de API: WhatsApp endpoints

- GET /api/whatsapp/messages con sessionId inválido → 404
- POST /api/whatsapp/send con body inválido → 400
- POST /api/whatsapp/send con rate limit → 429

**Herramienta sugerida**: Vitest + Supertest (ya debería ser compatible con Next.js 16)

---

## FASE 6 — UX & CONVERSIÓN

### □ 6.1 Página de FAQ

- Schema `FAQPage` en JSON-LD (aparece directo en search results)
- Preguntas clave en EN e IT:
  - "Do I need an international driver's license?"
  - "Is insurance included?"
  - "What's the deposit?"
  - "Can I drive the Ferrari myself or is there a chauffeur?"
  - "How do I pay? Credit cards accepted?"
  - "What happens if it rains on my booking day?"

### □ 6.2 Página de Testimonios

- Schema `Review` en JSON-LD
- Quotes con foto y nombre real
- Integración futura con Google Reviews

### □ 6.3 Precios en USD

- Toggle EUR↔USD en la ficha de vehículo
- Tasa almacenada en variable de entorno `NEXT_PUBLIC_USD_RATE`
- Mostrar ambos: "€890 / ~$980 USD"

### □ 6.4 i18n EN/IT (fase inicial)

- Middleware `middleware.ts` para detectar `Accept-Language`
- Ruta default `/(en)/...` y `/it/...`
- Selector de idioma en nav (bandera sutil)
- Traducción del contenido principal (hero, fleet, reserve)
- Emails bilingües según idioma detectado

---

## FASE 7 — TECH DEBT

### □ 7.1 Panel admin básico

- Ruta: `/admin/reservations`
- Listado de reservas desde Prisma
- Filtro por fecha/vehículo/estado
- Protegido por variable de entorno `ADMIN_PASSWORD` o middleware basic auth

### □ 7.2 Eliminar assets no usados de `public/`

- Los frames 360° de los vehículos que no se muestran actualmente
- 257 frames del hero son necesarios
- Los sprites del yate (`real_*.webp`) están en `data.ts` pero verificar si se usan

### □ 7.3 Analizar bundle con `next build`

- Revisar si GSAP + Framer Motion juntos son necesarios (Framer Motion solo se usa en nav y loading)
- Considerar reemplazar Framer Motion con GSAP para consistencia

---

## 📊 CRONOGRAMA ESTIMADO

| Fase | Tiempo | Dependencias |
|---|---|---|
| **F0** Limpieza | 30 min | Ninguna |
| **F1** Rutas reales | 2-3 días | Ninguna |
| **F2** SEO | 1 día | F1 terminada |
| **F3** Imágenes | 1 día | Ninguna |
| **F4** WhatsApp | 1 día + setup Meta | Número de prueba de Meta |
| **F5** Tests | 1 día | Ninguna |
| **F6** UX | 2-3 días | F1 terminada |
| **F7** Tech debt | 1 día | Ninguna |

**Total**: ~8-11 días de trabajo efectivo, algunas fases paralelizables.

---

## FLUJO DE TRABAJO RECOMENDADO

```
Semana 1:
  LUN: F0 + F1 (rutas + limpieza)
  MAR: F1 continua + F3 (imágenes)
  MIE: F2 (SEO) + setup Meta WhatsApp
  JUE: F4 (WhatsApp testing)
  VIE: F5 (tests)

Semana 2:
  LUN: F6 (FAQ, testimonios, precios USD)
  MAR: F6 continua + i18n
  MIE: F7 (admin panel + bundle)
```

---

## BLOQUEADOS / PENDIENTES DEL CLIENTE

| Item | Qué se necesita | Impacto |
|---|---|---|
| Teléfono real | Valor para `NEXT_PUBLIC_PHONE` | JSON-LD muestra placeholder |
| Email real | Valor para `NEXT_PUBLIC_EMAIL` | JSON-LD muestra placeholder |
| Dominios personalizados | Configurar DNS en Cloudflare | Branding, post-MVP |
| Google Search Console | Código de verificación | Analytics, no bloquea |
| Fotos de testimonios | Fotos reales de clientes | Conversión, post-MVP |
| FAQ oficial | Respuestas aprobadas por el cliente | Conversión, post-MVP |
| WhatsApp Business | Número real para producción | Se puede testear con número de prueba |

---

## MÉTRICAS DE ÉXITO

- [ ] `npm run build` sin errores
- [ ] Todas las rutas del sitemap devuelven 200
- [ ] Lighthouse Performance ≥ 85 en mobile (vs actual)
- [ ] WhatsApp: demo mode pasa a real con número de prueba
- [ ] Las 3 API routes tienen tests pasando
- [ ] buildPageMeta usado en todas las pages
- [ ] Sin componentes "COMING SOON" en la UI
- [ ] Bundle size reducido en ≥5% (dead code removal)
