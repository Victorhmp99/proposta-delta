"use client";

export function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block mb-3">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-mist/50">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-mist outline-none focus:border-signal/60"
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block mb-3">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-mist/50">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-md border border-white/15 bg-black/30 px-3 py-2 text-sm text-mist outline-none focus:border-signal/60"
      />
    </label>
  );
}

export function ListField({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <div className="mb-3">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-mist/50">
        {label}
      </span>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex gap-1.5">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded-md border border-white/15 bg-black/30 px-3 py-1.5 text-sm text-mist outline-none focus:border-signal/60"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="rounded-md border border-white/15 px-2 text-xs text-mist/60 hover:border-red-400/50 hover:text-red-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="mt-1.5 text-xs font-semibold text-signal hover:text-signal/80"
      >
        + adicionar item
      </button>
    </div>
  );
}

export function RowsField({
  label,
  rows,
  onChange,
}: {
  label: string;
  rows: { label: string; value: string }[];
  onChange: (rows: { label: string; value: string }[]) => void;
}) {
  return (
    <div className="mb-3">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-mist/50">
        {label}
      </span>
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-1.5">
            <input
              type="text"
              value={row.label}
              placeholder="rótulo"
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...next[i], label: e.target.value };
                onChange(next);
              }}
              className="flex-1 rounded-md border border-white/15 bg-black/30 px-3 py-1.5 text-sm text-mist outline-none focus:border-signal/60"
            />
            <input
              type="text"
              value={row.value}
              placeholder="valor"
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...next[i], value: e.target.value };
                onChange(next);
              }}
              className="w-40 rounded-md border border-white/15 bg-black/30 px-3 py-1.5 text-sm text-mist outline-none focus:border-signal/60"
            />
            <button
              type="button"
              onClick={() => onChange(rows.filter((_, idx) => idx !== i))}
              className="rounded-md border border-white/15 px-2 text-xs text-mist/60 hover:border-red-400/50 hover:text-red-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...rows, { label: "", value: "" }])}
        className="mt-1.5 text-xs font-semibold text-signal hover:text-signal/80"
      >
        + adicionar linha
      </button>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="mb-3 rounded-lg border border-white/10 bg-white/[0.03] open:bg-white/[0.04]">
      <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-mist">
        {title}
      </summary>
      <div className="border-t border-white/10 px-4 py-4">{children}</div>
    </details>
  );
}
