import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const requestId = `catering_${randomUUID()}`;

    console.info("Catering inquiry received:", { requestId, ...body });

    return NextResponse.json({
      status: "received",
      requestId,
      message:
        "Thanks! Our catering team will reach out within 24 hours to confirm details.",
    });
  } catch (error) {
    console.error("Catering form error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to send your request. Please call or email Gyro Cafe directly.",
      },
      { status: 500 }
    );
  }
}

