"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Drives the one-shot intro video that plays on load and freezes on its
 * final frame. When the clip ends (or autoplay is blocked, or the visitor
 * prefers reduced motion) `hasEnded` flips to true so the hero composition
 * can be revealed over the frozen frame.
 *
 * Returns the ref to attach to the <video> and the reveal state.
 */
export function useVideoIntro() {
  const videoRef = useRef(null);
  const [ended, setEnded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Respect reduced-motion: skip the clip entirely (reveal is derived below).
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    const reveal = () => setEnded(true);

    video.addEventListener("ended", reveal);
    // Safety net: if the browser never fires `ended`, reveal on completion.
    video.addEventListener("error", reveal);

    // Programmatic play so we can fall back gracefully when autoplay is blocked.
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(reveal);
    }

    return () => {
      video.removeEventListener("ended", reveal);
      video.removeEventListener("error", reveal);
    };
  }, [prefersReducedMotion]);

  return { videoRef, hasEnded: ended || prefersReducedMotion };
}
