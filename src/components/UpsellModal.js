"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";
import { Button } from "./Button";
import { upsellConfig } from "@/lib/promotionsConfig";

export function UpsellModal({ isOpen, onClose, onSelect, capacity = 1 }) {
  const [chocolateChipQty, setChocolateChipQty] = useState(0);
  const [peanutButterQty, setPeanutButterQty] = useState(0);

  // Reset quantities when modal closes
  useEffect(() => {
    if (!isOpen) {
      setChocolateChipQty(0);
      setPeanutButterQty(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (type) => {
    const pookieQuantities = {
      chocolateChip: chocolateChipQty,
      peanutButter: peanutButterQty,
    };
    onSelect(type, pookieQuantities);
    onClose();
  };

  const handleIncrement = (type) => {
    if (type === "chocolateChip") {
      setChocolateChipQty((prev) => prev + 1);
    } else if (type === "peanutButter") {
      setPeanutButterQty((prev) => prev + 1);
    }
  };

  const handleDecrement = (type) => {
    if (type === "chocolateChip") {
      setChocolateChipQty((prev) => Math.max(0, prev - 1));
    } else if (type === "peanutButter") {
      setPeanutButterQty((prev) => Math.max(0, prev - 1));
    }
  };

  const pookieTotal = (chocolateChipQty + peanutButterQty) * 4.0;
  const baseBothPrice = upsellConfig.products.fries.upsellPrice + upsellConfig.products.drink.upsellPrice;
  const totalWithPookie = baseBothPrice + pookieTotal;

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
                  Add Soda (${upsellConfig.products.drink.upsellPrice.toFixed(2)})
                </Button>

                <Button
                  variant="primary"
                  onClick={() => handleSelect("both")}
                  className="w-full justify-center py-3 text-base font-semibold"
                >
                  Add Both (${totalWithPookie.toFixed(2)})
                </Button>

                {/* Pookie It Up Section */}
                <div className="border-t border-neutral-200 pt-5">
                  <h3 className="mb-4 text-lg font-bold uppercase tracking-tight text-brand-dark">
                    Pookie It Up
                  </h3>
                  <div className="space-y-3">
                    {/* Big Body Chocolate Chip */}
                    <div className="flex items-center gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-sm font-semibold text-neutral-800">
                          Big Body Chocolate Chip
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $4.00
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => handleDecrement("chocolateChip")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-lg font-bold text-neutral-600 shadow-sm transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:shadow-sm"
                          disabled={chocolateChipQty === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] shrink-0 text-center text-base font-bold text-brand-dark">
                          {chocolateChipQty}
                        </span>
                        <button
                          onClick={() => handleIncrement("chocolateChip")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-lg font-bold text-white shadow-md shadow-brand-red/30 transition-all hover:bg-brand-red/90 hover:shadow-lg active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Big Body Dark Chocolate Peanut Butter */}
                    <div className="flex items-center gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-sm font-semibold text-neutral-800">
                          Big Body Dark Chocolate Peanut Butter
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $4.00
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => handleDecrement("peanutButter")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-lg font-bold text-neutral-600 shadow-sm transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:shadow-sm"
                          disabled={peanutButterQty === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] shrink-0 text-center text-base font-bold text-brand-dark">
                          {peanutButterQty}
                        </span>
                        <button
                          onClick={() => handleIncrement("peanutButter")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-lg font-bold text-white shadow-md shadow-brand-red/30 transition-all hover:bg-brand-red/90 hover:shadow-lg active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

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

