"use client";
import { motion } from "framer-motion";
import { KeyItem } from "@/data/keys";
import { countryName, flagUrl } from "@/lib/countries";
import { useLang } from "@/lib/i18n";

export default function KeyCard({ item, index, copied, onCopy }: { item: KeyItem; index: number; copied: boolean; onCopy: () => void }) {
  const { t, lang } = useLang();
  const flag = flagUrl(item.country);

  // Copy the key to the clipboard (with a legacy fallback)
  const copy = async () => {
    try { await navigator.clipboard.writeText(item.code); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = item.code; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
    onCopy();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .kc.nk-kc {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(17, 24, 39, 0.05);
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .kc.nk-kc::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #f97316, #ea580c);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .kc.nk-kc:hover {
          transform: translateY(-3px);
          border-color: #fed7aa;
          box-shadow: 0 14px 30px rgba(17, 24, 39, 0.10);
        }
        .kc.nk-kc:hover::before { opacity: 1; }

        /* Copied state */
        .kc.nk-kc.kc-done {
          background: linear-gradient(135deg, #fff7ed, #fff7ed);
          border-color: #fdba74;
        }
        .kc.nk-kc.kc-done::before { opacity: 1; }

        .nk-kc .idx {
          flex-shrink: 0;
          min-width: 38px;
          text-align: center;
          padding: 5px 8px;
          border-radius: 999px;
          background: #f3f4f6;
          color: #6b7280;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.3px;
        }

        .nk-kc .flag {
          flex-shrink: 0;
          width: 30px;
          height: 21px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.12);
        }

        .nk-kc .kc-m {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .nk-kc .kc-m code {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.4px;
          color: #111827;
          background: transparent;
          padding: 0;
        }
        .nk-kc .kc-m small {
          font-size: 0.74rem;
          font-weight: 600;
          color: #c2410c;
        }

        .nk-kc .cp {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          color: #374151;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .nk-kc .cp:hover {
          background: linear-gradient(135deg, #f97316, #ea580c);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 8px 18px rgba(249, 115, 22, 0.30);
        }
        .nk-kc .cp.cp-d {
          background: #f97316;
          border-color: #f97316;
          color: #ffffff;
          box-shadow: 0 8px 18px rgba(249, 115, 22, 0.30);
        }

        @media (max-width: 480px) {
          .kc.nk-kc { gap: 10px; padding: 12px; }
          .nk-kc .kc-m code { font-size: 0.92rem; }
        }
      ` }} />

      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index, 12) * 0.025 }}
        className={`kc nk-kc ${copied ? "kc-done" : ""}`}
      >
        <span className="idx">#{index}</span>
        {flag && (
          <img
            className="flag"
            src={flag}
            alt={countryName(item.country!, lang)}
            title={countryName(item.country!, lang)}
            width={26}
            height={18}
            loading="lazy"
          />
        )}
        <div className="kc-m">
          <code>{item.code}</code>
          {(copied || item.mine) && (
            <small>
              {item.mine ? `${t("mine")} · ` : ""}
              {copied ? `${t("copiedLabel")} ✓` : ""}
            </small>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.88 }}
          className={`cp ${copied ? "cp-d" : ""}`}
          onClick={copy}
          aria-label={`${t("copy")} ${item.code}`}
        >
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
          )}
        </motion.button>
      </motion.div>
    </>
  );
}