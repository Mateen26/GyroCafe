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
    
    console.log("Calling payment service:", `${paymentUrl}/api/orders`);
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${paymentUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Order submission error:", response.status, errorText);
      return NextResponse.json(
        { 
          error: "Unable to submit order. Please try again.",
          details: response.status === 502 ? "Service temporarily unavailable" : undefined
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Order submission error:", error);
    
    // Handle specific error types
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return NextResponse.json(
        { error: "Request timed out. Please try again." },
        { status: 504 }
      );
    }
    
    if (error.message?.includes('fetch failed') || error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: "Unable to connect to payment service. Please check your connection or try again later." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to connect to payment service. Please try again later." },
      { status: 500 }
    );
  }
}

