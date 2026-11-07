"use client";
import { useLang } from "@/lib/i18n";

// Replace this with your real Facebook profile link
const FB_URL = "https://www.facebook.com/profile.php?id=61579932906800";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot nk-foot">
      <style dangerouslySetInnerHTML={{
        __html: `
        .foot.nk-foot {
          position: relative;
          padding: 48px 0 28px;
          text-align: center;
          background: #0f172a;
          color: #cbd5e1;
        }
        /* Gradient line on top of the footer */
        .nk-foot::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f97316, #ea580c, #f97316);
        }
        .nk-foot b {
          display: block;
          margin-bottom: 10px;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 0.3px;
          color: #ffffff;
        }
        .nk-foot p {
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.7;
          font-size: 0.95rem;
          color: #94a3b8;
        }
        .nk-foot .nk-divider {
          width: 100%;
          max-width: 560px;
          height: 1px;
          margin: 28px auto 20px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
        }
        .nk-foot .nk-dev {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
          color: #94a3b8;
        }
        /* Plain text link that still looks clickable */
        .nk-foot .nk-dev a {
          color: #ffffff;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .nk-foot .nk-dev a:hover {
          color: #fb923c;
          text-decoration: none;
        }
      ` }} />

      <div className="wrap">
        <b>{t("brand")}</b>
        <p>{t("footer")}</p>

        <div className="nk-divider" />

        <div className="nk-dev">
          <span>Developed by</span>
          <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Imran Al Farabi on Facebook">
            Imran Al Farabi
          </a>
        </div>
      </div>
    </footer>
  );
}