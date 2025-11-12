import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe =
  stripeSecret &&
  new Stripe(stripeSecret, {
    apiVersion: "2024-10-28",
  });

export async function POST(request) {
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.",
      },
      { status: 501 }
    );
  }

  try {
    const body = await request.json();
    const { items = [], customer = {} } = body;

    if (!items.length) {
      return NextResponse.json(
        { error: "Cart is empty. Add items before checking out." },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") ?? request.nextUrl.origin;

    const lineItems = items.map((item) => ({
      quantity: item.quantity ?? 1,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(Number(item.price ?? 0) * 100),
        product_data: {
          name: item.name,
          metadata: {
            id: item.id,
            category: item.category,
          },
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: customer.email || undefined,
      metadata: {
        pickup_name: customer.name ?? "",
        pickup_phone: customer.phone ?? "",
        pickup_time: customer.pickupTime ?? "",
      },
      success_url: `${origin}/order-pickup/success?method=pay_online&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order-pickup?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to create checkout session at the moment. Please try again or pay in-store.",
      },
      { status: 500 }
    );
  }
}

