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

const STORAGE_KEY = "gyro-cafe-cart";

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
      const { item } = action.payload;
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
      return { ...state, items, isOpen: true };
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
  const [toastNotification, setToastNotification] = useState({ isOpen: false, message: "" });
  const previousItemsRef = useRef([]);

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
    const capacity = shouldTriggerUpsell(state.items, previousItemsRef.current);
    if (capacity > 0) {
      setShowUpsellModal(true);
    }

    previousItemsRef.current = state.items;
  }, [state.items, state.fulfillmentType]);

  const subtotal = useMemo(
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

  // Total discount = BOGO pita + other promotions
  const totalDiscount = useMemo(
    () => (promotion.discount ?? 0) + (bogoPitaPromo.discount ?? 0),
    [promotion.discount, bogoPitaPromo.discount]
  );

  const total = useMemo(
    () => Math.max(subtotal - totalDiscount, 0),
    [subtotal, totalDiscount]
  );

  const cartCount = useMemo(
    () =>
      state.items.reduce((count, item) => count + (item.quantity ?? 1), 0),
    [state.items]
  );

  const addItem = useCallback((item) => {
    dispatch({ type: "ADD_ITEM", payload: { item } });
  }, []);

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

  const handleUpsellSelect = useCallback(async (type) => {
    const capacity = calculateUpsellCapacity(state.items);
    if (capacity <= 0) return;

    const quantityToAdd = Math.min(capacity, 1); // Add 1 at a time for now

    // Dynamically import menuItems to get image paths
    const { menuItems } = await import("@/lib/menuData");

    if (type === "fries") {
      const friesItem = createUpsellItem("fries", quantityToAdd, menuItems);
      dispatch({ type: "ADD_ITEM", payload: { item: friesItem } });
    } else if (type === "drink") {
      const drinkItem = createUpsellItem("drink", quantityToAdd, menuItems);
      dispatch({ type: "ADD_ITEM", payload: { item: drinkItem } });
    } else if (type === "both") {
      const friesItem = createUpsellItem("fries", quantityToAdd, menuItems);
      const drinkItem = createUpsellItem("drink", quantityToAdd, menuItems);
      dispatch({ type: "ADD_ITEM", payload: { item: friesItem } });
      dispatch({ type: "ADD_ITEM", payload: { item: drinkItem } });
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
      subtotal: Number(subtotal.toFixed(2)),
      promotion,
      bogoPitaPromo,
      totalDiscount: Number(totalDiscount.toFixed(2)),
      total: Number(total.toFixed(2)),
          upsellCapacity,
          showUpsellModal,
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
          setToastNotification,
          handleUpsellSelect,
    }),
    [
      state.items,
      state.isOpen,
      state.fulfillmentType,
      cartCount,
      subtotal,
      promotion,
      bogoPitaPromo,
      totalDiscount,
      total,
      upsellCapacity,
      showUpsellModal,
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
      setToastNotification,
      handleUpsellSelect,
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

