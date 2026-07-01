"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site";
import StoryBlock from "./StoryBlock";
import ValueList from "./ValueList";
import { fadeUpVariants } from "./motion";

/**
 * About section.
 *
 * On a warm backdrop the "About" heading sits above two cards that fill the
 * screen: the light "Our Story" card slides in from the left and the dark
 * "Our Value" card from the right as the section scrolls into view.
 */
export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.3, once: true });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#d8cabb] px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-32"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col"
      >
        <motion.h2
          variants={fadeUpVariants}
          className="text-center font-display text-6xl text-[#5a3320] sm:text-7xl md:text-8xl"
        >
          {siteConfig.about.centerLabel}
        </motion.h2>

        <div className="mt-12 grid flex-1 grid-cols-1 items-stretch gap-6 md:mt-16 md:grid-cols-2 md:grid-rows-1 md:gap-8">
          <StoryBlock />
          <ValueList />
        </div>
      </motion.div>
    </section>
  );
}
