"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/config/menuData";
import { useCart } from "./CartContext";

/**
 * Slide-in cart panel listing the chosen dishes with quantity controls and a
 * running total. Rendered once by the CartProvider, above everything else.
 */
export default function CartDrawer() {
  const { items, open, closeCart, setQty, removeItem, total, count, clear } =
    useCart();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-neutral-950 text-white shadow-2xl"
            role="dialog"
            aria-label="Cart"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="flex items-center gap-2 font-display text-2xl">
                <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
                Your Order
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close"
                className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <p className="mt-16 text-center text-white/50">
                  Your cart is empty.
                  <br />
                  Pick a dish from the menu to get started.
                </p>
              ) : (
                <ul className="divide-y divide-white/10">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="text-sm text-amber-200">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="rounded-full border border-white/20 p-1 transition-colors hover:bg-white/10"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="rounded-full border border-white/20 p-1 transition-colors hover:bg-white/10"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeItem(item.id)}
                        className="ml-1 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-white/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-lg">
                <span className="text-white/70">
                  Total{count > 0 ? ` · ${count} item${count > 1 ? "s" : ""}` : ""}
                </span>
                <span className="font-display text-2xl text-amber-200">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={items.length === 0}
                  className="flex-1 rounded-full bg-amber-200 py-3 font-medium text-neutral-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Checkout
                </button>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-full border border-white/20 px-5 py-3 text-sm text-white/70 transition-colors hover:bg-white/10"
                  >
                    Clear
                  </button>
                )}
              </div>
            </footer>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
