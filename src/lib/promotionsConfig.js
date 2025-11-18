// Dynamic promotions configuration
// Update this file to change active promotions

export const activePromotions = [
  {
    id: "bogo-pita-50",
    name: "BOGO 50% Off Pita Sandwiches",
    type: "bogo",
    badge: "Pickup Exclusive",
    headline: "BOGO 50% Off Pita Sandwiches",
    description: "Buy any pita sandwich, get the second 50% off.",
    details: "Buy any 1 eligible pita → Get any 2nd eligible pita 50% off. Discount applies automatically in cart. Pickup orders only.",
    image: "/promotions/promoone1.jpeg",
    cta: {
      label: "Order Pickup",
      href: "/order-pickup",
    },
    eligibleItems: [
      "chicken-gyro-pita",
      "lamb-gyro-pita",
      "mix-gyro-pita",
      "falafel-pita",
      "kofta-kebab-pita",
      "chicken-shish-kebab-pita",
      "beef-kofta-pita",
      "fish-pita",
    ],
    requirements: {
      fulfillmentType: "pickup",
      minQuantity: 2,
    },
    active: true,
  },
];

export const upsellConfig = {
  active: true,
  name: "Add Fries & Drinks",
  badge: "Meal Upgrade Offer",
  headline: "Add Fries for $2 + Drinks for $1",
  description: "Upgrade any entrée with exclusive pickup pricing.",
  details: "Add crispy fries for $2 or a cold canned drink for $1 — available only with entrée orders.",
  image: "/promotions/promotwo2.jpeg",
  requirements: {
    fulfillmentType: "pickup",
  },
  products: {
    fries: {
      id: "french-fries",
      name: "French Fries",
      upsellPrice: 2.0,
      regularPrice: 4.5,
    },
    drink: {
      id: "coke-can",
      name: "Canned Drink",
      upsellPrice: 1.0,
      regularPrice: 2.5,
    },
  },
};

