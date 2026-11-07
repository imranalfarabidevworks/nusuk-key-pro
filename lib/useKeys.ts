"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_KEYS, KeyItem } from "@/data/keys";

type Row = { code: string; country: string; ts: number };
export type AddError = "format" | "dup" | "country" | "rate" | "server";

const SHARED = "nk_shared"; // সার্ভার থেকে পাওয়া তালিকার ক্যাশ (অফলাইনেও সংখ্যা কমবে না)
const MINE = "nk_mine";
const COPIED = "nk_copied";

const read = <T,>(k: string, d: T): T => {
  try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return d; }
};
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

// পুরোনো ও নতুন তালিকা মিলিয়ে নেয়। কখনো কোনো key বাদ পড়ে না।
const merge = (a: Row[], b: Row[]) => {
  const m = new Map<string, Row>();
  [...a, ...b].forEach((r) => m.set(r.code, r));
  return [...m.values()].sort((x, y) => y.ts - x.ts);
};

export function useKeys() {
  const [shared, setShared] = useState<Row[]>([]);
  const [mine, setMine] = useState<string[]>([]);
  const [copied, setCopied] = useState<string[]>([]);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/keys", { cache: "no-store" });
      if (!r.ok) return;
      const j = (await r.json()) as { keys: Row[] };
      setShared((prev) => {
        const n = merge(prev, j.keys);
        write(SHARED, n);
        return n;
      });
    } catch {}
  }, []);

  useEffect(() => {
    setShared(read<Row[]>(SHARED, []));
    setMine(read<string[]>(MINE, []));
    setCopied(read<string[]>(COPIED, []));
    refresh();
    const id = setInterval(refresh, 60_000);
    const onVis = () => document.visibilityState === "visible" && refresh();
    document.addEventListener("visibilitychange", onVis);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, [refresh]);

  const mineSet = useMemo(() => new Set(mine), [mine]);
  const copiedSet = useMemo(() => new Set(copied), [copied]);

  const keys: KeyItem[] = useMemo(
    () => [...shared.map((r) => ({ code: r.code, country: r.country, mine: mineSet.has(r.code) })), ...BASE_KEYS],
    [shared, mineSet]
  );

  const markCopied = useCallback((code: string) => {
    setCopied((prev) => {
      if (prev.includes(code)) return prev;
      const n = [...prev, code];
      write(COPIED, n);
      return n;
    });
  }, []);

  const addKey = useCallback(
    async (code: string, country: string): Promise<AddError | null> => {
      const c = code.trim();
      if (!/^NG-[A-Za-z0-9]{8}$/.test(c)) return "format";
      if (keys.some((k) => k.code === c)) return "dup";
      try {
        const r = await fetch("/api/keys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: c, country }),
        });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) {
          if (r.status === 409) refresh();
          return (j.error as AddError) || "server";
        }
        const row = j.key as Row;
        setShared((prev) => { const n = merge(prev, [row]); write(SHARED, n); return n; });
        setMine((prev) => { const n = [...prev, c]; write(MINE, n); return n; });
        return null;
      } catch {
        return "server";
      }
    },
    [keys, refresh]
  );

  return { keys, copiedSet, copiedCount: copiedSet.size, markCopied, addKey };
}
