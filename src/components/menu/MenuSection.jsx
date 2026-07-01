"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { menuCategories } from "@/config/menuData";
import { useMenu } from "./MenuContext";

const SELECTED_BG = "rgba(39, 25, 19, 0.8)";
const BROWN = "#5a3320";
const COUNT = menuCategories.length;
/** Extra viewport-heights of vertical scroll spent moving across the cards. */
const SCROLL_PER_CARD = 60;
/**
 * How close (in card slots, 0 = dead centre, 0.5 = half-way to the neighbour) a
 * card must be to the centre before it lights up. Small so only the card that
 * is actually centred is highlighted — not the one still gliding toward it.
 */
const CENTER_THRESHOLD = 0.28;

/**
 * "Our Menu" — a full-height, pinned section recreating the reference design.
 * The section is taller than the viewport; its inner panel sticks to fill the
 * screen while the visitor scrolls, and that vertical scroll is mapped to a
 * horizontal glide across the category cards. Three cards show at a time with
 * the neighbours peeking. Behind them a large dish cross-fades to whichever
 * card is centred; that centred card fills dark ({@link SELECTED_BG}) with
 * white text to read as selected. Any card opens the full 3D menu book.
 */
export default function MenuSection() {
  const { openMenu } = useMenu();
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const cardRefs = useRef([]);
  const [bounds, setBounds] = useState({ start: 0, end: 0 });
  // `centered` is the nearest card (drives the background dish); `active` is the
  // highlighted card, set only while a card is genuinely centred (-1 = none).
  const [centered, setCentered] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Translate scroll progress into a horizontal offset that keeps the first
  // card centred at the start and the last card centred at the end.
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const first = cardRefs.current[0];
    const last = cardRefs.current[COUNT - 1];
    if (!viewport || !first || !last) return;
    const half = viewport.clientWidth / 2;
    const centerOf = (el) => el.offsetLeft + el.offsetWidth / 2;
    setBounds({ start: half - centerOf(first), end: half - centerOf(last) });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const x = useTransform(scrollYProgress, [0, 1], [bounds.start, bounds.end]);

  // Card position follows progress linearly (equal-width cards). The nearest
  // card drives the dish; it only lights up once it's within CENTER_THRESHOLD.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const pos = p * (COUNT - 1);
    const nearest = Math.min(COUNT - 1, Math.max(0, Math.round(pos)));
    setCentered((prev) => (prev === nearest ? prev : nearest));
    const next = Math.abs(pos - nearest) <= CENTER_THRESHOLD ? nearest : -1;
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative w-full bg-[#d8cabb]"
      style={{ height: `${100 + (COUNT - 1) * SCROLL_PER_CARD}vh` }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16"
      >
        <h2 className="relative z-20 text-center font-display text-5xl text-[#5a3320] sm:text-6xl md:text-7xl">
          Our Menu
        </h2>

        <div className="relative mt-8 flex flex-1 items-center md:mt-10">
          {/* The large dish behind the rail, cross-fading to the centred card. */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative h-[20rem] w-[78vw] max-w-lg md:h-[32rem]">
              <AnimatePresence>
                <motion.div
                  key={centered}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={menuCategories[centered].img}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="78vw"
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* The horizontal track, glided by vertical scroll progress. */}
          <motion.div
            style={{ x }}
            className="relative z-10 flex items-center gap-5 will-change-transform md:gap-7"
          >
            {menuCategories.map((category, i) => (
              <MenuCard
                key={category.title}
                ref={(el) => (cardRefs.current[i] = el)}
                category={category}
                selected={i === active}
                onOpen={openMenu}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * A card with its label stacked one line per entry. The selected card fills
 * dark with white text; the others are translucent with brown text. Colour and
 * lift only — every card keeps the same layout width so the horizontal
 * measurement that drives the glide stays stable.
 */
function MenuCard({ ref, category, selected, onOpen }) {
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`View ${category.title}`}
      aria-pressed={selected}
      style={{
        color: selected ? "#ffffff" : BROWN,
        backgroundColor: selected ? SELECTED_BG : "rgba(255,255,255,0.28)",
        boxShadow: selected ? "0 30px 60px -15px rgba(39,25,19,0.65)" : undefined,
      }}
      className={`flex h-[22rem] w-[74vw] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-[2.25rem] px-6 text-center font-display leading-[1.05] backdrop-blur-[2px] transition-[color,background-color,box-shadow,transform] duration-300 ease-out md:h-[28rem] md:w-[23rem] ${
        selected ? "z-10 -translate-y-2 scale-[1.05] ring-1 ring-white/20" : "ring-1 ring-white/40"
      }`}
    >
      {category.lines.map((line, i) => (
        <span
          key={i}
          className="block whitespace-nowrap text-4xl md:text-5xl"
          style={selected ? undefined : { textShadow: "0 2px 12px rgba(255,255,255,0.6)" }}
        >
          {line}
        </span>
      ))}
    </motion.button>
  );
}
