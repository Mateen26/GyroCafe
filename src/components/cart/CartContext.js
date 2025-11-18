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

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
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

  // Handle upsell triggers and excess removal
  useEffect(() => {
    // Only for pickup orders
    if (state.fulfillmentType !== "pickup" || !upsellConfig.active) {
      previousItemsRef.current = state.items;
      return;
    }

    // Check for excess upsells and remove them
    const excessRemovals = calculateExcessUpsells(state.items);
    if (excessRemovals.length > 0) {
      excessRemovals.forEach(({ id, quantityToRemove }) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          const newQuantity = (item.quantity ?? 1) - quantityToRemove;
          if (newQuantity <= 0) {
            dispatch({ type: "REMOVE_ITEM", payload: { id } });
          } else {
            dispatch({ 
              type: "UPDATE_QUANTITY", 
              payload: { id, quantity: newQuantity } 
            });
          }
        }
      });
      // Show toast notification
      if (typeof window !== "undefined") {
        // Simple alert for now - can be replaced with toast component
        console.log("Add-on items adjusted based on entrée quantity.");
      }
      previousItemsRef.current = state.items;
      return;
    }

    // Check if upsell should trigger
    const capacity = shouldTriggerUpsell(state.items, previousItemsRef.current);
    if (capacity > 0) {
      setShowUpsellModal(true);
    }

    previousItemsRef.current = state.items;
  }, [state.items, state.fulfillmentType]);

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
        0
      ),
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
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

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
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      setFulfillmentType,
      setShowUpsellModal,
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
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      setFulfillmentType,
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

