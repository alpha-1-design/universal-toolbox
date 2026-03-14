import React, { useState, useEffect } from "react";

const VERSION = "2.1.0";
const VERSION_KEY = "utb_version";

export default function VersionBanner() {
  const [status, setStatus] = useState(null); // "latest" | "updated" | "outdated"

  useEffect(() => {
    const saved = localStorage.getItem(VERSION_KEY);

    if (!saved) {
      // First visit
      localStorage.setItem(VERSION_KEY, VERSION);
      setStatus("latest");
    } else if (saved !== VERSION) {
      // New version detected
      localStorage.setItem(VERSION_KEY, VERSION);
      setStatus("updated");
    } else {
      setStatus("latest");
    }

    // Listen for SW update message
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", e => {
        if (e.data?.type === "SW_UPDATED") {
          setStatus("updated");
        }
      });
    }

    // Auto-hide after 3 seconds
    const t = setTimeout(() => setStatus(null), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!status) return null;

  const isUpdated = status === "updated";

  return (
    <div style={{
      position: "fixed", top: 60, left: "50%", transform: "translateX(-50%)",
      zIndex: 9999, display: "flex", alignItems: "center", gap: 10,
      background: isUpdated ? "var(--green)" : "var(--bg2)",
      color: isUpdated ? "#fff" : "var(--text)",
      border: `1px solid ${isUpdated ? "var(--green)" : "var(--border)"}`,
      borderRadius: 50, padding: "8px 18px",
      boxShadow: "var(--shadow-lg)", fontSize: 13, fontWeight: 500,
      whiteSpace: "nowrap",
      animation: "slideDown 0.3s ease",
    }}>
      <span>{isUpdated ? "✅" : "✓"}</span>
      <span>{isUpdated ? `Updated to v${VERSION}` : `You're on the latest version (v${VERSION})`}</span>
    </div>
  );
}
