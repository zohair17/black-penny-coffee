import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { riseVariants } from "./motion";

/**
 * Upcoming event details shown on the right of the hero.
 */
export default function EventCard({ className = "" }) {
  const { heading, lines } = siteConfig.event;

  return (
    <motion.div
      variants={riseVariants}
      className={`text-white text-shadow-soft md:text-right ${className}`}
    >
      <h2 className="font-display text-4xl font-medium sm:text-5xl md:text-6xl">{heading}</h2>
      <ul className="mt-3  space-y-1 text-lg font-light text-amber-50/90 lg:text-xl text-center">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </motion.div>
  );
}
