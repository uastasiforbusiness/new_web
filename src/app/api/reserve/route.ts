import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { limit } from "@/lib/rate-limit";
import { sendReservationEmails } from "@/lib/email";
import { checkOrigin } from "@/lib/csrf";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const MAX_LENGTH = 500;

// ─── Phone: digits, spaces, parens, hyphens, optional leading + ────────────
const phoneRegex = /^[+]?[\d\s().-]{5,23}$/;

const reservationSchema = z
  .object({
    car_name: z.string().trim().min(1).max(MAX_LENGTH),
    car_variant: z
      .string()
      .trim()
      .min(1, "Car variant must be at least 1 character")
      .max(MAX_LENGTH, "Car variant must be less than 500 characters")
      .regex(/^[\p{L}\p{N} \-_.]+$/iu, "Car variant contains invalid characters"),
    customer_name: z.string().trim().min(1).max(MAX_LENGTH),
    email: z.string().email().max(MAX_LENGTH),
    phone: z
      .string()
      .trim()
      .min(6, "Phone number must be at least 6 characters")
      .max(20, "Phone number must be less than 20 characters")
      .regex(phoneRegex, "Phone number contains invalid characters"),
    pickup_date: z.coerce.date(),
    return_date: z.coerce.date(),
    consent_accepted: z
      .boolean()
      .refine((value) => value === true, {
        message: "You must accept data processing consent",
      }),
    message: z.string().trim().max(MAX_LENGTH, "Message must be less than 500 characters").nullish(),
  })
  .refine((data) => data.return_date > data.pickup_date, {
    message: "Return date must be after pickup date",
    path: ["return_date"],
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return data.pickup_date >= today;
    },
    { message: "Pickup date cannot be in the past", path: ["pickup_date"] }
  );

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  try {
    // ─── CSRF protection ────────────────────────────────────────────────────
    const originCheck = checkOrigin(request);
    if (!originCheck.ok) {
      return NextResponse.json(
        { error: originCheck.error },
        { status: 403 }
      );
    }

    const ip = getClientIp(request);
    const { success } = await limit(ip);
    if (!success) {
      console.warn(`[rate-limit] IP ${ip} exceeded requests`);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ─── Parse JSON body with explicit error handling ───────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const parsed = reservationSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid request body" },
        { status: 400 }
      );
    }

    const { car_name, car_variant, customer_name, email, phone, pickup_date, return_date, consent_accepted, message } = parsed.data;

    const reservation = await db.reservation.create({
      data: {
        carName: car_name,
        carVariant: car_variant,
        customerName: customer_name,
        email,
        phone,
        pickupDate: pickup_date,
        returnDate: return_date,
        consentAccepted: consent_accepted,
        message: message ?? null,
      },
    });

    // ─── Send confirmation emails ────────────────────────────────────────
    // Must use waitUntil: in Cloudflare Workers, fire-and-forget after return
    // is NOT guaranteed to execute. The runtime may tear down the isolate
    // before the fetch to Resend completes.
    const ctx = await getCloudflareContext({ async: true });
    const waitUntil = (ctx as { waitUntil?: (p: Promise<unknown>) => void }).waitUntil;
    if (waitUntil) {
      waitUntil(
        sendReservationEmails({
          carName: car_name,
          carVariant: car_variant,
          customerName: customer_name,
          email,
          phone,
          pickupDate: pickup_date.toISOString(),
          returnDate: return_date.toISOString(),
          message,
          reservationId: reservation.id,
        }).catch((err) => {
          console.error("[email] Failed to send reservation emails:", err);
        })
      );
    } else {
      // Fallback (local dev / non-Workers runtime): block until done.
      await sendReservationEmails({
        carName: car_name,
        carVariant: car_variant,
        customerName: customer_name,
        email,
        phone,
        pickupDate: pickup_date.toISOString(),
        returnDate: return_date.toISOString(),
        message,
        reservationId: reservation.id,
      }).catch((err) => {
        console.error("[email] Failed to send reservation emails:", err);
      });
    }

    return NextResponse.json(
      { success: true, reservationId: reservation.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reservation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}