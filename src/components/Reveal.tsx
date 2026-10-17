"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* Versão leve para apresentar em call (Google Meet): toda entrada acontece
   UMA vez, quando o bloco aparece, e termina 100% opaca e parada.
   Nada fica ligado à posição do scroll — era isso que deixava seções
   semitransparentes e tremendo durante o compartilhamento de tela. */

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.12 } as const;

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SlideReveal({
  children,
  direction = "left",
  distance = 40,
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right";
  distance?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -distance : distance }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* As transições de seção viram uma entrada única e curta (só opacidade e
   um pequeno deslocamento), sem escala, recorte ou paralaxe. */
function SectionEnter({ children, y = 28, x = 0 }: { children: ReactNode; y?: number; x?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SlideUpPanel({ children }: { children: ReactNode }) {
  return <SectionEnter y={40}>{children}</SectionEnter>;
}
export function ZoomInPanel({ children }: { children: ReactNode }) {
  return <SectionEnter>{children}</SectionEnter>;
}
export function ZoomOutPanel({ children }: { children: ReactNode }) {
  return <SectionEnter>{children}</SectionEnter>;
}
export function SuctionPanel({ children }: { children: ReactNode }) {
  return <SectionEnter>{children}</SectionEnter>;
}
export function SlideLeftPanel({ children }: { children: ReactNode }) {
  return <SectionEnter y={0} x={-30}>{children}</SectionEnter>;
}
export function SlideRightPanel({ children }: { children: ReactNode }) {
  return <SectionEnter y={0} x={30}>{children}</SectionEnter>;
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
