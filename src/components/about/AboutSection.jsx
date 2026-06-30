"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SocialLinks from "@/components/layout/SocialLinks";
import { siteConfig } from "@/config/site";
import AboutVideo from "./AboutVideo";
import StoryBlock from "./StoryBlock";
import ValueList from "./ValueList";
import Typewriter from "./Typewriter";
import { fadeUpVariants } from "./motion";

/**
 * About section.
 *
 * When it scrolls into view the looping `about.mp4` plays, the "Our Story"
 * block slides in from the left with its description typing out, the centre
 * "About" label fades up over the table, and "Our Value" slides in from the
 * right. Everything pauses/resets when it leaves the viewport.
 */
export default function AboutSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.4 });

  // Play the background loop only while the section is on screen.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-black"
    >
      <AboutVideo ref={videoRef} />

      {/* Scrim for legibility over the footage. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/55"
      />

      {/* Relative + min-height so the stacked mobile layout can grow instead of
          being crushed into one screen; on md+ it fills the viewport overlay. */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 flex min-h-[100svh] flex-col"
      >
        <div className="flex flex-1 items-center px-6 py-12 md:px-10 md:py-0">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 sm:gap-14 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            <StoryBlock className="md:justify-self-start" />

            {/* "About" sits above the cup, "Us" below it. */}
            <div className="flex flex-col items-center gap-4 py-2 sm:gap-6 md:h-[55vh] md:justify-between md:gap-0">
              <Typewriter
                text={siteConfig.about.centerLabel}
                start={inView}
                speed={140}
                className="whitespace-nowrap text-center font-display text-6xl font-medium text-white text-shadow-soft sm:text-7xl md:text-7xl lg:text-8xl"
              />
              <Typewriter
                text={siteConfig.about.centerLabelSub}
                start={inView}
                speed={140}
                className="whitespace-nowrap text-center font-display text-6xl font-medium text-white text-shadow-soft sm:text-7xl md:text-7xl lg:text-8xl"
              />
            </div>

            <ValueList className="md:justify-self-end" />
          </div>
        </div>

        <motion.div
          variants={fadeUpVariants}
          className="flex justify-end px-6 pb-8 md:px-10"
        >
          <SocialLinks />
        </motion.div>
      </motion.div>
    </section>
  );
}
