"use client";

import { m } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion";

/** Subtle fade-and-rise on scroll. Snaps into place instantly for reduced-motion users. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotionSafe();
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.35, delay: delay * 0.75, ease: [0.22, 0.8, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
