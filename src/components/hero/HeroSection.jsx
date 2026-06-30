"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useVideoIntro } from "@/hooks/useVideoIntro";
import { useMenu } from "@/components/menu/MenuContext";
import Navbar from "@/components/layout/Navbar";
import HeroVideo from "./HeroVideo";
import HeroStage from "./HeroStage";

/**
 * Hero orchestrator.
 *
 * On load the intro video plays full-screen. When it reaches its final
 * frame (the table shot) the clip freezes there and the hero composition
 * — navbar, brand title, menu booklet and event — is revealed on top.
 * Clicking the menu booklet opens the animated 3D menu book.
 */
export default function HeroSection() {
  const { videoRef, hasEnded } = useVideoIntro();
  const { openMenu } = useMenu();

  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      <HeroVideo ref={videoRef} />

      {/* Subtle scrim to keep white text legible over the footage. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40"
      />

      <AnimatePresence>
        {hasEnded && <HeroStage key="stage" onOpenMenu={openMenu} />}
      </AnimatePresence>

      {/* Fixed site header — revealed once the intro ends, then stays pinned to
          the top of the viewport across every section. Only opacity animates so
          no transformed ancestor is created (which would break `position:fixed`). */}
      <AnimatePresence>
        {hasEnded && (
          <motion.div
            key="header"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
