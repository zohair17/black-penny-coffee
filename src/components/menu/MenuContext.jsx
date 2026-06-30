"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import MenuBookModal from "./MenuBookModal";

const MenuContext = createContext(null);

/**
 * App-wide control for the 3D menu book. Holds the open state and renders the
 * modal once, so any "Menu" trigger (hero booklet, header, footer) can open it.
 * Must live inside CartProvider — the modal adds dishes to the cart.
 */
export function MenuProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, openMenu, closeMenu }), [open, openMenu, closeMenu]);

  return (
    <MenuContext.Provider value={value}>
      {children}
      <MenuBookModal open={open} onClose={closeMenu} />
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within a MenuProvider");
  return ctx;
}
