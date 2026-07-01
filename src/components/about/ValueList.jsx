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
 * "Our Value" — a dark card sliding in from the right, its value rows (icon +
 * label) staggering into place.
 */
export default function ValueList({ className = "" }) {
  const { heading, items } = siteConfig.about.values;

  return (
    <motion.div
      variants={fromRightVariants}
      className={`flex flex-col justify-center rounded-[2rem] bg-[#5a3320] p-8 text-[#f5efe6] shadow-xl md:p-12 ${className}`}
    >
      <h3 className="text-center font-display text-4xl leading-tight sm:text-5xl">
        {heading}
      </h3>

      <ul className="mx-auto mt-8 flex w-full max-w-[16rem] flex-col gap-5">
        {items.map(({ label, icon }) => {
          const Icon = ICONS[icon] ?? Leaf;
          return (
            <motion.li
              key={label}
              variants={valueItemVariants}
              className="flex items-center gap-4 text-lg font-light sm:text-xl"
            >
              <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} />
              <span>{label}</span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
