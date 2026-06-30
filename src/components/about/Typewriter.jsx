"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Types `text` out one character at a time once `start` is true. Reusable for
 * any reveal-on-scroll copy. Respects reduced-motion by showing the full text
 * immediately, and resets if it scrolls back out of view.
 */
export default function Typewriter({ text, start, speed = 26, className }) {
  const [count, setCount] = useState(0);
  const [prevStart, setPrevStart] = useState(start);
  const prefersReducedMotion = useReducedMotion();

  // Reset progress when it scrolls back out of view so it types again next
  // time. Adjusting state during render (per the React docs) keeps this out
  // of an effect.
  if (start !== prevStart) {
    setPrevStart(start);
    if (!start) setCount(0);
  }

  // Reduced motion shows the full text instantly; otherwise reveal `count`.
  const visibleCount = start && prefersReducedMotion ? text.length : count;
  const done = visibleCount >= text.length;

  useEffect(() => {
    if (!start || prefersReducedMotion || count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [start, count, text, speed, prefersReducedMotion]);

  return (
    <p className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, visibleCount)}</span>
      {start && !done && (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle"
          style={{ height: "1em" }}
        />
      )}
    </p>
  );
}
