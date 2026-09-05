"use client";

import { useMemo, useState } from "react";

const examples = {
  json: `{
  "name": "Atlas",
  "version": 2,
  "features": ["fast", "reliable"]
}`,
  yaml: `name: Atlas
version: 2
features:
  - fast
  - reliable`,
};

function lineCount(value: string) {
  return value ? value.split("\\n").length : 0;
}

export default function Home() {
  const [left, setLeft] = useState(examples.json);
  const [right, setRight] = useState(examples.yaml);
  const [copied, setCopied] = useState(false);
  const isSame = left.trim() === right.trim();
  const leftLines = useMemo(() => lineCount(left), [left]);
  const rightLines = useMemo(() => lineCount(right), [right]);

  async function copyResult() {
    await navigator.clipboard.writeText(`Left\\n${left}\\n\\nRight\\n${right}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-mono text-sm font-bold text-primary-foreground">≠</div>
            <span className="font-mono text-base font-semibold tracking-tight">compare</span>
          </div>
          <span className="hidden text-sm text-muted-foreground sm:block">A clear view of what changed.</span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">Side-by-side, without the noise</p>
          <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">See the difference at a glance.</h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">Paste two versions of your data, text, or configuration and compare them in one focused workspace.</p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
            <div className="flex items-center gap-3 text-sm"><span className={`h-2.5 w-2.5 rounded-full ${isSame ? "bg-primary" : "bg-accent"}`} /><span className="font-medium">{isSame ? "No differences" : "Ready to compare"}</span><span className="text-muted-foreground">{leftLines} / {rightLines} lines</span></div>
            <div className="flex items-center gap-2"><button onClick={() => { setLeft(""); setRight(""); }} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground">Clear</button><button onClick={copyResult} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">{copied ? "Copied" : "Copy"}</button></div>
          </div>
          <div className="grid md:grid-cols-2">
            <label className="flex min-h-80 flex-col border-b border-border md:border-b-0 md:border-r"><span className="border-b border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Original</span><textarea value={left} onChange={(event) => setLeft(event.target.value)} spellCheck={false} aria-label="Original content" placeholder="Paste original content" className="min-h-72 flex-1 resize-none bg-transparent p-5 font-mono text-sm leading-6 outline-none placeholder:text-muted-foreground/60" /></label>
            <label className="flex min-h-80 flex-col"><span className="border-b border-border px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">Updated</span><textarea value={right} onChange={(event) => setRight(event.target.value)} spellCheck={false} aria-label="Updated content" placeholder="Paste updated content" className="min-h-72 flex-1 resize-none bg-transparent p-5 font-mono text-sm leading-6 outline-none placeholder:text-muted-foreground/60" /></label>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground"><span><strong className="font-mono text-foreground">{left.length + right.length}</strong> characters</span><span><strong className="font-mono text-foreground">{Math.abs(left.length - right.length)}</strong> character delta</span><span className="ml-auto">Changes are kept in this tab.</span></div>
      </section>
    </main>
  );
}
