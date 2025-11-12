"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { calculatePromotion, promotionConfig } from "@/lib/promotions";

const STORAGE_KEY = "gyro-cafe-cart";

const CartContext = createContext(null);

const initialState = {
  items: [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return { ...state, ...action.payload };
    case "ADD_ITEM": {
      const { item } = action.payload;
      const items = [...state.items];
      const existingIndex = items.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingIndex > -1) {
        items[existingIndex] = {
          ...items[existingIndex],
          quantity:
            (items[existingIndex].quantity ?? 1) + (item.quantity ?? 1),
        };
      } else {
        items.push({ ...item, quantity: item.quantity ?? 1 });
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
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored);
      if (parsed?.items) {
        dispatch({ type: "INITIALIZE", payload: { items: parsed.items } });
      }
    } catch (error) {
      console.warn("Unable to parse stored cart", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items: state.items })
    );
  }, [state.items]);

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
        0
      ),
    [state.items]
  );

  const promotion = useMemo(
    () => calculatePromotion(state.items, promotionConfig),
    [state.items]
  );

  const total = useMemo(
    () => Math.max(subtotal - (promotion.discount ?? 0), 0),
    [subtotal, promotion]
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

  const value = useMemo(
    () => ({
      items: state.items,
      isOpen: state.isOpen,
      cartCount,
      subtotal: Number(subtotal.toFixed(2)),
      promotion,
      total: Number(total.toFixed(2)),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      state.items,
      state.isOpen,
      cartCount,
      subtotal,
      promotion,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
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

