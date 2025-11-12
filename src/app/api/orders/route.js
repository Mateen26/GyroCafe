import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const orderId = `pickup_${randomUUID()}`;

    console.info("Pickup order received (pay in-store):", {
      orderId,
      ...body,
    });

    return NextResponse.json({
      status: "received",
      orderId,
      message:
        "Order received. Please pay in-store when you arrive at Gyro Cafe.",
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to process your order right now. Please call Gyro Cafe directly.",
      },
      { status: 500 }
    );
  }
}

