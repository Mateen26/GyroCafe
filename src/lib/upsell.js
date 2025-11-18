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
    .filter((item) => isEntree(item))
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
 * Calculate upsell capacity (how many more upsells can be added)
 * Formula: totalEntrees - totalUpsells
 */
export function calculateUpsellCapacity(cartItems) {
  const totalEntrees = getTotalEntreeQuantity(cartItems);
  const totalUpsells = getTotalUpsellQuantity(cartItems);
  return Math.max(0, totalEntrees - totalUpsells);
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
    },
  };
}

/**
 * Remove excess upsell items when entrée quantity decreases
 * Returns array of items to remove (id and quantity to remove)
 */
export function calculateExcessUpsells(cartItems) {
  const capacity = calculateUpsellCapacity(cartItems);
  
  if (capacity >= 0) {
    return []; // No excess
  }

  const excess = Math.abs(capacity);
  const upsellItems = cartItems
    .filter((item) => item.metadata?.isUpsellItem === true)
    .map((item, index) => ({ ...item, originalIndex: cartItems.indexOf(item) }))
    .sort((a, b) => {
      // Sort by creation order (or by price descending as fallback)
      return (b.price ?? 0) - (a.price ?? 0);
    });

  const removals = [];
  let remaining = excess;

  for (const item of upsellItems) {
    if (remaining <= 0) break;

    const toRemove = Math.min(item.quantity ?? 1, remaining);
    removals.push({
      id: item.id,
      quantityToRemove: toRemove,
    });
    remaining -= toRemove;
  }

  return removals;
}

