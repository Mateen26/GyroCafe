"use client";

import { UpgradeModal } from "./UpgradeModal";
import { useCart } from "./cart/CartContext";

export function UpgradeModalWrapper() {
  const {
    showUpgradeModal,
    setShowUpgradeModal,
    pendingUpgradeItem,
    handleUpgradeSelect,
  } = useCart();

  const handleUpgrade = () => {
    handleUpgradeSelect(true);
  };

  const handleDecline = () => {
    handleUpgradeSelect(false);
  };

  return (
    <UpgradeModal
      isOpen={showUpgradeModal}
      onClose={handleDecline}
      onUpgrade={handleUpgrade}
      item={pendingUpgradeItem}
      upgradeInfo={pendingUpgradeItem?.upgradeInfo}
    />
  );
}

