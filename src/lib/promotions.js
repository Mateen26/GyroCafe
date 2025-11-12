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

