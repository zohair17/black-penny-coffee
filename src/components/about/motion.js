/**
 * Shared framer-motion variants for the About reveal.
 * The section animates in when it scrolls into view: the story slides in from
 * the left, the values from the right, and the centre label fades up.
 */

const EASE = [0.22, 1, 0.36, 1];

/** "Our Story" block entering from the left. */
export const fromLeftVariants = {
  hidden: { opacity: 0, x: -64 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE } },
};

/** "Our Value" block entering from the right; staggers its children. */
export const fromRightVariants = {
  hidden: { opacity: 0, x: 64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE, staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

/** Centre "About" label fading up. */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** A single value row rising into place. */
export const valueItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
