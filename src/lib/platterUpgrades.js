/**
 * Mapping of SMALL platter IDs to their LARGE upgrade information
 * Used to show upgrade modal when users add SMALL platters to cart
 */
export const platterUpgrades = {
  "chicken-gyro-platter": {
    largeId: "chicken-gyro-platter-large",
    priceDifference: 3.0,
    largePrice: 15.0,
  },
  "lamb-gyro-platter": {
    largeId: "lamb-gyro-platter-large",
    priceDifference: 3.0,
    largePrice: 15.0,
  },
  "mixed-grill-platter": {
    largeId: "mixed-grill-platter-large",
    priceDifference: 3.0,
    largePrice: 15.0,
  },
  "beef-adana-platter": {
    largeId: "beef-adana-platter-large",
    priceDifference: 6.0,
    largePrice: 22.0,
  },
  "kofta-kebab-platter-small": {
    largeId: "kofta-kebab-platter-large",
    priceDifference: 3.0,
    largePrice: 14.0,
  },
  "chicken-shish-platter-small": {
    largeId: "chicken-shish-platter-large",
    priceDifference: 3.0,
    largePrice: 16.0,
  },
  "fish-platter": {
    largeId: "fish-platter-large",
    priceDifference: 3.0,
    largePrice: 16.0,
  },
  "falafel-platter": {
    largeId: "falafel-platter-large",
    priceDifference: 2.0,
    largePrice: 13.0,
  },
};

/**
 * Check if a platter item has an upgrade option
 */
export function hasUpgradeOption(itemId) {
  return itemId in platterUpgrades;
}

/**
 * Get upgrade information for a platter item
 */
export function getUpgradeInfo(itemId) {
  return platterUpgrades[itemId] || null;
}

