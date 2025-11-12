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
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-neutral-200 p-4"
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
                        <p className="text-xs uppercase tracking-wide text-neutral-500">
                          {item.category}
                        </p>
                        <p className="font-semibold text-brand-dark">
                          {item.name}
                        </p>
                        <p className="text-sm font-medium text-brand-red">
                          ${item.price.toFixed(2)}
                        </p>
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
                ))}
              </ul>
            )}
          </div>

          <footer className="border-t border-neutral-200 px-6 py-5">
            <div className="space-y-3 text-sm text-neutral-600">
              <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              {promotion?.discount ? (
                <SummaryRow
                  label={promotion?.label ?? "Promo Applied"}
                  value={`- $${promotion.discount.toFixed(2)}`}
                  highlight
                  message={promotion.description}
                />
              ) : null}
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

