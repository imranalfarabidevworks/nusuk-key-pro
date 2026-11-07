"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COUNTRIES, flagUrl } from "@/lib/countries";
import { TKey, useLang } from "@/lib/i18n";
import type { AddError } from "@/lib/useKeys";

type Props = { open: boolean; onClose: () => void; addKey: (c: string, country: string) => Promise<AddError | null>; onDone: () => void };

const ERR: Record<AddError, TKey> = { format: "errFormat", dup: "errDup", country: "errCountry", rate: "errRate", server: "errServer" };

export default function SubmitModal({ open, onClose, addKey, onDone }: Props) {
  const { t, lang } = useLang();
  const [code, setCode] = useState("");
  const [country, setCountry] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    const f = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!country) return setErr(t("errCountry"));
    setBusy(true);
    const r = await addKey(code, country);
    setBusy(false);
    if (r) return setErr(t(ERR[r]));
    setCode(""); setErr(""); onDone(); onClose();
  };

  const flag = flagUrl(country);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.form onSubmit={submit} className="modal" onClick={(e) => e.stopPropagation()} initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 28 }}>
            <h3>{t("submitTitle")}</h3>
            <label>{t("keyLabel")}
              <input autoFocus value={code} onChange={(e) => { setCode(e.target.value); setErr(""); }} placeholder="NG-xxxxxxxx" maxLength={11} spellCheck={false} />
              <small>{t("keyHint")}</small>
            </label>
            <label>{t("countryLabel")}
              <div className="sel">
                {flag && <img src={flag} alt="" width={26} height={18} />}
                <select value={country} onChange={(e) => { setCountry(e.target.value); setErr(""); }}>
                  <option value="">{t("countryChoose")}</option>
                  {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c[lang]}</option>)}
                </select>
              </div>
            </label>
            <small className="perm">{t("permanent")}</small>
            <AnimatePresence>{err && <motion.p className="err" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{err}</motion.p>}</AnimatePresence>
            <div className="row">
              <button type="button" className="btn btn-o" onClick={onClose}>{t("cancel")}</button>
              <button type="submit" className="btn btn-p" disabled={busy}>{busy ? "…" : t("submitBtn")}</button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}