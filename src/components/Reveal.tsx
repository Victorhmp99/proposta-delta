"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* Progresso de scroll ligado à posição real do elemento — reversível:
   sobe ao descer a página, desfaz ao subir. Nada de "once". */
function useScrollEntrance(offset: [string, string] = ["start 95%", "start 55%"]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-expect-error -- framer aceita tuplas de offset com unidades variadas
    offset,
  });
  return { ref, progress: scrollYProgress };
}

function mv<T>(progress: MotionValue<number>, from: T, to: T) {
  return useTransform(progress, [0, 1], [from, to]);
}

export function Reveal({
  children,
  delay,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, progress } = useScrollEntrance();
  const opacity = mv(progress, 0, 1);
  const ty = mv(progress, y, 0);

  return (
    <motion.div ref={ref} style={{ opacity, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

export function SlideReveal({
  children,
  direction = "left",
  distance = 80,
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "left" | "right";
  distance?: number;
  className?: string;
}) {
  const { ref, progress } = useScrollEntrance();
  const opacity = mv(progress, 0, 1);
  const tx = mv(progress, direction === "left" ? -distance : distance, 0);

  return (
    <motion.div ref={ref} style={{ opacity, x: tx }} className={className}>
      {children}
    </motion.div>
  );
}

/* Painel que "sobe por cima" da seção anterior — efeito de sobreposição completa,
   ligado ao scroll: desce de volta se você subir a página. */
export function SlideUpPanel({ children }: { children: ReactNode }) {
  const { ref, progress } = useScrollEntrance(["start 100%", "start 45%"]);
  const y = useTransform(progress, [0, 1], ["14vh", "0vh"]);
  const scale = mv(progress, 0.94, 1);

  return (
    <motion.div ref={ref} style={{ y, scale, opacity: 1 }}>
      {children}
    </motion.div>
  );
}

/* Entrada com zoom — a seção "aproxima" da câmera ao entrar na tela. */
export function ZoomInPanel({ children }: { children: ReactNode }) {
  const { ref, progress } = useScrollEntrance(["start 100%", "start 60%"]);
  const scale = mv(progress, 0.82, 1);
  const opacity = mv(progress, 0, 1);

  return (
    <motion.div ref={ref} style={{ scale, opacity }}>
      {children}
    </motion.div>
  );
}

/* Entrada com zoom invertido — a seção "recua" suavemente até o tamanho normal. */
export function ZoomOutPanel({ children }: { children: ReactNode }) {
  const { ref, progress } = useScrollEntrance(["start 100%", "start 60%"]);
  const scale = mv(progress, 1.22, 1);
  const opacity = mv(progress, 0, 1);

  return (
    <motion.div ref={ref} style={{ scale, opacity }}>
      {children}
    </motion.div>
  );
}

/* "Sucção" — a seção é revelada por uma máscara circular que se expande do centro. */
export function SuctionPanel({ children }: { children: ReactNode }) {
  const { ref, progress } = useScrollEntrance(["start 100%", "start 55%"]);
  const clipPath = useTransform(
    progress,
    [0, 1],
    ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)"]
  );
  const opacity = mv(progress, 0.3, 1);
  const scale = mv(progress, 1.05, 1);

  return (
    <motion.div ref={ref} style={{ clipPath, opacity, scale }}>
      {children}
    </motion.div>
  );
}

/* Seção inteira entrando da direita ou da esquerda. */
function SlideSectionPanel({
  children,
  direction,
}: {
  children: ReactNode;
  direction: "left" | "right";
}) {
  const { ref, progress } = useScrollEntrance(["start 100%", "start 55%"]);
  const x = useTransform(
    progress,
    [0, 1],
    [direction === "left" ? "-12%" : "12%", "0%"]
  );
  const opacity = mv(progress, 0, 1);

  return (
    <motion.div ref={ref} style={{ x, opacity }}>
      {children}
    </motion.div>
  );
}

export function SlideLeftPanel({ children }: { children: ReactNode }) {
  return <SlideSectionPanel direction="left">{children}</SlideSectionPanel>;
}

export function SlideRightPanel({ children }: { children: ReactNode }) {
  return <SlideSectionPanel direction="right">{children}</SlideSectionPanel>;
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
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};
