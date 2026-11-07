"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_KEYS, KeyItem } from "@/data/keys";

const EXTRA = "nk_extra";
const COPIED = "nk_copied";

const read = <T,>(k: string, d: T): T => {
  try { return JSON.parse(localStorage.getItem(k) || "") as T; } catch { return d; }
};

/**
 * NOTE: ইউজারের যোগ করা key এখন শুধু তার ব্রাউজারে (localStorage) থাকে।
 * সবার কাছে দেখাতে চাইলে addKey ও load অংশ একটি ডাটাবেস API (Supabase / Vercel KV) দিয়ে বদলান।
 */
export function useKeys() {
  const [extra, setExtra] = useState<KeyItem[]>([]);
  const [copied, setCopied] = useState<string[]>([]);

  useEffect(() => {
    setExtra(read<KeyItem[]>(EXTRA, []));
    setCopied(read<string[]>(COPIED, []));
  }, []);

  const keys = useMemo(() => [...extra, ...BASE_KEYS], [extra]);
  const copiedSet = useMemo(() => new Set(copied), [copied]);

  const markCopied = useCallback((code: string) => {
    setCopied((prev) => {
      if (prev.includes(code)) return prev;
      const n = [...prev, code];
      try { localStorage.setItem(COPIED, JSON.stringify(n)); } catch {}
      return n;
    });
  }, []);

  const addKey = useCallback(
    (code: string, country: string): "format" | "dup" | null => {
      const c = code.trim();
      if (!/^NG-[A-Za-z0-9]{8}$/.test(c)) return "format";
      if (keys.some((k) => k.code === c)) return "dup";
      const n = [{ code: c, country, mine: true }, ...extra];
      setExtra(n);
      try { localStorage.setItem(EXTRA, JSON.stringify(n)); } catch {}
      return null;
    },
    [keys, extra]
  );

  return { keys, copiedSet, copiedCount: copiedSet.size, markCopied, addKey };
}
