import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const MAX_LENGTH = 500;
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_MAX_ENTRIES = 1000;
const rateLimitMap = new Map<string, number[]>();

function pruneRateLimitMap(now: number) {
  if (rateLimitMap.size < RATE_LIMIT_MAX_ENTRIES) return;
  for (const [key, timestamps] of rateLimitMap) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
    if (recent.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, recent);
    }
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  pruneRateLimitMap(now);
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

const reservationSchema = z
  .object({
    carName: z.string().trim().min(1).max(MAX_LENGTH),
    carVariant: z.string().trim().min(1).max(MAX_LENGTH),
    customerName: z.string().trim().min(1).max(MAX_LENGTH),
    email: z.email().max(MAX_LENGTH),
    phone: z.string().trim().min(6).max(20),
    pickupDate: z.coerce.date(),
    returnDate: z.coerce.date(),
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

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
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
        message: message ?? null,
      },
    });

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
