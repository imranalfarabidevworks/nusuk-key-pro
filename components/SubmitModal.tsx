"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COUNTRIES, flagUrl } from "@/lib/countries";
import { useLang } from "@/lib/i18n";

type Props = { open: boolean; onClose: () => void; addKey: (c: string, country: string) => "format" | "dup" | null; onDone: () => void };

export default function SubmitModal({ open, onClose, addKey, onDone }: Props) {
  const { t, lang } = useLang();
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [err, setErr] = useState("");

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const f = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [open, onClose]);

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) return setErr(t("errCountry"));
    const r = addKey(code, country);
    if (r === "format") return setErr(t("errFormat"));
    if (r === "dup") return setErr(t("errDup"));
    setCode(""); setErr(""); onDone(); onClose();
  };

  const flag = flagUrl(country);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .ov.nk-ov {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(17, 24, 39, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .modal.nk-modal {
          position: relative;
          width: 100%;
          max-width: 460px;
          max-height: calc(100vh - 32px);
          overflow-y: auto;
          padding: 34px 28px 26px;
          border-radius: 26px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
        }
        /* Gradient strip on top of the modal */
        .nk-modal::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #16a34a, #0ea5e9);
        }

        .nk-modal .nk-x {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          color: #6b7280;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .nk-modal .nk-x:hover { background: #fee2e2; color: #dc2626; border-color: #fecaca; }

        .nk-modal .nk-icon {
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          border-radius: 16px;
          background: linear-gradient(135deg, #16a34a, #0ea5e9);
          color: #ffffff;
          font-size: 1.7rem;
          font-weight: 700;
          box-shadow: 0 10px 22px rgba(22, 163, 74, 0.30);
        }

        .nk-modal h3 {
          margin: 0 0 20px;
          padding-right: 40px;
          font-size: 1.45rem;
          font-weight: 800;
          line-height: 1.25;
          color: #111827;
        }

        .nk-modal label {
          display: block;
          margin-bottom: 18px;
          font-weight: 700;
          font-size: 0.95rem;
          color: #374151;
        }
        .nk-modal label small {
          display: block;
          margin-top: 7px;
          font-weight: 500;
          font-size: 0.8rem;
          color: #9ca3af;
        }

        .nk-modal input,
        .nk-modal select {
          width: 100%;
          height: 52px;
          margin-top: 8px;
          padding: 0 16px;
          border-radius: 14px;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb;
          font-size: 1rem;
          color: #111827;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .nk-modal input {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .nk-modal input:focus,
        .nk-modal select:focus {
          background: #ffffff;
          border-color: #16a34a;
          box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.14);
        }

        /* Country select with flag */
        .nk-modal .sel {
          position: relative;
          display: flex;
          align-items: center;
        }
        .nk-modal .sel img {
          position: absolute;
          left: 14px;
          top: 50%;
          margin-top: 4px;
          transform: translateY(-50%);
          width: 28px;
          height: 20px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
          pointer-events: none;
          z-index: 1;
        }
        .nk-modal .sel select { cursor: pointer; }
        .nk-modal .sel.has-flag select { padding-left: 52px; }

        .nk-modal .err {
          margin: 0 0 16px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .nk-modal .row {
          display: flex;
          gap: 12px;
          margin-top: 6px;
        }
        .nk-modal .row .btn {
          flex: 1;
          padding: 14px 18px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .nk-modal .row .btn:hover { transform: translateY(-2px); }
        .nk-modal .row .btn-p { box-shadow: 0 10px 22px rgba(22, 163, 74, 0.30); }

        @media (max-width: 480px) {
          .modal.nk-modal { padding: 30px 20px 22px; border-radius: 22px; }
          .nk-modal h3 { font-size: 1.25rem; }
        }
      ` }} />

      <AnimatePresence>
        {open && (
          <motion.div
            className="ov nk-ov"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.form
              onSubmit={submit}
              className="modal nk-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <button type="button" className="nk-x" onClick={onClose} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>

              <div className="nk-icon">+</div>
              <h3>{t("submitTitle")}</h3>

              <label>{t("keyLabel")}
                <input autoFocus value={code} onChange={(e) => { setCode(e.target.value); setErr(""); }} placeholder="NG-xxxxxxxx" maxLength={11} spellCheck={false} />
                <small>{t("keyHint")}</small>
              </label>

              <label>{t("countryLabel")}
                <div className={`sel ${flag ? "has-flag" : ""}`}>
                  {flag && <img src={flag} alt="" width={26} height={18} />}
                  <select value={country} onChange={(e) => { setCountry(e.target.value); setErr(""); }}>
                    <option value="">{t("countryChoose")}</option>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c[lang]}</option>)}
                  </select>
                </div>
              </label>

              <AnimatePresence>
                {err && (
                  <motion.p className="err" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {err}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="row">
                <button type="button" className="btn btn-o" onClick={onClose}>{t("cancel")}</button>
                <button type="submit" className="btn btn-p">{t("submitBtn")}</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}