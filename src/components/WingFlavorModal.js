"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";
import { Button } from "./Button";

const WING_FLAVORS = [
  "PLAIN",
  "LEMON PEPPER",
  "MANGO HABANERO",
  "HONEY BBQ",
  "GARLIC PARMESAN",
  "BUFFALO",
  "GHOST PEPPER",
];

export function WingFlavorModal({ isOpen, onClose, wingItem, onAddToCart }) {
  const [selectedFlavor, setSelectedFlavor] = useState(null);

  // Reset selection when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedFlavor(null);
    }
  }, [isOpen]);

  if (!isOpen || !wingItem) return null;

  const handleAddToCart = () => {
    if (!selectedFlavor) return;

    const wingItemWithFlavor = {
      ...wingItem,
      metadata: {
        ...wingItem.metadata,
        wingFlavor: selectedFlavor,
        requiresFlavor: true,
      },
    };

    onAddToCart(wingItemWithFlavor);
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
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-neutral-200 bg-white p-4 md:p-8 shadow-2xl"
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
                  Choose Your Flavor
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-brand-dark">
                    {wingItem.name}
                  </p>
                  <p className="text-lg font-bold text-brand-red">
                    ${wingItem.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm text-neutral-600">
                  Select a flavor for your wings. This selection is required.
                </p>
              </header>

              <div className="grid gap-3">
                {WING_FLAVORS.map((flavor) => (
                  <Button
                    key={flavor}
                    variant={selectedFlavor === flavor ? "primary" : "outline"}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`w-full justify-center py-3 text-base font-semibold transition-all ${
                      selectedFlavor === flavor
                        ? "bg-brand-red border-brand-red text-white"
                        : "border-2 hover:border-brand-red/50"
                    }`}
                  >
                    {flavor}
                  </Button>
                ))}
              </div>

              {/* Bottom Action Buttons */}
              <div className="flex gap-2 md:gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 justify-center py-2 text-xs md:py-3 md:text-base"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  disabled={!selectedFlavor}
                  className="flex-1 justify-center py-2 text-xs font-semibold md:py-3 md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

