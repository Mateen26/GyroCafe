"use client";

import { UpsellModal } from "./UpsellModal";
import { useCart } from "./cart/CartContext";

export function UpsellModalWrapper() {
  const { showUpsellModal, setShowUpsellModal, handleUpsellSelect, upsellCapacity } = useCart();

  return (
    <UpsellModal
      isOpen={showUpsellModal}
      onClose={() => setShowUpsellModal(false)}
      onSelect={handleUpsellSelect}
      capacity={upsellCapacity}
    />
  );
}

