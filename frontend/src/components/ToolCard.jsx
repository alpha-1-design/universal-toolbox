import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ToolCard({ tool }) {
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked, openPanel } = useApp();
  const bm = isBookmarked(tool.id);

  return (
    <div className="card card-hover" onClick={() => navigate(`/tool/${tool.id}`)}
      style={{ padding: 16, display: "flex", flexDirection: "column", gap: 11 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div className="tool-avatar" style={{ background: tool.color + "22", color: tool.color, border: `1px solid ${tool.color}30` }}>
            {tool.name[0]}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tool.name}</div>
            <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 1 }}>{tool.category}</div>
          </div>
        </div>
        <button onClick={e => { e.stopPropagation(); toggleBookmark(tool.id); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "3px 4px", color: bm ? "#f0883e" : "var(--text3)", flexShrink: 0, borderRadius: 4, transition: "color 0.15s" }}
          title={bm ? "Remove bookmark" : "Bookmark"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={bm ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>

      {/* Desc */}
      <p style={{ fontSize: 12, color: "var(--text2)", margin: 0, lineHeight: 1.6,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {tool.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {tool.tags.slice(0, 2).map(tag => <span key={tag} className="tag">{tag}</span>)}
        {tool.free ? <span className="tag tag-green">Free</span> : <span className="tag tag-orange">Paid</span>}
        {tool.featured && <span className="tag tag-blue">Featured</span>}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid var(--border)", marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#d29922" stroke="#d29922" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{tool.rating}</span>
          <span style={{ fontSize: 11, color: "var(--text3)" }}>({(tool.reviews / 1000).toFixed(0)}k)</span>
        </div>
        <button className="btn btn-secondary" style={{ fontSize: 11, padding: "4px 10px" }}
          onClick={e => { e.stopPropagation(); openPanel(tool.url, tool.name); }}>
          Open
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
