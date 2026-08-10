# Plan de Alineación — B LEADER → US Luxury 2026
*Basado en `plans/RESEARCH_US_luxury_copy_2026.md` | Ejecutable por agente fresco | 6 fases, 18 tareas | Sin cambios de arquitectura*

---

## Principios rectores (del research)

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

### T2.1 Footer — enlaces sociales reales (`src/components/Footer.tsx:52-65`)
**Acción**: Reemplazar `href="#"` por URLs reales de Instagram, Facebook, YouTube. Si no existen cuentas activas → crear placeholder privado o quitar iconos (mejor sin iconos rotos que falsos).
**Verificación**: Click en cada icono abre perfil real en new tab.

### T2.2 Módulo Testimonios (nuevo componente `src/components/Testimonials.tsx`)
**Spec**:
- 3–5 tarjetas: nombre/initials, experiencia (ej. "Ferrari Grand Tour, July 2025"), cita 1–2 frases, avatar genérico.
- Fuente inicial: exportar conversaciones WhatsApp reales (anónimas), pedir permiso.
- Ubicación: Homepage (entre 05 y 06), Experiences page (antes de CTA), Fleet page (antes de CTA).
- Schema: `Review` JSON-LD automático.

### T2.3 Prensa / Media mentions (nueva sección `src/components/PressLogos.tsx`)
**Objetivo**: Tier-1 trust signals. Incluso 1–2 logos (Robb Report, Condé Nast Traveler, Departures, Virtuoso, Forbes Travel Guide) cambian la percepción.
**Acción**: Si no hay cobertura → outreach proactivo a 3 periodistas de travel luxury con press kit (one-pager + imágenes + data: 7 experiencias, 4 coches, 1 yacht, Est. 2023, Porto Gaio base). Incluir en Homepage (banda sutil) y About.

### T2.4 Página "How it works / Trust" (`src/app/trust/page.tsx` + link en footer)
**Contenido**:
- Licencias capitanes (Italian Master 200/500 GT), seguros, inspecciones yacht.
- Política de cancelación clara (flexible vs estricta por temporada).
- FAQ: depósitos, weather policy, niños, mascotas, accesibilidad.
- "Our concierge" — foto/nombre real del concierge (humaniza "person answers in 2h").
- JSON-LD `FAQPage`.

---

## FASE 3 — Ajustes de posicionamiento (eliminar ruido B2B en canal leisure) — *Semana 2*

### T3.1 Services page — separar B2B (`src/app/services/page.tsx` + `src/components/ServiceBands.tsx`)
**Problema**: *"VAT invoicing"*, *"Board-grade logistics"*, *"baptisms, communions, confirmations"* conviven con bodas/propuestas de lujo US.
**Solución**: Crear sub-página `/services/corporate` (o `/corporate`) y mover ahí:
- Corporate & Business service completo
- VAT invoicing, fleet coordination 40 guests, NDA-grade
**En `/services` (leisure)**: solo Weddings + Social Events, copy refinada para US (baptisms/communions → "milestone celebrations: birthdays, anniversaries, religious ceremonies").

### T3.2 Carrusel item 4 (Corporate) — ya corregido en T1.1 (quitado "VAT invoicing" del body leisure).

---

## FASE 4 — Enriquecimiento narrativo (alineación Virtuoso 5 tendencias) — *Semana 2-3*

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