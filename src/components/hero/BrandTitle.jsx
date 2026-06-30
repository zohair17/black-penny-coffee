import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { riseVariants } from "./motion";

/**
 * Stacked brand title + tagline shown on the left of the hero.
 */
export default function BrandTitle({ className = "" }) {
  return (
    <motion.div
      variants={riseVariants}
      className={`text-white text-shadow-soft ${className}`}
    >
      <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        {siteConfig.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-4 text-lg font-light tracking-wide text-amber-50/90 sm:text-xl">
        {siteConfig.tagline}
      </p>
    </motion.div>
  );
}
