import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { limit } from "@/lib/rate-limit";
import { sendReservationEmails } from "@/lib/email";
import { checkOrigin } from "@/lib/csrf";

const MAX_LENGTH = 500;

// ─── Phone: digits, spaces, parens, hyphens, optional leading + ───────────
const phoneRegex = /^[+]?[\d\s().-]{5,23}$/;

const reservationSchema = z
  .object({
    carName: z.string().trim().min(1).max(MAX_LENGTH),
    carVariant: z.string().trim().min(1).max(MAX_LENGTH),
    customerName: z.string().trim().min(1).max(MAX_LENGTH),
    email: z.string().email().max(MAX_LENGTH),
    phone: z
      .string()
      .trim()
      .min(6)
      .max(20)
      .regex(phoneRegex, "Phone number contains invalid characters"),
    pickupDate: z.coerce.date(),
    returnDate: z.coerce.date(),
    consentAccepted: z.boolean().refine((value) => value === true, {
      message: "You must accept data processing consent",
    }),
    message: z.string().trim().max(MAX_LENGTH).nullish(),
  })
  .refine((data) => data.returnDate > data.pickupDate, {
    message: "Return date must be after pickup date",
    path: ["returnDate"],
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return data.pickupDate >= today;
    },
    { message: "Pickup date cannot be in the past", path: ["pickupDate"] }
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
      return NextResponse.json({ error: originCheck.error }, { status: 403 });
    }

    const ip = getClientIp(request);

    const { success } = await limit(ip);
    if (!success) {
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
      carName,
      carVariant,
      customerName,
      email,
      phone,
      pickupDate,
      returnDate,
      consentAccepted,
      message,
    } = parsed.data;

    const reservation = await db.reservation.create({
      data: {
        carName,
        carVariant,
        customerName,
        email,
        phone,
        pickupDate,
        returnDate,
        consentAccepted,
        consentAcceptedAt: new Date(),
        message: message ?? null,
      },
    });

    // ─── Send confirmation emails (fire-and-forget, never blocks response) ─
    sendReservationEmails({
      carName,
      carVariant,
      customerName,
      email,
      phone,
      pickupDate: pickupDate.toISOString(),
      returnDate: returnDate.toISOString(),
      message,
      reservationId: reservation.id,
    }).catch(() => { /* already handled inside */ });

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
