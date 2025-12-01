import { activePromotions } from "./promotionsConfig";

const defaultEligibleCategories = [
  "platters",
  "wraps",
  "naanwich",
  "vegetarian",
  "sides",
  "sauced",
];

export const promotionConfig = {
  active: false, // Disabled - using specific pita and gyro promotions instead
  type: "bogo", // "bogo", "second_half_off", or null
  eligibleCategories: defaultEligibleCategories,
  label: "Pickup Promo",
  headline: "Buy 1, Get 1 Free",
  description: "Cheapest eligible item is free when you grab two or more.",
};

// BOGO 50% Off Pita Sandwiches Promo
export const BOGO_PITA_IDS = [
  "chicken-gyro-pita",
  "lamb-gyro-pita",
  "mix-gyro-pita",
  "falafel-pita",
  "kofta-kebab-pita",
  "fish-pita",
];

/**
 * Check if an item qualifies for gyro promotion
 * Applies to: chicken gyro, lamb gyro, mix gyro, falafel, fish, hummus, kofta (platters only)
 * Excludes pita items (they get pita promotion) and items with modifiers like "w/ Fries"
 */
function isGyroItem(item) {
  const name = (item.name || "").toLowerCase();
  const id = (item.id || "").toLowerCase();
  const category = (item.category || "").toLowerCase();
  
  // Must be a platter
  if (category !== "platters") {
    return false;
  }
  
  // Exclude pita items (they get pita promotion)
  if (id.includes("pita") || name.includes("pita")) {
    return false;
  }
  
  // Exclude items with modifiers like "w/ Fries" or "w/ fries"
  if (name.includes("w/") || name.includes("with fries") || name.includes("with fries")) {
    return false;
  }
  
  // Check for gyro items (chicken gyro, lamb gyro, mix gyro)
  if (name.includes("gyro")) {
    return true;
  }
  
  // Check for falafel items
  if (id.includes("falafel") || name.includes("falafel")) {
    return true;
  }
  
  // Check for fish items
  if (id.includes("fish") || name.includes("fish")) {
    return true;
  }
  
  // Check for hummus items
  if (id.includes("hummus") || name.includes("hummus")) {
    return true;
  }
  
  // Check for kofta items
  if (id.includes("kofta") || name.includes("kofta")) {
    return true;
  }
  
  return false;
}

/**
 * Calculate BOGO 50% off gyro items promo
 * For every 2 eligible gyro items, the 2nd one gets 50% off
 * Applies to: chicken gyro, lamb gyro, mix gyro, falafel gyro, fish gyro, hummus gyro
 */
export function calculateBogoGyroPromo(cartItems, fulfillmentType = "pickup") {
  // Only active for pickup orders
  if (fulfillmentType !== "pickup") {
    return { discount: 0, items: [] };
  }

  // Filter eligible gyro items (excluding pita items)
  const eligibleGyros = cartItems.filter((item) => isGyroItem(item));

  // Expand items by quantity to check total eligible quantity
  const expanded = eligibleGyros.flatMap((item) =>
    Array.from({ length: item.quantity ?? 1 }, () => ({
      ...item,
      quantity: 1,
      originalQuantity: item.quantity ?? 1,
    }))
  );

  // Need at least 2 eligible items (by quantity, not unique items)
  if (expanded.length < 2) {
    return { discount: 0, items: [] };
  }

  // Calculate how many get discounted (every 2nd one)
  const discountedCount = Math.floor(expanded.length / 2);

  if (discountedCount === 0) {
    return { discount: 0, items: [] };
  }

  // Sort by price descending (discount cheaper ones last)
  const sorted = [...expanded].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

  // Group by original item ID to track which items get discounted
  const itemDiscounts = {};
  let remaining = discountedCount;

  for (let i = sorted.length - 1; i >= 0 && remaining > 0; i--) {
    const item = sorted[i];
    const key = item.id;

    if (!itemDiscounts[key]) {
      itemDiscounts[key] = 0;
    }

    itemDiscounts[key]++;
    remaining--;
  }

  // Calculate total discount
  let totalDiscount = 0;
  for (const [itemId, discountQty] of Object.entries(itemDiscounts)) {
    const originalItem = eligibleGyros.find((g) => g.id === itemId);
    if (originalItem) {
      totalDiscount += (originalItem.price ?? 0) * 0.5 * discountQty;
    }
  }

  return {
    discount: Number(totalDiscount.toFixed(2)),
    items: Object.entries(itemDiscounts).map(([id, qty]) => ({ id, discountQty: qty })),
  };
}

/**
 * Calculate BOGO 50% off pita sandwiches promo
 * For every 2 eligible pitas, the 2nd one (by order added) gets 50% off
 * This uses order-based discounting, not price-based, to ensure consistent behavior
 */
export function calculateBogoPitaPromo(cartItems, fulfillmentType = "pickup") {
  // Only active for pickup orders
  if (fulfillmentType !== "pickup") {
    return { discount: 0, items: [] };
  }

  // Filter eligible pitas (preserve cart order)
  const eligiblePitas = cartItems.filter(
    (item) => BOGO_PITA_IDS.includes(item.id)
  );

  // Expand items by quantity while preserving order
  // Each item is expanded in the order it appears in the cart
  const expanded = eligiblePitas.flatMap((item) =>
    Array.from({ length: item.quantity ?? 1 }, () => ({
      ...item,
      quantity: 1,
      originalQuantity: item.quantity ?? 1,
    }))
  );

  // Need at least 2 eligible items (by quantity, not unique items)
  if (expanded.length < 2) {
    return { discount: 0, items: [] };
  }

  // Calculate how many get discounted (every 2nd one: 2nd, 4th, 6th, etc.)
  const discountedCount = Math.floor(expanded.length / 2);

  if (discountedCount === 0) {
    return { discount: 0, items: [] };
  }

  // Group by original item ID to track which items get discounted
  const itemDiscounts = {};

  // Process items in order: every 2nd item (index 1, 3, 5, etc.) gets discounted
  // This ensures the 2nd item added gets 50% off, not based on price
  for (let i = 1; i < expanded.length; i += 2) {
    const item = expanded[i];
    const key = item.id;

    if (!itemDiscounts[key]) {
      itemDiscounts[key] = 0;
    }

    itemDiscounts[key]++;
  }

  // Calculate total discount
  let totalDiscount = 0;
  for (const [itemId, discountQty] of Object.entries(itemDiscounts)) {
    const originalItem = eligiblePitas.find((p) => p.id === itemId);
    if (originalItem) {
      totalDiscount += (originalItem.price ?? 0) * 0.5 * discountQty;
    }
  }

  return {
    discount: Number(totalDiscount.toFixed(2)),
    items: Object.entries(itemDiscounts).map(([id, qty]) => ({ id, discountQty: qty })),
  };
}

const formatCurrency = (value) =>
  Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value
  );

export function calculatePromotion(cartItems, config = promotionConfig) {
  if (!config?.active || !config?.type) {
    return {
      discount: 0,
      message: null,
      label: config?.label ?? null,
      type: null,
    };
  }

  const eligible = expandItems(
    cartItems.filter((item) =>
      config.eligibleCategories.includes(item.category)
    )
  );

  if (!eligible.length) {
    return { discount: 0, message: null, label: config.label, type: null };
  }

  let discount = 0;

  if (config.type === "bogo") {
    const freeItemCount = Math.floor(eligible.length / 2);
    const sortedByPrice = [...eligible].sort((a, b) => a.price - b.price);
    const freeItems = sortedByPrice.slice(0, freeItemCount);
    discount = freeItems.reduce((sum, item) => sum + item.price, 0);
    
    // Group free items by name and price for breakdown
    const freeItemsBreakdown = freeItems.reduce((acc, item) => {
      const key = `${item.name}-${item.price}`;
      if (!acc[key]) {
        acc[key] = { name: item.name, price: item.price, count: 0 };
      }
      acc[key].count++;
      return acc;
    }, {});
    
    return {
      discount: Number(discount.toFixed(2)),
      message: `${config.headline}: -${formatCurrency(discount)}`,
      label: config.label,
      type: config.type,
      description: config.description,
      breakdown: Object.values(freeItemsBreakdown).map(item => ({
        name: item.name,
        price: item.price,
        count: item.count,
        total: item.price * item.count,
      })),
      freeItemCount,
      totalEligibleItems: eligible.length,
    };
  }

  if (config.type === "second_half_off") {
    const buckets = eligible.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});

    Object.values(buckets).forEach((items) => {
      const pairs = Math.floor(items.length / 2);
      if (!pairs) return;
      const sortDesc = [...items].sort((a, b) => b.price - a.price);
      const discounted = sortDesc
        .slice(0, pairs)
        .reduce((sum, item) => sum + item.price * 0.5, 0);
      discount += discounted;
    });
  }

  if (!discount) {
    return { discount: 0, message: null, label: config.label, type: null };
  }

  return {
    discount: Number(discount.toFixed(2)),
    message: `${config.headline}: -${formatCurrency(discount)}`,
    label: config.label,
    type: config.type,
    description: config.description,
  };
}

const expandItems = (items) =>
  items.flatMap((item) =>
    Array.from({ length: item.quantity ?? 1 }, () => ({
      ...item,
      quantity: 1,
    }))
  );

