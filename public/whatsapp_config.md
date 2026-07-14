# B LEADER — WhatsApp API Configuration
# ======================================

## Cloudflare Secrets (ya configurados en el Worker)

| Variable | Valor |
|---|---|
| WHATSAPP_TOKEN | EAAOeA96l2dgBR9JGLTgWtDXjwZC69Ta2uH8O5Bn8tVIajJ0OzxIZCozy4gGMswm2pZCeQZAf8D9ey2C1iXTonsEm4c2F2RiYVwfb4TxNwL9nW7W5PbuUVBKrjYUnbZA6GrfibxnftZCqkGaFBl4P9LYZArZAUM1mHVv86FUB9way5ZBB6KFFwK362In2NuiQYy6DAuqRFoHBgTsMew9nBTYSFgh4zzGF1x0DwwH9TIBZBlr89mtWy5jwTeqJ8oZCh9Icqwu7A7WnHtdxbqrAjB6HvVraanF |
| WHATSAPP_PHONE_NUMBER_ID | 1132642966608993 |
| WHATSAPP_APP_SECRET | eb27f2c85199ef00df1f8ffdb9d3b618 |
| WHATSAPP_VERIFY_TOKEN | bleader_webhook_2024 |

## Meta Dashboard — Webhook Configuración

Callback URL:
  https://bleader-italy.uastasiforbusiness.workers.dev/api/whatsapp/webhook

Verify Token:
  bleader_webhook_2024

Eventos a suscribir:
  messages

## Meta Dashboard — API Setup

Graph API Version: v25.0

Número de prueba: configurar en Meta Dashboard → WhatsApp → API Setup → Manage phone number list

## URL en Producción

https://bleader-italy.uastasiforbusiness.workers.dev

## Cómo probar

1. Añade tu número (+39...) como destinatario en Meta API Setup
2. Envía un mensaje de WhatsApp al número de prueba de Meta
3. El webhook recibirá el mensaje y lo guardará en D1
4. El concierge puede responder desde su WhatsApp

## Cambiar de vuelta a DEMO MODE

Para modo demo sin WhatsApp real, eliminar la variable WHATSAPP_TOKEN:
  npx wrangler secret delete WHATSAPP_TOKEN
