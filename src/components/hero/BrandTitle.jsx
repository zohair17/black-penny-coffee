import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { riseVariants } from "./motion";

/**
 * Stacked brand title + tagline shown on the left of the hero.
 */
export default function BrandTitle({ className = "" }) {
  const { titleLines } = siteConfig;
  // "The Black" share a row, "Penny" sits on its own — only the last word drops.
  const leadWords = titleLines.slice(0, -1).join(" ");
  const lastWord = titleLines[titleLines.length - 1];

  return (
    <motion.div
      variants={riseVariants}
      className={`text-center text-white text-shadow-soft md:text-left ${className} mt-20`}
    >
      <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        {/* Mobile / short screens: "The Black" on one row, "Penny" centered below. */}
        <span className="block md:hidden">
          <span className="block">{leadWords}</span>
          <span className="block">{lastWord}</span>
        </span>
        {/* md+ : one word per line, stacked. */}
        <span className="hidden md:block">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      </h1>
      <p className="mt-4 text-lg font-light tracking-wide text-amber-50/90 sm:text-xl">
        {siteConfig.tagline}
      </p>
    </motion.div>
  );
}
