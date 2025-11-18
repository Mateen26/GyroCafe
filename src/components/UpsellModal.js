"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";
import { Button } from "./Button";
import { upsellConfig } from "@/lib/promotionsConfig";

export function UpsellModal({ isOpen, onClose, onSelect, capacity = 1 }) {
  if (!isOpen) return null;

  const handleSelect = (type) => {
    onSelect(type);
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
            onClick={onClose}
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
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
              aria-label="Close"
            >
              <HiMiniXMark className="text-xl" />
            </button>

            <div className="space-y-6">
              <header className="space-y-2">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-dark">
                  Upgrade Your Meal?
                </h2>
                <p className="text-base leading-relaxed text-neutral-600">
                  {upsellConfig.details}
                </p>
                {capacity > 1 && (
                  <p className="text-sm text-brand-red">
                    Add up to {capacity} fries and {capacity} drinks
                  </p>
                )}
              </header>

              <div className="grid gap-3">
                <Button
                  variant="primary"
                  onClick={() => handleSelect("fries")}
                  className="w-full justify-center py-3 text-base font-semibold"
                >
                  Add Fries (${upsellConfig.products.fries.upsellPrice.toFixed(2)})
                </Button>

                <Button
                  variant="primary"
                  onClick={() => handleSelect("drink")}
                  className="w-full justify-center py-3 text-base font-semibold"
                >
                  Add Drink (${upsellConfig.products.drink.upsellPrice.toFixed(2)})
                </Button>

                <Button
                  variant="primary"
                  onClick={() => handleSelect("both")}
                  className="w-full justify-center py-3 text-base font-semibold"
                >
                  Add Both (${(upsellConfig.products.fries.upsellPrice + upsellConfig.products.drink.upsellPrice).toFixed(2)})
                </Button>

                <Button
                  variant="outline"
                  onClick={onClose}
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

