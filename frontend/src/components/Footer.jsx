import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      background: "var(--bg2)",
      padding: "20px 24px",
      marginTop: "auto",
    }}>
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "flex", flexWrap: "wrap",
        alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: "linear-gradient(135deg,#238636,#388bfd)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 800, color: "#fff",
          }}>UT</div>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>
            Universal Toolbox · Built by{" "}
            <a href="https://github.com/alpha-1-design" target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none" }}>Samuel Mensah</a>
          </span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[
            { label: "Updates", path: "/whats-new" },
            { label: "About",   path: "/about" },
            { label: "FAQ",     path: "/faq" },
            { label: "Privacy", path: "/privacy" },
          ].map(link => (
            <button key={link.path} onClick={() => navigate(link.path)}
              className="btn btn-ghost" style={{ fontSize: 11, padding: "3px 8px" }}>
              {link.label}
            </button>
          ))}
          <a href="https://github.com/alpha-1-design" target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost" style={{ fontSize: 11, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a href="mailto:alphariansamuel@gmail.com"
            className="btn btn-ghost" style={{ fontSize: 11, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
