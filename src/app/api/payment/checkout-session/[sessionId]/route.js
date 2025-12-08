import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const paymentUrl = process.env.NEXT_PUBLIC_payment_URL;
  const { sessionId } = await params;
  
  if (!paymentUrl) {
    return NextResponse.json(
      { error: "Payment service is not configured." },
      { status: 500 }
    );
  }

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required." },
      { status: 400 }
    );
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${paymentUrl}/checkout-session/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Checkout session error:", response.status, errorText);
      return NextResponse.json(
        { error: "Unable to fetch checkout session." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Checkout session request timeout");
      return NextResponse.json(
        { error: "Request timeout. Please try again." },
        { status: 504 }
      );
    }
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to connect to payment service." },
      { status: 500 }
    );
  }
}

