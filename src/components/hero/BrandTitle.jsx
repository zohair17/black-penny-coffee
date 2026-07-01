import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { riseVariants } from "./motion";

/**
 * Brand title + tagline, centred over the table in the middle of the hero.
 * The name stacks one word per line; the tagline sits beneath it.
 */
export default function BrandTitle({ className = "" }) {
  const { titleLines, tagline } = siteConfig;

  return (
    <motion.div
      variants={riseVariants}
      className={`text-center text-white text-shadow-soft ${className}`}
    >
      <h1 className="font-display mt-20 text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]">
        {titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-5 text-lg font-light uppercase tracking-[0.25em] text-amber-50/90 sm:text-xl">
        {tagline}
      </p>
    </motion.div>
  );
}
