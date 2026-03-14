import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

export default function IframePanel() {
  const { panelUrl, panelName, closePanel } = useApp();
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
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", flexShrink: 0 }} />
            <span style={{ fontWeight: 700, fontSize: 13, color: "var(--text)", flex: 1 }}>{panelName}</span>
            <a href={panelUrl} target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary" style={{ fontSize: 12 }} onClick={e => e.stopPropagation()}>
              Full page ↗
            </a>
            <button className="btn btn-ghost" style={{ padding: "5px 8px" }} onClick={closePanel}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
              </svg>
            </button>
          </div>
          {/* iframe */}
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <iframe src={panelUrl} title={panelName}
              style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
          </div>
          <div style={{ padding: "6px 14px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "var(--text3)" }}>Some sites block iframes · Use "Full page" if blank</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
