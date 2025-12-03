"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/components/cart/CartContext";

export default function OrderPickupThankYou() {
  const [orderDetails, setOrderDetails] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // Retrieve order details from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("pendingOrder");
      if (stored) {
        try {
          setOrderDetails(JSON.parse(stored));
          // Clear the stored data after reading
          sessionStorage.removeItem("pendingOrder");
        } catch (err) {
          console.error("Failed to parse order details:", err);
        }
      }
    }
    
    // Clear cart when user returns from successful Stripe payment
    clearCart();
  }, [clearCart]);

  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="space-y-4 text-white py-10">
          <p className="text-lg uppercase tracking-[0.4em] text-white">
            Gyro Cafe Pickup
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Payment Confirmed
          </h1>
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Your payment is secured. We&apos;re firing up the grill so your order
            is ready when you arrive.
          </p>
        </div>
      </Section>

      <Section background="white">
        <div className="space-y-6 text-sm text-neutral-600 py-10">
          {orderDetails?.name ? (
            <p className="text-base font-semibold uppercase tracking-wide text-brand-dark">
              Thank you, {orderDetails.name}!
            </p>
          ) : (
            <p className="text-base font-semibold uppercase tracking-wide text-brand-dark">
              Thank you for your order!
            </p>
          )}
          {orderDetails?.pickupTime ? (
            <p>
              <span className="font-semibold text-brand-dark">Pickup time:</span>{" "}
              {orderDetails.pickupTime}
            </p>
          ) : null}
          {orderDetails?.total ? (
            <p>
              <span className="font-semibold text-brand-dark">Total paid:</span>{" "}
              ${orderDetails.total.toFixed(2)}
            </p>
          ) : null}
          <p>
            <span className="font-semibold text-brand-dark">Pickup location:</span>{" "}
            {siteConfig.address}
          </p>
          <p>
            Need to make changes? Call us at{" "}
            <a href={`tel:${siteConfig.phone}`} className="text-brand-red">
              {siteConfig.phone}
            </a>{" "}
            and we&apos;ll help you out.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button href="/menu">Order More Food</Button>
            <Button href="/" variant="outline">
              Back to Home
            </Button>
          </div>

          <p className="text-xs uppercase tracking-widest text-neutral-500">
            A receipt has been sent to your email from Stripe.
          </p>
        </div>
      </Section>
    </main>
  );
}

