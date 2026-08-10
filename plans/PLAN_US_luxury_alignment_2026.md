# Plan de Alineación — B LEADER → US Luxury 2026
*Basado en `plans/RESEARCH_US_luxury_copy_2026.md` | Ejecutable por agente fresco | 6 fases, 18 tareas | Sin cambios de arquitectura*

---

## Principios rectores (del research)

0. **Modelo de negocio confirmado por el cliente (2026-08-10)**: *pura experiencia* — NO se alquilan coches sueltos; los vehículos se venden dentro de experiencias completas (tours con conductor/itinerario). El optgroup "The supercar fleet" se eliminó del dropdown de reserva deliberadamente. Claims de About confirmadas: capitanes con licencia MASTER italiana y base en Porto Gaio.

1. **Quiet luxury register**: "say less, mean more" — especificidad > superlativos; invitaciones, no anuncios.
2. **Trust hierarchy**: Tier-1 (prensa prestigiosa, certificaciones) → Tier-2 (reseñas verificadas) → Tier-3 (señales de seguridad, concierge visible).
3. **Experiencia sobre posesión**: verb-led, sensorial, concreto; zero clichés traducidos.
4. **Slow travel / crowd avoidance / wellness** como ejes narrativos (Virtuoso 5 tendencias).
5. **Human concierge + transparencia** como diferenciadores reales vs brokers legacy.
6. **US English consistente**; italiano como seasoning deliberado, no fallback.

---

## FASE 1 — Copy crítico (alto impacto, bajo esfuerzo) — *Semana 1*

### T1.1 Reescribir Carrusel Sección 02 (`src/components/CarouselSection.tsx:23-57`)
**Objetivo**: Eliminar 4 bodies con traducción literal; pasar a verb-led + detalle sensorial único por tarjeta.
**Cambio**: Reemplazar `CAROUSEL_ITEMS` array completo.
**Nuevo patrón por item**:
```ts
{
  id: 1,
  title: "Nautical experiences",
  icon: <Anchor />,
  body: "Sail the Salento coast from Porto Gaio — anchor at Punta della Suina, swim at Porto Cesareo, finish at Santa Maria di Leuca where the seas meet. Skipper, hostess, aperitivo aboard."
}
{
  id: 2,
  title: "Weddings & Ceremonies",
  icon: <Gem />,
  body: "Your wedding: a white Ferrari spider, an olive-grove ceremony, a photographer briefed on golden hour. We coordinate cars, florals, and timing so you don't."
}
{
  id: 3,
  title: "Events & Occasions",
  icon: <Sparkles />,
  body: "Milestone birthdays, anniversaries, proposals — matched with the car that fits the moment. Chauffeur, route, and onboard details handled."
}
{
  id: 4,
  title: "Corporate & Business",
  icon: <Briefcase />,
  body: "Executive transfers and multi-car delegations across Puglia. Bilingual chauffeurs, NDA discretion, real-time coordination. No VAT invoicing noise for US clients."
}
```
**Verificación**: Leer componente en browser; confirmar que no queda "unforgettable", "deserves style", "makes the difference".

### T1.2 Limpiar About — quitar superlativos (`src/app/about/about-client.tsx:44-55`)
**Objetivo**: Sustituir claims vacíos por autoridad de lugar y hechos verificables.
**Cambios puntuales**:
- L44–48: Reemplazar *"experiences of absolute excellence… most discerning travelers… nothing less than perfection"* por:
  > *"Born in Salento, we operate the only combined supercar + flybridge fleet based in Porto Gaio. Our skippers hold Italian Master licenses; our chauffeurs average 12 years in Puglia. Every itinerary is tested by us before you arrive."*
- Values (01 Passion, 02 Exclusive Knowledge, 03 Discretion): mantener estructura, afinar descripciones a evidencia (p. ej. *"Exclusive Knowledge" → "We hold the marina slips at Porto Gaio that others waitlist for; we know which coves are swimmable at 11 AM in August."*).

### T1.3 Hero — anclar región para US (`src/components/velox/hero/hero-images.ts:10-18`)
**Cambio**: Headline + description.
```ts
headline: 'PUGLIA\'S SALENTO,',
subtitle: 'FROM THE DRIVER\'S SEAT.',
description: 'One private itinerary across land and sea — a Ferrari along the Adriatic cliffs, a sunset charter off Gallipoli, and a concierge who answers in English within two hours.',
```
**Por qué**: "Saleto" solo = desconocido; "Puglia" = marca reconocida (Fortune, Noon, 6.7M visitantes 2025).

### T1.4 ContactForm — decidir "Grazie" (`src/components/ContactForm.tsx:64-68`)
**Opción A (recomendada)**: Mantener como seasoning + glosa invisible para screen readers:
```tsx
<p className="mt-3 max-w-xs text-sm leading-7 text-sand">
  Grazie — message received. <span className="sr-only">(Thank you)</span>
  A concierge will write back within two hours, 08:00–22:00 CET.
</p>
```
**Opción B**: *"Thank you — message received."* (más safe). Decidir y aplicar coherente en `ReserveModal.tsx:64-68` (confirmation screen).

---

## FASE 2 — Infraestructura de confianza (decisiva para conversión US) — *Semana 1-2*

> **Estado 2026-08-10**: T2.1 ✅ (iconos eliminados); T2.2 ✅ (3 testimonios reales de Google, con permiso, en `src/lib/testimonials.ts`); T2.4 ✅ (página /trust en vivo, incl. política de reserva/cancelación y punto de encuentro); T2.3 ⏳ bloqueada hasta tener cobertura de prensa real.

### T2.1 Footer — iconos sociales ✅ HECHO
**Acción ejecutada**: eliminados los iconos IG/FB/YT que apuntaban a `href="#"` (`src/components/Footer.tsx`). Re-añadir cuando existan cuentas reales activas.
**Verificación**: `grep "mark: IG"` → 0 resultados; build OK.

### T2.2 Módulo Testimonios ✅ COMPONENTE LISTO — *necesita tu contenido*
**Hecho**: `src/components/Testimonials.tsx` (editorial, sin estrellas, numeración serif, docenas negras) + `src/lib/testimonials.ts` (contrato de datos, array vacío). Renderiza `null` hasta que haya 3+ citas.
**Pendiente tuyo**: exportar 3–5 conversaciones WhatsApp reales (anonimizadas: nombre + experiencia + cita de 1–3 frases + fecha). Con permiso del cliente. Pega las citas en `src/lib/testimonials.ts`.
**Wired**: homepage entre sección 05 (yate) y 06 (concierge).

### T2.3 Prensa / Media mentions ⏳ BLOQUEADA — *necesita cobertura real*
**No construido a propósito**: sin menciones reales no hay banda de logos. Outreach necesario: press kit (one-pager + imágenes + data) a 3 periodistas de travel luxury (Robb Report, Condé Nast Traveler, Forbes Travel Guide) + prensa italiana de lujo. Cuando existan 1+ menciones verificables → construir `PressLogos.tsx` y añadir a Home/About.

### T2.4 Página "How it works / Trust" ✅ HECHO
**Hecho**: `src/app/trust/page.tsx` — 3 pasos, 4 trust points, "What every charter includes" (desde `YACHT.included`), FAQ con 6 preguntas **verificables del repo** (sin nada inventado), JSON-LD `FAQPage` + breadcrumb. Enlazada desde Footer (columna Concierge: "How it works & FAQ").
**Verificación**: lint 0 errores; build OK (`/trust` estático generado).
**Pendiente tuyo** (datos operativos que no invento): detalles de seguro, política de cancelación (flexible/estricta), condiciones de depósito si las hubiera. Cuando me los des, los añado a la sección "How we earn it" y al FAQ.

---

## FASE 3 — Ajustes de posicionamiento (eliminar ruido B2B en canal leisure) — *Semana 2*

> **Estado 2026-08-10**: ✅ HECHO. `/services` es leisure (Weddings + Social Events con cross-link); `/corporate` nuevo (Corporate & Business con VAT invoicing, NDA, 40 guests); `Service` en `data.ts` etiquetado con `audience`; sitemap corregido (se eliminó `/yacht` inexistente, se añadieron rutas reales + /corporate).

---

## FASE 4 — Enriquecimiento narrativo (alineación Virtuoso 5 tendencias) — *Semana 2-3*

> **Estado 2026-08-10**: ✅ HECHO. Framing slow/wellness/crowd-avoidance añadido a `data.ts` sobre servicios existentes (sin inventar): "Paced for slow mornings", "Quiet anchorages, no beach clubs", "Shoulder-season advantage: April–June & September–October" en las 3 experiencias land y 2 sea. T4.3 (culture catalyst: ópera privada, acceso after-hours) **descartado** — requiere servicios que aún no se ofrecen; no se fabrican.

### T4.1 Wellness / Slow travel — micro-copy en experiencias marinas
**Archivos**: `src/lib/data.ts` (EXPERIENCES sea items), `src/components/YachtPackages.tsx`, `src/components/YachtIncluded.tsx`.
**Añadir a "included" / highlights**:
- *"SUP yoga at sunrise"* (opcional)
- *"Digital detox anchorages — no WiFi zones on request"*
- *"Functional nutrition menu by onboard chef"* (si aplica)
- En description de Full Day Charter: *"Designed for the slow-mo traveler: long lunches, zero itinerary pressure."*

### T4.2 Crowd avoidance — framing en experiencias terrestes
**En `data.ts` EXPERIENCES land**: añadir nota *"Shoulder-season advantage: April–June & September–October avoid July–August crowds"* (Virtuoso: 76 % eligen shoulder season).

### T4.3 Culture catalyst — "White Lotus" moments
**Nuevas experiencias opcionales** (o highlights en existentes):
- *"Private opera in a masseria courtyard"* (seasonal)
- *"After-hours access to Lecce baroque churches"*
- *"Chef's table in a 16th-century olive press"*

---

## FASE 5 — SEO / Metadata / Advisor-friendly — *Semana 3*

> **Estado 2026-08-10**: ✅ HECHO. Keywords advisor-facing en `seo.ts`; landing `/advisors` en vivo (net rates on request, 24h quotes, advisor-only channel); metadata de `/experiences` enriquecido (nombres + precios). OG por experiencia individual descartado (no hay rutas `[slug]`; las experiencias viven en `/experiences` con anclas) — se compensa con metadata de colección + OpenGraph global dinámico.

### T5.1 `src/lib/seo.ts` — ampliar keywords advisor-facing ✅
Añadidas: "luxury travel advisor Salento", "travel advisor commission Puglia experiences", "chauffeur service for travel advisors Italy", "private yacht charter for travel advisors".

### T5.2 Página `/advisors` (landing para travel advisors) ✅ HECHO
`src/app/advisors/page.tsx` — net rates on request (confidencial), 24h quote turnaround, one point of contact, advisor-only WhatsApp channel, catálogo vendible, CTA rate sheet. Enlazada desde Footer.

### T5.3 OpenGraph / Twitter cards por experiencia ⚠️ ADAPTADO
No hay páginas `[slug]` por experiencia (se renderizan en `/experiences` con anclas `#slug`). En su lugar: metadata de `/experiences` ahora lista nombres concretos + rango de precios; el OG global dinámico (`opengraph-image.tsx`) ya aplica a toda la colección. Si más adelante se crean páginas individuales, cada una llevará su propio `buildPageMeta` + `og:image`.

### T5.1 `src/lib/seo.ts` — ampliar keywords advisor-facing
Añadir: `"luxury travel advisor Salento"`, `"Virtuoso preferred partner Puglia"`, `"travel agent commission Italy experiences"`, `"concierge service Puglia for travel advisors"`.

### T5.2 Página `/advisors` (landing para travel advisors)
**Contenido**: commission structure, net rates, 24h quote turnaround, marketing assets download, dedicated advisor line (WhatsApp/email). Schema `Organization` + `Service` con `availableChannel`.

### T5.3 OpenGraph / Twitter cards por experiencia
**En `src/app/experiences/[slug]/page.tsx` (si existe) o en `ExperienceList`**: cada experiencia con su `og:image` específica (ya hay `imagePosition` en data) + description sensorial.

---

## FASE 6 — QA visual + verificación copia — *Semana 3-4*

### T6.1 Auditar US English consistency
**Buscar**: `grep -r "optimise\|colour\|favourite\|programme\|behaviour\|analyse\|realise\|localise\|personalised" src/` → pasar a US (`optimize, color, favorite, program, behavior, analyze, realize, localize, personalized`).
**Excepción**: "chauffeur" (standard), "aperitivo" (seasoning deliberado).

### T6.2 Revisar superlativos residuales
**Buscar**: `grep -ri "best\|finest\|ultimate\|perfect\|unforgettable\|absolute\|unmatched\|unrivaled\|exceptional" src/` → cada ocurrencia: ¿es claim verificable? Si no → reescribir a detalle concreto.

### T6.3 Smoke test en browser (Playwright / manual)
- Homepage: hero, 6 secciones, carrusel, CTA WhatsApp/Reserve.
- Fleet, Experiences, Services, About, Contact.
- Verificar: CTAs funcionan, modal reserva abre, WhatsApp prefill correcto, formularios envían, JSON-LD válido (Google Rich Results Test).

---

## Dependencias y orden

```
T1.1 → T1.2 → T1.3 → T1.4  (copy crítico, paralelo posible)
      ↓
T2.1 → T2.2 → T2.3 → T2.4  (trust, secuencial: necesidad de cuentas reales para T2.1)
      ↓
T3.1 → T3.2                (limpieza B2B)
      ↓
T4.1 → T4.2 → T4.3         (enriquecimiento, puede empezar en paralelo con T3)
      ↓
T5.1 → T5.2 → T5.3         (SEO/advisors)
      ↓
T6.1 → T6.2 → T6.3         (QA final)
```

---

## Entregables por fase

| Fase | Archivos modificados/nuevos | Verificación |
|------|----------------------------|--------------|
| 1 | `CarouselSection.tsx`, `about-client.tsx`, `hero-images.ts`, `ContactForm.tsx`, `ReserveModal.tsx` | Diffs + browser check |
| 2 | `Footer.tsx`, `Testimonials.tsx` (nuevo), `PressLogos.tsx` (nuevo), `trust/page.tsx` (nuevo), `Footer.tsx` link | Links reales, schema válido |
| 3 | `services/page.tsx`, `ServiceBands.tsx`, nueva `corporate/page.tsx` | Rutas separadas, no ruido B2B en leisure |
| 4 | `data.ts` (EXPERIENCES), `YachtPackages.tsx`, `YachtIncluded.tsx` | Copy enriquecido visible |
| 5 | `seo.ts`, `advisors/page.tsx` (nuevo), experiencia OG images | Keywords + advisor landing |
| 6 | Ninguno (solo verificación) | Lint + build + cf:preview + Rich Results Test |

---

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| No hay testimonios reales aún | Alta | T2.2: usar conversaciones WhatsApp anonimizadas + pedir permiso; si <3, lanzar con 2 + "More stories coming" |
| Prensa 0 menciones | Media | T2.3: outreach proactivo 3 periodistas semana 1; si no hay logos semana 2, lanzar sin banda y añadir después |
| "VAT invoicing" necesario para clientes IT | Baja | T3.1: mover a `/corporate`; mantener en data pero no renderizar en leisure |
| GSAP/animaciones rotas tras edits | Baja | Solo copy changes; T6.3 cf:preview catch |

---

## Métricas de éxito (post-launch, 30 días)

1. **Contact rate**: +25 % formularios/WhatsApp iniciados / sesiones (GA4 event `contact_initiated`).
2. **Advisor inquiries**: ≥ 5 travel advisors contactan vía `/advisors` o WhatsApp con tag "advisor".
3. **Scroll depth**: 70 %+ llegan a sección Trust/Testimonials (Hotjar/GA4 scroll).
4. **Zero superlativos** en auditoría automatizada (script grep).
5. **Rich Results**: 100 % páginas válidas (Google Search Console).

---

## Checklist rápido para agente executor

- [ ] Leer `RESEARCH_US_luxury_copy_2026.md` completo
- [ ] Fase 1: 4 edits copy (T1.1–T1.4) → `npm run lint && npm run build`
- [ ] Fase 2: Footer links + 3 componentes nuevos + trust page → test JSON-LD
- [ ] Fase 3: Split services/corporate → verificar rutas
- [ ] Fase 4: Data.ts enriquecido → rebuild
- [ ] Fase 5: SEO + advisors page → Rich Results Test
- [ ] Fase 6: Grep US English + superlativos → cf:preview smoke test
- [ ] Commit convencional: `feat(copy): align with US Luxury 2026 research` + summary

---

*Este plan es autocontenido: un agente fresco con acceso al repo puede ejecutarlo sin contexto adicional.*