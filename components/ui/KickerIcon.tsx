import { cn } from "@/lib/utils";

interface KickerIconProps {
  className?: string;
  size?: number;
}

/**
 * The Krest Holding mark used before every eyebrow/kicker label in the Figma design
 * (public/kicker_mark.png). Rendered via CSS mask instead of <img> so it inherits
 * `currentColor` — same asset, any color, matching each section's kicker text color.
 */
export default function KickerIcon({ className, size = 33 }: KickerIconProps) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: "url(/kicker_mark.png)",
        maskImage: "url(/kicker_mark.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
