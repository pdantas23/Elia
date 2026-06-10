"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Parallax vertical sutil ligado a rolagem. Mesma tecnica do OliverParallax
 * (framer-motion useScroll/useTransform), porem leve, para usar no hero.
 * - GPU (transform translate3d via motion + transform-gpu).
 * - Respeita `prefers-reduced-motion` (desliga o efeito).
 * - Offset pequeno por padrao (~ +/- 24px). Nunca exagerar.
 */
export function ParallaxY({
  children,
  offset = 48,
  className,
}: {
  children: ReactNode;
  /** Amplitude total do deslocamento, em px. O efeito vai de -offset/2 a +offset/2. */
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset / 2, offset / 2]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="transform-gpu will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
