// Upsell system logic and calculations

import { upsellConfig } from "./promotionsConfig";

// Entrée categories that trigger upsell
export const ENTREE_CATEGORIES = ["wraps", "platters", "naanwich", "house-specials"];

/**
 * Check if an item is an entrée
 */
export function isEntree(item) {
  return ENTREE_CATEGORIES.includes(item.category);
}

/**
 * Calculate total entrée quantity in cart
 */
export function getTotalEntreeQuantity(cartItems) {
  return cartItems
    .filter((item) => isEntree(item) && !item.metadata?.isUpsellItem)
    .reduce((sum, item) => sum + (item.quantity ?? 1), 0);
}

/**
 * Calculate total upsell items quantity
 */
export function getTotalUpsellQuantity(cartItems) {
  return cartItems
    .filter((item) => item.metadata?.isUpsellItem === true)
    .reduce((sum, item) => sum + (item.quantity ?? 1), 0);
}

/**
 * Calculate upsell capacity (how many more upsells can be added at promotional price)
 * Formula: totalEntrees - totalPromotionalUpsells
 */
export function calculateUpsellCapacity(cartItems) {
  const totalEntrees = getTotalEntreeQuantity(cartItems);
  const totalPromotionalUpsells = getTotalPromotionalUpsellQuantity(cartItems);
  return Math.max(0, totalEntrees - totalPromotionalUpsells);
}

/**
 * Calculate total promotional upsell quantity (only items at promotional price)
 */
export function getTotalPromotionalUpsellQuantity(cartItems) {
  return cartItems
    .filter((item) => item.metadata?.isUpsellItem === true)
    .reduce((sum, item) => {
      // Only count promotional quantity
      const promoQty = item.metadata?.promotionalQuantity ?? item.quantity ?? 0;
      return sum + promoQty;
    }, 0);
}

/**
 * Calculate total full-price upsell quantity
 */
export function getTotalFullPriceUpsellQuantity(cartItems) {
  return cartItems
    .filter((item) => item.metadata?.isUpsellItem === true)
    .reduce((sum, item) => {
      const fullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
      return sum + fullPriceQty;
    }, 0);
}

/**
 * Check if upsell should trigger based on cart changes
 * Returns the capacity if trigger should fire, otherwise 0
 */
export function shouldTriggerUpsell(cartItems, previousCartItems = []) {
  // Only trigger for pickup orders (will be checked in CartContext)
  const currentCapacity = calculateUpsellCapacity(cartItems);
  
  if (currentCapacity <= 0) {
    return 0; // No capacity, don't trigger
  }

  // Check if an entrée was added or quantity increased
  const previousEntreeQty = getTotalEntreeQuantity(previousCartItems);
  const currentEntreeQty = getTotalEntreeQuantity(cartItems);

  // If entrée quantity increased, trigger
  if (currentEntreeQty > previousEntreeQty) {
    return currentCapacity;
  }

  return 0; // No trigger
}

/**
 * Get upsell product info
 */
export function getUpsellProduct(type) {
  return upsellConfig.products[type];
}

/**
 * Create an upsell item for the cart
 */
export function createUpsellItem(type, quantity = 1, menuItems = []) {
  const product = getUpsellProduct(type);
  if (!product) {
    throw new Error(`Invalid upsell type: ${type}`);
  }

  // Find the original menu item to get image and other details
  const originalItem = menuItems.find((item) => item.id === product.id);

  return {
    id: `${product.id}-upsell`,
    name: product.name,
    price: product.upsellPrice,
    quantity,
    category: type === "fries" ? "appetizers" : "drinks",
    image: originalItem?.image,
    description: originalItem?.description,
    metadata: {
      isUpsellItem: true,
      upsellType: type,
      originalProductId: product.id,
      promotionalQuantity: quantity,
      fullPriceQuantity: 0,
      createdAt: Date.now(),
    },
  };
}

/**
 * Calculate excess promotional upsells that need to be removed or converted to full price
 * Returns array of items to update (id, newPromotionalQty, newFullPriceQty, removeItem flag)
 */
export function calculateExcessUpsells(cartItems) {
  const capacity = calculateUpsellCapacity(cartItems);
  const totalPromotional = getTotalPromotionalUpsellQuantity(cartItems);
  
  if (capacity >= 0 && totalPromotional <= capacity) {
    return []; // No excess
  }

  const excess = Math.max(0, totalPromotional - capacity);
  if (excess === 0) return [];

  const upsellItems = cartItems
    .filter((item) => item.metadata?.isUpsellItem === true)
    .map((item) => ({
      ...item,
      currentPromoQty: item.metadata?.promotionalQuantity ?? item.quantity ?? 0,
    }))
    .sort((a, b) => {
      // Remove from newest first (items added later)
      return (b.metadata?.createdAt ?? 0) - (a.metadata?.createdAt ?? 0);
    });

  const updates = [];
  let remaining = excess;

  for (const item of upsellItems) {
    if (remaining <= 0) break;

    const promoQty = item.currentPromoQty;
    if (promoQty <= 0) continue;

    const toRemove = Math.min(promoQty, remaining);
    const newPromoQty = promoQty - toRemove;
    const currentFullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
    const newFullPriceQty = currentFullPriceQty + toRemove;
    const newTotalQty = newPromoQty + newFullPriceQty;

    if (newTotalQty <= 0) {
      // Remove item completely
      updates.push({
        id: item.id,
        removeItem: true,
      });
    } else {
      // Update quantities
      updates.push({
        id: item.id,
        newPromotionalQty: newPromoQty,
        newFullPriceQty: newFullPriceQty,
        removeItem: false,
      });
    }

    remaining -= toRemove;
  }

  return updates;
}

