import { motion } from "framer-motion";
import SocialLinks from "@/components/layout/SocialLinks";
import BrandTitle from "./BrandTitle";
import EventCard from "./EventCard";
import MenuBooklet from "./MenuBooklet";
import { stageVariants, riseVariants } from "./motion";

/**
 * The full hero composition revealed over the frozen video frame.
 * A staggered container brings the chrome and content in together:
 * brand (left), menu booklet (centre), event (right), socials. The fixed
 * header is rendered separately by {@link HeroSection} so it persists on scroll.
 */
export default function HeroStage({ onOpenMenu }) {
  return (
    <motion.div
      variants={stageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute inset-0 z-10 flex flex-col"
    >
      <div className="flex flex-1 items-center px-6 md:px-10">
        <motion.div
          variants={stageVariants}
          className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center justify-items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-6"
        >
          <BrandTitle className="md:justify-self-start" />
          <MenuBooklet onOpen={onOpenMenu} />
          <EventCard className="md:justify-self-end" />
        </motion.div>
      </div>

      <motion.div
        variants={riseVariants}
        className="flex justify-end px-6 pb-8 md:px-10"
      >
        <SocialLinks />
      </motion.div>
    </motion.div>
  );
}
