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
    const body = await request.json();
    
    const response = await fetch(`${paymentUrl}/catering-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Catering request error:", response.status, errorText);
      return NextResponse.json(
        { error: "Unable to submit catering request. Please try again." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Catering request error:", error);
    return NextResponse.json(
      { error: "Failed to connect to payment service." },
      { status: 500 }
    );
  }
}

