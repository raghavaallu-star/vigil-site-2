"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("./motion-features").then((m) => m.default);

/** Loads Framer Motion's animation features asynchronously so they stay off the critical path. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
