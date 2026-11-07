"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KeyItem } from "@/data/keys";
import { useLang } from "@/lib/i18n";
import KeyCard from "./KeyCard";

const PAGE = 100;
type Filter = "all" | "new" | "flag";

export default function KeyList({ keys, copiedSet, onCopied }: { keys: KeyItem[]; copiedSet: Set<string>; onCopied: (c: string) => void }) {
  const { t } = useLang();
  const [page, setPage] = useState(0);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const top = useRef<HTMLDivElement>(null);

  const pages = Math.max(1, Math.ceil(keys.length / PAGE));
  const searching = q.trim() !== "";

  // Build the visible list based on search, page and filter
  const batch = useMemo(() => {
    let list = searching
      ? keys.map((k, i) => ({ k, n: i + 1 })).filter((x) => x.k.code.toLowerCase().includes(q.trim().toLowerCase()))
      : keys.slice(page * PAGE, page * PAGE + PAGE).map((k, i) => ({ k, n: page * PAGE + i + 1 }));
    if (filter === "new") list = list.filter((x) => !copiedSet.has(x.k.code));
    if (filter === "flag") list = list.filter((x) => x.k.country);
    return list;
  }, [keys, page, q, filter, copiedSet, searching]);

  // Number of keys not yet copied in the current batch
  const left = useMemo(
    () => keys.slice(page * PAGE, page * PAGE + PAGE).filter((k) => !copiedSet.has(k.code)).length,
    [keys, page, copiedSet]
  );

  useEffect(() => { if (page >= pages) setPage(0); }, [pages, page]);

  const go = (p: number) => {
    setPage(p);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="keys" className="sec nk-kl" ref={top}>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Keep the section header clear of the fixed navbar when scrolling */
        .nk-kl { scroll-margin-top: 110px; padding-top: 56px; padding-bottom: 72px; }

        /* Toolbar */
        .nk-kl .tools {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
          justify-content: space-between;
          padding: 14px;
          border-radius: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);
        }
        .nk-kl .search {
          position: relative;
          flex: 1 1 260px;
          display: flex;
          align-items: center;
        }
        .nk-kl .search svg {
          position: absolute;
          left: 16px;
          color: #9ca3af;
          pointer-events: none;
        }
        .nk-kl .search input {
          width: 100%;
          height: 50px;
          padding: 0 18px 0 46px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          font-size: 1rem;
          color: #111827;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .nk-kl .search input:focus {
          background: #ffffff;
          border-color: #f97316;
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.14);
        }

        /* Filter segmented control */
        .nk-kl .seg {
          display: inline-flex;
          gap: 4px;
          padding: 4px;
          border-radius: 14px;
          background: #f3f4f6;
        }
        .nk-kl .seg button {
          border: none;
          cursor: pointer;
          padding: 11px 18px;
          border-radius: 11px;
          background: transparent;
          color: #4b5563;
          font-weight: 700;
          font-size: 0.92rem;
          transition: all 0.2s ease;
        }
        .nk-kl .seg button:hover { color: #111827; }
        .nk-kl .seg button.on {
          background: #ffffff;
          color: #c2410c;
          box-shadow: 0 3px 10px rgba(17, 24, 39, 0.10);
        }

        /* Batch tabs */
        .nk-kl .tabs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 22px;
          padding-bottom: 6px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .nk-kl .tabs::-webkit-scrollbar { display: none; }
        .nk-kl .tab {
          flex-shrink: 0;
          white-space: nowrap;
          cursor: pointer;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #4b5563;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.25s ease;
        }
        .nk-kl .tab:hover { border-color: #fdba74; color: #c2410c; }
        .nk-kl .tab.on {
          color: #ffffff;
          border-color: transparent;
          background: linear-gradient(135deg, #f97316, #ea580c);
          box-shadow: 0 8px 18px rgba(249, 115, 22, 0.28);
        }
        .nk-kl .rem {
          flex-shrink: 0;
          margin-left: auto;
          padding: 9px 16px;
          border-radius: 999px;
          background: #fff7ed;
          border: 1px solid #fed7aa;
          color: #c2410c;
          font-weight: 600;
          font-size: 0.88rem;
          white-space: nowrap;
        }
        .nk-kl .rem b { font-weight: 800; }

        /* Responsive card grid */
        .nk-kl .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 16px;
          margin-top: 22px;
        }

        /* Empty state */
        .nk-kl .empty {
          margin: 40px auto 0;
          max-width: 420px;
          padding: 40px 24px;
          text-align: center;
          border-radius: 20px;
          border: 2px dashed #d1d5db;
          background: #f9fafb;
          color: #6b7280;
          font-weight: 600;
        }

        /* Pager */
        .nk-kl .pager {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 40px;
        }
        .nk-kl .pager .btn {
          padding: 14px 28px;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }
        .nk-kl .pager .btn:hover:not(:disabled) { transform: translateY(-2px); }
        .nk-kl .pager .btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .nk-kl .pager .btn-p { box-shadow: 0 10px 22px rgba(249, 115, 22, 0.28); }

        @media (max-width: 600px) {
          .nk-kl { scroll-margin-top: 90px; padding-top: 40px; }
          .nk-kl .tools { padding: 12px; }
          .nk-kl .seg { width: 100%; }
          .nk-kl .seg button { flex: 1; padding: 11px 8px; }
          .nk-kl .grid { grid-template-columns: 1fr; gap: 12px; }
          .nk-kl .pager .btn { flex: 1; padding: 14px 12px; }
        }
      ` }} />

      <div className="wrap">
        <motion.div
          className="tools"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search")} />
          </div>
          <div className="seg">
            {([["all", "filterAll"], ["new", "filterNew"], ["flag", "filterFlag"]] as const).map(([f, k]) => (
              <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{t(k)}</button>
            ))}
          </div>
        </motion.div>

        {!searching && (
          <div className="tabs">
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} className={`tab ${i === page ? "on" : ""}`} onClick={() => go(i)}>
                {t("batch")} {i * PAGE + 1}–{Math.min((i + 1) * PAGE, keys.length)}
              </button>
            ))}
            <span className="rem">{t("remaining")}: <b>{left}</b></span>
          </div>
        )}

        <div className="grid">
          <AnimatePresence mode="popLayout">
            {batch.map(({ k, n }) => (
              <KeyCard key={k.code} item={k} index={n} copied={copiedSet.has(k.code)} onCopy={() => onCopied(k.code)} />
            ))}
          </AnimatePresence>
        </div>
        {batch.length === 0 && <p className="empty">{t("empty")}</p>}

        {!searching && pages > 1 && (
          <div className="pager">
            <button className="btn btn-o" disabled={page === 0} onClick={() => go(page - 1)}>← {t("prev")}</button>
            <button className="btn btn-p" disabled={page >= pages - 1} onClick={() => go(page + 1)}>{t("next")} →</button>
          </div>
        )}
      </div>
    </section>
  );
}