import { assets } from "@/config/site";

/**
 * Full-bleed intro video. Plays once and is left on its final frame
 * (no `loop`), so the frozen "table" shot becomes the hero backdrop.
 * Playback is controlled by `useVideoIntro` via the forwarded ref.
 */
export default function HeroVideo({ ref }) {
  return (
    <video
      ref={ref}
      src={assets.introVideo}
      poster={assets.introPoster}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
