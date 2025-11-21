"use client";

import { UpsellModal } from "./UpsellModal";
import { ToastNotification } from "./ToastNotification";
import { useCart } from "./cart/CartContext";

export function UpsellModalWrapper() {
  const {
    showUpsellModal,
    setShowUpsellModal,
    handleUpsellSelect,
    upsellCapacity,
    toastNotification,
    setToastNotification,
  } = useCart();

  return (
    <>
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onSelect={handleUpsellSelect}
        capacity={upsellCapacity}
      />
      <ToastNotification
        isOpen={toastNotification.isOpen}
        onClose={() => setToastNotification({ isOpen: false, message: "" })}
        message={toastNotification.message}
        type={toastNotification.type || "warning"}
      />
    </>
  );
}

