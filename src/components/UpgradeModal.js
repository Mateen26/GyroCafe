"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";
import Image from "next/image";
import { Button } from "./Button";

export function UpgradeModal({ isOpen, onClose, onUpgrade, item, upgradeInfo }) {
  if (!isOpen || !item || !upgradeInfo) return null;

  const handleUpgrade = () => {
    onUpgrade();
    // Don't call onClose() here - let the onUpgrade handler manage the modal state
  };

  const handleDecline = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={handleDecline}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleDecline}
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
              aria-label="Close"
            >
              <HiMiniXMark className="text-xl" />
            </button>

            <div className="space-y-6">
              {/* Item Image */}
              {item.image && (
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-2xl bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              )}

              <header className="space-y-2 text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-dark">
                  Upgrade to LARGE?
                </h2>
                <p className="text-base font-semibold text-brand-dark">
                  {item.name}
                </p>
                <p className="text-lg leading-relaxed text-neutral-700">
                  Upgrade to LARGE for{" "}
                  <span className="font-bold text-brand-red">
                    ${upgradeInfo.priceDifference.toFixed(2)} more
                  </span>
                </p>
                <p className="text-base font-semibold text-brand-dark">
                  Total: ${upgradeInfo.largePrice.toFixed(2)}
                </p>
              </header>

              <div className="grid gap-3">
                <Button
                  variant="primary"
                  onClick={handleUpgrade}
                  className="w-full justify-center py-3 text-base font-semibold"
                >
                  Yes, Upgrade
                </Button>

                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="w-full justify-center py-3 text-base"
                >
                  No Thanks
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

