"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  variant?: "default" | "photo";
  className?: string;
} & HTMLMotionProps<"div">;

export function Reveal({
  children,
  delayMs = 0,
  variant = "default",
  className = "",
  ...rest
}: RevealProps) {
  const initial =
    variant === "photo" ? { opacity: 0, scale: 0.985 } : { opacity: 0, y: 14 };
  const animate =
    variant === "photo" ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{
        duration: variant === "photo" ? 1.0 : 0.8,
        delay: delayMs / 1000,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
