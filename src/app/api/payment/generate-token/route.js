import { NextResponse } from "next/server";

export async function POST(request) {
  const paymentUrl = process.env.NEXT_PUBLIC_payment_URL;
  
  if (!paymentUrl) {
    return NextResponse.json(
      { error: "Payment service is not configured." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${paymentUrl}/generate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Token generation error:", response.status, errorText);
      return NextResponse.json(
        { error: "Unable to generate payment token." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json(
      { error: "Failed to connect to payment service." },
      { status: 500 }
    );
  }
}

