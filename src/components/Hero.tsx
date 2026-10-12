"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { asset } from "@/lib/basePath";
import { useContent } from "@/content/ContentContext";
import { DeltaCanvas } from "./DeltaCanvas";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Texto que entra palavra por palavra, saindo do desfoque. */
function SplitWords({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: "0.6em", filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: delay + i * 0.06, ease: EASE }}
          className="inline-block whitespace-pre"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

/* Barra superior fixa + progresso de leitura. */
export function TopBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const links = [
    { href: "#metodo", label: "Método" },
    { href: "#time", label: "Time" },
    { href: "#parceiros", label: "Parceiros" },
    { href: "#planos", label: "Planos" },
  ];

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-iris via-electric to-signal"
      />
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
        className="fixed inset-x-0 top-3 z-[110] px-4"
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-ink/60 py-2 pl-4 pr-2 backdrop-blur-xl">
          <a href="#topo" aria-label="Delta Soluções, voltar ao topo" className="flex items-center">
            <Image
              src={asset("/brand/logo-horizontal.png")}
              alt="Delta Soluções"
              width={900}
              height={321}
              className="h-7 w-auto sm:h-8"
              priority
            />
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-mist/70 transition-colors hover:bg-white/5 hover:text-mist"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#planos"
            className="group inline-flex items-center gap-1.5 rounded-full bg-mist px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-white"
          >
            Investimento
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>
      </motion.header>
    </>
  );
}

export function Hero() {
  const { content } = useContent();
  const c = content.hero;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Efeito de "luz no horizonte": ao rolar, o arco sobe e acende.
  const arcY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const arcGlow = useTransform(scrollYProgress, [0, 0.6], [0.55, 1]);
  const arcScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="topo"
      ref={ref}
      className="relative z-0 flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-4 pb-40 pt-32 text-center"
    >
      {/* fundo: grade técnica + brilhos */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-70" />
      <motion.div
        aria-hidden
        className="absolute -top-48 left-1/2 h-[70vh] w-[80vw] -translate-x-1/2 rounded-full bg-electric/20 blur-[140px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[8%] top-[30%] h-[36vh] w-[30vw] rounded-full bg-iris/20 blur-[120px]"
        animate={{ x: [0, 40, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* prisma 3D de partículas */}
      <motion.div
        aria-hidden
        style={{ y: canvasY, scale: canvasScale }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-[44%] h-[min(92vw,820px)] w-[min(92vw,820px)] -translate-x-1/2 -translate-y-1/2 opacity-60 sm:opacity-100"
      >
        <DeltaCanvas className="h-full w-full" />
      </motion.div>

      {/* arco de luz no horizonte */}
      <motion.div
        aria-hidden
        style={{ y: arcY, scale: arcScale, opacity: arcGlow }}
        className="pointer-events-none absolute left-1/2 top-[calc(100%-110px)] h-[110vw] w-[220vw] -translate-x-1/2 sm:top-[calc(100%-130px)] sm:h-[70vw] sm:w-[150vw]"
      >
        <div className="absolute inset-0 rounded-[50%] bg-ink shadow-[0_-2px_0_0_rgba(18,216,242,0.9),0_-30px_80px_-10px_rgba(18,216,242,0.55),0_-80px_180px_-20px_rgba(8,123,250,0.6),0_-140px_260px_-40px_rgba(129,44,255,0.45)]" />
        <div className="absolute inset-x-[30%] -top-[1px] h-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="border-glow mb-8 inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-mist/80 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_2px_rgba(18,216,242,0.8)]" />
          {c.badge}
        </motion.span>

        <h1 className="max-w-4xl text-[2.1rem] font-extrabold leading-[1.06] text-mist sm:text-5xl lg:text-[4.1rem]">
          <SplitWords text={c.quoteLine1} delay={0.25} />
          <br />
          <SplitWords text={c.quoteLine2} delay={0.5} className="text-gradient-delta" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.42em] text-mist/90 sm:text-sm"
        >
          {c.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE }}
          className="mt-2 text-sm text-steel sm:text-base"
        >
          {c.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#metodo"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-electric to-signal px-7 py-3.5 text-sm font-semibold text-navy shadow-[0_0_40px_-8px_rgba(18,216,242,0.8)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{c.cta}</span>
            <ArrowRight className="relative h-4 w-4" />
          </a>
          <a
            href="#origem"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-mist/85 transition-colors hover:border-white/30 hover:bg-white/5"
          >
            Quem somos
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-mist/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
