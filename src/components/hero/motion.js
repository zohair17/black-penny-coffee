/**
 * Shared framer-motion variants for the hero reveal.
 * Centralising them keeps the animation language consistent across every
 * piece that appears once the intro video freezes.
 */

const EASE = [0.22, 1, 0.36, 1];

/** Parent that staggers its children into view. */
export const stageVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

/** Generic fade + rise used by text blocks. */
export const riseVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/** The menu booklet settling onto the table. */
export const bookletVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1, ease: EASE },
  },
};
