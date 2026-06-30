import { motion } from "framer-motion";
import { Leaf, Heart, Users, Coffee } from "lucide-react";
import { siteConfig } from "@/config/site";
import { fromRightVariants, valueItemVariants } from "./motion";

/** Maps config icon names to lucide glyphs. */
const ICONS = {
  leaf: Leaf,
  heart: Heart,
  users: Users,
  coffee: Coffee,
};

/**
 * "Our Value" — heading + brand values, sliding in from the right with the
 * rows staggering into place.
 */
export default function ValueList({ className = "" }) {
  const { heading, items } = siteConfig.about.values;

  return (
    <motion.div
      variants={fromRightVariants}
      className={`text-white text-shadow-soft ${className}`}
    >
      <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl md:text-6xl">
        {heading}
      </h2>
      <ul className="mt-6 space-y-4">
        {items.map(({ label, icon }) => {
          const Icon = ICONS[icon] ?? Leaf;
          return (
            <motion.li
              key={label}
              variants={valueItemVariants}
              className="flex items-center gap-3 text-lg font-light sm:text-xl"
            >
              <Icon className="h-6 w-6 shrink-0 text-amber-200" strokeWidth={1.75} />
              <span>{label}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
