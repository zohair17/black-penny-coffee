/**
 * Page model for the 3D menu book.
 *
 * The source art:
 *   - 1.png ........... front cover  (single page)
 *   - 2.png..13.png ... spreads      (each = a left half + a right half)
 *   - 14.png .......... back cover   (single page)
 *
 * A spread fills the WHOLE open book: its left half is the left page, its
 * right half is the right page. Turning advances to the next spread. So each
 * "leaf" that turns carries the right half of one spread on its front and the
 * left half of the next spread on its back — exactly like a real book.
 *
 *   position 0 .... left: (blank)        right: 1.png            (closed on cover)
 *   position 1 .... left: 2.png(left)    right: 2.png(right)     (spread 2)
 *   position 2 .... left: 3.png(left)    right: 3.png(right)     (spread 3)
 *   ...
 *   position 12 ... left: 13.png(left)   right: 13.png(right)    (spread 13)
 *   position 13 ... left: 14.png         right: (blank)          (back cover)
 *
 * A face is a half page, described as `{ img, half }` with half "full"|"L"|"R".
 */

export const BOOKLET_IMAGES = Array.from(
  { length: 14 },
  (_, i) => `/asset/booklet/${i + 1}.png`,
);

/** Open positions: 0 (cover) .. LAST_POSITION (back cover). */
export const LAST_POSITION = 13;

/** Front face of a leaf (the side seen on the right before it turns). */
function leafFront(leaf) {
  if (leaf === 0) return { img: 1, half: "full" }; // front cover
  if (leaf >= 1 && leaf <= 12) return { img: leaf + 1, half: "R" };
  return null;
}

/** Back face of a leaf (the side seen on the left after it turns). */
function leafBack(leaf) {
  if (leaf >= 0 && leaf <= 11) return { img: leaf + 2, half: "L" };
  if (leaf === 12) return { img: 14, half: "full" }; // back cover
  return null;
}

/** Faces visible at a settled open position. */
export function pageFaces(position) {
  return {
    left: leafBack(position - 1),
    right: leafFront(position),
  };
}

/**
 * Build the descriptor for an animated turn, or `null` if out of bounds.
 * Includes the turning leaf's two faces, its rotation range, the pages sitting
 * underneath during the motion, and the resulting position.
 */
export function buildTurn(direction, position) {
  if (direction === "next") {
    if (position >= LAST_POSITION) return null;
    const leaf = position;
    return {
      direction,
      from: 0,
      to: -Math.PI,
      sheetFront: leafFront(leaf),
      sheetBack: leafBack(leaf),
      staticLeft: leafBack(position - 1),
      staticRight: leafFront(position + 1),
      nextPosition: position + 1,
    };
  }

  if (position <= 0) return null;
  const leaf = position - 1;
  return {
    direction,
    from: -Math.PI,
    to: 0,
    sheetFront: leafFront(leaf),
    sheetBack: leafBack(leaf),
    staticLeft: leafBack(position - 2),
    staticRight: leafFront(position),
    nextPosition: position - 1,
  };
}
