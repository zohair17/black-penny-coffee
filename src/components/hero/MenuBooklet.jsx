import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/config/site";
import { bookletVariants } from "./motion";

/**
 * The menu booklet standing on the table, with a prompt to open it.
 * Acts as the call-to-action into the menu experience.
 */
export default function MenuBooklet({ onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      variants={bookletVariants}
      className="group flex cursor-pointer flex-col items-center"
      aria-label="Open the menu"
    >
      <Image
        src={assets.menuBooklet.src}
        alt="The Black Penny menu booklet"
        width={assets.menuBooklet.width}
        height={assets.menuBooklet.height}
        priority
        className="h-auto w-44 drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 sm:w-82"
      />
      <span className="mt-2 text-center text-lg font-light leading-tight text-white text-shadow-soft sm:text-xl">
        Open the book
        <br />
        for menu
      </span>
    </motion.button>
  );
}
