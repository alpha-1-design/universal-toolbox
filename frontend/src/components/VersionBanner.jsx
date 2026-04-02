import React, { useState, useEffect, useRef } from "react";

const VERSION = "2.1.0";
const VERSION_KEY = "utb_version";
const LAST_VISIT_KEY = "utb_last_visit";

export default function VersionBanner() {
  const [status, setStatus] = useState(null); // null | "first" | "welcome" | "updated"
  const timeoutRef = useRef(null);

  useEffect(() => {
    const savedVersion = localStorage.getItem(VERSION_KEY);
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();

    if (!savedVersion) {
      localStorage.setItem(VERSION_KEY, VERSION);
      setStatus("first");
    } else if (savedVersion !== VERSION) {
      localStorage.setItem(VERSION_KEY, VERSION);
      setStatus("updated");
    } else if (lastVisit) {
      const hoursSince = (now - parseInt(lastVisit)) / (1000 * 60 * 60);
      if (hoursSince >= 1) {
        setStatus("welcome");
      }
    }

    localStorage.setItem(LAST_VISIT_KEY, now.toString());

    const handleSWUpdate = () => setStatus("updated");
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", e => {
        if (e.data?.type === "SW_UPDATED") handleSWUpdate();
      });
    }

    timeoutRef.current = setTimeout(() => setStatus(null), 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!status) return null;

  const configs = {
    first: { text: "Welcome to Universal Toolbox!", bg: "var(--primary)", color: "#fff" },
    welcome: { text: "Welcome back!", bg: "var(--bg2)", color: "var(--text)" },
    updated: { text: `Updated to v${VERSION}`, bg: "var(--green)", color: "#fff" },
  };

  const { text, bg, color } = configs[status];

  return (
    <div style={{
      position: "fixed", top: 60, left: "50%", transform: "translateX(-50%)",
      zIndex: 9999, display: "flex", alignItems: "center", gap: 10,
      background: bg, color, border: "1px solid var(--border)",
      borderRadius: 50, padding: "8px 18px",
      boxShadow: "var(--shadow-lg)", fontSize: 13, fontWeight: 500,
      whiteSpace: "nowrap",
      animation: "slideDown 0.3s ease",
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {status === "updated" ? (
          <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/>
        ) : (
          <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>
        )}
      </svg>
      <span>{text}</span>
    </div>
  );
}
