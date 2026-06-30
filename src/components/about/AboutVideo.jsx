import { assets } from "@/config/site";

/**
 * Full-bleed background video for the About section. Loops silently; playback
 * is started/paused by the parent via the forwarded ref as the section enters
 * and leaves the viewport.
 */
export default function AboutVideo({ ref }) {
  return (
    <video
      ref={ref}
      src={assets.aboutVideo}
      poster={assets.introPoster}
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
