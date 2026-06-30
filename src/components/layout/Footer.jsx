"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BrandIcon from "@/components/ui/BrandIcon";
import { siteConfig, assets } from "@/config/site";
import { useMenu } from "@/components/menu/MenuContext";

/**
 * Site footer: brand, navigation, social links and copyright.
 * Content-driven from `siteConfig`; reuses the same nav and social sources
 * as the header so links stay in sync. The "Menu" link opens the 3D book.
 */
export default function Footer() {
  const { openMenu } = useMenu();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full border-t border-white/10 bg-black px-6 py-14 text-white md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Image
              src={assets.logo.src}
              alt={`${siteConfig.name} logo`}
              width={64}
              height={64}
              className="h-14 w-14 object-contain "
            />
            <p className="font-display text-2xl">{siteConfig.name}</p>
            <p className="text-sm text-white/50">{siteConfig.tagline}</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <ul className="flex flex-col items-center gap-3 text-sm font-medium tracking-wide md:items-start">
              {siteConfig.nav.map((item) =>
                item.href === "#menu" ? (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={openMenu}
                      className="text-white/70 transition-colors hover:text-amber-200"
                    >
                      {item.label}
                    </button>
                  </li>
                ) : (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-white/70 transition-colors hover:text-amber-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <p className="text-sm font-medium tracking-wide text-white/70">
              Follow Us
            </p>
            <div className="flex items-center gap-4">
              {siteConfig.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="text-white/80 transition-colors hover:text-amber-200"
                >
                  <BrandIcon name={item.icon} size={26} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          {siteConfig.copyright}
        </div>
      </div>
    </motion.footer>
  );
}
