"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultContent, type SiteContent } from "./defaultContent";
import { asset } from "@/lib/basePath";

type Ctx = {
  content: SiteContent;
  setContent: (c: SiteContent) => void;
  loaded: boolean;
};

const ContentCtx = createContext<Ctx | null>(null);

/** Faz merge raso por seção — se /content.json só tiver parte das seções
 * editadas, o resto continua vindo do defaultContent (nunca quebra o site). */
function mergeContent(base: SiteContent, override: Partial<SiteContent>): SiteContent {
  const merged = { ...base } as SiteContent;
  for (const key of Object.keys(override) as (keyof SiteContent)[]) {
    const value = override[key];
    if (value && typeof value === "object") {
      merged[key] = { ...base[key], ...value } as never;
    }
  }
  return merged;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(defaultContent);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(asset("/content.json"), { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setContentState((prev) => mergeContent(prev, data));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  function setContent(c: SiteContent) {
    setContentState(c);
  }

  return (
    <ContentCtx.Provider value={{ content, setContent, loaded }}>{children}</ContentCtx.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentCtx);
  if (!ctx) throw new Error("useContent precisa estar dentro de <ContentProvider>");
  return ctx;
}
