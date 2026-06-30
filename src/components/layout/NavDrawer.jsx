"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { siteConfig, assets } from "@/config/site";
import { useMenu } from "@/components/menu/MenuContext";

/**
 * Slide-in navigation panel for small screens. The Navbar hides its inline
 * links below `md` and opens this drawer from the hamburger button instead.
 * Tapping a link (or the "Menu" entry, which opens the 3D book) closes it.
 */
export default function NavDrawer({ open, onClose }) {
  const { openMenu } = useMenu();

  // Close on Escape and lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const handleMenu = () => {
    onClose();
    openMenu();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <motion.button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 flex h-full w-72 max-w-[80%] flex-col bg-neutral-950 text-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="flex items-center gap-3">
                <Image
                  src={assets.logo.src}
                  alt={`${siteConfig.name} logo`}
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain "
                />
                <span className="font-display text-lg">{siteConfig.name}</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </header>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {siteConfig.nav.map((item) =>
                  item.href === "#menu" ? (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={handleMenu}
                        className="w-full rounded-lg px-4 py-3 text-left font-display text-xl tracking-wide transition-colors hover:bg-white/10 hover:text-amber-200"
                      >
                        {item.label}
                      </button>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="block rounded-lg px-4 py-3 font-display text-xl tracking-wide transition-colors hover:bg-white/10 hover:text-amber-200"
                      >
                        {item.label}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
