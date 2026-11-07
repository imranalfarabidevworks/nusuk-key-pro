"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

// Official Nusuk link
const NUSUK_URL = "https://services.nusuk.sa/nusuk-svc/app";

export default function HowItWorks() {
  const { t, lang } = useLang();
  const steps = [
    ["how1t", "how1d"],
    ["how2t", "how2d"],
    ["how3t", "how3d"],
  ] as const;

  // Button texts (local, so no change needed in the i18n file)
  const nusukHint = lang === "bn" ? "চাবি কপি করার পর অফিসিয়াল নুসুক সাইটে গিয়ে ব্যবহার করুন" : "After copying a key, continue on the official Nusuk site";
  const nusukBtn = lang === "bn" ? "নুসুক ওয়েবসাইটে যান" : "Go to Nusuk";

  return (
    <section id="how" className="sec how nk-how">
      <style dangerouslySetInnerHTML={{
        __html: `
        .nk-how {
          position: relative;
          padding-top: 72px;
          padding-bottom: 88px;
          scroll-margin-top: 110px;
          background: linear-gradient(180deg, #f8fafc 0%, #fff7ed 100%);
          overflow: hidden;
        }
        /* Soft decorative blobs */
        .nk-how::before,
        .nk-how::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
          pointer-events: none;
        }
        .nk-how::before { width: 320px; height: 320px; top: -90px; left: -90px; background: #fdba74; }
        .nk-how::after { width: 320px; height: 320px; bottom: -100px; right: -90px; background: #fdba74; }

        .nk-how .wrap { position: relative; z-index: 1; }

        .nk-how h2 {
          margin: 0 0 14px;
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.2;
          color: #111827;
        }
        .nk-how .nk-bar {
          width: 70px;
          height: 5px;
          margin: 0 auto 48px;
          border-radius: 5px;
          background: linear-gradient(90deg, #f97316, #ea580c);
        }

        .nk-how .steps {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        /* Connector line behind the step numbers (desktop only) */
        .nk-how .steps::before {
          content: "";
          position: absolute;
          top: 58px;
          left: 16%;
          right: 16%;
          height: 3px;
          border-radius: 3px;
          background: repeating-linear-gradient(90deg, #fdba74 0 10px, transparent 10px 20px);
          z-index: 0;
        }

        .nk-how .step {
          position: relative;
          z-index: 1;
          padding: 30px 24px 28px;
          text-align: center;
          border-radius: 24px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .nk-how .step:hover {
          transform: translateY(-6px);
          border-color: #fed7aa;
          box-shadow: 0 22px 44px rgba(17, 24, 39, 0.12);
        }
        .nk-how .sn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #ffffff;
          font-size: 1.4rem;
          font-weight: 800;
          box-shadow: 0 10px 22px rgba(249, 115, 22, 0.32), 0 0 0 6px #ffffff;
        }
        .nk-how .step h4 {
          margin: 0 0 10px;
          font-size: 1.2rem;
          font-weight: 800;
          color: #111827;
        }
        .nk-how .step p {
          margin: 0;
          line-height: 1.7;
          font-size: 0.97rem;
          color: #6b7280;
        }

        /* Nusuk call-to-action card */
        .nk-how .nk-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 620px;
          margin: 52px auto 0;
          padding: 28px 24px;
          text-align: center;
          border-radius: 24px;
          background: #0f172a;
          box-shadow: 0 22px 50px rgba(15, 23, 42, 0.30);
        }
        .nk-how .nk-cta p {
          margin: 0;
          line-height: 1.6;
          font-size: 1rem;
          font-weight: 600;
          color: #cbd5e1;
        }
        .nk-how .nk-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 999px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #ffffff;
          font-size: 1.05rem;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 12px 26px rgba(249, 115, 22, 0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .nk-how .nk-link-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 34px rgba(249, 115, 22, 0.45);
        }
        .nk-how .nk-link-btn:active { transform: translateY(0) scale(0.98); }
        .nk-how .nk-link-btn svg { transition: transform 0.25s ease; }
        .nk-how .nk-link-btn:hover svg { transform: translateX(4px); }

        @media (max-width: 800px) {
          .nk-how { padding-top: 52px; padding-bottom: 64px; scroll-margin-top: 90px; }
          .nk-how h2 { font-size: 1.6rem; }
          .nk-how .steps { grid-template-columns: 1fr; gap: 20px; }
          .nk-how .steps::before { display: none; }
          .nk-how .nk-link-btn { width: 100%; justify-content: center; }
        }
      ` }} />

      <div className="wrap">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {t("howTitle")}
        </motion.h2>
        <div className="nk-bar" />

        <div className="steps">
          {steps.map(([a, b], i) => (
            <motion.div
              key={a}
              className="step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="sn">{i + 1}</span>
              <h4>{t(a)}</h4>
              <p>{t(b)}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Nusuk link */}
        <motion.div
          className="nk-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p>{nusukHint}</p>
          <a href={NUSUK_URL} target="_blank" rel="noopener noreferrer" className="nk-link-btn">
            {nusukBtn}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}