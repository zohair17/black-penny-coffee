"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingCart, Plus, Check } from "lucide-react";
import { buildTurn, LAST_POSITION } from "./bookModel";
import {
  itemsForPosition,
  titleForPosition,
  formatPrice,
} from "@/config/menuData";
import { useCart } from "@/components/cart/CartContext";

// three/r3f are client-only — never render them on the server.
const MenuBookCanvas = dynamic(() => import("./MenuBookCanvas"), {
  ssr: false,
});

/**
 * Full-screen overlay that presents the menu as an animated 3D book.
 * Owns the open-position state; the canvas reports when a page turn finishes.
 * Previous/Next flip the pages; the book auto-opens from its cover on launch.
 */
export default function MenuBookModal({ open, onClose }) {
  const [position, setPosition] = useState(0);
  const [turn, setTurn] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const turnId = useRef(0);
  const addedTimer = useRef(null);
  const { addItem, count, openCart } = useCart();

  const turning = turn !== null;
  const items = itemsForPosition(position);
  const spreadTitle = titleForPosition(position);

  const handleAdd = useCallback((item) => {
    addItem(item);
    setAddedId(item.id);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAddedId(null), 1000);
  }, [addItem]);

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  // Reset whenever the modal is closed so it reopens from the cover. Adjusting
  // state during render (per the React docs) avoids a cascading-render effect.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) {
      setPosition(0);
      setTurn(null);
    }
  }

  const startTurn = useCallback(
    (direction) => {
      setTurn((current) => {
        if (current) return current; // ignore while a turn is in flight
        const next = buildTurn(direction, position);
        if (!next) return current;
        turnId.current += 1;
        return { ...next, id: turnId.current };
      });
    },
    [position],
  );

  const handleTurnDone = useCallback(() => {
    setTurn((current) => {
      if (current) setPosition(current.nextPosition);
      return null;
    });
  }, []);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") startTurn("next");
      if (e.key === "ArrowLeft") startTurn("prev");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, startTurn]);

  const canPrev = position > 0 && !turning;
  const canNext = position < LAST_POSITION && !turning;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col bg-neutral-950/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
              className="relative rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ShoppingCart className="h-7 w-7" strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-200 px-1 text-xs font-bold text-neutral-950">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-7 w-7" strokeWidth={1.5} />
            </button>
          </div>

          {/* 3D book */}
          <div className="min-h-0 flex-1">
            <MenuBookCanvas
              position={position}
              turn={turn}
              onTurnDone={handleTurnDone}
            />
          </div>

          {/* Orderable items for the open spread */}
          {items.length > 0 && (
            <div className="mx-auto w-full max-w-5xl px-4">
              {spreadTitle && (
                <p className="mb-2 text-center font-display text-lg tracking-wide text-amber-200">
                  {spreadTitle}
                </p>
              )}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {items.map((item) => {
                  const added = addedId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                        added
                          ? "border-amber-200 bg-amber-200 text-neutral-950"
                          : "border-white/20 text-white hover:border-amber-200 hover:bg-white/10"
                      }`}
                    >
                      {added ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4 text-amber-200" />
                      )}
                      <span className="whitespace-nowrap">{item.name}</span>
                      <span
                        className={added ? "text-neutral-800" : "text-white/60"}
                      >
                        {formatPrice(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col items-center gap-3 pb-8 pt-3 text-white">
            <div className="flex items-center gap-10 text-lg">
              <button
                type="button"
                onClick={() => startTurn("prev")}
                disabled={!canPrev}
                className="font-display tracking-wide transition-opacity hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => startTurn("next")}
                disabled={!canNext}
                className="font-display tracking-wide transition-opacity hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next
              </button>
            </div>
            <p className="text-center text-xs font-light tracking-wide text-white/50">
              Scroll to zoom · Drag to pan · Double-click to reset
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
