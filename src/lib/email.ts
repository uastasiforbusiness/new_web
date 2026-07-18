import { Resend } from 'resend';

// ─── Graceful init: null when API key is missing (mirrors rate-limit.ts) ───
const resend: Resend | null =
  process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
const ADMIN_TO = process.env.RESEND_ADMIN_TO || 'uastasiforbusiness@gmail.com';

/**
 * Normalize FROM into a valid RFC 5322 "Name <email@domain>" string.
 * Accepts either a bare email ("foo@bar.com") or "Name <foo@bar.com>".
 * Prevents double-wrapping when FROM already includes a display name.
 */
function formatFrom(raw: string): string {
  const trimmed = raw.trim();
  const match = trimmed.match(/^([^<]*)<([^>]+)>$/);
  if (match) {
    // Already in "Name <email>" form — keep as-is (normalize whitespace).
    const name = match[1].trim();
    const email = match[2].trim();
    return name ? `${name} <${email}>` : email;
  }
  // Bare email — return as-is, Resend accepts it.
  return trimmed;
}

const FROM_FORMATTED = formatFrom(FROM);

// ─── DEMO MODE ──────────────────────────────────────────────────────────────
// When true, ALL emails go to ADMIN_TO regardless of the customer's address.
// Required because onboarding@resend.dev can only send to the account owner.
// Set RESEND_DEMO_MODE=false once you verify your own domain.
const DEMO_MODE = process.env.RESEND_DEMO_MODE !== 'false';

// ─── Types ──────────────────────────────────────────────────────────────────
export interface ReservationEmailData {
  carName: string;
  carVariant: string;
  customerName: string;
  email: string;
  phone: string;
  pickupDate: string;   // ISO string
  returnDate: string;   // ISO string
  message?: string | null;
  reservationId: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
function fmt(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

// ─── HTML templates ─────────────────────────────────────────────────────────
function customerHtml(d: ReservationEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,sans-serif;color:#fff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#111;border:1px solid #222;">
    <tr>
      <td style="padding:32px 40px 0;text-align:center;">
        <p style="font-size:11px;letter-spacing:0.5em;color:#c9a96e;margin:0;">B LEADER</p>
        <h1 style="font-size:28px;font-weight:300;margin:12px 0 4px;">Reservation Received</h1>
        <p style="font-size:14px;color:#888;margin:0;">Your concierge will confirm within 1 hour.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #222;padding-top:24px;">
          <tr>
            <td style="padding:8px 0;color:#888;font-size:12px;letter-spacing:0.1em;">VEHICLE</td>
            <td style="padding:8px 0;text-align:right;font-size:14px;">${d.carName} <span style="color:#888;">— ${d.carVariant}</span></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#888;font-size:12px;letter-spacing:0.1em;">PICKUP</td>
            <td style="padding:8px 0;text-align:right;font-size:14px;">${fmt(d.pickupDate)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#888;font-size:12px;letter-spacing:0.1em;">RETURN</td>
            <td style="padding:8px 0;text-align:right;font-size:14px;">${fmt(d.returnDate)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#888;font-size:12px;letter-spacing:0.1em;">REFERENCE</td>
            <td style="padding:8px 0;text-align:right;font-size:14px;color:#c9a96e;">#${d.reservationId.slice(-8)}</td>
          </tr>
        </table>
        ${d.message ? `<p style="color:#888;font-size:13px;margin-top:20px;padding:12px;background:#0a0a0a;border-left:2px solid #c9a96e;">"${d.message.replace(/"/g, '&quot;')}"</p>` : ''}
      </td>
    </tr>
    <tr>
      <td style="padding:24px 40px 32px;text-align:center;border-top:1px solid #222;">
        <p style="font-size:12px;color:#555;margin:0;">Thank you for choosing B Leader.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function adminHtml(d: ReservationEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:system-ui,sans-serif;color:#fff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#111;border:1px solid #333;">
    <tr>
      <td style="padding:32px 40px 0;text-align:center;">
        <p style="font-size:11px;letter-spacing:0.5em;color:#c9a96e;margin:0;">NEW RESERVATION</p>
        <h1 style="font-size:24px;font-weight:300;margin:12px 0 4px;">Concierge Notification</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:6px 0;color:#888;font-size:12px;">Name</td>
            <td style="padding:6px 0;text-align:right;">${d.customerName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:12px;">Email</td>
            <td style="padding:6px 0;text-align:right;"><a href="mailto:${d.email}" style="color:#c9a96e;">${d.email}</a></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:12px;">Phone</td>
            <td style="padding:6px 0;text-align:right;"><a href="tel:${d.phone}" style="color:#c9a96e;">${d.phone}</a></td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:12px;">Vehicle</td>
            <td style="padding:6px 0;text-align:right;">${d.carName} — ${d.carVariant}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:12px;">Pickup</td>
            <td style="padding:6px 0;text-align:right;">${fmt(d.pickupDate)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:12px;">Return</td>
            <td style="padding:6px 0;text-align:right;">${fmt(d.returnDate)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#888;font-size:12px;">ID</td>
            <td style="padding:6px 0;text-align:right;color:#c9a96e;">${d.reservationId}</td>
          </tr>
        </table>
        ${d.message ? `<p style="color:#bbb;font-size:13px;margin-top:16px;padding:12px;background:#0a0a0a;border-left:2px solid #c9a96e;">"${d.message.replace(/"/g, '&quot;')}"</p>` : ''}
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Public API ─────────────────────────────────────────────────────────────
export async function sendReservationEmails(data: ReservationEmailData): Promise<void> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping emails');
    return;
  }

  // In demo mode, force all recipients to ADMIN_TO (account owner).
  // This bypasses the resend.dev "only send to yourself" restriction.
  const customerTo = DEMO_MODE ? ADMIN_TO : data.email;

  try {
    const customer = await resend.emails.send({
      from: FROM_FORMATTED,
      to: [customerTo],
      subject: `Your B Leader Reservation — #${data.reservationId.slice(-8)}`,
      html: customerHtml(data),
    });

    const admin = await resend.emails.send({
      from: FROM_FORMATTED,
      to: [ADMIN_TO],
      subject: `New Reservation: ${data.customerName} — ${data.carName}`,
      html: adminHtml(data),
    });

    // Resend SDK does NOT throw on 4xx — errors come back in `.error`.
    if (customer.error || admin.error) {
      console.error(
        `[email] Resend API error for reservation ${data.reservationId.slice(-8)}:`,
        'customer:', customer.error,
        'admin:', admin.error
      );
      return;
    }

    if (DEMO_MODE) {
      console.log(
        `[email][DEMO] Both emails routed to ${ADMIN_TO} — customer id: ${customer.data?.id}, admin id: ${admin.data?.id}`
      );
    } else {
      console.log(`[email] Sent 2 emails for reservation ${data.reservationId.slice(-8)}`);
    }
  } catch (err) {
    console.error('[email] Failed to send reservation emails:', err);
    // Intentionally non-throwing — DB record is the source of truth
  }
}
