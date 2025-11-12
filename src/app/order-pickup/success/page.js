import Link from "next/link";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Order Confirmed · Gyro Cafe Pickup",
};

export default function OrderPickupSuccess({ searchParams }) {
  const method = searchParams?.method ?? "pay_in_store";
  const name = searchParams?.name;
  const pickupTime = searchParams?.pickupTime;
  const orderId = searchParams?.order;

  const heading =
    method === "pay_online"
      ? "Payment Confirmed"
      : "Pickup Order Received";

  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="space-y-4 text-white">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">
            Gyro Cafe Pickup
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            {heading}
          </h1>
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            {method === "pay_online"
              ? "Your payment is secured. We’re firing up the grill so your order is ready when you arrive."
              : "We’ve got your pickup order queued. Swing by the counter and pay in-store when you arrive."}
          </p>
        </div>
      </Section>

      <Section background="white">
        <div className="space-y-6 text-sm text-neutral-600">
          {name ? (
            <p className="text-base font-semibold uppercase tracking-wide text-brand-dark">
              Thank you, {name}!
            </p>
          ) : null}
          {pickupTime ? (
            <p>
              <span className="font-semibold text-brand-dark">Pickup time:</span>{" "}
              {pickupTime}
            </p>
          ) : null}
          {orderId ? (
            <p>
              <span className="font-semibold text-brand-dark">Order ID:</span>{" "}
              {orderId}
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
            and we’ll help you out.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button href="/menu">Order More Food</Button>
            <Button href="/" variant="outline">
              Back to Home
            </Button>
          </div>

          {method === "pay_online" ? (
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              A receipt has been sent to your email from Stripe.
            </p>
          ) : (
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Pay at Gyro Cafe when you arrive. Card & cash accepted in-store.
            </p>
          )}
        </div>
      </Section>
    </main>
  );
}

