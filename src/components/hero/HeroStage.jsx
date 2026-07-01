"use client";

import { motion } from "framer-motion";
import SocialLinks from "@/components/layout/SocialLinks";
import BrandTitle from "./BrandTitle";
import EventCard from "./EventCard";
import { stageVariants } from "./motion";

/**
 * The hero composition laid over the table backdrop. A staggered container
 * brings the pieces in on load: the brand title centred over the table, the
 * upcoming event anchored bottom-left and the socials bottom-right. The fixed
 * header is rendered separately by {@link HeroSection} so it persists on scroll.
 */
export default function HeroStage() {
  return (
    <motion.div
      variants={stageVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 z-10 flex flex-col"
    >
      {/* Brand centred over the table top. */}
      <div className="flex flex-1 items-center justify-center px-6">
        <BrandTitle />
      </div>

      {/* Event bottom-left, socials bottom-right. */}
      <div className="flex items-end justify-between gap-4 px-6 pb-8 md:px-10">
        <EventCard />
        <SocialLinks />
      </div>
    </motion.div>
  );
}
