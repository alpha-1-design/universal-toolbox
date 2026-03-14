import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

const NAV = [
  { to: "/",         label: "Home",     icon: "🏠", exact: true },
  { to: "/featured", label: "Featured", icon: "⭐" },
  { to: "/browse",   label: "Browse All",icon: "🔍" },
  { to: "/bookmarks",label: "Bookmarks",icon: "🔖" },
  { to: "/about",    label: "About Dev", icon: "👤" },
  { to: "/faq",      label: "FAQ",       icon: "❓" },
];

export default function Sidebar() {
  const { sidebarOpen, categories, tools, collections, addCollection, removeCollection } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAllCats, setShowAllCats] = useState(false);
  const collapsed = !sidebarOpen;

  const visible = showAllCats ? categories : categories.slice(0, 15);

  return (
    <motion.aside
      animate={{ width: collapsed ? 0 : 240 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 40,
        background: "var(--sidebar)", borderRight: collapsed ? "none" : "1px solid var(--border)",
        overflow: "hidden", display: "flex", flexDirection: "column", flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: "14px 14px 12px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: "linear-gradient(135deg,#238636,#388bfd)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 12, color: "#fff", fontFamily: "inherit",
          }}>UT</div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontWeight: 800, fontSize: 13, color: "var(--text)", whiteSpace: "nowrap" }}>Universal Toolbox</div>
            <div style={{ fontSize: 10, color: "var(--text3)", whiteSpace: "nowrap" }}>Every tool you'll ever need</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "8px 8px 0" }}>
        {/* Nav links */}
        <div style={{ marginBottom: 4 }}>
          {NAV.map(item => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <button key={item.to} onClick={() => navigate(item.to)}
                className={`nav-link${active ? " active" : ""}`}>
                <span style={{ fontSize: 14, flexShrink: 0, width: 18, textAlign: "center" }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <hr className="divider" style={{ margin: "6px 4px" }} />

        {/* Categories */}
        <div style={{ padding: "6px 10px 4px" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Categories</span>
        </div>
        {visible.map(cat => {
          const count = tools.filter(t => t.category === cat.id).length;
          const active = location.pathname === `/category/${cat.id}`;
          return (
            <button key={cat.id} onClick={() => navigate(`/category/${cat.id}`)}
              className={`nav-link${active ? " active" : ""}`} style={{ gap: 9 }}>
              <span style={{ fontSize: 13, flexShrink: 0, width: 18, textAlign: "center" }}>{cat.emoji}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis" }}>{cat.name}</span>
              <span style={{ fontSize: 10, color: "var(--text3)", flexShrink: 0 }}>{count}</span>
            </button>
          );
        })}
        {categories.length > 15 && (
          <button onClick={() => setShowAllCats(p => !p)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", fontSize: 12, padding: "4px 10px", fontFamily: "inherit", width: "100%", textAlign: "left" }}>
            {showAllCats ? "↑ Show less" : `↓ ${categories.length - 15} more categories`}
          </button>
        )}

        <hr className="divider" style={{ margin: "6px 4px" }} />

        {/* Collections */}
        <div style={{ padding: "6px 10px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Collections</span>
          <button onClick={() => { const n = prompt("Collection name:"); if (n?.trim()) addCollection(n.trim()); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: 16, lineHeight: 1, padding: 2 }} title="New collection">+</button>
        </div>
        {collections.length === 0
          ? <p style={{ fontSize: 11, color: "var(--text3)", padding: "2px 10px 8px" }}>No collections yet</p>
          : collections.map(col => (
            <div key={col.id} className="nav-link" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                <span style={{ fontSize: 13 }}>📁</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{col.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                <span style={{ fontSize: 10, color: "var(--text3)" }}>{col.toolIds.length}</span>
                <button onClick={e => { e.stopPropagation(); if (confirm(`Delete "${col.name}"?`)) removeCollection(col.id); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: 14, lineHeight: 1, padding: 1 }}>×</button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Footer */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ fontSize: 10, color: "var(--text3)" }}>v2.0 · {tools.length} tools</div>
      </div>
    </motion.aside>
  );
}
