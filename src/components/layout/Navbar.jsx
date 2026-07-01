"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Menu } from "lucide-react";
import { siteConfig, assets } from "@/config/site";
import { useCart } from "@/components/cart/CartContext";
import NavDrawer from "./NavDrawer";

/**
 * Top navigation bar overlaid on the hero: logo, centred links, cart.
 * The cart button shows the live item count and opens the cart drawer;
 * the links scroll to their sections. Below `md` the inline links
 * collapse into a hamburger that opens the {@link NavDrawer}.
 */
export default function Navbar() {
  const { count, openCart } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/60 via-black/30 to-transparent px-6 py-4 md:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between text-white">
        <a href="#home" aria-label={siteConfig.name} className="shrink-0">
          <Image
            src={assets.logo.src}
            alt={`${siteConfig.name} logo`}
            width={56}
            height={56}
            priority
            className="absolute h-22 w-22 object-contain -mt-5"
          />
        </a>

        {/* Inline links — hidden on small screens in favour of the drawer. */}
        <ul className="hidden mt-2 items-center gap-3 text-xs font-medium tracking-wide sm:gap-5 sm:text-sm md:flex md:gap-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-shadow-soft transition-colors hover:text-amber-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
            className="relative shrink-0 transition-colors hover:text-amber-200"
          >
            <ShoppingCart className="h-6 w-6" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-200 px-1 text-xs font-bold text-neutral-950">
                {count}
              </span>
            )}
          </button>

          {/* Hamburger — only below md; opens the navigation drawer. */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            aria-expanded={drawerOpen}
            className="shrink-0 transition-colors hover:text-amber-200 md:hidden"
          >
            <Menu className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
