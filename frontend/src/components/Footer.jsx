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
            className="btn btn-ghost" style={{ fontSize: 11, padding: "3px 8px" }}>
            🐙 GitHub
          </a>
          <a href="mailto:alphariansamuel@gmail.com"
            className="btn btn-ghost" style={{ fontSize: 11, padding: "3px 8px" }}>
            ✉️ Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
