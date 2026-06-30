"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { siteConfig, assets } from "@/config/site";
import { useCart } from "@/components/cart/CartContext";
import { useMenu } from "@/components/menu/MenuContext";

/**
 * Top navigation bar overlaid on the hero: logo, centred links, cart.
 * The cart button shows the live item count and opens the cart drawer;
 * the "Menu" link opens the 3D menu book.
 */
export default function Navbar() {
  const { count, openCart } = useCart();
  const { openMenu } = useMenu();

  return (
    <header className="w-full px-6 py-4 md:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between text-white">
        <a href="#home" aria-label={siteConfig.name} className="shrink-0">
          <Image
            src={assets.logo.src}
            alt={`${siteConfig.name} logo`}
            width={56}
            height={56}
            priority
            className="h-12 w-12 object-contain brightness-0 invert"
          />
        </a>

        <ul className="flex items-center gap-3 text-xs font-medium tracking-wide sm:gap-5 sm:text-sm md:gap-8">
          {siteConfig.nav.map((item) =>
            item.href === "#menu" ? (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={openMenu}
                  className="text-shadow-soft transition-colors hover:text-amber-200"
                >
                  {item.label}
                </button>
              </li>
            ) : (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-shadow-soft transition-colors hover:text-amber-200"
                >
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>

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
      </nav>
    </header>
  );
}
