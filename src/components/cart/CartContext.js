"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { calculatePromotion, promotionConfig, calculateBogoPitaPromo } from "@/lib/promotions";
import {
  shouldTriggerUpsell,
  calculateUpsellCapacity,
  createUpsellItem,
  calculateExcessUpsells,
  isEntree,
  getTotalEntreeQuantity,
} from "@/lib/upsell";
import { upsellConfig } from "@/lib/promotionsConfig";
import { hasUpgradeOption, getUpgradeInfo } from "@/lib/platterUpgrades";
import { isMobileDevice } from "@/lib/utils";

const STORAGE_KEY = "gyro-cafe-cart";
const TAX_RATE = 0.08875; // 8.875%

const CartContext = createContext(null);

const initialState = {
  items: [],
  isOpen: false,
  fulfillmentType: "pickup", // "pickup" or "delivery"
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, ...action.payload };
    case "ADD_ITEM": {
      const { item, shouldOpenCart } = action.payload;
      const items = [...state.items];
      const existingIndex = items.findIndex(
        (cartItem) => cartItem.id === item.id && 
        // For upsell items, match by original product ID too
        (!item.metadata?.isUpsellItem || cartItem.metadata?.isUpsellItem)
      );

      if (existingIndex > -1) {
        items[existingIndex] = {
          ...items[existingIndex],
          quantity:
            (items[existingIndex].quantity ?? 1) + (item.quantity ?? 1),
          // Preserve metadata if item already has it
          metadata: item.metadata ?? items[existingIndex].metadata,
        };
      } else {
        items.push({ 
          ...item, 
          quantity: item.quantity ?? 1,
          metadata: item.metadata ?? {},
        });
      }
      // Only auto-open cart on desktop (when shouldOpenCart is true)
      return { ...state, items, isOpen: shouldOpenCart === true ? true : state.isOpen };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      // Handle upsell items specially - check capacity
      if (item.metadata?.isUpsellItem === true) {
        // This will be handled in the useEffect hook after state update
        // For now, just update the quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }
    case "UPDATE_UPSELL_QUANTITIES": {
      const { id, promotionalQuantity, fullPriceQuantity } = action.payload;
      const totalQty = promotionalQuantity + fullPriceQuantity;
      
      if (totalQty <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: totalQty,
                metadata: {
                  ...item.metadata,
                  promotionalQuantity,
                  fullPriceQuantity,
                },
              }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "SET_FULFILLMENT_TYPE":
      return { ...state, fulfillmentType: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [pendingUpgradeItem, setPendingUpgradeItem] = useState(null);
  const [toastNotification, setToastNotification] = useState({ isOpen: false, message: "" });
  const previousItemsRef = useRef([]);
  const isProcessingUpgradeRef = useRef(false); // Track if we're currently processing an upgrade
  const pendingUpgradeItemIdRef = useRef(null); // Track the ID of the item pending upgrade

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.items) {
        dispatch({ type: "INITIALIZE", payload: { items: parsed.items } });
        previousItemsRef.current = parsed.items;
      }
      if (parsed?.fulfillmentType) {
        dispatch({ type: "SET_FULFILLMENT_TYPE", payload: parsed.fulfillmentType });
      }
    } catch (error) {
      console.warn("Unable to parse stored cart", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ 
        items: state.items,
        fulfillmentType: state.fulfillmentType,
      })
    );
  }, [state.items, state.fulfillmentType]);

  // Handle upsell triggers, capacity limits, and excess removal
  useEffect(() => {
    // Only for pickup orders
    if (state.fulfillmentType !== "pickup" || !upsellConfig.active) {
      previousItemsRef.current = state.items;
      return;
    }

    const totalEntrees = getTotalEntreeQuantity(state.items);
    const previousEntrees = getTotalEntreeQuantity(previousItemsRef.current);
    const upsellItems = state.items.filter((item) => item.metadata?.isUpsellItem === true);
    
    // If no entrées, remove all upsell items
    if (totalEntrees === 0 && upsellItems.length > 0) {
      upsellItems.forEach((item) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
      });
      previousItemsRef.current = state.items;
      return;
    }
    
    // Only process excess removal if entrée quantity decreased
    // (Manual quantity updates are handled in updateQuantity callback)
    if (totalEntrees < previousEntrees) {
      // Process upsell items by type (fries and drinks separately)
      const friesItems = upsellItems.filter((i) => i.metadata?.upsellType === "fries");
      const drinkItems = upsellItems.filter((i) => i.metadata?.upsellType === "drink");
      
      // Process fries items - remove excess
      const totalPromoFries = friesItems.reduce(
        (sum, i) => sum + (i.metadata?.promotionalQuantity ?? i.quantity ?? 0),
        0
      );
      const excessFries = Math.max(0, totalPromoFries - totalEntrees);
      
      if (excessFries > 0) {
        let remaining = excessFries;
        for (const item of friesItems.sort((a, b) => (b.metadata?.createdAt ?? 0) - (a.metadata?.createdAt ?? 0))) {
          if (remaining <= 0) break;
          const currentPromoQty = item.metadata?.promotionalQuantity ?? item.quantity ?? 0;
          const currentFullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
          const toRemove = Math.min(remaining, currentPromoQty);
          
          if (toRemove > 0) {
            const newPromoQty = currentPromoQty - toRemove;
            const newTotalQty = newPromoQty + currentFullPriceQty;
            
            if (newTotalQty <= 0) {
              dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
            } else {
              dispatch({
                type: "UPDATE_UPSELL_QUANTITIES",
                payload: {
                  id: item.id,
                  promotionalQuantity: newPromoQty,
                  fullPriceQuantity: currentFullPriceQty,
                },
              });
            }
            remaining -= toRemove;
          }
        }
      }
      
      // Process drink items - remove excess
      const totalPromoDrinks = drinkItems.reduce(
        (sum, i) => sum + (i.metadata?.promotionalQuantity ?? i.quantity ?? 0),
        0
      );
      const excessDrinks = Math.max(0, totalPromoDrinks - totalEntrees);
      
      if (excessDrinks > 0) {
        let remaining = excessDrinks;
        for (const item of drinkItems.sort((a, b) => (b.metadata?.createdAt ?? 0) - (a.metadata?.createdAt ?? 0))) {
          if (remaining <= 0) break;
          const currentPromoQty = item.metadata?.promotionalQuantity ?? item.quantity ?? 0;
          const currentFullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
          const toRemove = Math.min(remaining, currentPromoQty);
          
          if (toRemove > 0) {
            const newPromoQty = currentPromoQty - toRemove;
            const newTotalQty = newPromoQty + currentFullPriceQty;
            
            if (newTotalQty <= 0) {
              dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } });
            } else {
              dispatch({
                type: "UPDATE_UPSELL_QUANTITIES",
                payload: {
                  id: item.id,
                  promotionalQuantity: newPromoQty,
                  fullPriceQuantity: currentFullPriceQty,
                },
              });
            }
            remaining -= toRemove;
          }
        }
      }
      
      previousItemsRef.current = state.items;
      return;
    }

    // If entrée quantity increased, convert full-price upsells back to promotional
    if (totalEntrees > previousEntrees) {
      const newCapacity = totalEntrees;
      
      // Process fries items - convert full-price to promotional
      const friesItems = upsellItems.filter((i) => i.metadata?.upsellType === "fries");
      const currentPromotionalFries = friesItems.reduce(
        (sum, i) => sum + (i.metadata?.promotionalQuantity ?? 0),
        0
      );
      const availableFriesSlots = Math.max(0, newCapacity - currentPromotionalFries);
      const totalFullPriceFries = friesItems.reduce(
        (sum, i) => sum + (i.metadata?.fullPriceQuantity ?? 0),
        0
      );
      const friesToConvert = Math.min(availableFriesSlots, totalFullPriceFries);
      
      if (friesToConvert > 0) {
        let remaining = friesToConvert;
        for (const item of friesItems.sort((a, b) => (a.metadata?.createdAt ?? 0) - (b.metadata?.createdAt ?? 0))) {
          if (remaining <= 0) break;
          const currentFullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
          if (currentFullPriceQty <= 0) continue;
          
          const toConvert = Math.min(remaining, currentFullPriceQty);
          const newFullPriceQty = currentFullPriceQty - toConvert;
          const newPromoQty = (item.metadata?.promotionalQuantity ?? 0) + toConvert;
          
          dispatch({
            type: "UPDATE_UPSELL_QUANTITIES",
            payload: {
              id: item.id,
              promotionalQuantity: newPromoQty,
              fullPriceQuantity: newFullPriceQty,
            },
          });
          
          remaining -= toConvert;
        }
      }
      
      // Process drink items - convert full-price to promotional
      const drinkItems = upsellItems.filter((i) => i.metadata?.upsellType === "drink");
      const currentPromotionalDrinks = drinkItems.reduce(
        (sum, i) => sum + (i.metadata?.promotionalQuantity ?? 0),
        0
      );
      const availableDrinksSlots = Math.max(0, newCapacity - currentPromotionalDrinks);
      const totalFullPriceDrinks = drinkItems.reduce(
        (sum, i) => sum + (i.metadata?.fullPriceQuantity ?? 0),
        0
      );
      const drinksToConvert = Math.min(availableDrinksSlots, totalFullPriceDrinks);
      
      if (drinksToConvert > 0) {
        let remaining = drinksToConvert;
        for (const item of drinkItems.sort((a, b) => (a.metadata?.createdAt ?? 0) - (b.metadata?.createdAt ?? 0))) {
          if (remaining <= 0) break;
          const currentFullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
          if (currentFullPriceQty <= 0) continue;
          
          const toConvert = Math.min(remaining, currentFullPriceQty);
          const newFullPriceQty = currentFullPriceQty - toConvert;
          const newPromoQty = (item.metadata?.promotionalQuantity ?? 0) + toConvert;
          
          dispatch({
            type: "UPDATE_UPSELL_QUANTITIES",
            payload: {
              id: item.id,
              promotionalQuantity: newPromoQty,
              fullPriceQuantity: newFullPriceQty,
            },
          });
          
          remaining -= toConvert;
        }
      }
    }

    // Check if upsell should trigger (when entrée is added)
    // Only check if upgrade modal is not showing
    if (!showUpgradeModal) {
      const capacity = shouldTriggerUpsell(state.items, previousItemsRef.current);
      if (capacity > 0) {
        setShowUpsellModal(true);
      }
    }

    previousItemsRef.current = state.items;
  }, [state.items, state.fulfillmentType, showUpgradeModal]);

  // Item Total: sum of all items before discounts
  const itemTotal = useMemo(
    () =>
      state.items.reduce((sum, item) => {
        // For upsell items, calculate promotional + full-price portions
        if (item.metadata?.isUpsellItem === true) {
          const promoPrice = item.price ?? 0;
          const fullPrice = item.metadata?.upsellType === "fries" ? 4.5 : 2.5;
          const promoQty = item.metadata?.promotionalQuantity ?? (item.quantity ?? 1);
          const fullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
          return sum + (promoPrice * promoQty) + (fullPrice * fullPriceQty);
        }
        // Regular items
        return sum + (item.price ?? 0) * (item.quantity ?? 1);
      }, 0),
    [state.items]
  );

  // Calculate BOGO pita promo
  const bogoPitaPromo = useMemo(
    () => calculateBogoPitaPromo(state.items, state.fulfillmentType),
    [state.items, state.fulfillmentType]
  );

  const promotion = useMemo(
    () => calculatePromotion(state.items, promotionConfig),
    [state.items]
  );

  // Total discount = BOGO pita + other promotions (gyro promo removed)
  const totalDiscount = useMemo(
    () => (promotion.discount ?? 0) + (bogoPitaPromo.discount ?? 0),
    [promotion.discount, bogoPitaPromo.discount]
  );

  // Subtotal after discounts (before tax)
  const subtotalAfterDiscounts = useMemo(
    () => Math.max(itemTotal - totalDiscount, 0),
    [itemTotal, totalDiscount]
  );

  // Tax calculation (8.875%)
  const tax = useMemo(
    () => subtotalAfterDiscounts * TAX_RATE,
    [subtotalAfterDiscounts]
  );

  // Total including tax
  const total = useMemo(
    () => subtotalAfterDiscounts + tax,
    [subtotalAfterDiscounts, tax]
  );

  const cartCount = useMemo(
    () =>
      state.items.reduce((count, item) => count + (item.quantity ?? 1), 0),
    [state.items]
  );

  const addItem = useCallback((item) => {
    // Safety guard: Don't add items if upgrade modal is currently showing or upgrade is being processed
    // Also prevent adding the item if its ID matches a pending upgrade item ID
    if (showUpgradeModal || pendingUpgradeItem || isProcessingUpgradeRef.current) {
      return;
    }
    
    // Critical: If this item ID matches a pending upgrade item ID, don't add it
    // This prevents the original item from being added when upgrading
    if (item.id === pendingUpgradeItemIdRef.current) {
      return;
    }

    // Check if this item has an upgrade option
    if (hasUpgradeOption(item.id)) {
      const upgradeInfo = getUpgradeInfo(item.id);
      if (upgradeInfo) {
        // Track the original item ID to prevent it from being added
        // Don't set isProcessingUpgradeRef here - that's only for handleUpgradeSelect
        pendingUpgradeItemIdRef.current = item.id;
        
        // Create a clean copy of the item without any extra properties
        // Store only the essential properties needed for the upgrade modal
        const cleanItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          metadata: item.metadata || {},
        };
        // Set pending upgrade item and show upgrade modal
        setPendingUpgradeItem({ ...cleanItem, upgradeInfo });
        setShowUpgradeModal(true);
        // Don't dispatch ADD_ITEM yet - wait for upgrade decision
        return;
      }
    }
    
    // No upgrade option, add item normally
    // Check if mobile - if so, show toast instead of opening cart
    const isMobile = isMobileDevice();
    if (isMobile) {
      // Show toast notification on mobile
      setToastNotification({
        isOpen: true,
        message: `${item.name} added to cart`,
        type: "success",
      });
      // Auto-dismiss toast after 3 seconds
      setTimeout(() => {
        setToastNotification({ isOpen: false, message: "" });
      }, 3000);
      // Don't open cart on mobile
      dispatch({ type: "ADD_ITEM", payload: { item, shouldOpenCart: false } });
    } else {
      // Open cart on desktop
      dispatch({ type: "ADD_ITEM", payload: { item, shouldOpenCart: true } });
    }
  }, [showUpgradeModal, pendingUpgradeItem]);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    const item = state.items.find((i) => i.id === id);
    
    // Special handling for upsell items - check capacity
    if (item?.metadata?.isUpsellItem === true && state.fulfillmentType === "pickup" && upsellConfig.active) {
      const totalEntrees = getTotalEntreeQuantity(state.items);
      const currentQty = item.quantity ?? 1;
      const currentPromoQty = item.metadata?.promotionalQuantity ?? currentQty;
      const currentFullPriceQty = item.metadata?.fullPriceQuantity ?? 0;
      
      // Calculate total promotional upsells for this type
      const sameTypeItems = state.items.filter(
        (i) => i.metadata?.isUpsellItem === true && 
        i.metadata?.upsellType === item.metadata?.upsellType &&
        i.id !== id
      );
      const otherPromoQty = sameTypeItems.reduce(
        (sum, i) => sum + (i.metadata?.promotionalQuantity ?? i.quantity ?? 0),
        0
      );
      
      // Maximum promotional quantity for this item
      const maxPromoForThisItem = Math.max(0, totalEntrees - otherPromoQty);
      
      // Calculate new quantities
      let newPromoQty, newFullPriceQty;
      const quantityChange = quantity - currentQty;
      
      if (quantityChange > 0) {
        // Increasing quantity
        const availablePromo = Math.max(0, maxPromoForThisItem - currentPromoQty);
        const promoIncrease = Math.min(quantityChange, availablePromo);
        const fullPriceIncrease = quantityChange - promoIncrease;
        
        newPromoQty = currentPromoQty + promoIncrease;
        newFullPriceQty = currentFullPriceQty + fullPriceIncrease;
        
        // Show notification if adding full-price items
        if (fullPriceIncrease > 0) {
          const productName = item.metadata?.upsellType === "fries" ? "fries" : "drinks";
          const fullPrice = item.metadata?.upsellType === "fries" ? "$4.00" : "$2.50";
          setToastNotification({
            isOpen: true,
            message: `Maximum promotional ${productName} reached (${maxPromoForThisItem} at promotional price). Additional ${productName} will be charged at regular price (${fullPrice} each).`,
            type: "warning",
          });
        }
      } else {
        // Decreasing quantity - remove from full-price first, then promotional
        const decrease = Math.abs(quantityChange);
        const fullPriceDecrease = Math.min(decrease, currentFullPriceQty);
        const promoDecrease = decrease - fullPriceDecrease;
        
        newFullPriceQty = Math.max(0, currentFullPriceQty - fullPriceDecrease);
        newPromoQty = Math.max(0, currentPromoQty - promoDecrease);
      }
      
      // Update with new quantities
      dispatch({
        type: "UPDATE_UPSELL_QUANTITIES",
        payload: {
          id,
          promotionalQuantity: newPromoQty,
          fullPriceQuantity: newFullPriceQty,
        },
      });
    } else {
      // Regular item update
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }
  }, [state.items, state.fulfillmentType]);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: "OPEN_CART" });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "CLOSE_CART" });
  }, []);

  const toggleCart = useCallback(() => {
    dispatch({ type: "TOGGLE_CART" });
  }, []);

  const setFulfillmentType = useCallback((type) => {
    dispatch({ type: "SET_FULFILLMENT_TYPE", payload: type });
  }, []);

  const handleUpgradeSelect = useCallback((accepted) => {
    if (!pendingUpgradeItem) {
      return;
    }

    // Prevent multiple calls - if already processing, ignore
    if (isProcessingUpgradeRef.current) {
      return;
    }

    // Mark that we're processing the upgrade decision IMMEDIATELY
    isProcessingUpgradeRef.current = true;

    // Extract values BEFORE clearing state to avoid any reference issues
    const originalId = pendingUpgradeItem.id;
    const upgradeInfo = pendingUpgradeItem.upgradeInfo;
    
    // Create the item to add BEFORE clearing pending state
    let itemToAdd;
    if (accepted) {
      // Upgrade to LARGE: create completely new item with large ID
      // Use upgradeInfo.largeId which is guaranteed to be different from originalId
      itemToAdd = {
        id: upgradeInfo.largeId, // Different ID from original - CRITICAL: this must be different
        name: pendingUpgradeItem.name.replace("SMALL", "LARGE").replace("Small", "LARGE"),
        price: upgradeInfo.largePrice,
        image: pendingUpgradeItem.image,
        category: pendingUpgradeItem.category,
        quantity: 1,
        metadata: {
          isUpgraded: true,
          originalPrice: pendingUpgradeItem.price,
          upgradedPrice: upgradeInfo.largePrice,
          originalId: originalId, // Keep track of original ID for reference only
        },
      };
      
      // When upgrading, keep the ref set to prevent the original SMALL item from being added
      // Clear it after a delay to allow state updates to complete
      setTimeout(() => {
        pendingUpgradeItemIdRef.current = null;
      }, 200);
    } else {
      // Keep SMALL: add original item with original ID
      itemToAdd = {
        id: originalId,
        name: pendingUpgradeItem.name,
        price: pendingUpgradeItem.price,
        image: pendingUpgradeItem.image,
        category: pendingUpgradeItem.category,
        quantity: 1,
        metadata: pendingUpgradeItem.metadata || {},
      };
      
      // When declining, clear the ref immediately so the SMALL item can be added
      pendingUpgradeItemIdRef.current = null;
    }

    // Clear pending upgrade state FIRST to prevent any race conditions
    setPendingUpgradeItem(null);
    setShowUpgradeModal(false);

    // Now dispatch the item (only one item will be added)
    // IMPORTANT: When upgrading, we dispatch with largeId, which is different from originalId
    // The ref prevents the original SMALL item from being added
    // When declining, we dispatch with originalId, and the ref is cleared so it can be added
    const isMobile = isMobileDevice();
    dispatch({ type: "ADD_ITEM", payload: { item: itemToAdd, shouldOpenCart: !isMobile } });

    // Reset the processing flag after a short delay to allow state updates to complete
    setTimeout(() => {
      isProcessingUpgradeRef.current = false;
      
      // After upgrade modal closes, check for upsell trigger
      const capacity = shouldTriggerUpsell(state.items, previousItemsRef.current);
      if (capacity > 0) {
        setShowUpsellModal(true);
      }
    }, 150);
  }, [pendingUpgradeItem, state.items]);

  const handleUpsellSelect = useCallback(async (type, pookieQuantities = { chocolateChip: 0, peanutButter: 0 }) => {
    // Dynamically import menuItems to get image paths
    const { menuItems } = await import("@/lib/menuData");
    const isMobile = isMobileDevice();

    // Handle cookies-only case (no fries/soda/both selected)
    if (type === "cookies") {
      // Add Pookie items if quantities are greater than 0
      if (pookieQuantities.chocolateChip > 0) {
        const chocolateChipItem = menuItems.find((item) => item.id === "big-body-chocolate-chip");
        if (chocolateChipItem) {
          const pookieItem = {
            ...chocolateChipItem,
            quantity: pookieQuantities.chocolateChip,
          };
          dispatch({ type: "ADD_ITEM", payload: { item: pookieItem, shouldOpenCart: !isMobile } });
        }
      }

      if (pookieQuantities.peanutButter > 0) {
        const peanutButterItem = menuItems.find((item) => item.id === "big-body-dark-chocolate-peanut-butter");
        if (peanutButterItem) {
          const pookieItem = {
            ...peanutButterItem,
            quantity: pookieQuantities.peanutButter,
          };
          dispatch({ type: "ADD_ITEM", payload: { item: pookieItem, shouldOpenCart: !isMobile } });
        }
      }
      return;
    }

    // Handle fries/soda/both selections
    const capacity = calculateUpsellCapacity(state.items);
    if (capacity <= 0) return;

    const quantityToAdd = Math.min(capacity, 1); // Add 1 at a time for now

    if (type === "fries") {
      const friesItem = createUpsellItem("fries", quantityToAdd, menuItems);
      dispatch({ type: "ADD_ITEM", payload: { item: friesItem, shouldOpenCart: !isMobile } });
    } else if (type === "drink") {
      const drinkItem = createUpsellItem("drink", quantityToAdd, menuItems);
      dispatch({ type: "ADD_ITEM", payload: { item: drinkItem, shouldOpenCart: !isMobile } });
    } else if (type === "both") {
      const friesItem = createUpsellItem("fries", quantityToAdd, menuItems);
      const drinkItem = createUpsellItem("drink", quantityToAdd, menuItems);
      dispatch({ type: "ADD_ITEM", payload: { item: friesItem, shouldOpenCart: !isMobile } });
      dispatch({ type: "ADD_ITEM", payload: { item: drinkItem, shouldOpenCart: !isMobile } });
    }

    // Add Pookie items if quantities are greater than 0
    if (pookieQuantities.chocolateChip > 0) {
      const chocolateChipItem = menuItems.find((item) => item.id === "big-body-chocolate-chip");
      if (chocolateChipItem) {
        const pookieItem = {
          ...chocolateChipItem,
          quantity: pookieQuantities.chocolateChip,
        };
        dispatch({ type: "ADD_ITEM", payload: { item: pookieItem, shouldOpenCart: !isMobile } });
      }
    }

    if (pookieQuantities.peanutButter > 0) {
      const peanutButterItem = menuItems.find((item) => item.id === "big-body-dark-chocolate-peanut-butter");
      if (peanutButterItem) {
        const pookieItem = {
          ...peanutButterItem,
          quantity: pookieQuantities.peanutButter,
        };
        dispatch({ type: "ADD_ITEM", payload: { item: pookieItem, shouldOpenCart: !isMobile } });
      }
    }
  }, [state.items]);

  const upsellCapacity = useMemo(
    () => calculateUpsellCapacity(state.items),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      fulfillmentType: state.fulfillmentType,
      cartCount,
      itemTotal: Number(itemTotal.toFixed(2)),
      subtotal: Number(subtotalAfterDiscounts.toFixed(2)), // Keep for backward compatibility
      subtotalAfterDiscounts: Number(subtotalAfterDiscounts.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      promotion,
      bogoPitaPromo,
      totalDiscount: Number(totalDiscount.toFixed(2)),
      total: Number(total.toFixed(2)),
          upsellCapacity,
          showUpsellModal,
          showUpgradeModal,
          pendingUpgradeItem,
          toastNotification,
          addItem,
          removeItem,
          updateQuantity,
          clearCart,
          openCart,
          closeCart,
          toggleCart,
          setFulfillmentType,
          setShowUpsellModal,
          setShowUpgradeModal,
          setPendingUpgradeItem,
          setToastNotification,
          handleUpsellSelect,
          handleUpgradeSelect,
    }),
    [
      state.items,
      state.isOpen,
      state.fulfillmentType,
      cartCount,
      itemTotal,
      subtotalAfterDiscounts,
      tax,
      promotion,
      bogoPitaPromo,
      totalDiscount,
      total,
      upsellCapacity,
      showUpsellModal,
      showUpgradeModal,
      pendingUpgradeItem,
      toastNotification,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      setFulfillmentType,
      setShowUpsellModal,
      setShowUpgradeModal,
      setPendingUpgradeItem,
      setToastNotification,
      handleUpsellSelect,
      handleUpgradeSelect,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

