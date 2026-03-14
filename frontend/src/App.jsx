import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      padding: 24,
    }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        {/* Logo */}
        <div style={{
          width: 72, height: 72, borderRadius: 16,
          background: "linear-gradient(135deg, #238636, #388bfd)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          fontSize: 28, fontWeight: 800, color: "#fff",
        }}>UT</div>

        <h1 style={{ color: "#e6edf3", fontSize: 26, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
          Universal Toolbox
        </h1>

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(210,153,34,0.12)", border: "1px solid rgba(210,153,34,0.3)",
          borderRadius: 20, padding: "6px 14px", marginBottom: 20,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#d29922", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#d29922" }}>Major Update In Progress</span>
        </div>

        <p style={{ color: "#8b949e", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px" }}>
          We're upgrading Universal Toolbox with new features and improvements.
          We'll be back online very soon. Thank you for your patience.
        </p>

        <p style={{ color: "#484f58", fontSize: 13, margin: "0 0 24px" }}>
          658 tools · 54 categories · Coming back better than ever
        </p>

        <a href="mailto:alphariansamuel@gmail.com"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#21262d", border: "1px solid #30363d",
            borderRadius: 8, padding: "10px 20px",
            color: "#c9d1d9", fontSize: 13, fontWeight: 500,
            textDecoration: "none",
          }}>
          ✉️ Contact the developer
        </a>

        <p style={{ color: "#30363d", fontSize: 11, marginTop: 40 }}>
          Built by Samuel Mensah · github.com/alpha-1-design
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
