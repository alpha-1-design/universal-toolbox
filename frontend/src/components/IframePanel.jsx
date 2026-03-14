import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

// Known sites that block iframes
const BLOCKED_SITES = [
  "figma.com", "notion.so", "google.com", "youtube.com",
  "github.com", "twitter.com", "x.com", "instagram.com",
  "facebook.com", "linkedin.com", "canva.com", "shopify.com",
  "slack.com", "discord.com", "zoom.us", "trello.com",
  "atlassian.com", "jira", "dropbox.com", "paypal.com",
  "stripe.com", "amazon.com", "netflix.com", "spotify.com",
  "whatsapp.com", "telegram.org", "reddit.com", "pinterest.com",
];

function isBlocked(url) {
  try {
    const host = new URL(url).hostname;
    return BLOCKED_SITES.some(site => host.includes(site));
  } catch { return false; }
}

export default function IframePanel() {
  const { panelUrl, panelName, closePanel } = useApp();
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef(null);

  // Reset state when URL changes
  React.useEffect(() => {
    if (panelUrl) {
      setLoading(true);
      setBlocked(isBlocked(panelUrl));
    }
  }, [panelUrl]);

  return (
    <AnimatePresence>
      {panelUrl && (
        <motion.div
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          style={{
            position: "fixed", right: 0, top: 0, bottom: 0,
            width: "clamp(320px, 50vw, 680px)",
            background: "var(--bg)", borderLeft: "1px solid var(--border)",
            display: "flex", flexDirection: "column", zIndex: 50,
          }}>

          {/* Header */}
          <div style={{ height: 52, padding: "0 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: blocked ? "var(--red)" : "var(--green)", flexShrink: 0 }} />
            <span style={{ fontWeight: 700, fontSize: 13, color: "var(--text)", flex: 1 }}>{panelName}</span>
            <a href={panelUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" style={{ fontSize: 12 }}>
              Open Full Page ↗
            </a>
            <button className="btn btn-ghost" style={{ padding: "5px 8px" }} onClick={closePanel}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
              </svg>
            </button>
          </div>

          {/* Blocked warning banner */}
          {blocked && (
            <div style={{
              padding: "10px 16px", flexShrink: 0,
              background: "rgba(248,81,73,0.08)",
              borderBottom: "1px solid rgba(248,81,73,0.2)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--red)" }}>
                  This site blocks embedding
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>
                  Use "Open Full Page" to launch it in a new tab
                </div>
              </div>
              <a href={panelUrl} target="_blank" rel="noopener noreferrer"
                className="btn btn-danger" style={{ fontSize: 11, flexShrink: 0 }}>
                Open ↗
              </a>
            </div>
          )}

          {/* iframe or blocked state */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            {blocked ? (
              <div style={{
                height: "100%", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 16,
                padding: 24, textAlign: "center",
              }}>
                <div style={{ fontSize: 48 }}>🚫</div>
                <div>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, color: "var(--text)", fontSize: 15 }}>
                    {panelName} can't be previewed here
                  </p>
                  <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--text3)", lineHeight: 1.6 }}>
                    This site has security settings that prevent it from being embedded. This is normal for sites like Figma, GitHub, Notion, and Google.
                  </p>
                  <a href={panelUrl} target="_blank" rel="noopener noreferrer"
                    className="btn btn-primary" style={{ fontSize: 13 }}>
                    Open {panelName} in new tab ↗
                  </a>
                </div>
              </div>
            ) : (
              <>
                {loading && (
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "var(--bg)", zIndex: 1,
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 24, marginBottom: 8, animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</div>
                      <p style={{ fontSize: 12, color: "var(--text3)", margin: 0 }}>Loading {panelName}…</p>
                    </div>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={panelUrl}
                  title={panelName}
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  onLoad={() => setLoading(false)}
                  onError={() => { setLoading(false); setBlocked(true); }}
                />
              </>
            )}
          </div>

          {/* Footer */}
          {!blocked && (
            <div style={{ padding: "6px 14px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: "var(--text3)" }}>
                If the page appears blank, the site may block embedding · Use "Open Full Page"
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
