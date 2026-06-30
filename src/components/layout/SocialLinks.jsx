import BrandIcon from "@/components/ui/BrandIcon";
import { siteConfig } from "@/config/site";

/**
 * "Follow Us" cluster anchored bottom-right of the hero.
 */
export default function SocialLinks() {
  return (
    <div className="flex flex-col items-end gap-2 text-white text-shadow-soft">
      <div className="flex items-center gap-4">
        {siteConfig.social.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="transition-colors hover:text-amber-200"
          >
            <BrandIcon name={item.icon} size={28} />
          </a>
        ))}
      </div>
      <span className="text-sm font-medium tracking-wide">Follow Us</span>
    </div>
  );
}
