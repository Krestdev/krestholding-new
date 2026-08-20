"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollRevealWordProps {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}

function ScrollRevealWord({ word, start, end, progress }: ScrollRevealWordProps) {
  const color = useTransform(progress, [start, end], ["rgba(255,255,255,0.2)", "rgba(255,255,255,1)"]);
  return (
    <motion.span style={{ color }}>
      {word}{" "}
    </motion.span>
  );
}

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  as?: "h2" | "p";
}

/**
 * Scroll-scrubbed word-by-word reveal: each word ramps from dim white
 * (rgba(255,255,255,0.2)) to solid white as scrollYProgress sweeps over the
 * paragraph, so it brightens left-to-right/top-to-bottom and un-brightens
 * on scroll-up — tied to scroll position, not a one-shot timed animation.
 */
export default function ScrollRevealText({ text, className, as = "p" }: ScrollRevealTextProps) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });

  const words = text.split(" ").filter(Boolean);
  const fadeWidth = Math.min(Math.max((1 / words.length) * 1.5, 0.05), 0.4);

  const content = words.map((word, i) => {
    const start = i / words.length;
    const end = Math.min(start + fadeWidth, 1);
    return <ScrollRevealWord key={i} word={word} start={start} end={end} progress={scrollYProgress} />;
  });

  if (as === "h2") {
    return (
      <motion.h2 ref={ref} className={className}>
        {content}
      </motion.h2>
    );
  }

  return (
    <motion.p ref={ref} className={className}>
      {content}
    </motion.p>
  );
}
