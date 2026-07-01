"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BrandIcon from "@/components/ui/BrandIcon";
import { siteConfig, assets } from "@/config/site";

/**
 * Site footer: brand, navigation, social links and copyright.
 * Content-driven from `siteConfig`; reuses the same nav and social sources
 * as the header so links stay in sync.
 */
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full border-t border-[#5a3320]/15 bg-[#d8cabb] px-6 py-14 text-[#5a3320] md:px-10"
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
            <p className="text-sm text-[#5a3320]/60">{siteConfig.tagline}</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <ul className="flex flex-col items-center gap-3 text-sm font-medium tracking-wide md:items-start">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#5a3320]/70 transition-colors hover:text-[#5a3320]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <p className="text-sm font-medium tracking-wide text-[#5a3320]/70">
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
                  className="text-[#5a3320]/80 transition-colors hover:text-[#5a3320]"
                >
                  <BrandIcon name={item.icon} size={26} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#5a3320]/15 pt-6 text-center text-xs text-[#5a3320]/50">
          {siteConfig.copyright}
        </div>
      </div>
    </motion.footer>
  );
}
