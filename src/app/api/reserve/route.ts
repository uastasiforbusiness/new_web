import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { limit } from "@/lib/rate-limit";
import { sendReservationEmails } from "@/lib/email";
import { checkOrigin } from "@/lib/csrf";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { BOOKABLE_EXPERIENCE_NAMES } from "@/lib/experiences";

const MAX_LENGTH = 500;

// ─── Phone: digits, spaces, parens, hyphens, optional leading + ────────────
const phoneRegex = /^[+]?[\d\s().-]{5,23}$/;

/**
 * Accept experience fields (preferred) or legacy car_* aliases.
 * Stored in D1 columns car_name / car_variant (experience name / category).
 */
const reservationSchema = z
  .object({
    experience_name: z.string().trim().min(1).max(MAX_LENGTH).optional(),
    experience_category: z
      .string()
      .trim()
      .min(1)
      .max(MAX_LENGTH)
      .regex(/^[\p{L}\p{N} \-_.&/]+$/iu, "Experience category contains invalid characters")
      .optional(),
    // Legacy aliases (pre-experience form)
    car_name: z.string().trim().min(1).max(MAX_LENGTH).optional(),
    car_variant: z
      .string()
      .trim()
      .min(1)
      .max(MAX_LENGTH)
      .regex(/^[\p{L}\p{N} \-_.&/]+$/iu, "Experience detail contains invalid characters")
      .optional(),
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
  .transform((data) => {
    const experienceName = data.experience_name ?? data.car_name;
    const experienceCategory = data.experience_category ?? data.car_variant;
    return {
      experience_name: experienceName,
      experience_category: experienceCategory,
      customer_name: data.customer_name,
      email: data.email,
      phone: data.phone,
      pickup_date: data.pickup_date,
      return_date: data.return_date,
      consent_accepted: data.consent_accepted,
      message: data.message,
    };
  })
  .superRefine((data, ctx) => {
    if (!data.experience_name) {
      ctx.addIssue({
        code: "custom",
        message: "Experience is required",
        path: ["experience_name"],
      });
    }
    if (!data.experience_category) {
      ctx.addIssue({
        code: "custom",
        message: "Experience category is required",
        path: ["experience_category"],
      });
    }
    if (
      data.experience_name &&
      BOOKABLE_EXPERIENCE_NAMES.length > 0 &&
      !BOOKABLE_EXPERIENCE_NAMES.includes(data.experience_name)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Please select a valid experience",
        path: ["experience_name"],
      });
    }
  })
  .refine((data) => data.return_date >= data.pickup_date, {
    message: "End date must be on or after the start date",
    path: ["return_date"],
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return data.pickup_date >= today;
    },
    { message: "Start date cannot be in the past", path: ["pickup_date"] }
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

    const {
      experience_name,
      experience_category,
      customer_name,
      email,
      phone,
      pickup_date,
      return_date,
      consent_accepted,
      message,
    } = parsed.data;

    // D1 columns remain car_name / car_variant (experience name / category).
    const reservation = await db.reservation.create({
      data: {
        carName: experience_name!,
        carVariant: experience_category!,
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
    const emailPayload = {
      experienceName: experience_name!,
      experienceCategory: experience_category!,
      customerName: customer_name,
      email,
      phone,
      pickupDate: pickup_date.toISOString(),
      returnDate: return_date.toISOString(),
      message,
      reservationId: reservation.id,
    };

    const ctx = await getCloudflareContext({ async: true });
    const waitUntil = (ctx as { waitUntil?: (p: Promise<unknown>) => void }).waitUntil;
    if (waitUntil) {
      waitUntil(
        sendReservationEmails(emailPayload).catch((err) => {
          console.error("[email] Failed to send reservation emails:", err);
        })
      );
    } else {
      // Fallback (local dev / non-Workers runtime): block until done.
      await sendReservationEmails(emailPayload).catch((err) => {
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
