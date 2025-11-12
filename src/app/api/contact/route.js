import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const messageId = `contact_${randomUUID()}`;

    console.info("Contact message received:", { messageId, ...body });

    return NextResponse.json({
      status: "received",
      messageId,
      message: "Message delivered. We’ll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to send your message right now. Please call Gyro Cafe directly.",
      },
      { status: 500 }
    );
  }
}

