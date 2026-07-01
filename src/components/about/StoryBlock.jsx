import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { fromLeftVariants } from "./motion";

/**
 * "Our Story" — a light card that slides in from the left.
 */
export default function StoryBlock({ className = "" }) {
  const { heading, text } = siteConfig.about.story;

  return (
    <motion.div
      variants={fromLeftVariants}
      className={`flex flex-col justify-center rounded-[2rem] bg-[#efe6d9] p-8 shadow-xl md:p-12 ${className}`}
    >
      <h3 className="font-display text-4xl leading-tight text-[#5a3320] sm:text-5xl">
        {heading}
      </h3>
      <p className="mt-6 text-base font-light leading-relaxed text-[#5a3320]/85 sm:text-lg">
        {text}
      </p>
    </motion.div>
  );
}
