"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import CartDrawer from "./CartDrawer";

const CartContext = createContext(null);

/**
 * App-wide cart store. Holds line items ({ id, name, price, qty }), exposes
 * add/remove/quantity actions and open/close for the drawer, and renders the
 * drawer itself so any component can drop items in via `useCart`.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, qty } : p)),
    );
  }, []);

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
    [],
  );

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, p) => n + p.qty, 0);
    const total = items.reduce((s, p) => s + p.price * p.qty, 0);
    return {
      items,
      count,
      total,
      addItem,
      setQty,
      removeItem,
      clear,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    };
  }, [items, open, addItem, setQty, removeItem, clear]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
