"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";
import { HiMinus, HiPlus, HiOutlineTrash, HiChevronDown, HiChevronUp } from "react-icons/hi";

import { siteConfig } from "@/lib/config";
import { BOGO_PITA_IDS } from "@/lib/promotions";
import { menuCategories } from "@/lib/menuData";
import { useCart } from "./CartContext";

function CategorySection({
  categoryId,
  categoryName,
  items,
  isExpanded,
  onToggle,
  bogoPitaPromo,
  updateQuantity,
  removeItem,
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-neutral-50"
      >
        <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
          {categoryName}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
          {isExpanded ? (
            <HiChevronUp className="h-5 w-5 text-neutral-400" />
          ) : (
            <HiChevronDown className="h-5 w-5 text-neutral-400" />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-200 px-4 py-3">
              <ul className="space-y-3">
                {items.flatMap((item) => {
              const isUpsell = item.metadata?.isUpsellItem === true;
              const isBogoDiscounted = item.metadata?.isBogoDiscounted === true;
              
              // Check if this item is eligible for pita BOGO promotion
              const isEligiblePita = BOGO_PITA_IDS.includes(item.id);
              
              // Check if this pita item gets BOGO discount
              const pitaDiscountInfo = bogoPitaPromo?.items?.find((d) => d.id === item.id);
              const pitaDiscountQty = pitaDiscountInfo?.discountQty ?? 0;
              
              // For eligible pita items with BOGO promotion active, create separate line items
              if (isEligiblePita && bogoPitaPromo && bogoPitaPromo.discount > 0 && !isUpsell) {
                const fullPriceQty = (item.quantity ?? 1) - pitaDiscountQty;
                const discountedQty = pitaDiscountQty;
                const itemPrice = item.price ?? 0;
                const discountedPrice = itemPrice * 0.5;
                
                const lineItems = [];
                
                // Full price items
                if (fullPriceQty > 0) {
                  lineItems.push({
                    ...item,
                    quantity: fullPriceQty,
                    displayPrice: itemPrice,
                    itemTotal: itemPrice * fullPriceQty,
                    isBogoDiscounted: false,
                    isPitaFullPrice: true,
                  });
                }
                
                // Discounted items
                if (discountedQty > 0) {
                  lineItems.push({
                    ...item,
                    quantity: discountedQty,
                    displayPrice: discountedPrice,
                    itemTotal: discountedPrice * discountedQty,
                    isBogoDiscounted: true,
                    isPitaDiscounted: true,
                    originalPrice: itemPrice,
                  });
                }
                
                // Store original item quantity for quantity controls
                const originalItemQuantity = item.quantity ?? 1;
                
                return lineItems.map((lineItem, idx) => (
                  <CartItem
                    key={`${item.id}-${idx}`}
                    item={lineItem}
                    originalItem={item}
                    originalItemQuantity={originalItemQuantity}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ));
              }
              
              // Regular item rendering (non-pita BOGO items)
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
                <CartItem
                  key={item.id}
                  item={{
                    ...item,
                    displayPrice,
                    regularPrice,
                    itemTotal,
                    isUpsell,
                    isBogoDiscounted,
                  }}
                  originalItem={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                />
              );
            })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CartItem({ item, originalItem, originalItemQuantity, updateQuantity, removeItem }) {
  const isUpsell = item.metadata?.isUpsellItem === true;
  const isBogoDiscounted = item.isBogoDiscounted || item.isPitaDiscounted;
  const displayPrice = item.displayPrice ?? item.price ?? 0;
  const itemTotal = item.itemTotal ?? displayPrice * (item.quantity ?? 1);
  const quantity = originalItemQuantity ?? item.quantity ?? 1;

  return (
    <li
      className={`flex gap-3 rounded-xl border p-3 ${
        isUpsell 
          ? "border-brand-red/30 bg-brand-red/5" 
          : isBogoDiscounted
          ? "border-brand-red/20 bg-brand-red/5"
          : "border-neutral-200"
      }`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0 pr-2">
              <p className="break-words font-semibold text-sm text-brand-dark">
                {item.name}
              </p>
            </div>
            {isUpsell && (
              <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-red shrink-0">
                Add-On
              </span>
            )}
            {isBogoDiscounted && (
              <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-red shrink-0">
                50% Off
              </span>
            )}
            {item.metadata?.isUpgraded === true && (
              <span className="rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shrink-0">
                LARGE
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            {item.isPitaDiscounted && item.originalPrice && (
              <span className="text-xs text-neutral-400 line-through">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
            {isUpsell && item.metadata?.fullPriceQuantity > 0 && (
              <span className="text-xs text-neutral-400 line-through">
                ${item.regularPrice?.toFixed(2)}
              </span>
            )}
            <p className="text-xs font-medium text-brand-red">
              ${displayPrice.toFixed(2)}
            </p>
          </div>
          <div className="mt-1">
            <p className="text-xs font-semibold text-brand-dark">
              ${itemTotal.toFixed(2)}
            </p>
            {!isUpsell && (
              <p className="text-[10px] text-neutral-500">
                {item.quantity} × ${displayPrice.toFixed(2)}
              </p>
            )}
            {isUpsell && item.metadata?.fullPriceQuantity > 0 && (
              <p className="text-[10px] text-neutral-500">
                {item.metadata?.promotionalQuantity ?? 0} @ ${(item.price ?? 0).toFixed(2)} + {item.metadata?.fullPriceQuantity} @ ${item.regularPrice?.toFixed(2)}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-neutral-200">
            <button
              type="button"
              onClick={() =>
                updateQuantity(originalItem.id, Math.max(0, quantity - 1))
              }
              className="h-7 w-7 text-neutral-700 transition hover:text-brand-red"
              aria-label={`Decrease ${item.name}`}
            >
              <HiMinus className="mx-auto text-sm" />
            </button>
            <span className="min-w-[1.5rem] text-center text-xs font-semibold">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                updateQuantity(originalItem.id, quantity + 1)
              }
              className="h-7 w-7 text-neutral-700 transition hover:text-brand-red"
              aria-label={`Increase ${item.name}`}
            >
              <HiPlus className="mx-auto text-sm" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(originalItem.id)}
            className="text-neutral-400 transition hover:text-brand-red"
            aria-label={`Remove ${item.name}`}
          >
            <HiOutlineTrash className="text-base" />
          </button>
        </div>
      </div>
    </li>
  );
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    itemTotal,
    subtotalAfterDiscounts,
    tax,
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

  // State to track which category sections are expanded
  const [expandedCategories, setExpandedCategories] = useState(() => {
    // Initialize all categories as expanded
    const initial = {};
    menuCategories.forEach((cat) => {
      initial[cat.id] = true;
    });
    return initial;
  });

  // State for summary collapse (mobile only)
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const isMobileRef = useRef(false);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768;
      // Set initial summary state based on screen size
      if (isMobileRef.current) {
        setIsSummaryExpanded(false);
      } else {
        setIsSummaryExpanded(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups = {};
    
    items.forEach((item) => {
      const category = item.category || "other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    });

    // Sort categories by menu order
    const sortedGroups = {};
    menuCategories.forEach((cat) => {
      if (groups[cat.id]) {
        sortedGroups[cat.id] = groups[cat.id];
      }
    });
    
    // Add any categories not in menuCategories (like "other")
    Object.keys(groups).forEach((catId) => {
      if (!sortedGroups[catId]) {
        sortedGroups[catId] = groups[catId];
      }
    });

    return sortedGroups;
  }, [items]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const getCategoryName = (categoryId) => {
    const category = menuCategories.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

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
              <div className="space-y-4">
                {Object.entries(groupedItems).map(([categoryId, categoryItems]) => (
                  <CategorySection
                    key={categoryId}
                    categoryId={categoryId}
                    categoryName={getCategoryName(categoryId)}
                    items={categoryItems}
                    isExpanded={expandedCategories[categoryId] ?? true}
                    onToggle={() => toggleCategory(categoryId)}
                    bogoPitaPromo={bogoPitaPromo}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          <footer className="border-t border-neutral-200 px-6 py-5">
            {/* Summary Toggle Button (Mobile Only) */}
            <div className="md:hidden mb-3">
              <button
                type="button"
                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-brand-dark transition hover:bg-neutral-100"
              >
                <span>Order Summary</span>
                {isSummaryExpanded ? (
                  <HiChevronUp className="h-5 w-5 text-neutral-400" />
                ) : (
                  <HiChevronDown className="h-5 w-5 text-neutral-400" />
                )}
              </button>
            </div>

            {/* Order Summary - Collapsible on Mobile */}
            <AnimatePresence initial={false}>
              {(isSummaryExpanded || !isMobileRef.current) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 text-sm text-neutral-600">
                    <SummaryRow label="Item Total" value={`$${itemTotal.toFixed(2)}`} />
                    {bogoPitaPromo?.discount > 0 && (
                      <SummaryRow
                        label="BOGO 50% Off Pita"
                        value={`- $${bogoPitaPromo.discount.toFixed(2)}`}
                        highlight
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
                    <SummaryRow label="Subtotal" value={`$${subtotalAfterDiscounts.toFixed(2)}`} />
                    <SummaryRow label="Tax (8.875%)" value={`$${tax.toFixed(2)}`} />
                    <SummaryRow
                      label="TOTAL"
                      value={`$${total.toFixed(2)}`}
                      bold
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-4 text-xs uppercase tracking-widest text-neutral-500">
              Pickup orders only · Pay online or in-store
            </p>

            {/* Buttons - Side by side on mobile, stacked on desktop */}
            <div className="mt-4 flex flex-row gap-2 md:flex-col md:gap-3">
              <Link
                href="/order-pickup"
                onClick={closeCart}
                className="flex-1 rounded-full border border-brand-red bg-brand-red px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white shadow-md shadow-brand-red/20 transition hover:opacity-90 md:px-5 md:py-3 md:text-sm"
              >
                <span className="md:hidden">Checkout</span>
                <span className="hidden md:inline">Go to Checkout</span>
              </Link>
              {items.length > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    closeCart();
                  }}
                  className="flex-1 rounded-full border border-neutral-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 transition hover:border-brand-red hover:text-brand-red md:px-5 md:py-3 md:text-sm"
                >
                  <span className="md:hidden">Clear</span>
                  <span className="hidden md:inline">Clear Cart</span>
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

