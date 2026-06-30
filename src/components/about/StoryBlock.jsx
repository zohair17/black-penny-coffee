import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { fromLeftVariants, fadeUpVariants } from "./motion";

/**
 * "Our Story" — the block slides in from the left and the description fades up.
 */
export default function StoryBlock({ className = "" }) {
  const { heading, text } = siteConfig.about.story;

  return (
    <motion.div
      variants={fromLeftVariants}
      className={`max-w-sm text-white text-shadow-soft ${className}`}
    >
      <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl md:text-6xl">
        {heading}
      </h2>
      <motion.p
        variants={fadeUpVariants}
        className="mt-5 text-base font-light leading-relaxed text-amber-50/90 sm:text-lg"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
