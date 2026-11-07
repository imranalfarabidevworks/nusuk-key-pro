"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .lang.nk-lang {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 4px;
          border-radius: 999px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          box-shadow: inset 0 1px 3px rgba(17, 24, 39, 0.06);
        }
        .nk-lang button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 50px;
          height: 38px;
          padding: 0 14px;
          border: none;
          border-radius: 999px;
          background: transparent;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 700;
          color: #6b7280;
          transition: color 0.25s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nk-lang button:hover { color: #111827; }
        .nk-lang button.on { color: #ffffff; }
        .nk-lang .pill {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          box-shadow: 0 6px 14px rgba(249, 115, 22, 0.30);
        }
        .nk-lang .lt {
          position: relative;
          z-index: 1;
          line-height: 1;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .nk-lang button { min-width: 42px; height: 34px; padding: 0 10px; font-size: 0.82rem; }
        }
      ` }} />

      <div className="lang nk-lang" role="group" aria-label="Language">
        {(["bn", "en"] as const).map((l) => (
          <button key={l} onClick={() => setLang(l)} className={lang === l ? "on" : ""} aria-pressed={lang === l}>
            {lang === l && <motion.span layoutId="langpill" className="pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="lt">{l === "bn" ? "বাংলা" : "EN"}</span>
          </button>
        ))}
      </div>
    </>
  );
}