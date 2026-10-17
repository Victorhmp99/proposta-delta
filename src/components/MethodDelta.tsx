"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check } from "lucide-react";
import { useContent } from "@/content/ContentContext";
import { Eyebrow, Kicker } from "./Section";
import { Reveal } from "./Reveal";

/* Método Δ: o triângulo é desenhado conforme a pessoa rola.
   Fase 1 = diagnóstico no centro (varre os 3 lados), fases 2–4 = cada lado
   firmado (processos, pessoas, produto), fase 5 = vértice/seta de aceleração. */

const A = { x: 250, y: 38 }; // topo
const B = { x: 452, y: 392 }; // base direita
const C = { x: 48, y: 392 }; // base esquerda
const CENTROID = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
const mid = (p: { x: number; y: number }, q: { x: number; y: number }) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
const M_LEFT = mid(C, A);
const M_RIGHT = mid(A, B);
const M_BASE = mid(B, C);

const PHASES = 5;

function useRange(p: MotionValue<number>, from: number, to: number) {
  return useTransform(p, [from, to], [0, 1], { clamp: true });
}

function TriangleVisual({ p, phase }: { p: MotionValue<number>; phase: number }) {
  const { content } = useContent();
  const labels = content.method.sideLabels;

  const scanY = useTransform(p, [0, 0.19], [A.y, B.y]);
  const scanOpacity = useTransform(p, [0, 0.03, 0.17, 0.21], [0, 1, 1, 0]);
  const rays = useRange(p, 0.02, 0.16);
  const sLeft = useRange(p, 0.2, 0.36);
  const sRight = useRange(p, 0.4, 0.56);
  const sBase = useRange(p, 0.6, 0.76);
  const arrow = useRange(p, 0.8, 0.94);
  const fill = useTransform(p, [0.78, 0.96], [0, 0.22]);
  const coreScale = useTransform(p, [0, 0.2, 0.8, 1], [0.6, 1, 1, 1.35]);
  const glow = useTransform(p, [0.76, 0.98], [0, 1]);
  const arrowHead = useTransform(arrow, [0.85, 1], [0, 1]);

  const lit = (i: number) => phase >= i;

  return (
    <svg viewBox="0 0 500 440" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="dg" gradientUnits="userSpaceOnUse" x1="48" y1="40" x2="452" y2="392">
          <stop offset="0%" stopColor="#812CFF" />
          <stop offset="55%" stopColor="#087BFA" />
          <stop offset="100%" stopColor="#12D8F2" />
        </linearGradient>
        <linearGradient id="dfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12D8F2" />
          <stop offset="100%" stopColor="#812CFF" />
        </linearGradient>
        <radialGradient id="core">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#12D8F2" />
          <stop offset="100%" stopColor="#12D8F2" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" filterUnits="userSpaceOnUse" x="-60" y="-120" width="620" height="620">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="triclip">
          <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} />
        </clipPath>
      </defs>

      {/* contorno "fantasma" — o que ainda não foi firmado */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="none"
        stroke="rgba(232,237,244,0.14)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
      />

      {/* preenchimento final */}
      <motion.polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="url(#dfill)"
        style={{ opacity: fill }}
      />

      {/* scanner do diagnóstico */}
      <g clipPath="url(#triclip)">
        <motion.rect x="0" width="500" height="70" style={{ y: scanY, opacity: scanOpacity }} fill="url(#dfill)" opacity="0.25" />
        <motion.line x1="0" x2="500" style={{ y: scanY, opacity: scanOpacity }} y1="0" y2="0" stroke="#12D8F2" strokeWidth="2" />
      </g>

      {/* raios do centro para os 3 lados */}
      {[M_LEFT, M_RIGHT, M_BASE].map((m, i) => (
        <motion.line
          key={i}
          x1={CENTROID.x}
          y1={CENTROID.y}
          x2={m.x}
          y2={m.y}
          stroke="#12D8F2"
          strokeWidth="1.2"
          strokeDasharray="2 5"
          style={{ pathLength: rays, opacity: phase === 0 ? 0.9 : 0.25 }}
        />
      ))}

      {/* lados — firmados um por um */}
      <g>
        {/* halo: mesmo traço, mais largo e translúcido */}
        <motion.path d={`M${C.x},${C.y} L${A.x},${A.y}`} stroke="url(#dg)" strokeWidth="22" strokeOpacity="0.18" strokeLinecap="round" fill="none" style={{ pathLength: sLeft }} />
        <motion.path d={`M${A.x},${A.y} L${B.x},${B.y}`} stroke="url(#dg)" strokeWidth="22" strokeOpacity="0.18" strokeLinecap="round" fill="none" style={{ pathLength: sRight }} />
        <motion.path d={`M${B.x},${B.y} L${C.x},${C.y}`} stroke="url(#dg)" strokeWidth="22" strokeOpacity="0.18" strokeLinecap="round" fill="none" style={{ pathLength: sBase }} />
        <motion.path d={`M${C.x},${C.y} L${A.x},${A.y}`} stroke="url(#dg)" strokeWidth="9" strokeLinecap="round" fill="none" style={{ pathLength: sLeft }} />
        <motion.path d={`M${A.x},${A.y} L${B.x},${B.y}`} stroke="url(#dg)" strokeWidth="9" strokeLinecap="round" fill="none" style={{ pathLength: sRight }} />
        <motion.path d={`M${B.x},${B.y} L${C.x},${C.y}`} stroke="url(#dg)" strokeWidth="9" strokeLinecap="round" fill="none" style={{ pathLength: sBase }} />
      </g>

      {/* faixas paralelas da base (grafismo da logo) */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={300 + i * 14}
          y1={404}
          x2={312 + i * 14}
          y2={380}
          stroke="#E8EDF4"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ opacity: sBase }}
        />
      ))}

      {/* núcleo do diagnóstico */}
      <motion.circle cx={CENTROID.x} cy={CENTROID.y} r="34" fill="url(#core)" style={{ scale: coreScale, opacity: 0.85 }} />
      <circle cx={CENTROID.x} cy={CENTROID.y} r="5" fill="#ffffff" />
      {phase === 0 && (
        <motion.circle
          cx={CENTROID.x}
          cy={CENTROID.y}
          r="20"
          fill="none"
          stroke="#12D8F2"
          strokeWidth="1.5"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ scale: 0.6, opacity: 0.9 }}
          animate={{ scale: [0.6, 3.5], opacity: [0.9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* seta de aceleração saindo pelo vértice */}
      <motion.g style={{ opacity: arrow }}>
        <motion.path
          d={`M${CENTROID.x} ${CENTROID.y - 40} L${A.x} -26`}
          stroke="#12D8F2"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength: arrow }}
        />
        <motion.path d={`M${A.x} -52 L${A.x + 16} -22 L${A.x - 16} -22 Z`} fill="#12D8F2" style={{ opacity: arrowHead }} />
      </motion.g>

      {/* halo final */}
      <motion.circle cx={CENTROID.x} cy={CENTROID.y} r="230" fill="none" stroke="url(#dg)" strokeWidth="1" style={{ opacity: glow }} strokeDasharray="1 10" />

      {/* rótulos dos lados */}
      <g fontFamily="var(--font-display)" fontWeight="700" fontSize="15" letterSpacing="2.5">
        <text
          x={M_LEFT.x - 24}
          y={M_LEFT.y}
          textAnchor="end"
          fill={lit(1) ? "#E8EDF4" : "rgba(232,237,244,0.3)"}
          style={{ transition: "fill .4s" }}
        >
          {labels[0]?.toUpperCase()}
        </text>
        <text
          x={M_RIGHT.x + 24}
          y={M_RIGHT.y}
          textAnchor="start"
          fill={lit(2) ? "#E8EDF4" : "rgba(232,237,244,0.3)"}
          style={{ transition: "fill .4s" }}
        >
          {labels[1]?.toUpperCase()}
        </text>
        <text
          x={M_BASE.x}
          y={M_BASE.y + 40}
          textAnchor="middle"
          fill={lit(3) ? "#E8EDF4" : "rgba(232,237,244,0.3)"}
          style={{ transition: "fill .4s" }}
        >
          {labels[2]?.toUpperCase()}
        </text>
      </g>
    </svg>
  );
}

export function MethodDelta() {
  const { content } = useContent();
  const c = content.method;
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.0005 });
  const [phase, setPhase] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(PHASES - 1, Math.max(0, Math.floor(v * PHASES)));
    setPhase((cur) => (cur === next ? cur : next));
  });

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.5) / PHASES), behavior: "smooth" });
  }

  return (
    <section id="metodo" className="relative scroll-mt-0 bg-ink">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-fade-y" />

      <div className="relative mx-auto max-w-5xl px-4 pt-24 sm:px-6 sm:pt-32">
        <Reveal>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-mist/70">{c.intro}</p>
        </Reveal>
      </div>

      {/* trilho de scroll: cada fase ocupa ~1 tela */}
      <div ref={trackRef} className="relative h-[520vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-4 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            {/* visual */}
            <div className="relative order-1 mx-auto aspect-[500/440] w-[min(80vw,40svh)] sm:w-[min(70vw,46svh)] lg:order-2 lg:w-full lg:max-w-[560px]">
              <div aria-hidden className="pointer-events-none absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(8,123,250,0.24),transparent)]" />
              <TriangleVisual p={p} phase={phase} />
            </div>

            {/* texto da fase */}
            <div className="order-2 lg:order-1">
              {/* seletor de fases */}
              <div className="mb-5 flex gap-1.5 sm:mb-7">
                {c.steps.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Ir para ${s.title}`}
                    className="group flex-1 text-left"
                  >
                    <span className="block h-[3px] overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-gradient-to-r from-electric to-signal transition-all duration-500"
                        style={{ width: i < phase ? "100%" : i === phase ? "60%" : "0%" }}
                      />
                    </span>
                    <span
                      className={`mt-2 hidden font-display text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors sm:block ${
                        i === phase ? "text-signal" : "text-mist/35 group-hover:text-mist/60"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid">
                {c.steps.map((step, i) => (
                  <motion.div
                    key={`${step.title}-${i}`}
                    aria-hidden={i !== phase}
                    initial={false}
                    animate={
                      i === phase
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: i < phase ? -18 : 24 }
                    }
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`[grid-area:1/1] ${i === phase ? "" : "pointer-events-none"}`}
                  >
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-signal">
                      {step.tag}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-extrabold text-mist sm:text-5xl">
                      <span className="mr-3 text-mist/20">{String(i + 1).padStart(2, "0")}</span>
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist/75 sm:mt-5 sm:text-base">{step.text}</p>
                    <ul className="mt-4 grid max-w-xl grid-cols-2 gap-2 sm:mt-6">
                      {step.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-mist/80 sm:text-sm"
                        >
                          <Check className="h-3.5 w-3.5 flex-shrink-0 text-signal" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-24 sm:px-6 sm:pb-32">
        <Reveal>
          <Kicker>{c.kicker}</Kicker>
        </Reveal>
      </div>
    </section>
  );
}
