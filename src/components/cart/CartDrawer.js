"use client";

import Image from "next/image";
import Link from "next/link";
import { HiMiniXMark } from "react-icons/hi2";
import { HiMinus, HiPlus, HiOutlineTrash } from "react-icons/hi";

import { siteConfig } from "@/lib/config";
import { useCart } from "./CartContext";

export function CartDrawer() {
  const {
    items,
    isOpen,
    subtotal,
    promotion,
    bogoPitaPromo,
    totalDiscount,
    total,
    cartCount,
    updateQuantity,
    removeItem,
    closeCart,
    clearCart,
  } = useCart();

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                Pickup Only
              </p>
              <h2 className="text-lg font-semibold uppercase tracking-wide">
                Your Cart ({cartCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="rounded-full border border-neutral-200 p-2 text-neutral-700 transition hover:border-brand-red hover:text-brand-red"
            >
              <HiMiniXMark className="text-xl" />
            </button>
          </header>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="grid h-full place-items-center text-center text-sm text-neutral-500">
                <p>
                  Cart is empty. Explore the{" "}
                  <Link
                    href="/menu"
                    onClick={closeCart}
                    className="font-semibold text-brand-red underline-offset-4 hover:underline"
                  >
                    menu
                  </Link>{" "}
                  and add your favorites.
                </p>
              </div>
            ) : (
              <ul className="space-y-5">
                {items.map((item) => {
                  const isUpsell = item.metadata?.isUpsellItem === true;
                  const isBogoDiscounted = item.metadata?.isBogoDiscounted === true;
                  
                  // Calculate price for upsell items (promotional + full-price portions)
                  let displayPrice = item.price ?? 0;
                  let regularPrice = displayPrice;
                  let itemTotal = displayPrice * (item.quantity ?? 1);
                  
                  if (isUpsell) {
                    const promoPrice = item.price ?? 0; // Upsell promotional price
                    const fullPrice = item.metadata?.upsellType === "fries" ? 4.5 : 2.5;
                    const promoQty = item.metadata?.promotionalQuantity ?? (item.quantity ?? 1);
                    const fullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
                    const totalQty = promoQty + fullPriceQty;
                    
                    // Calculate total price for this item
                    itemTotal = (promoPrice * promoQty) + (fullPrice * fullPriceQty);
                    
                    // Display average price per item
                    displayPrice = totalQty > 0 ? itemTotal / totalQty : promoPrice;
                    regularPrice = fullPrice;
                  } else {
                    itemTotal = displayPrice * (item.quantity ?? 1);
                  }

                  return (
                    <li
                      key={item.id}
                      className={`flex gap-4 rounded-2xl border p-4 ${
                        isUpsell 
                          ? "border-brand-red/30 bg-brand-red/5" 
                          : isBogoDiscounted
                          ? "border-brand-red/20 bg-brand-red/5"
                          : "border-neutral-200"
                      }`}
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="160px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="text-xs uppercase tracking-wide text-neutral-500">
                                {item.category}
                              </p>
                              <p className="font-semibold text-brand-dark">
                                {item.name}
                              </p>
                            </div>
                            {isUpsell && (
                              <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-red">
                                Add-On
                              </span>
                            )}
                            {isBogoDiscounted && (
                              <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-red">
                                50% Off
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            {isUpsell && item.metadata?.fullPriceQuantity > 0 && (
                              <span className="text-xs text-neutral-400 line-through">
                                ${regularPrice.toFixed(2)}
                              </span>
                            )}
                            <p className="text-sm font-medium text-brand-red">
                              ${displayPrice.toFixed(2)}
                              {isUpsell && item.metadata?.fullPriceQuantity > 0 && (
                                <span className="ml-1 text-xs text-neutral-500">
                                  (mixed pricing)
                                </span>
                              )}
                            </p>
                          </div>
                          {/* Item Total with Calculation */}
                          <div className="mt-2">
                            <p className="text-xs font-semibold text-brand-dark">
                              Total: ${itemTotal.toFixed(2)}
                            </p>
                            {!isUpsell && (
                              <p className="mt-0.5 text-[10px] text-neutral-500">
                                {item.quantity} × ${displayPrice.toFixed(2)} = ${itemTotal.toFixed(2)}
                              </p>
                            )}
                            {isUpsell && item.metadata?.fullPriceQuantity > 0 && (
                              <p className="mt-1 text-[10px] text-neutral-500">
                                {item.metadata?.promotionalQuantity ?? 0} @ ${(item.price ?? 0).toFixed(2)} + {item.metadata?.fullPriceQuantity} @ ${regularPrice.toFixed(2)}
                              </p>
                            )}
                            {isUpsell && item.metadata?.fullPriceQuantity === 0 && (
                              <p className="mt-0.5 text-[10px] text-neutral-500">
                                {item.quantity} × ${displayPrice.toFixed(2)} = ${itemTotal.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-neutral-200">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity ?? 1) - 1)
                            }
                            className="h-8 w-8 text-neutral-700 transition hover:text-brand-red"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <HiMinus className="mx-auto text-lg" />
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity ?? 1) + 1)
                            }
                            className="h-8 w-8 text-neutral-700 transition hover:text-brand-red"
                            aria-label={`Increase ${item.name}`}
                          >
                            <HiPlus className="mx-auto text-lg" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 transition hover:text-brand-red"
                          aria-label={`Remove ${item.name}`}
                        >
                          <HiOutlineTrash className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </li>
                  );
                })}
              </ul>
            )}
          </div>

          <footer className="border-t border-neutral-200 px-6 py-5">
            <div className="space-y-3 text-sm text-neutral-600">
              <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              {bogoPitaPromo?.discount > 0 && (
                <SummaryRow
                  label="BOGO 50% Off Pitas"
                  value={`- $${bogoPitaPromo.discount.toFixed(2)}`}
                  highlight
                  message="Buy any pita, get the second 50% off"
                />
              )}
              {promotion?.discount > 0 && (
                <div>
                  <SummaryRow
                    label={promotion?.label ?? "Promo Applied"}
                    value={`- $${promotion.discount.toFixed(2)}`}
                    highlight
                    message={promotion.description}
                  />
                  {promotion?.breakdown && promotion.breakdown.length > 0 && (
                    <div className="mt-1 space-y-0.5 pl-2 text-[10px] text-neutral-500">
                      {promotion.breakdown.map((item, idx) => (
                        <p key={idx}>
                          {item.count} × {item.name} @ ${item.price.toFixed(2)} = ${item.total.toFixed(2)} (FREE)
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {totalDiscount > 0 && (
                <SummaryRow
                  label="Total Discounts"
                  value={`- $${totalDiscount.toFixed(2)}`}
                  highlight
                />
              )}
              <SummaryRow
                label="Total (Pickup)"
                value={`$${total.toFixed(2)}`}
                bold
              />
            </div>

            <p className="mt-4 text-xs uppercase tracking-widest text-neutral-500">
              Pickup orders only · Pay online or in-store
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/order-pickup"
                onClick={closeCart}
                className="block rounded-full border border-brand-red bg-brand-red px-5 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-md shadow-brand-red/20 transition hover:opacity-90"
              >
                Go to Checkout
              </Link>
              {items.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    closeCart();
                  }}
                  className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-neutral-500 transition hover:border-brand-red hover:text-brand-red"
                >
                  Clear Cart
                </button>
              ) : null}
            </div>

            <a
              href={siteConfig.deliveryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-center text-xs uppercase tracking-widest text-brand-red underline-offset-4 hover:underline"
            >
              Want delivery? Order via our partners →
            </a>
          </footer>
        </div>
      </aside>
    </div>
  );
}

function SummaryRow({ label, value, bold = false, highlight = false, message }) {
  return (
    <div>
      <div
        className={`flex items-center justify-between ${
          bold ? "font-semibold text-brand-dark" : ""
        } ${highlight ? "text-brand-red" : ""}`}
      >
        <span className="uppercase tracking-wide">{label}</span>
        <span>{value}</span>
      </div>
      {message ? (
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-red/80">
          {message}
        </p>
      ) : null}
    </div>
  );
}

