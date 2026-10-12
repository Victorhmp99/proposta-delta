"use client";

import { useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { getToken, setToken, validateToken } from "@/lib/github";
import { EditorPanel } from "./EditorPanel";

function TokenModal({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [value, setValue] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  async function handleConfirm() {
    if (!value.trim()) return;
    setChecking(true);
    setError("");
    const res = await validateToken(value.trim());
    setChecking(false);
    if (res.ok) {
      setToken(value.trim());
      onSuccess();
    } else {
      setError(res.error ?? "Token inválido.");
    }
  }

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl border border-white/10 bg-[#071233] p-6 shadow-2xl"
      >
        <p className="font-display text-lg text-mist mb-1">Acesso de edição</p>
        <p className="mb-4 text-xs leading-relaxed text-mist/60">
          Cole aqui seu token do GitHub (Personal Access Token com permissão de repositório).
          Ele fica guardado só neste navegador — nunca é enviado a mais nada além do GitHub.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ghp_..."
          autoFocus
          className="mb-2 w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-mist outline-none focus:border-signal/60"
        />
        {error && <p className="mb-2 text-xs text-red-300">{error}</p>}
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            disabled={checking}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-signal py-2 text-sm font-semibold text-navy hover:bg-signal/90 disabled:opacity-60"
          >
            {checking && <Loader2 className="h-4 w-4 animate-spin" />}
            {checking ? "Verificando..." : "Confirmar"}
          </button>
          <button
            onClick={onClose}
            className="rounded-md border border-white/15 px-4 py-2 text-sm text-mist/70 hover:bg-white/5"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export function EditModeButton() {
  const [showToken, setShowToken] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  function handleClick() {
    if (getToken()) {
      setShowPanel(true);
    } else {
      setShowToken(true);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="Editar conteúdo"
        className="fixed bottom-4 right-4 z-[190] flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-mist/30 opacity-40 transition hover:opacity-100 hover:text-signal"
      >
        <Pencil className="h-4 w-4" />
      </button>

      {showToken && (
        <TokenModal
          onClose={() => setShowToken(false)}
          onSuccess={() => {
            setShowToken(false);
            setShowPanel(true);
          }}
        />
      )}

      {showPanel && <EditorPanel onClose={() => setShowPanel(false)} />}
    </>
  );
}
