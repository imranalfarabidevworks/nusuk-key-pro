"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import LangToggle from "./LangToggle";

export default function Navbar({ onSubmit, total }: { onSubmit: () => void; total: number }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll position for the shadow / compact state
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu on desktop resize or Escape key
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const links = [
    { href: "#keys", label: t("navKeys"), badge: total > 0 ? total : null },
    { href: "#how", label: t("navHow"), badge: null },
  ];

  const barStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    height: "3px",
    backgroundColor: "#111827",
    borderRadius: "3px",
    transformOrigin: "center",
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        /* ---------- Mobile first base ---------- */
        .nk-nav-links { display: none; }
        .nk-burger { display: flex; }
        .nk-row { padding: 6px 12px; gap: 8px; }
        .nk-logo {
          height: 58px;
          width: 190px;
          max-width: 46vw;
          min-width: 0;
          flex-shrink: 1;
        }
        .nk-actions { gap: 8px; flex-shrink: 0; }
        .nk-submit-text { display: none; }

        /* Very small phones: submit button lives inside the menu only */
        @media (max-width: 400px) {
          .nk-submit-bar { display: none !important; }
        }
        @media (min-width: 480px) {
          .nk-row { padding: 8px 16px; gap: 12px; }
          .nk-logo { height: 62px; max-width: 220px; }
          .nk-submit-text { display: inline; }
          .nk-actions { gap: 10px; }
        }
        @media (min-width: 768px) {
          .nk-nav-links { display: flex; }
          .nk-burger { display: none !important; }
          .nk-logo { height: 76px; width: 250px; max-width: 250px; }
          .nk-row { padding: 10px 32px; }
        }

        /* ---------- Desktop links ---------- */
        .nk-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 4px;
          color: #374151;
          font-weight: 600;
          font-size: 1.05rem;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .nk-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 2px;
          height: 3px;
          width: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #f97316, #ea580c);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nk-link:hover { color: #111827; }
        .nk-link:hover::after { transform: scaleX(1); }

        .nk-badge {
          font-size: 0.72rem;
          font-weight: 700;
          line-height: 1;
          padding: 4px 8px;
          border-radius: 999px;
          background: #fff7ed;
          color: #c2410c;
          border: 1px solid #fed7aa;
        }

        /* ---------- Submit button in the bar ---------- */
        .nk-submit {
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 44px;
          height: 44px;
          font-weight: 700;
          cursor: pointer;
          padding: 0 14px !important;
          border-radius: 999px !important;
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nk-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 26px rgba(249, 115, 22, 0.35);
        }
        .nk-submit:active { transform: translateY(0) scale(0.97); }
        @media (min-width: 480px) {
          .nk-submit { padding: 0 20px !important; }
        }

        /* ---------- Hamburger ---------- */
        .nk-burger-btn {
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border-radius: 14px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .nk-burger-btn:active { background: #fed7aa; }

        /* ---------- Mobile menu ---------- */
        .nk-menu {
          max-height: calc(100vh - 72px);
          max-height: calc(100dvh - 72px);
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .nk-mlink {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 56px;
          padding: 14px 18px;
          border-radius: 16px;
          background: #f9fafb;
          border: 1px solid #f3f4f6;
          color: #111827;
          font-weight: 700;
          font-size: 1.12rem;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .nk-mlink:active { background: #fff7ed; border-color: #fed7aa; }

        .nk-msubmit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 56px;
          margin-top: 4px;
          padding: 15px 20px;
          border-radius: 16px;
          font-weight: 800;
          font-size: 1.05rem;
          cursor: pointer;
          box-shadow: 0 12px 26px rgba(249, 115, 22, 0.30);
          -webkit-tap-highlight-color: transparent;
        }
      ` }} />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: scrolled ? "rgba(255,255,255,0.94)" : "#ffffff",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.10)" : "0 2px 10px rgba(0,0,0,0.04)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Thin gradient accent line on top */}
        <div
          style={{
            height: "3px",
            width: "100%",
            background: "linear-gradient(90deg, #f97316, #ea580c, #f97316)",
          }}
        />

        <div
          className="nk-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1280px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={() => setMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", textDecoration: "none", minWidth: 0, flexShrink: 1 }}
          >
            <motion.div
              className="nk-logo"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/logo.png"
                alt="NusukKey Pro Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left center" }}
              />
            </motion.div>
          </a>

          {/* Desktop links */}
          <nav className="nk-nav-links" style={{ gap: "36px", alignItems: "center" }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nk-link">
                {l.label}
                {l.badge !== null && <span className="nk-badge">{l.badge}</span>}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="nk-actions" style={{ display: "flex", alignItems: "center" }}>
            <LangToggle />

            <button className="btn btn-p btn-sm nk-submit nk-submit-bar" onClick={onSubmit} aria-label={t("navSubmit")}>
              <span style={{ fontSize: "1.35rem", lineHeight: 1 }}>+</span>
              <span className="nk-submit-text">{t("navSubmit")}</span>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              className="nk-burger nk-burger-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle Menu"
              aria-expanded={menuOpen}
            >
              <span style={{ position: "relative", width: "24px", height: "18px", display: "block" }}>
                <motion.span
                  style={{ ...barStyle, position: "absolute", left: 0, top: 0 }}
                  animate={menuOpen ? { y: 7.5, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  style={{ ...barStyle, position: "absolute", left: 0, top: "7.5px" }}
                  animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  style={{ ...barStyle, position: "absolute", left: 0, top: "15px" }}
                  animate={menuOpen ? { y: -7.5, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="nk-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{
                backgroundColor: "#ffffff",
                borderTop: "1px solid #f3f4f6",
                boxShadow: "0 20px 30px rgba(0,0,0,0.08)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", padding: "16px 14px calc(20px + env(safe-area-inset-bottom))", gap: "10px" }}>
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className="nk-mlink"
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.07 * (i + 1), duration: 0.3 }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                      {l.label}
                      {l.badge !== null && <span className="nk-badge">{l.badge}</span>}
                    </span>
                    <span style={{ color: "#9ca3af", fontSize: "1.4rem" }}>›</span>
                  </motion.a>
                ))}

                <motion.button
                  className="btn btn-p nk-msubmit"
                  onClick={() => {
                    setMenuOpen(false);
                    onSubmit();
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>+</span>
                  <span>{t("navSubmit")}</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Dim overlay behind the mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(17, 24, 39, 0.45)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}