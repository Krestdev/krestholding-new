import { cn } from "@/lib/utils";

interface CtaArrowProps {
  className?: string;
  size?: number;
}

/**
 * The exact arrow vector used across CTAs in the Figma design (public/cta_Vector.png).
 * Rendered via CSS mask instead of <img> so it inherits `currentColor` — same asset,
 * any color, matching each button/link's own text color (white, black, or accent).
 */
export default function CtaArrow({ className, size = 16 }: CtaArrowProps) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: size,
        height: size,
        WebkitMaskImage: "url(/cta_Vector.png)",
        maskImage: "url(/cta_Vector.png)",
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
