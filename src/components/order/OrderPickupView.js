"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/Button";
import { CheckoutForm } from "@/components/CheckoutForm";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/components/cart/CartContext";
import { getApiEndpoint, getOrdersApiEndpoint } from "@/lib/utils";

function formatCurrency(value) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value ?? 0);
}

export default function OrderPickupView() {
  const router = useRouter();
  const {
    items,
    itemTotal,
    subtotalAfterDiscounts,
    tax,
    total,
    promotion,
    bogoPitaPromo,
    cartCount,
    clearCart,
    openCart,
  } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (form) => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        customer: form,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
        })),
        totals: { 
          itemTotal, 
          subtotalAfterDiscounts, 
          tax, 
          total, 
          promotion,
          bogoPitaPromo 
        },
      };

      if (form.paymentMethod === "pay_online") {
        // Step 1: Generate token (uses proxy on Vercel, direct on other hosts)
        const tokenResponse = await fetch(getApiEndpoint('generate-token'), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!tokenResponse.ok) {
          const errorData = await tokenResponse.json().catch(() => ({}));
          throw new Error(
            errorData.error || "Unable to initialize payment. Please try again."
          );
        }

        const tokenData = await tokenResponse.json();
        if (!tokenData?.token) {
          throw new Error("Payment token unavailable. Please try again.");
        }

        // Step 2: Create checkout session directly from backend
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const checkoutPayload = {
          item: `Gyro Cafe Order - ${items.length} item${items.length > 1 ? "s" : ""}`,
          amount: total,
          status: "pending",
          token: tokenData.token,
          success_url: `${origin}/order-pickup/thank-you`,
          cancel_url: `${origin}/order-pickup?canceled=1`,
          notes: form.notes,
          tax: tax,
          subtotal: subtotalAfterDiscounts,
          itemTotal: itemTotal,
          orderItems: items.map((item) => ({
            itemId: item.id,
            quantity: item.quantity ?? 1,
            unit: "pieces",
            unitPrice: item.price,
          })),
        };

        const checkoutResponse = await fetch(getApiEndpoint('checkout'), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(checkoutPayload),
        });

        if (!checkoutResponse.ok) {
          const errorData = await checkoutResponse.json().catch(() => ({}));
          throw new Error(
            errorData.error || "Unable to start secure checkout. Please try again."
          );
        }

        const checkoutData = await checkoutResponse.json();
        if (checkoutData?.url) {
          // Store order details in sessionStorage for thank-you page
          if (typeof window !== "undefined") {
            sessionStorage.setItem(
              "pendingOrder",
              JSON.stringify({
                name: form.name,
                pickupTime: form.pickupTime,
                email: form.email,
                phone: form.phone,
                total,
              })
            );
            // Store receipt data for PDF download
            sessionStorage.setItem(
              "orderReceipt",
              JSON.stringify({
                orderNumber: checkoutData?.id || "Pending",
                customerName: form.name,
                customerEmail: form.email,
                pickupTime: form.pickupTime,
                total,
                items,
                itemTotal,
                subtotalAfterDiscounts,
                tax,
                promotion,
                bogoPitaPromo,
              })
            );
          }
          window.location.href = checkoutData.url;
          return;
        }
        throw new Error("Checkout session unavailable. Contact support.");
      }

      // Pay in store flow (uses proxy on Vercel, direct on other hosts)
      const response = await fetch(getOrdersApiEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to submit order. Please call the restaurant.");
      }

      const data = await response.json();
      clearCart();
      
      // Handle both new and old response formats
      const orderId = data?.orderNumber ?? data?.orderId ?? "";
      const customerName = data?.customer?.name ?? form.name ?? "";
      const customerEmail = data?.customer?.email ?? form.email ?? "";
      
      // Store order details in sessionStorage for receipt
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "orderReceipt",
          JSON.stringify({
            orderNumber: orderId,
            customerName,
            customerEmail,
            pickupTime: form.pickupTime,
            total,
            items,
            itemTotal,
            subtotalAfterDiscounts,
            tax,
            promotion,
            bogoPitaPromo,
          })
        );
      }
      
      const params = new URLSearchParams({
        method: "pay_in_store",
        order: orderId,
        name: customerName,
        email: customerEmail,
        pickupTime: form.pickupTime,
      });
      router.push(`/order-pickup/success?${params.toString()}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="space-y-4 text-white py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">
            Pickup Orders Only
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Order Pickup · Gyros, The Cafe Way
          </h1>
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Build your order, apply our current promo, and choose to pay online
            or when you arrive at {siteConfig.address}. The grill is hot, the
            sauces are ready.
          </p>
          <div className="flex flex-wrap gap-3 pt-2 text-xs uppercase tracking-[0.3em] text-white/70">
            <span className="rounded-full border border-white/30 px-3 py-1">
              Promo: {promotion?.headline ?? "None"}
            </span>
            <span className="rounded-full border border-white/30 px-3 py-1">
              Items in Cart: {cartCount}
            </span>
            <span className="rounded-full border border-white/30 px-3 py-1">
              Pickup Only
            </span>
          </div>
        </div>
      </Section>

      <Section background="white">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] py-20">
            <div className="space-y-6">
              <header className="space-y-2">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-dark">
                  Checkout Details
                </h2>
                <p className="text-sm text-neutral-600">
                  Confirm your pickup info, choose payment method, and you&apos;re
                  set. We&apos;ll have your order ready at the counter.
                </p>
              </header>
              {error ? (
                <div className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-4 py-3 text-sm font-semibold text-brand-red">
                  {error}
                </div>
              ) : null}
              <CheckoutForm
                itemTotal={itemTotal}
                subtotalAfterDiscounts={subtotalAfterDiscounts}
                tax={tax}
                total={total}
                promotion={promotion}
                bogoPitaPromo={bogoPitaPromo}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
              />
            </div>

            <aside className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold uppercase tracking-wide text-brand-dark">
                  Order Summary
                </h2>
                <Button onClick={openCart} variant="outline">
                  Edit Cart
                </Button>
              </div>
              <CartItemList items={items} />
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 text-sm text-neutral-600">
                <p className="font-semibold uppercase tracking-wide text-brand-dark">
                  Promo Details
                </p>
                <p className="mt-2">
                  {promotion?.description ??
                    "Promotions apply automatically to eligible pickup items."}
                </p>
              </div>
            </aside>
          </div>
        )}
      </Section>
    </main>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-6 text-center py-20">
      <div className="relative h-40 w-40 opacity-80">
        <Image
          src="/slideshow/chicken gyro pita.png"
          alt="Empty cart illustration"
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-dark">
          Your cart is empty
        </h2>
        <p className="text-sm text-neutral-600">
          Explore the menu and load up on platters, wraps, sides, and SAÜCED
          bottles.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/menu">View Menu</Button>
        <Button href={siteConfig.deliveryUrl} external variant="outline">
          Prefer Delivery?
        </Button>
      </div>
    </div>
  );
}

function CartItemList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-3xl border border-neutral-200 p-4"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="flex flex-1 items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                {item.category}
              </p>
              <p className="text-sm font-semibold text-brand-dark">{item.name}</p>
              <p className="text-xs text-neutral-500">
                Qty: {item.quantity} · Each {formatCurrency(item.price)}
              </p>
            </div>
            <span className="text-sm font-semibold text-brand-red">
              {formatCurrency(item.price * (item.quantity ?? 1))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

