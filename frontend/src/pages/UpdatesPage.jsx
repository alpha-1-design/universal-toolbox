import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CURRENT_VERSION = "2.1";
const TOTAL_TOOLS = 840;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  {
    version: "2.1",
    date: "2026-04-24",
    new: [
      "Added 4 new categories: Automation, No-Code Tools, Browser Extensions, and Productivity Templates",
      "Added 40 new tools across the new categories",
      "New Updates page to track what's new in Universal Toolbox",
      "New keyboard shortcut: Cmd/Ctrl + K for quick search from anywhere",
    ],
  },
  {
    version: "2.0",
    date: "2026-01-15",
    new: [
      "Complete redesign with dark/light mode",
      "Added 50+ new categories",
      "Collections feature - organize tools into custom folders",
      "PWA support - install as a native app",
      "Side panel for inline tool previews",
    ],
  },
  {
    version: "1.5",
    date: "2025-10-01",
    new: [
      "Added AI & Machine Learning category",
      "Added 100+ new AI tools",
      "New bookmark system with localStorage sync",
      "Mobile-optimized navigation",
    ],
  },
  {
    version: "1.0",
    date: "2025-06-01",
    new: [
      "Initial release",
      "600+ tools across 50+ categories",
      "Search and filtering",
      "Basic bookmarks",
    ],
  },
];

const CURRENT_VERSION = "2.1";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function UpdatesPage() {
  const navigate = useNavigate();
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const lastOpened = localStorage.getItem("utb_updates_last_opened");
    const now = Date.now();
    if (!lastOpened) {
      localStorage.setItem("utb_updates_last_opened", now);
      setHasNew(true);
    } else {
      const opened = parseInt(lastOpened);
      if (now - opened < SEVEN_DAYS_MS) {
        setHasNew(true);
      }
      localStorage.setItem("utb_updates_last_opened", now);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      style={{ maxWidth: 700, margin: "0 auto", padding: "28px 24px 80px" }}>

      <button className="btn btn-ghost" style={{ marginBottom: 20, fontSize: 12, padding: "4px 8px" }}
        onClick={() => navigate(-1)}>← Back</button>

      {hasNew && (
        <div style={{
          marginBottom: 20, padding: "10px 14px", borderRadius: 8,
          background: "var(--accent)", background: "rgba(56, 139, 253, 0.12)",
          border: "1px solid rgba(56, 139, 253, 0.3)",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>
            ✨ New updates available
          </span>
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>
          What's New
        </h1>
        <p style={{ margin: 0, fontSize: 13, color: "var(--text3)" }}>
          Current version: {CURRENT_VERSION}
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {UPDATES.map((update, i) => (
          <div key={update.version} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: 14, fontWeight: 800, color: "var(--text)",
                  background: "var(--accent)", WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>v{update.version}</span>
                {i === 0 && (
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4,
                    background: "var(--accent)", color: "#fff",
                  }}>LATEST</span>
                )}
              </div>
              <span style={{ fontSize: 12, color: "var(--text3)" }}>
                {update.date}
              </span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
              {update.new.map((item, j) => (
                <li key={j} style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: 20, borderRadius: 12, background: "var(--bg2)", textAlign: "center" }}>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>
          Have a suggestion or found a bug?
        </p>
        <a href="mailto:alphariansamuel@gmail.com" className="btn btn-primary" style={{ fontSize: 12 }}>
          Send Feedback
        </a>
      </div>

    </motion.div>
  );
}

export { CURRENT_VERSION, TOTAL_TOOLS, SEVEN_DAYS_MS };

// ── POPUP COMPONENT ─────────────────────────────────────────────────
export function UpdatesPopup({ onClose }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClick = () => {
    localStorage.setItem("utb_tool_count", TOTAL_TOOLS);
    navigate("/whats-new");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          padding: "16px 20px", paddingBottom: "max(16px, env(safe-area-inset-bottom))",
          background: "var(--bg)", borderTop: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: 12, zIndex: 9999,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
            ✨ New tools available
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text2)" }}>
            Check them out in Updates
          </p>
        </div>
        <button
          onClick={handleClick}
          className="btn btn-primary"
          style={{ fontSize: 13, padding: "8px 16px", whiteSpace: "nowrap" }}
        >
          Updates
        </button>
        <button
          onClick={() => { setVisible(false); localStorage.setItem("utb_tool_count", TOTAL_TOOLS); onClose(); }}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 4, color: "var(--text3)", fontSize: 18,
          }}
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}