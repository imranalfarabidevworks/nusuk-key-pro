"use client";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

const HERO_IMAGES = [
  "/fonts/h1.png",
  "/fonts/h2.png",
  "/fonts/h3.png",
  "/fonts/h4.png",
];

function Counter({ to }: { to: number }) {
  const v = useMotionValue(0);
  const r = useTransform(v, (x) => Math.round(x).toLocaleString());
  useEffect(() => {
    const c = animate(v, to, { duration: 1.4, ease: "easeOut" });
    return c.stop;
  }, [to, v]);
  return <motion.span>{r}</motion.span>;
}

export default function Hero({ total, copied, onSubmit }: { total: number; copied: number; onSubmit: () => void }) {
  const { t } = useLang();
  const pct = total ? Math.min(100, (copied / total) * 100) : 0;

  const [currentBg, setCurrentBg] = useState(0);

  // Auto-rotate the background slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="hero nk-hero"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <style>{`
        /* Push content below the fixed navbar */
        .nk-hero { padding-top: 150px; padding-bottom: 80px; }
        @media (min-width: 768px) {
          .nk-hero { padding-top: 210px; padding-bottom: 110px; }
        }

        .nk-hero .hero-in { text-align: center; }
        .nk-hero .hero-in .cta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-top: 28px;
        }
        .nk-hero .hero-in .lead {
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }
        .nk-hero .hero-in h1 {
          line-height: 1.15;
          letter-spacing: -0.5px;
          margin-top: 22px;
        }

        /* Glass style stat cards */
        .nk-hero .stats {
          margin-top: 48px;
          padding: 22px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.10);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.30);
        }
        .nk-hero .stats .num { color: #ffffff; text-shadow: 0 2px 8px rgba(0,0,0,0.4); }
        .nk-hero .stats .lbl { color: rgba(255, 255, 255, 0.85); }
        .nk-hero .stats .prog-t { color: rgba(255, 255, 255, 0.9); }

        .nk-hero .btn { padding: 14px 28px; border-radius: 999px; font-weight: 700; }
        .nk-hero .btn-o {
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(6px);
        }
        .nk-hero .btn-o:hover { background: rgba(255, 255, 255, 0.2); }

        .nk-dot {
          height: 8px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.4s ease;
        }
      `}</style>

      {/* Background image slider layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentBg === index ? 1 : 0,
              transform: currentBg === index ? "scale(1.06)" : "scale(1)",
              transition: "opacity 1.2s ease-in-out, transform 6s ease-out",
            }}
          />
        ))}
        {/* Dark gradient overlay so the text stays readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.70) 100%)",
          }}
        />
      </div>

      <div className="blob b1" />
      <div className="blob b2" />

      {/* Content layer */}
      <div className="wrap hero-in" style={{ position: "relative", zIndex: 1 }}>
        <motion.span
          className="badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          ✦ {t("heroBadge")}
        </motion.span>

        {/* Title: orange with soft shadow */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            color: "#f97316",
            textShadow: "0 3px 14px rgba(0,0,0,0.65)",
          }}
        >
          {t("heroTitle")}
        </motion.h1>

        {/* Subtitle: white with shadow */}
        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            color: "#ffffff",
            textShadow: "0 1px 8px rgba(0,0,0,0.65)",
          }}
        >
          {t("heroSub")}
        </motion.p>

        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a href="#keys" className="btn btn-p">{t("ctaBrowse")}</a>
          <button className="btn btn-o" onClick={onSubmit}>{t("ctaSubmit")}</button>
        </motion.div>

        <motion.div
          className="stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          <div className="stat"><span className="num"><Counter to={total} /></span><span className="lbl">{t("total")}</span></div>
          <div className="stat"><span className="num"><Counter to={Math.max(0, total - copied)} /></span><span className="lbl">{t("available")}</span></div>
          <div className="stat"><span className="num"><Counter to={copied} /></span><span className="lbl">{t("copied")}</span></div>
          <div className="prog">
            <div className="prog-t"><span>{t("progress")}</span><span>{copied} / {total.toLocaleString()}</span></div>
            <div className="bar"><motion.i initial={{ width: 0 }} animate={{ width: `${Math.max(pct, copied ? 2 : 0)}%` }} transition={{ duration: 0.8 }} /></div>
          </div>
        </motion.div>

        {/* Slider dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
          {HERO_IMAGES.map((img, i) => (
            <button
              key={img}
              className="nk-dot"
              onClick={() => setCurrentBg(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: currentBg === i ? "28px" : "8px",
                background: currentBg === i ? "#f97316" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}