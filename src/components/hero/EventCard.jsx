import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { riseVariants } from "./motion";

/**
 * Upcoming event details anchored to the bottom-left of the hero.
 */
export default function EventCard({ className = "" }) {
  const { heading, lines } = siteConfig.event;

  return (
    <motion.div
      variants={riseVariants}
      className={`text-left text-white text-shadow-soft ${className}`}
    >
      {/* Mobile: one compact, pipe-separated line. */}
      <p className="max-w-[60vw] text-sm font-light text-amber-50/90 sm:hidden">
        <span className="font-medium text-white">{heading}: </span>
        {lines.join(" | ")}
      </p>

      {/* sm+ : heading with the details stacked beneath. */}
      <div className="hidden sm:block">
        <h2 className="font-display text-5xl font-medium md:text-6xl">
          {heading}
        </h2>
        <ul className="mt-2 space-y-0.5 text-base font-light text-amber-50/90 md:text-3xl">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
