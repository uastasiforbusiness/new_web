import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 500;
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, number[]>();

function sanitize(s: string): string {
  return s.trim().slice(0, MAX_LENGTH);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { carName, carVariant, customerName, email, phone, pickupDate, returnDate, message } = body;

    if (!carName || !carVariant || !customerName || !email || !phone || !pickupDate || !returnDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (phone.length < 6 || phone.length > 20) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (new Date(pickupDate) >= new Date(returnDate)) {
      return NextResponse.json(
        { error: "Return date must be after pickup date" },
        { status: 400 }
      );
    }

    const reservation = await db.reservation.create({
      data: {
        carName: sanitize(carName),
        carVariant: sanitize(carVariant),
        customerName: sanitize(customerName),
        email: sanitize(email),
        phone: sanitize(phone),
        pickupDate: sanitize(pickupDate),
        returnDate: sanitize(returnDate),
        message: message ? sanitize(message) : null,
      },
    });

    return NextResponse.json(
      { success: true, reservation },
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
