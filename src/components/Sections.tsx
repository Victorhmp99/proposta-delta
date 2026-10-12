"use client";

import { useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/basePath";
import { Reveal, SlideReveal, RevealStagger, staggerItem } from "./Reveal";
import { Section, Eyebrow, Kicker } from "./Section";
import { Tilt3D } from "./Tilt3D";
import { Float } from "./Float";
import { DeltaPrism, MetallicOrb, GoldBar, DiamondGem } from "./MaterialOrb";
import { Confetti } from "./Confetti";
import { CaseBubbles } from "./CaseBubbles";
import { DeltaCanvas } from "./DeltaCanvas";
import { useContent } from "@/content/ContentContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  PenLine,
  Clapperboard,
  LineChart,
  Smartphone,
  MonitorSmartphone,
  ClipboardList,
  CheckCircle2,
  Lock,
  Unlock,
  Trophy,
  X,
  Target,
  Sparkles,
  Workflow,
  BarChart3,
  Gift,
  ArrowUpRight,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- 2. QUEM SOMOS ---------- */
function BrandEmblem({ sides }: { sides: string[] }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
      {/* órbitas */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full border border-dashed border-signal/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-[12%] rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-signal shadow-[0_0_12px_3px_rgba(18,216,242,0.8)]" />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-[20%] rounded-full bg-electric/25 blur-[70px]" />

      <Float distance={10} duration={6} className="absolute inset-[22%] flex items-center justify-center">
        <Image
          src={asset("/brand/symbol.png")}
          alt="Símbolo Delta Soluções"
          width={700}
          height={607}
          className="h-auto w-full drop-shadow-[0_0_40px_rgba(8,123,250,0.55)]"
        />
      </Float>

      {/* os 3 lados */}
      {sides.map((s, i) => {
        const pos = [
          "left-0 top-[38%] -translate-x-[10%]",
          "right-0 top-[38%] translate-x-[10%]",
          "bottom-[2%] left-1/2 -translate-x-1/2",
        ][i];
        return (
          <motion.span
            key={s}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: EASE }}
            className={`absolute ${pos} rounded-full border border-white/15 bg-ink/80 px-3.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-mist backdrop-blur sm:text-xs`}
          >
            {s}
          </motion.span>
        );
      })}
    </div>
  );
}

export function Origin() {
  const { content } = useContent();
  const c = content.origin;
  return (
    <Section id="origem" tone="navy" panel>
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-full w-[60%] bg-stripes opacity-40 mask-radial" />
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="max-w-xl text-3xl text-mist sm:text-5xl">
              {c.headingPlain} <span className="text-gradient-delta">{c.headingGold}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 max-w-xl space-y-5 leading-relaxed text-mist/80">
            <p>{c.paragraph1}</p>
            <p>{c.paragraph2}</p>
            <p className="text-mist">
              {c.paragraph3Plain} <span className="font-semibold text-signal">{c.paragraph3Bold}</span>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <Kicker>{c.kicker}</Kicker>
          </Reveal>
        </div>

        <SlideReveal direction="right">
          <BrandEmblem sides={c.sides} />
        </SlideReveal>
      </div>
    </Section>
  );
}

/* ---------- 3. O PROBLEMA ---------- */
const problemIcons = [Target, Sparkles, Workflow, BarChart3];

export function Problem() {
  const { content } = useContent();
  const c = content.problem;
  return (
    <Section id="problema" tone="ink" transition="slideRight">
      <SlideReveal direction="right">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="max-w-3xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-mist/75">{c.intro}</p>
      </SlideReveal>

      <div className="relative mt-12">
        {/* linha que conecta as 4 peças */}
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute left-0 right-0 top-[52px] hidden h-px origin-left bg-gradient-to-r from-iris via-electric to-signal lg:block"
        />
        <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.items.map((item, i) => {
            const Icon = problemIcons[i % problemIcons.length];
            return (
              <motion.div
                key={item}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className="glass group relative rounded-2xl border border-white/10 p-6 transition-colors hover:border-signal/40"
              >
                <div className="relative mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-signal/30 bg-ink">
                  <Icon className="h-5 w-5 text-signal" />
                  <span className="absolute inset-0 rounded-xl bg-signal/20 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
                </div>
                <span className="font-display text-xs font-bold text-mist/30">0{i + 1}</span>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-mist">{item}</p>
              </motion.div>
            );
          })}
        </RevealStagger>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-14 max-w-2xl text-lg text-mist/85">
          {c.closingPlain}
          <br />
          <span className="text-gradient-delta font-display text-2xl font-bold sm:text-3xl">{c.closingGold}</span>
        </p>
        <p className="mt-6 max-w-2xl text-mist/60">{c.kicker}</p>
      </Reveal>
    </Section>
  );
}

/* ---------- 4. NOSSA DIFERENÇA ---------- */
export function Difference() {
  const { content } = useContent();
  const c = content.difference;
  return (
    <Section id="diferenca" tone="deep" transition="slideLeft">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-60" />
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <SlideReveal direction="left">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="text-3xl text-mist sm:text-5xl">
            {c.headingPlain}
            <br />
            <span className="text-gradient-delta">{c.headingGold}</span>
          </h2>
          <div className="mt-8 space-y-4 text-mist/80">
            <p>{c.paragraph1}</p>
            <p>
              {c.paragraph2Plain}
              <br />
              <span className="font-display text-xl font-bold text-signal">{c.paragraph2Bold}</span>
            </p>
          </div>
        </SlideReveal>

        <Reveal delay={0.1}>
          <div className="glass relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-8">
            {/* scanner */}
            <motion.div
              aria-hidden
              className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-signal/10 to-transparent"
              animate={{ top: ["-20%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <p className="relative mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-mist/50">
              <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
              {c.intro}
            </p>
            <RevealStagger className="relative space-y-3">
              {c.questions.map((q, i) => (
                <motion.div
                  key={q}
                  variants={staggerItem}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-ink/60 p-4"
                >
                  <span className="font-display text-sm font-bold text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <p className="font-medium text-mist/90">{q}</p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
          <Kicker>{c.kicker}</Kicker>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------- 6. TIME COMPLETO ---------- */
const teamMeta = [
  { icon: Megaphone, featured: true, visual: "trafego" as const },
  { icon: MonitorSmartphone, featured: true, visual: "crm" as const },
  { icon: PenLine, visual: "copy" as const },
  { icon: Clapperboard, visual: "video" as const },
  { icon: LineChart, visual: "funnel" as const },
  { icon: Smartphone, visual: "chat" as const },
  { icon: ClipboardList, visual: "checklist" as const },
];

type VisualType = "trafego" | "crm" | "copy" | "video" | "funnel" | "chat" | "checklist";

/* Mini interface do CRM (kanban) — animada, nas cores Delta. */
function CrmMock() {
  const cols = [
    { name: "Novo", cards: 3, color: "bg-steel" },
    { name: "Contato", cards: 2, color: "bg-electric" },
    { name: "Agendado", cards: 2, color: "bg-signal" },
    { name: "Fechado", cards: 1, color: "bg-sun" },
  ];
  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 text-[10px] font-semibold text-mist/50">Delta Soluções CRM · Funil</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 p-2.5">
        {cols.map((col, ci) => (
          <div key={col.name} className="rounded-md bg-white/[0.03] p-1.5">
            <div className="mb-1.5 flex items-center gap-1">
              <span className={`h-1.5 w-1.5 rounded-full ${col.color}`} />
              <span className="truncate text-[8px] font-semibold uppercase tracking-wide text-mist/50">{col.name}</span>
            </div>
            <div className="space-y-1">
              {Array.from({ length: col.cards }).map((_, k) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + ci * 0.15 + k * 0.08 }}
                  className="rounded border border-white/10 bg-ink p-1"
                >
                  <div className="h-1 w-[80%] rounded-full bg-mist/30" />
                  <div className="mt-1 h-1 w-[50%] rounded-full bg-mist/15" />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <motion.div
        aria-hidden
        className="mx-2.5 mb-2.5 h-1 overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "64%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
          className="h-full rounded-full bg-gradient-to-r from-electric to-signal"
        />
      </motion.div>
    </div>
  );
}

function TeamVisual({ type }: { type: VisualType }) {
  if (type === "trafego") {
    return (
      <div className="mb-5 flex items-center gap-3">
        {["meta-ads.png", "google-ads.png"].map((f) => (
          <div key={f} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2.5 shadow-lg">
            <Image
              src={asset(`/team-visuals/${f}`)}
              alt={f.startsWith("meta") ? "Meta Ads" : "Google Ads"}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
        <span className="ml-1 text-xs uppercase tracking-wide text-signal/80">2 plataformas integradas</span>
      </div>
    );
  }
  if (type === "crm") return <CrmMock />;

  if (type === "copy") {
    return (
      <div className="mb-5 space-y-1.5 rounded-xl border border-white/10 bg-ink/60 p-3">
        <div className="h-2 w-[88%] rounded-full bg-mist/25" />
        <div className="h-2 w-[65%] rounded-full bg-mist/25" />
        <div className="flex items-center gap-1">
          <div className="h-2 w-[40%] rounded-full bg-gradient-to-r from-electric to-signal" />
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="h-3 w-[2px] bg-signal"
          />
        </div>
      </div>
    );
  }

  if (type === "video") {
    return (
      <div className="relative mb-5 flex h-16 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink/60">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-signal"
        >
          <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-navy" />
        </motion.div>
        <div className="absolute bottom-2 left-3 right-3 h-1 overflow-hidden rounded-full bg-white/15">
          <motion.div
            animate={{ width: ["10%", "85%", "10%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-electric"
          />
        </div>
      </div>
    );
  }

  if (type === "funnel") {
    return (
      <div className="mb-5 flex h-16 items-end gap-2 rounded-xl border border-white/10 bg-ink/60 p-3">
        {[0.4, 0.65, 0.85, 1].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-electric/40 to-signal"
          />
        ))}
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="mb-5 space-y-1.5 rounded-xl border border-white/10 bg-ink/60 p-3">
        <div className="w-[72%] rounded-lg rounded-tl-none bg-white/10 px-2.5 py-1.5 text-[10px] text-mist/70">
          Olá! Vi que você se interessou pelo serviço.
        </div>
        <div className="ml-auto w-[65%] rounded-lg rounded-tr-none bg-electric/30 px-2.5 py-1.5 text-right text-[10px] text-mist/90">
          Posso agendar uma avaliação?
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 space-y-2 rounded-xl border border-white/10 bg-ink/60 p-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-signal" />
          <div className={`h-1.5 rounded-full bg-mist/20 ${i === 1 ? "w-[55%]" : "w-[75%]"}`} />
        </div>
      ))}
    </div>
  );
}

export function Team() {
  const { content } = useContent();
  const c = content.team;
  return (
    <Section id="time" tone="ink" transition="zoomIn">
      <Reveal>
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="max-w-2xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-mist/70">{c.intro}</p>
      </Reveal>

      <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {c.services.map((svc, index) => {
          const meta = teamMeta[index] ?? teamMeta[teamMeta.length - 1];
          return (
            <motion.div
              key={`${svc.title}-${index}`}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className={`glass rounded-2xl border p-6 transition-colors hover:border-signal/40 ${
                meta.featured ? "border-signal/25" : "border-white/10"
              }`}
            >
              {meta.visual && <TeamVisual type={meta.visual} />}
              <meta.icon className="mb-4 h-6 w-6 text-signal" />
              <p className="mb-2 font-display text-lg font-bold text-mist">{svc.title}</p>
              <p className="text-sm leading-relaxed text-mist/70">{svc.text}</p>
            </motion.div>
          );
        })}
      </RevealStagger>
    </Section>
  );
}

/* ---------- 7 & 8. ANCORAGEM ---------- */
function CostTable({
  rows,
  total,
  highlight,
}: {
  rows: { label: string; value: string }[];
  total: { label: string; value: string };
  highlight?: boolean;
}) {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-white/10">
      {rows.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          className={`flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-6 sm:text-base ${
            i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"
          }`}
        >
          <span className="text-mist/75">{row.label}</span>
          <span className="text-right font-display font-semibold text-mist">{row.value}</span>
        </motion.div>
      ))}
      <div
        className={`flex items-center justify-between gap-4 border-t px-5 py-5 sm:px-6 ${
          highlight ? "border-signal/30 bg-signal/10" : "border-white/10 bg-electric/10"
        }`}
      >
        <span className="font-display text-lg font-bold text-mist">{total.label}</span>
        <span className="text-gradient-delta text-right font-display text-xl font-extrabold sm:text-2xl">{total.value}</span>
      </div>
    </div>
  );
}

export function AnchorTeam() {
  const { content } = useContent();
  const c = content.anchorTeam;
  return (
    <Section id="ancoragem-time" tone="deep" transition="suction">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="text-3xl text-mist sm:text-5xl">
            {c.headingPlain} <span className="text-gradient-delta">{c.headingGold}</span> {c.headingEnd}
          </h2>
          <Kicker>{c.kicker}</Kicker>
        </Reveal>
        <Reveal delay={0.1}>
          <CostTable rows={c.rows} total={c.total} highlight />
        </Reveal>
      </div>
    </Section>
  );
}

export function AnchorSecretary() {
  const { content } = useContent();
  const c = content.anchorSecretary;
  return (
    <Section id="ancoragem-secretaria" tone="ink" transition="slideLeft">
      <Reveal>
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="max-w-3xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <CostTable rows={c.rows} total={c.total} />
      </Reveal>

      <Reveal delay={0.2} className="mt-10 max-w-2xl space-y-2 text-mist/85">
        <p>{c.lead}</p>
        {[c.line1, c.line2, c.line3].map((l) => (
          <p key={l} className="flex items-start gap-3 text-lg font-semibold text-mist">
            <X className="mt-1 h-5 w-5 flex-shrink-0 text-sun" />
            {l}
          </p>
        ))}
        <Kicker>{c.kicker}</Kicker>
      </Reveal>
    </Section>
  );
}

/* ---------- 9. CRC ---------- */
function ChatSim() {
  const msgs = [
    { me: false, text: "Oi! Vi o anúncio, quanto custa?" },
    { me: true, text: "Oi, Ana! Antes do valor, me conta: o que você quer resolver?" },
    { me: false, text: "Quero melhorar a pele antes do casamento." },
    { me: true, text: "Perfeito. Tenho quinta 15h ou sexta 10h para sua avaliação." },
    { me: false, text: "Sexta 10h 🙌" },
  ];
  return (
    <div className="glass relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 p-4">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric to-signal font-display text-sm font-bold text-navy">
          Δ
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">CRC Delta</p>
          <p className="flex items-center gap-1 text-[11px] text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> respondendo em minutos
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.45, ease: EASE }}
            className={`max-w-[82%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${
              m.me ? "ml-auto rounded-tr-sm bg-electric/35 text-mist" : "rounded-tl-sm bg-white/10 text-mist/85"
            }`}
          >
            {m.text}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + msgs.length * 0.45 }}
          className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-signal/30 bg-signal/10 py-2 text-xs font-semibold text-signal"
        >
          <CheckCircle2 className="h-4 w-4" /> Avaliação agendada · registrada no CRM
        </motion.div>
      </div>
    </div>
  );
}

export function CRC() {
  const { content } = useContent();
  const c = content.crc;
  return (
    <Section id="crc" tone="navy" transition="slideRight">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <SlideReveal direction="right">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className="max-w-2xl text-3xl text-mist sm:text-5xl">
              {c.headingPlain}
              <br />
              <span className="text-gradient-delta">{c.headingGold}</span>
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-mist/80">{c.intro}</p>
          </SlideReveal>

          <RevealStagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {c.bullets.map((b) => (
              <motion.div
                key={b}
                variants={staggerItem}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-signal" />
                <span className="text-sm text-mist/85">{b}</span>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
        <Reveal delay={0.1}>
          <ChatSim />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <Kicker>{c.kicker}</Kicker>
      </Reveal>
    </Section>
  );
}

/* ---------- 10. RESULTADOS ---------- */
export function Cases() {
  const { content } = useContent();
  const c = content.results;
  return (
    <Section id="resultados" tone="ink" transition="zoomOut">
      <Reveal>
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="max-w-2xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-mist/70">{c.intro}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <CaseBubbles />
      </Reveal>
    </Section>
  );
}

/* ---------- 11. PLANOS (fidelidade oculta até o clique) ---------- */
function brl(n: string | number) {
  return `R$ ${Number(n).toLocaleString("pt-BR")}`;
}

const planMeta = [
  {
    Material: () => <DeltaPrism size={50} />,
    accent: "text-signal",
    cardBg: "bg-ink",
    cardBorder: "border-white/10",
  },
  {
    Material: () => <MetallicOrb size={48} />,
    accent: "text-mist",
    cardBg: "bg-gradient-to-b from-[#d5dce8]/15 via-ink to-ink",
    cardBorder: "border-[#d5dce8]/25",
  },
  {
    Material: () => <GoldBar size={56} />,
    accent: "text-sun",
    cardBg: "bg-gradient-to-b from-sun/25 via-sun/5 to-ink",
    cardBorder: "border-sun/70",
    featured: true,
  },
  {
    Material: () => <DiamondGem size={52} />,
    accent: "text-signal",
    cardBg: "bg-gradient-to-b from-signal/20 via-electric/5 to-ink",
    cardBorder: "border-signal/40",
    diamond: true,
  },
];

export function Plans() {
  const { content } = useContent();
  const c = content.plans;
  const [unlocked, setUnlocked] = useState(false);

  return (
    <Section id="planos" tone="deep" panel wide className="perspective-1200">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-grid opacity-40 mask-radial" />
      <Reveal className="text-center">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="mx-auto max-w-2xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-mist/60">{c.note}</p>
      </Reveal>

      <RevealStagger className="mt-16 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {c.items.map((plan, i) => {
          const meta = planMeta[i] ?? planMeta[0];
          return (
            <motion.div
              key={`${plan.name}-${i}`}
              variants={staggerItem}
              className={meta.featured ? "lg:-mt-4 lg:scale-[1.05]" : ""}
            >
              <Tilt3D
                className={`glass-3d flex h-full flex-col rounded-2xl border p-6 ${meta.cardBorder} ${meta.cardBg} ${
                  meta.featured ? "shadow-[0_0_60px_-12px_rgba(255,213,31,0.45)]" : ""
                } ${meta.diamond ? "border-glow" : ""}`}
              >
                {meta.featured && (
                  <span className="absolute -top-3 right-4 rounded-full bg-sun px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-navy">
                    {c.featuredBadge}
                  </span>
                )}
                <Float distance={6} duration={3.6} delay={i * 0.2} className="mb-5 w-fit">
                  <meta.Material />
                </Float>
                <p className="mb-1 font-display text-xl font-extrabold leading-tight text-mist">{plan.name}</p>
                {plan.description && <p className="mb-4 text-xs leading-snug text-mist/55">{plan.description}</p>}
                <p className={`mb-5 font-display text-2xl font-bold ${meta.featured ? "text-gradient-sun" : meta.accent}`}>
                  {plan.price}
                </p>
                <ul className="flex-1 space-y-2 text-sm text-mist/80">
                  {plan.features.map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${meta.featured ? "text-sun" : "text-signal"}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="mb-2 text-[11px] uppercase tracking-wide text-mist/40">{c.fidelityLabel}</p>
                  <AnimatePresence mode="wait">
                    {unlocked ? (
                      <motion.div
                        key="open"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-1.5 overflow-hidden text-sm"
                      >
                        <div className="flex justify-between text-mist/70">
                          <span>3 meses</span>
                          <span className="text-mist">{brl(plan.monthly3)}/mês</span>
                        </div>
                        <div className="flex justify-between text-mist/70">
                          <span>6 meses</span>
                          <span className="text-mist">{brl(plan.monthly6)}/mês</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-mist/70">12 meses</span>
                          <span className="text-gradient-delta">{brl(plan.monthly12)}/mês</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="closed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex select-none flex-col gap-1 text-sm text-mist/35"
                      >
                        <span className="whitespace-nowrap">3 meses · R$ ••••/mês</span>
                        <span className="whitespace-nowrap">12 meses · R$ ••••/mês</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Tilt3D>
            </motion.div>
          );
        })}
      </RevealStagger>

      <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-2 text-center">
        <button
          type="button"
          onClick={() => setUnlocked((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-signal/50 bg-signal/10 px-6 py-3 font-semibold text-signal transition-colors hover:bg-signal/20"
        >
          {unlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          {unlocked ? c.lockLabel : c.unlockLabel}
        </button>
        <Kicker>{c.kicker}</Kicker>
      </Reveal>
    </Section>
  );
}

/* ---------- 12. ESTRUTURA DELTA ---------- */
export function Estrutura() {
  const { content } = useContent();
  const c = content.estrutura;
  const [revealed, setRevealed] = useState(false);

  return (
    <Section id="estrutura-delta" tone="navy" panel>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-stripes opacity-30 mask-radial" />
      <Reveal className="flex flex-col items-center gap-5 py-4 text-center">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <span className="text-gradient-delta font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl">
          {c.title}
        </span>
        <h2 className="max-w-xl text-xl font-medium leading-snug text-mist/80 sm:text-2xl">
          {c.headingPlain} <span className="font-bold text-mist">{c.headingGold}</span>
        </h2>
        <p className="max-w-sm text-sm text-mist/50">{c.intro}</p>
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          className="mt-2 rounded-full bg-gradient-to-r from-electric to-signal px-8 py-4 text-sm font-bold tracking-wide text-navy shadow-[0_0_40px_-8px_rgba(18,216,242,0.7)] transition hover:brightness-110"
        >
          {revealed ? "Ocultar" : c.revealLabel}
        </button>
      </Reveal>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <div className="mt-12 grid overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2">
              <div className="border-b border-white/10 bg-ink/60 px-6 py-6 sm:border-b-0 sm:border-r">
                <p className="mb-5 text-[11px] uppercase tracking-widest text-mist/40">{c.beforeLabel}</p>
                <ul className="space-y-4">
                  {c.beforeAfter.map((row, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-mist/55">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-sun/80" />
                      {row.before}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-electric/10 px-6 py-6">
                <p className="mb-5 text-[11px] uppercase tracking-widest text-signal/80">{c.afterLabel}</p>
                <ul className="space-y-4">
                  {c.beforeAfter.map((row, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-mist/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                      {row.after}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {c.plans.map((plan) => (
                <div
                  key={plan.label}
                  className={`flex flex-col rounded-2xl border ${
                    plan.featured
                      ? "border-glow border-signal/40 bg-signal/5 shadow-[0_0_60px_-15px_rgba(18,216,242,0.45)]"
                      : "border-white/10 bg-ink/50"
                  }`}
                >
                  <div className="border-b border-white/10 px-7 pb-5 pt-7">
                    {plan.featured && (
                      <span className="mb-3 inline-block w-fit rounded-full bg-sun px-3 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-navy">
                        Recomendado
                      </span>
                    )}
                    <p className={`mb-1 font-display text-2xl font-extrabold ${plan.featured ? "text-gradient-delta" : "text-mist"}`}>
                      {plan.label}
                    </p>
                    <p className="mb-3 text-xs text-mist/50">
                      {plan.duration} · {plan.hours}
                    </p>
                    <p className="text-sm leading-relaxed text-mist/65">{plan.description}</p>
                    <p className={`mt-5 font-display text-4xl font-extrabold ${plan.featured ? "text-gradient-delta" : "text-mist"}`}>
                      {plan.price}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col gap-5 px-7 py-6">
                    <p className="text-[11px] uppercase tracking-widest text-mist/35">
                      {c.totalHours} · {c.modules.length} módulos incluídos
                    </p>
                    {c.modules.map((mod) => (
                      <div key={mod.number}>
                        <div className="mb-2 flex items-center gap-3">
                          <span className="w-5 shrink-0 text-[10px] font-bold text-signal/70">{mod.number}</span>
                          <p className="text-sm font-semibold text-mist">{mod.title}</p>
                          <span className="ml-auto shrink-0 text-xs text-mist/35">{mod.hours}h</span>
                        </div>
                        <ul className="mb-2 ml-8 space-y-1.5">
                          {mod.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs text-mist/60">
                              <span className="mt-0.5 shrink-0 text-signal/60">–</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <p className="ml-8 text-[11px] font-medium text-signal/70">{mod.deliverables}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setRevealed(false)}
                className="text-xs text-mist/40 underline underline-offset-4 transition hover:text-mist/70"
              >
                Ocultar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------- 13. REVENDA DO CRM ---------- */
export function CrmResale() {
  const { content } = useContent();
  const c = content.crmResale;
  const [revealed, setRevealed] = useState(false);

  return (
    <Section id="crm-revenda" tone="deep" panel>
      <Reveal className="flex flex-col items-center gap-5 py-4 text-center">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="font-display text-5xl font-extrabold leading-none tracking-tight text-mist sm:text-7xl">{c.title}</h2>
        <p className="text-gradient-delta max-w-lg font-display text-lg font-bold sm:text-xl">{c.subtitle}</p>
        <p className="max-w-md text-sm text-mist/55">{c.intro}</p>
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          className="mt-2 rounded-full border border-signal/50 px-8 py-4 text-sm font-bold tracking-wide text-signal transition hover:bg-signal/10"
        >
          {revealed ? "Ocultar" : c.revealLabel}
        </button>
      </Reveal>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mt-14"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <div className="flex flex-col rounded-2xl border border-signal/30 bg-ink/60 p-7">
                <p className="mb-3 text-[11px] uppercase tracking-widest text-signal/70">{c.license.label}</p>
                <p className="font-display text-4xl font-extrabold text-mist">{c.license.price}</p>
                <p className="mb-6 text-xs text-mist/40">{c.license.priceNote}</p>
                <p className="mb-4 flex items-center gap-2 text-xs font-semibold text-signal/80">
                  <span className="inline-block h-2 w-2 rounded-full bg-signal/70" />
                  {c.license.limit}
                </p>
                <ul className="flex-1 space-y-3">
                  {c.license.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-mist/70">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal/70" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="mb-2 text-[10px] uppercase tracking-widest text-mist/35">Add-on opcional</p>
                  <p className="text-sm font-semibold text-mist">
                    {c.license.whiteLabelAddon.label}{" "}
                    <span className="font-normal text-signal">{c.license.whiteLabelAddon.price}</span>
                  </p>
                  <p className="mt-1 text-xs text-mist/50">{c.license.whiteLabelAddon.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-widest text-mist/35">O que você vende para seus clientes</p>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-bold text-signal">
                    {c.commissionBadge}
                  </span>
                </div>
                <div className="grid flex-1 gap-4 sm:grid-cols-3">
                  {c.plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`flex flex-col rounded-xl border p-5 ${
                        plan.featured ? "border-signal/40 bg-signal/5" : "border-white/10 bg-ink/50"
                      }`}
                    >
                      {plan.featured && (
                        <span className="mb-2 inline-block w-fit rounded-full bg-signal/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-signal">
                          Maior margem
                        </span>
                      )}
                      <p className="mb-1 font-display text-xl font-bold text-mist">{plan.name}</p>
                      <p className="mb-4 text-lg font-bold text-mist/85">{plan.clientPrice}</p>
                      <ul className="flex-1 space-y-2">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-mist/60">
                            <span className="mt-0.5 shrink-0 text-signal/60">–</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 space-y-1 border-t border-white/10 pt-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-mist/40">Repasse (30%)</span>
                          <span className="text-mist/65">{plan.repasse}</span>
                        </div>
                        <div className="flex justify-between gap-2 text-xs">
                          <span className="text-mist/40">Sua margem</span>
                          <span className="text-right font-semibold text-signal">{plan.margin}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-1 text-xs text-mist/40">{c.minPriceNote}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-7 py-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-mist/45">{c.example.label}</p>
              <div className="ml-auto flex flex-wrap gap-8">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-mist/35">Receita bruta</p>
                  <p className="font-display text-2xl font-bold text-mist">{c.example.revenue}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-mist/35">Repasse Delta</p>
                  <p className="font-display text-2xl font-bold text-mist/55">{c.example.repasse}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-mist/35">Fica com você</p>
                  <p className="font-display text-2xl font-bold text-signal">{c.example.profit}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setRevealed(false)}
                className="text-xs text-mist/40 underline underline-offset-4 transition hover:text-mist/70"
              >
                Ocultar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* ---------- 14. ONBOARDING ---------- */
export function Onboarding() {
  const { content } = useContent();
  const c = content.onboarding;
  return (
    <Section id="onboarding" tone="ink" transition="zoomIn">
      <Reveal>
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h2 className="max-w-3xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
      </Reveal>

      <div className="relative mt-14">
        {/* trilho: vertical no celular, horizontal no desktop */}
        <div aria-hidden className="pointer-events-none absolute bottom-4 left-[15px] top-4 w-px bg-white/10 lg:bottom-auto lg:left-4 lg:right-4 lg:top-[15px] lg:h-px lg:w-auto" />
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute bottom-4 left-[15px] top-4 w-px origin-top bg-gradient-to-b from-signal via-electric to-iris lg:hidden"
        />
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute left-4 right-4 top-[15px] hidden h-px origin-left bg-gradient-to-r from-signal via-electric to-iris lg:block"
        />
        <RevealStagger className="grid gap-6 lg:grid-cols-5 lg:gap-4" stagger={0.15}>
          {c.steps.map((step, i) => (
            <motion.div key={`${step.day}-${i}`} variants={staggerItem} className="relative flex gap-4 lg:flex-col lg:gap-5">
              <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-signal/60 bg-ink font-display text-xs font-bold text-signal shadow-[0_0_20px_-4px_rgba(18,216,242,0.8)]">
                {i + 1}
              </span>
              <div className="glass flex-1 rounded-xl border border-white/10 px-5 py-4">
                <p className="font-display text-lg font-bold text-signal">{step.day}</p>
                <p className="mt-1 text-sm leading-snug text-mist/75">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>

      <Reveal delay={0.2} className="mt-14 max-w-2xl space-y-2 text-mist/85">
        <p>{c.line1}</p>
        <p className="font-semibold text-mist">{c.line2}</p>
        <p className="font-semibold text-mist">{c.line3}</p>
        <Kicker>{c.kicker}</Kicker>
      </Reveal>
    </Section>
  );
}

/* ---------- 15. FECHAMENTO ---------- */
export function Closing() {
  const { content } = useContent();
  const c = content.closing;
  return (
    <section
      id="fechamento"
      className="relative flex min-h-[90svh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-4 py-28 text-center"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-60" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[min(110vw,900px)] w-[min(110vw,900px)] -translate-x-1/2 -translate-y-1/2 opacity-70">
        <DeltaCanvas className="h-full w-full" />
      </div>
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[50vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/20 blur-[140px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <Reveal className="relative z-10">
        <h2 className="text-4xl font-extrabold text-mist sm:text-7xl">
          {c.titlePlain}
          <span className="text-gradient-delta">{c.titleGold}</span>
        </h2>
        <p className="mt-8 font-display text-xl text-mist/85 sm:text-3xl">
          {c.line1}
          <br />
          <span className="font-bold text-mist">{c.line2}</span>
        </p>
        <p className="mt-10 font-display text-xs font-semibold uppercase tracking-[0.4em] text-signal">{c.motto}</p>
      </Reveal>
    </section>
  );
}

/* ---------- 16. DELTA CLUB ---------- */
export function Club() {
  const { content } = useContent();
  const c = content.club;
  return (
    <Section id="delta-club" tone="navy" panel>
      <Confetti />
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
        <SlideReveal direction="left">
          <div className="mb-4 flex items-center gap-3">
            <Float distance={6} duration={2.6}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sun text-navy shadow-[0_0_30px_-4px_rgba(255,213,31,0.7)]">
                <Gift className="h-5 w-5" />
              </span>
            </Float>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-sun">{c.eyebrow}</p>
          </div>
          <h2 className="max-w-3xl text-3xl text-mist sm:text-5xl">{c.heading}</h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-mist/80">{c.paragraph1}</p>
          <p className="mt-4 max-w-2xl font-semibold text-mist">{c.paragraph2}</p>
        </SlideReveal>

        <RevealStagger className="grid gap-3">
          {c.rewards.map((r, i) => (
            <motion.div
              key={r.label}
              variants={staggerItem}
              whileHover={{ x: 6 }}
              className={`flex items-center gap-4 rounded-xl border p-5 ${
                i === c.rewards.length - 1 ? "border-sun/60 bg-sun/10" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <span
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                  i === c.rewards.length - 1 ? "bg-sun text-navy" : "bg-white/10 text-sun"
                }`}
              >
                {i === c.rewards.length - 1 ? <Trophy className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </span>
              <div>
                <p className="text-sm text-mist/65">{r.label}</p>
                <p className="font-display font-bold text-mist">{r.value}</p>
              </div>
            </motion.div>
          ))}
        </RevealStagger>
      </div>

      <Reveal delay={0.15}>
        <p className="text-gradient-sun mt-10 font-display text-xl font-bold sm:text-2xl">{c.kicker}</p>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  const { content } = useContent();
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-12 text-center">
      <Image
        src={asset("/brand/logo-horizontal.png")}
        alt="Delta Soluções"
        width={900}
        height={321}
        className="mx-auto h-10 w-auto opacity-90"
      />
      <p className="mt-5 text-xs text-mist/45">{content.footer.text}</p>
    </footer>
  );
}
