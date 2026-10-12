"use client";

import { motion } from "framer-motion";

/* Materiais em CSS puro — um por plano: Essential (prisma Δ), Prata,
   Gold (barra de ouro) e Diamond (diamante lapidado). */

function ShineSweep({
  size,
  speed = 5,
  height,
  radius = "50%",
  clip,
}: {
  size: number;
  speed?: number;
  height?: number;
  radius?: number | string;
  clip?: string;
}) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ width: size, height: height ?? size, borderRadius: radius, clipPath: clip }}
    >
      <motion.div
        className="absolute top-0 h-full"
        style={{
          width: size * 0.5,
          background: "linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.6) 45%, transparent 100%)",
          filter: "blur(2px)",
        }}
        animate={{ left: [-size, size * 1.5] }}
        transition={{ duration: speed, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
      />
    </motion.div>
  );
}

/* Prisma triangular em vidro azul — plano de entrada. */
export function DeltaPrism({ size = 56 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        style={{ filter: "drop-shadow(0 10px 18px rgba(8,123,250,0.55))" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="prism-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9b5cff" />
            <stop offset="50%" stopColor="#087bfa" />
            <stop offset="100%" stopColor="#12d8f2" />
          </linearGradient>
        </defs>
        <path d="M50 6 L96 90 H4 Z" fill="none" stroke="url(#prism-g)" strokeWidth="13" strokeLinejoin="round" />
        <path d="M50 6 L96 90" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function MetallicOrb({ size = 64 }: { size?: number }) {
  const colors = { hi: "#ffffff", mid: "#d5dce8", low: "#7d889c", edge: "#353d4d" };
  return (
    <div className="relative" style={{ width: size, height: size, borderRadius: "50%" }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 24%, ${colors.hi} 0%, ${colors.mid} 42%, ${colors.low} 75%, ${colors.edge} 100%)`,
          boxShadow:
            "inset -8px -10px 18px rgba(0,0,0,0.4), inset 6px 8px 14px rgba(255,255,255,0.4), 0 14px 32px -8px rgba(0,0,0,0.6)",
        }}
      />
      <ShineSweep size={size} speed={5.5} />
    </div>
  );
}

/* Barra de ouro — bloco retangular metálico. */
export function GoldBar({ size = 64 }: { size?: number }) {
  const w = size;
  const h = size * 0.74;
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: size * 0.08,
          background: "linear-gradient(155deg, #fff6da 0%, #ffe27a 18%, #ffd51f 42%, #c79a12 72%, #6e5208 100%)",
          boxShadow:
            "inset 0 3px 4px rgba(255,255,255,0.55), inset 0 -6px 10px rgba(0,0,0,0.45), 0 14px 28px -8px rgba(0,0,0,0.6)",
        }}
      />
      <div
        className="absolute"
        style={{ inset: size * 0.1, borderRadius: size * 0.05, border: "1.5px solid rgba(110,82,8,0.55)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold"
        style={{ color: "#6e5208", fontSize: size * 0.22, letterSpacing: 1, opacity: 0.75 }}
      >
        Au
      </div>
      <ShineSweep size={w} height={h} radius={size * 0.08} speed={4.5} />
    </div>
  );
}

/* Diamante lapidado (vista frontal) — coroa + pavilhão em facetas. */
export function DiamondGem({ size = 64 }: { size?: number }) {
  const outline = "polygon(22% 8%, 78% 8%, 100% 36%, 50% 100%, 0% 36%)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0"
        style={{
          clipPath: outline,
          background:
            "conic-gradient(from 210deg at 50% 40%, #e9fbff 0deg, #12d8f2 50deg, #ffffff 95deg, #087bfa 150deg, #bff4ff 205deg, #812cff 260deg, #dff9ff 315deg, #e9fbff 360deg)",
          filter: "drop-shadow(0 12px 22px rgba(18,216,242,0.55))",
        }}
      />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="rgba(255,255,255,0.75)" strokeWidth="1" fill="none">
          <path d="M0 36 H100" />
          <path d="M22 8 L34 36 L50 8 L66 36 L78 8" />
          <path d="M34 36 L50 100 L66 36" />
          <path d="M0 36 L50 100 L100 36" />
        </g>
        <path d="M22 8 L34 36 L0 36 Z" fill="rgba(255,255,255,0.35)" />
        <path d="M66 36 L50 100 L100 36 Z" fill="rgba(4,11,34,0.25)" />
      </svg>
      <ShineSweep size={size} clip={outline} radius={0} speed={3.8} />
      <motion.span
        aria-hidden
        className="absolute h-2 w-2 rounded-full bg-white"
        style={{ left: "26%", top: "14%", boxShadow: "0 0 12px 4px rgba(255,255,255,0.9)" }}
        animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4 }}
      />
    </div>
  );
}
