import Image from "next/image";
import { assets } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import HeroStage from "./HeroStage";

/**
 * Hero section.
 *
 * A static top-down table shot backs the section; the brand title sits
 * centred over the table with the tagline beneath, the upcoming event is
 * anchored bottom-left and the socials bottom-right. The fixed site header
 * is rendered here so it stays pinned across every section on scroll.
 */
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      <Image
        src={assets.heroBackground}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle scrim to keep white text legible over the table and floor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50"
      />

      <Navbar />
      <HeroStage />
    </section>
  );
}
