"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Float({
  children,
  delay = 0,
  distance = 8,
  duration = 4,
  className,
}: {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0], rotate: [0, 1.5, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
