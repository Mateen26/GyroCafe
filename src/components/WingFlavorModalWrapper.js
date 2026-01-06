"use client";

import { WingFlavorModal } from "./WingFlavorModal";
import { useCart } from "./cart/CartContext";

export function WingFlavorModalWrapper() {
  const {
    showWingFlavorModal,
    setShowWingFlavorModal,
    pendingWingItem,
    handleWingFlavorSelect,
  } = useCart();

  return (
    <WingFlavorModal
      isOpen={showWingFlavorModal}
      onClose={() => setShowWingFlavorModal(false)}
      wingItem={pendingWingItem}
      onAddToCart={handleWingFlavorSelect}
    />
  );
}

