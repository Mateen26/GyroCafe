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
  active: true,
  type: "bogo", // "bogo", "second_half_off", or null
  eligibleCategories: defaultEligibleCategories,
  label: "Pickup Promo",
  headline: "Buy 1, Get 1 Free",
  description: "Cheapest eligible item is free when you grab two or more.",
};

// BOGO 50% Off Pita Sandwiches Promo
const BOGO_PITA_IDS = [
  "chicken-gyro-pita",
  "lamb-gyro-pita",
  "mix-gyro-pita",
  "falafel-pita",
  "kofta-kebab-pita",
  "chicken-shish-kebab-pita",
  "beef-kofta-pita",
  "fish-pita",
];

/**
 * Calculate BOGO 50% off pita sandwiches promo
 * For every 2 eligible pitas, 1 gets 50% off
 */
export function calculateBogoPitaPromo(cartItems, fulfillmentType = "pickup") {
  // Only active for pickup orders
  if (fulfillmentType !== "pickup") {
    return { discount: 0, items: [] };
  }

  // Filter eligible pitas (don't filter by isBogoDiscounted since we calculate discount at cart level)
  const eligiblePitas = cartItems.filter(
    (item) => BOGO_PITA_IDS.includes(item.id)
  );

  if (eligiblePitas.length < 2) {
    return { discount: 0, items: [] };
  }

  // Expand items by quantity
  const expanded = eligiblePitas.flatMap((item) =>
    Array.from({ length: item.quantity ?? 1 }, () => ({
      ...item,
      quantity: 1,
      originalQuantity: item.quantity ?? 1,
    }))
  );

  // Calculate how many get discounted (every 2nd one)
  const discountedCount = Math.floor(expanded.length / 2);

  if (discountedCount === 0) {
    return { discount: 0, items: [] };
  }

  // Sort by price descending (discount cheaper ones last)
  const sorted = [...expanded].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

  // Mark items for discount
  const itemsToDiscount = [];
  let remaining = discountedCount;

  // Group by original item ID to track which items get discounted
  const itemDiscounts = {};

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
    discount = sortedByPrice
      .slice(0, freeItemCount)
      .reduce((sum, item) => sum + item.price, 0);
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

