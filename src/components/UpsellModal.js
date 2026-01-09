"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMiniXMark } from "react-icons/hi2";
import { Button } from "./Button";
import { upsellConfig } from "@/lib/promotionsConfig";

export function UpsellModal({ isOpen, onClose, onSelect, capacity = 1 }) {
  const [chocolateChipQty, setChocolateChipQty] = useState(0);
  const [nutellaQty, setNutellaQty] = useState(0);
  const [oreoQty, setOreoQty] = useState(0);
  const [reesesQty, setReesesQty] = useState(0);
  const [chocolateChipMuffinQty, setChocolateChipMuffinQty] = useState(0);
  const [blueberryMuffinQty, setBlueberryMuffinQty] = useState(0);
  const [selectedFries, setSelectedFries] = useState(false);
  const [selectedSoda, setSelectedSoda] = useState(false);
  const [selectedBoth, setSelectedBoth] = useState(false);

  // Reset quantities and selections when modal closes
  useEffect(() => {
    if (!isOpen) {
      setChocolateChipQty(0);
      setNutellaQty(0);
      setOreoQty(0);
      setReesesQty(0);
      setChocolateChipMuffinQty(0);
      setBlueberryMuffinQty(0);
      setSelectedFries(false);
      setSelectedSoda(false);
      setSelectedBoth(false);
    }
  }, [isOpen]);

  // Calculate prices (moved before early return to satisfy Rules of Hooks)
  const friesPrice = upsellConfig.products.fries.upsellPrice;
  const sodaPrice = upsellConfig.products.drink.upsellPrice;
  const bothPrice = friesPrice + sodaPrice;
  const pookieTotal = (chocolateChipQty + nutellaQty + oreoQty + reesesQty) * 5.0 + (chocolateChipMuffinQty + blueberryMuffinQty) * 3.0;

  // Calculate total price based on selections
  const calculateTotalPrice = useMemo(() => {
    let total = 0;
    
    if (selectedBoth || (selectedFries && selectedSoda)) {
      total += bothPrice;
    } else {
      if (selectedFries) total += friesPrice;
      if (selectedSoda) total += sodaPrice;
    }
    
    total += pookieTotal;
    return total;
  }, [selectedFries, selectedSoda, selectedBoth, pookieTotal, bothPrice, friesPrice, sodaPrice]);

  // Calculate total quantity
  const calculateTotalQuantity = useMemo(() => {
    let qty = 0;
    
    if (selectedBoth || (selectedFries && selectedSoda)) {
      qty += 2; // Both counts as 2 items
    } else {
      if (selectedFries) qty += 1;
      if (selectedSoda) qty += 1;
    }
    
    qty += chocolateChipQty + nutellaQty + oreoQty + reesesQty + chocolateChipMuffinQty + blueberryMuffinQty;
    return qty;
  }, [selectedFries, selectedSoda, selectedBoth, chocolateChipQty, nutellaQty, oreoQty, reesesQty, chocolateChipMuffinQty, blueberryMuffinQty]);

  // Check if any items are selected
  const hasSelectedItems = selectedFries || selectedSoda || selectedBoth || chocolateChipQty > 0 || nutellaQty > 0 || oreoQty > 0 || reesesQty > 0 || chocolateChipMuffinQty > 0 || blueberryMuffinQty > 0;

  if (!isOpen) return null;

  const handleToggleFries = () => {
    setSelectedFries((prev) => {
      const newValue = !prev;
      // If both fries and soda will be selected after this toggle, auto-select "Add Both"
      if (newValue && selectedSoda) {
        setSelectedBoth(true);
      } else if (!newValue) {
        // If fries is deselected, deselect "Add Both" if it was auto-selected
        setSelectedBoth(false);
      }
      return newValue;
    });
  };

  const handleToggleSoda = () => {
    setSelectedSoda((prev) => {
      const newValue = !prev;
      // If both fries and soda will be selected after this toggle, auto-select "Add Both"
      if (newValue && selectedFries) {
        setSelectedBoth(true);
      } else if (!newValue) {
        // If soda is deselected, deselect "Add Both" if it was auto-selected
        setSelectedBoth(false);
      }
      return newValue;
    });
  };

  const handleToggleBoth = () => {
    const newBothState = !selectedBoth;
    setSelectedBoth(newBothState);
    // When "Add Both" is toggled, set both fries and soda to match
    setSelectedFries(newBothState);
    setSelectedSoda(newBothState);
  };

  const handleAddSelected = () => {
    const pookieQuantities = {
      chocolateChip: chocolateChipQty,
      nutella: nutellaQty,
      oreo: oreoQty,
      reeses: reesesQty,
      chocolateChipMuffin: chocolateChipMuffinQty,
      blueberryMuffin: blueberryMuffinQty,
    };
    
    // Determine which type to pass based on selections
    let type = null;
    if (selectedBoth || (selectedFries && selectedSoda)) {
      type = "both";
    } else if (selectedFries) {
      type = "fries";
    } else if (selectedSoda) {
      type = "drink";
    }
    
    // If only cookies/muffins are selected, we still need to pass something
    // We'll pass the selections object instead
    if (type) {
      onSelect(type, pookieQuantities);
    } else if (chocolateChipQty > 0 || nutellaQty > 0 || oreoQty > 0 || reesesQty > 0 || chocolateChipMuffinQty > 0 || blueberryMuffinQty > 0) {
      // Only cookies/muffins selected - pass a special type or handle differently
      // For now, pass "cookies" as type or modify onSelect to handle this
      onSelect("cookies", pookieQuantities);
    }
    
    onClose();
  };

  const handleIncrement = (type) => {
    if (type === "chocolateChip") {
      setChocolateChipQty((prev) => prev + 1);
    } else if (type === "nutella") {
      setNutellaQty((prev) => prev + 1);
    } else if (type === "oreo") {
      setOreoQty((prev) => prev + 1);
    } else if (type === "reeses") {
      setReesesQty((prev) => prev + 1);
    } else if (type === "chocolateChipMuffin") {
      setChocolateChipMuffinQty((prev) => prev + 1);
    } else if (type === "blueberryMuffin") {
      setBlueberryMuffinQty((prev) => prev + 1);
    }
  };

  const handleDecrement = (type) => {
    if (type === "chocolateChip") {
      setChocolateChipQty((prev) => Math.max(0, prev - 1));
    } else if (type === "nutella") {
      setNutellaQty((prev) => Math.max(0, prev - 1));
    } else if (type === "oreo") {
      setOreoQty((prev) => Math.max(0, prev - 1));
    } else if (type === "reeses") {
      setReesesQty((prev) => Math.max(0, prev - 1));
    } else if (type === "chocolateChipMuffin") {
      setChocolateChipMuffinQty((prev) => Math.max(0, prev - 1));
    } else if (type === "blueberryMuffin") {
      setBlueberryMuffinQty((prev) => Math.max(0, prev - 1));
    }
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
                  variant={selectedFries ? "primary" : "outline"}
                  onClick={handleToggleFries}
                  className={`w-full justify-center py-3 text-base font-semibold transition-all ${
                    selectedFries
                      ? "bg-brand-red border-brand-red text-white"
                      : "border-2 hover:border-brand-red/50"
                  }`}
                >
                  Add Fries (${friesPrice.toFixed(2)})
                </Button>

                <Button
                  variant={selectedSoda ? "primary" : "outline"}
                  onClick={handleToggleSoda}
                  className={`w-full justify-center py-3 text-base font-semibold transition-all ${
                    selectedSoda
                      ? "bg-brand-red border-brand-red text-white"
                      : "border-2 hover:border-brand-red/50"
                  }`}
                >
                  Add Soda (${sodaPrice.toFixed(2)})
                </Button>

                <Button
                  variant={selectedBoth ? "primary" : "outline"}
                  onClick={handleToggleBoth}
                  className={`w-full justify-center py-3 text-base font-semibold transition-all ${
                    selectedBoth
                      ? "bg-brand-red border-brand-red text-white"
                      : "border-2 hover:border-brand-red/50"
                  }`}
                >
                  Add Both (${bothPrice.toFixed(2)})
                </Button>

                {/* Pookie It Up Section */}
                <div className="border-t border-neutral-200 pt-5">
                  <h3 className="mb-4 text-lg font-bold uppercase tracking-tight text-brand-dark">
                    Pookie It Up
                  </h3>
                  <div className="space-y-3">
                    {/* Big Body Chocolate Chip */}
                    <div className="flex items-center gap-2 md:gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-3 md:p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-xs md:text-sm font-semibold text-neutral-800">
                          Big Body Chocolate Chip
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $5.00
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

                    {/* Big Body Nutella Chocolate Chip */}
                    <div className="flex items-center gap-2 md:gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-3 md:p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-xs md:text-sm font-semibold text-neutral-800">
                          Big Body Nutella Chocolate Chip
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $5.00
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => handleDecrement("nutella")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-lg font-bold text-neutral-600 shadow-sm transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:shadow-sm"
                          disabled={nutellaQty === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] shrink-0 text-center text-base font-bold text-brand-dark">
                          {nutellaQty}
                        </span>
                        <button
                          onClick={() => handleIncrement("nutella")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-lg font-bold text-white shadow-md shadow-brand-red/30 transition-all hover:bg-brand-red/90 hover:shadow-lg active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Big Body White and Black Oreo */}
                    <div className="flex items-center gap-2 md:gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-3 md:p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-xs md:text-sm font-semibold text-neutral-800">
                          Big Body White and Black Oreo
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $5.00
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => handleDecrement("oreo")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-lg font-bold text-neutral-600 shadow-sm transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:shadow-sm"
                          disabled={oreoQty === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] shrink-0 text-center text-base font-bold text-brand-dark">
                          {oreoQty}
                        </span>
                        <button
                          onClick={() => handleIncrement("oreo")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-lg font-bold text-white shadow-md shadow-brand-red/30 transition-all hover:bg-brand-red/90 hover:shadow-lg active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Big Body Reese's Peanut Butter */}
                    <div className="flex items-center gap-2 md:gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-3 md:p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-xs md:text-sm font-semibold text-neutral-800">
                          Big Body Reese's Peanut Butter Cookie
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $5.00
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => handleDecrement("reeses")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-lg font-bold text-neutral-600 shadow-sm transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:shadow-sm"
                          disabled={reesesQty === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] shrink-0 text-center text-base font-bold text-brand-dark">
                          {reesesQty}
                        </span>
                        <button
                          onClick={() => handleIncrement("reeses")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-lg font-bold text-white shadow-md shadow-brand-red/30 transition-all hover:bg-brand-red/90 hover:shadow-lg active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Chocolate Chip Muffin */}
                    <div className="flex items-center gap-2 md:gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-3 md:p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-xs md:text-sm font-semibold text-neutral-800">
                          Chocolate Chip Muffin
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $3.00
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => handleDecrement("chocolateChipMuffin")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-lg font-bold text-neutral-600 shadow-sm transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:shadow-sm"
                          disabled={chocolateChipMuffinQty === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] shrink-0 text-center text-base font-bold text-brand-dark">
                          {chocolateChipMuffinQty}
                        </span>
                        <button
                          onClick={() => handleIncrement("chocolateChipMuffin")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-lg font-bold text-white shadow-md shadow-brand-red/30 transition-all hover:bg-brand-red/90 hover:shadow-lg active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Blueberry Muffin */}
                    <div className="flex items-center gap-2 md:gap-4 rounded-xl border-2 border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-3 md:p-4 shadow-sm transition hover:border-brand-red/30 hover:shadow-md">
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <span className="break-words text-xs md:text-sm font-semibold text-neutral-800">
                          Blueberry Muffin
                        </span>
                        <span className="text-xs font-medium text-brand-red">
                          $3.00
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          onClick={() => handleDecrement("blueberryMuffin")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-neutral-300 bg-white text-lg font-bold text-neutral-600 shadow-sm transition-all hover:border-brand-red hover:bg-brand-red hover:text-white hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-600 disabled:hover:shadow-sm"
                          disabled={blueberryMuffinQty === 0}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="min-w-[2rem] shrink-0 text-center text-base font-bold text-brand-dark">
                          {blueberryMuffinQty}
                        </span>
                        <button
                          onClick={() => handleIncrement("blueberryMuffin")}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-red bg-brand-red text-lg font-bold text-white shadow-md shadow-brand-red/30 transition-all hover:bg-brand-red/90 hover:shadow-lg active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Action Buttons */}
                {hasSelectedItems ? (
                  <div className="flex gap-2 md:gap-3">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 justify-center py-2 text-xs md:py-3 md:text-base"
                    >
                      No Thanks
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleAddSelected}
                      className="flex-1 justify-center py-2 text-xs font-semibold md:py-3 md:text-base"
                    >
                      <span className="hidden sm:inline md:hidden">
                        Add ({calculateTotalQuantity} - ${calculateTotalPrice.toFixed(2)})
                      </span>
                      <span className="hidden md:flex md:flex-col md:items-center md:gap-0.5">
                        <span>Add Selected</span>
                        <span className="text-xs opacity-90">
                          {calculateTotalQuantity} items - ${calculateTotalPrice.toFixed(2)}
                        </span>
                      </span>
                      <span className="sm:hidden">
                        Add ({calculateTotalQuantity} - ${calculateTotalPrice.toFixed(2)})
                      </span>
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full justify-center py-2 text-xs md:py-3 md:text-base"
                  >
                    No Thanks
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

