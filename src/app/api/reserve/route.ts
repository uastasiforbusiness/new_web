import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carName, carVariant, customerName, email, phone, pickupDate, returnDate, message } = body;

    // Validate required fields
    if (!carName || !carVariant || !customerName || !email || !phone || !pickupDate || !returnDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const reservation = await db.reservation.create({
      data: {
        carName,
        carVariant,
        customerName,
        email,
        phone,
        pickupDate,
        returnDate,
        message: message || null,
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
