"use client";

import { useState } from "react";
import { X, Save, Loader2, Check } from "lucide-react";
import { useContent } from "@/content/ContentContext";
import type { SiteContent } from "@/content/defaultContent";
import { saveContentToGithub } from "@/lib/github";
import { Field, TextArea, ListField, RowsField, Section } from "./fields";

export function EditorPanel({ onClose }: { onClose: () => void }) {
  const { content, setContent } = useContent();
  const [draft, setDraft] = useState<SiteContent>(() => JSON.parse(JSON.stringify(content)));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function patch<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  async function handleSave() {
    setStatus("saving");
    setError("");
    const res = await saveContentToGithub(draft);
    if (res.ok) {
      setContent(draft);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } else {
      setStatus("error");
      setError(res.error ?? "Erro desconhecido.");
    }
  }

  const d = draft;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end bg-black/60" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-xl flex-col bg-[#071233] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-display text-lg text-mist">Editar conteúdo da proposta</p>
            <p className="text-xs text-mist/50">
              Mude qualquer texto ou valor abaixo e clique em Salvar. Atualiza pra todo mundo em ~1 min.
            </p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-mist/60 hover:bg-white/10 hover:text-mist">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <Section title="Capa (Hero)">
            <Field label="Título" value={d.hero.title} onChange={(v) => patch("hero", { ...d.hero, title: v })} />
            <Field label="Subtítulo" value={d.hero.subtitle} onChange={(v) => patch("hero", { ...d.hero, subtitle: v })} />
            <Field label="Frase — linha 1" value={d.hero.quoteLine1} onChange={(v) => patch("hero", { ...d.hero, quoteLine1: v })} />
            <Field label="Frase — linha 2" value={d.hero.quoteLine2} onChange={(v) => patch("hero", { ...d.hero, quoteLine2: v })} />
          </Section>

          <Section title="Quem Somos">
            <Field label="Título (parte normal)" value={d.origin.headingPlain} onChange={(v) => patch("origin", { ...d.origin, headingPlain: v })} />
            <Field label="Título (destaque)" value={d.origin.headingGold} onChange={(v) => patch("origin", { ...d.origin, headingGold: v })} />
            <TextArea label="Parágrafo 1" rows={4} value={d.origin.paragraph1} onChange={(v) => patch("origin", { ...d.origin, paragraph1: v })} />
            <TextArea label="Parágrafo 2" rows={4} value={d.origin.paragraph2} onChange={(v) => patch("origin", { ...d.origin, paragraph2: v })} />
            <Field label="Frase final (normal)" value={d.origin.paragraph3Plain} onChange={(v) => patch("origin", { ...d.origin, paragraph3Plain: v })} />
            <Field label="Frase final (destaque)" value={d.origin.paragraph3Bold} onChange={(v) => patch("origin", { ...d.origin, paragraph3Bold: v })} />
            <Field label="Citação" value={d.origin.kicker} onChange={(v) => patch("origin", { ...d.origin, kicker: v })} />
          </Section>

          <Section title="O Problema Real">
            <Field label="Título" value={d.problem.heading} onChange={(v) => patch("problem", { ...d.problem, heading: v })} />
            <TextArea label="Introdução" value={d.problem.intro} onChange={(v) => patch("problem", { ...d.problem, intro: v })} />
            <ListField label="Itens" items={d.problem.items} onChange={(v) => patch("problem", { ...d.problem, items: v })} />
            <Field label="Frase final" value={d.problem.kicker} onChange={(v) => patch("problem", { ...d.problem, kicker: v })} />
          </Section>

          <Section title="Nossa Diferença">
            <Field label="Título (normal)" value={d.difference.headingPlain} onChange={(v) => patch("difference", { ...d.difference, headingPlain: v })} />
            <Field label="Título (destaque)" value={d.difference.headingGold} onChange={(v) => patch("difference", { ...d.difference, headingGold: v })} />
            <ListField label="Perguntas de diagnóstico" items={d.difference.questions} onChange={(v) => patch("difference", { ...d.difference, questions: v })} />
            <Field label="Frase final" value={d.difference.kicker} onChange={(v) => patch("difference", { ...d.difference, kicker: v })} />
          </Section>

          <Section title="Método Δ">
            <Field label="Título" value={d.method.heading} onChange={(v) => patch("method", { ...d.method, heading: v })} />
            {d.method.steps.map((step, i) => (
              <div key={i} className="mb-2 rounded-md border border-white/10 p-2.5">
                <Field
                  label={`Etapa ${i + 1} — nome`}
                  value={step.title}
                  onChange={(v) => {
                    const steps = [...d.method.steps];
                    steps[i] = { ...steps[i], title: v };
                    patch("method", { ...d.method, steps });
                  }}
                />
                <TextArea
                  label="Descrição"
                  rows={2}
                  value={step.text}
                  onChange={(v) => {
                    const steps = [...d.method.steps];
                    steps[i] = { ...steps[i], text: v };
                    patch("method", { ...d.method, steps });
                  }}
                />
              </div>
            ))}
            <Field label="Frase final" value={d.method.kicker} onChange={(v) => patch("method", { ...d.method, kicker: v })} />
          </Section>

          <Section title="O Time Completo">
            <Field label="Título" value={d.team.heading} onChange={(v) => patch("team", { ...d.team, heading: v })} />
            <TextArea label="Introdução" value={d.team.intro} onChange={(v) => patch("team", { ...d.team, intro: v })} />
            {d.team.services.map((svc, i) => (
              <div key={i} className="mb-2 rounded-md border border-white/10 p-2.5">
                <Field
                  label={`Serviço ${i + 1} — nome`}
                  value={svc.title}
                  onChange={(v) => {
                    const services = [...d.team.services];
                    services[i] = { ...services[i], title: v };
                    patch("team", { ...d.team, services });
                  }}
                />
                <TextArea
                  label="Descrição"
                  rows={2}
                  value={svc.text}
                  onChange={(v) => {
                    const services = [...d.team.services];
                    services[i] = { ...services[i], text: v };
                    patch("team", { ...d.team, services });
                  }}
                />
              </div>
            ))}
          </Section>

          <Section title="Ancoragem — Custo do Time">
            <Field label="Valor total em destaque" value={d.anchorTeam.headingGold} onChange={(v) => patch("anchorTeam", { ...d.anchorTeam, headingGold: v })} />
            <RowsField label="Linhas da tabela" rows={d.anchorTeam.rows} onChange={(v) => patch("anchorTeam", { ...d.anchorTeam, rows: v })} />
            <Field label="Total — valor" value={d.anchorTeam.total.value} onChange={(v) => patch("anchorTeam", { ...d.anchorTeam, total: { ...d.anchorTeam.total, value: v } })} />
            <Field label="Frase final" value={d.anchorTeam.kicker} onChange={(v) => patch("anchorTeam", { ...d.anchorTeam, kicker: v })} />
          </Section>

          <Section title="Ancoragem — Custo da Secretária">
            <RowsField label="Linhas da tabela" rows={d.anchorSecretary.rows} onChange={(v) => patch("anchorSecretary", { ...d.anchorSecretary, rows: v })} />
            <Field label="Total — valor" value={d.anchorSecretary.total.value} onChange={(v) => patch("anchorSecretary", { ...d.anchorSecretary, total: { ...d.anchorSecretary.total, value: v } })} />
            <Field label="Frase final" value={d.anchorSecretary.kicker} onChange={(v) => patch("anchorSecretary", { ...d.anchorSecretary, kicker: v })} />
          </Section>

          <Section title="O CRC">
            <Field label="Título (normal)" value={d.crc.headingPlain} onChange={(v) => patch("crc", { ...d.crc, headingPlain: v })} />
            <Field label="Título (destaque)" value={d.crc.headingGold} onChange={(v) => patch("crc", { ...d.crc, headingGold: v })} />
            <ListField label="Pontos" items={d.crc.bullets} onChange={(v) => patch("crc", { ...d.crc, bullets: v })} />
            <Field label="Frase final" value={d.crc.kicker} onChange={(v) => patch("crc", { ...d.crc, kicker: v })} />
          </Section>

          <Section title="Resultados">
            <Field label="Título" value={d.results.heading} onChange={(v) => patch("results", { ...d.results, heading: v })} />
            <TextArea label="Texto de apoio" value={d.results.intro} onChange={(v) => patch("results", { ...d.results, intro: v })} />
          </Section>

          <Section title="Planos e preços">
            <Field label="Título" value={d.plans.heading} onChange={(v) => patch("plans", { ...d.plans, heading: v })} />
            {d.plans.items.map((plan, i) => (
              <div key={i} className="mb-3 rounded-md border border-signal/25 p-3">
                <Field
                  label="Nome do plano"
                  value={plan.name}
                  onChange={(v) => {
                    const items = [...d.plans.items];
                    items[i] = { ...items[i], name: v };
                    patch("plans", { ...d.plans, items });
                  }}
                />
                <Field
                  label="Descrição curta"
                  value={plan.description}
                  onChange={(v) => {
                    const items = [...d.plans.items];
                    items[i] = { ...items[i], description: v };
                    patch("plans", { ...d.plans, items });
                  }}
                />
                <Field
                  label="Preço mensal"
                  value={plan.price}
                  onChange={(v) => {
                    const items = [...d.plans.items];
                    items[i] = { ...items[i], price: v };
                    patch("plans", { ...d.plans, items });
                  }}
                />
                <ListField
                  label="O que inclui"
                  items={plan.features}
                  onChange={(v) => {
                    const items = [...d.plans.items];
                    items[i] = { ...items[i], features: v };
                    patch("plans", { ...d.plans, items });
                  }}
                />
                <div className="grid grid-cols-3 gap-2">
                  <Field label="3m /mês" value={plan.monthly3} onChange={(v) => {
                    const items = [...d.plans.items]; items[i] = { ...items[i], monthly3: v }; patch("plans", { ...d.plans, items });
                  }} />
                  <Field label="6m /mês" value={plan.monthly6} onChange={(v) => {
                    const items = [...d.plans.items]; items[i] = { ...items[i], monthly6: v }; patch("plans", { ...d.plans, items });
                  }} />
                  <Field label="12m /mês" value={plan.monthly12} onChange={(v) => {
                    const items = [...d.plans.items]; items[i] = { ...items[i], monthly12: v }; patch("plans", { ...d.plans, items });
                  }} />
                </div>
              </div>
            ))}
            <Field label="Frase final" value={d.plans.kicker} onChange={(v) => patch("plans", { ...d.plans, kicker: v })} />
          </Section>

          <Section title="Onboarding">
            <Field label="Título" value={d.onboarding.heading} onChange={(v) => patch("onboarding", { ...d.onboarding, heading: v })} />
            {d.onboarding.steps.map((step, i) => (
              <div key={i} className="mb-2 flex gap-2">
                <input
                  value={step.day}
                  onChange={(e) => {
                    const steps = [...d.onboarding.steps];
                    steps[i] = { ...steps[i], day: e.target.value };
                    patch("onboarding", { ...d.onboarding, steps });
                  }}
                  className="w-28 rounded-md border border-white/15 bg-black/30 px-2 py-1.5 text-sm text-mist outline-none focus:border-signal/60"
                />
                <input
                  value={step.text}
                  onChange={(e) => {
                    const steps = [...d.onboarding.steps];
                    steps[i] = { ...steps[i], text: e.target.value };
                    patch("onboarding", { ...d.onboarding, steps });
                  }}
                  className="flex-1 rounded-md border border-white/15 bg-black/30 px-2 py-1.5 text-sm text-mist outline-none focus:border-signal/60"
                />
              </div>
            ))}
            <Field label="Frase final" value={d.onboarding.kicker} onChange={(v) => patch("onboarding", { ...d.onboarding, kicker: v })} />
          </Section>

          <Section title="Fechamento">
            <Field label="Título (destaque)" value={d.closing.titleGold} onChange={(v) => patch("closing", { ...d.closing, titleGold: v })} />
            <Field label="Linha 1" value={d.closing.line1} onChange={(v) => patch("closing", { ...d.closing, line1: v })} />
            <Field label="Linha 2 (destaque)" value={d.closing.line2} onChange={(v) => patch("closing", { ...d.closing, line2: v })} />
          </Section>

          <Section title="Delta Club">
            <Field label="Título" value={d.club.heading} onChange={(v) => patch("club", { ...d.club, heading: v })} />
            <TextArea label="Parágrafo 1" rows={3} value={d.club.paragraph1} onChange={(v) => patch("club", { ...d.club, paragraph1: v })} />
            <Field label="Parágrafo 2" value={d.club.paragraph2} onChange={(v) => patch("club", { ...d.club, paragraph2: v })} />
            <RowsField label="Recompensas" rows={d.club.rewards} onChange={(v) => patch("club", { ...d.club, rewards: v })} />
            <Field label="Frase final" value={d.club.kicker} onChange={(v) => patch("club", { ...d.club, kicker: v })} />
          </Section>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          {status === "error" && <p className="mb-2 text-xs text-red-300">{error}</p>}
          <button
            onClick={handleSave}
            disabled={status === "saving"}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-signal py-2.5 font-semibold text-navy hover:bg-signal/90 disabled:opacity-60"
          >
            {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "saved" && <Check className="h-4 w-4" />}
            {status === "idle" && <Save className="h-4 w-4" />}
            {status === "saving" ? "Salvando..." : status === "saved" ? "Salvo! Atualiza em ~1 min" : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  );
}
