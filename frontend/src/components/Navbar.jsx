import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { setSidebarOpen, sidebarOpen, tools, dark, setDark } = useApp();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) { setResults([]); return; }
    setResults(
      tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.includes(q)) ||
        t.category.toLowerCase().includes(q)
      ).slice(0, 8)
    );
  }, [query, tools]);

  useEffect(() => {
    const h = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); inputRef.current?.focus(); setOpen(true); }
      if (e.key === "Escape") { setOpen(false); setQuery(""); inputRef.current?.blur(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    const h = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const select = tool => { setQuery(""); setResults([]); setOpen(false); navigate(`/tool/${tool.id}`); };

  return (
    <header style={{
      height: 52, background: "var(--nav)", borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", padding: "0 12px", gap: 10,
      position: "sticky", top: 0, zIndex: 30, flexShrink: 0,
    }}>
      {/* Toggle */}
      <button className="btn btn-ghost" style={{ padding: "6px 8px", flexShrink: 0 }}
        onClick={() => setSidebarOpen(p => !p)} title="Toggle sidebar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/>
        </svg>
      </button>

      {/* Logo when sidebar collapsed */}
      {!sidebarOpen && (
        <span onClick={() => navigate("/")} style={{ fontWeight: 800, fontSize: 14, color: "var(--text)", cursor: "pointer", whiteSpace: "nowrap", userSelect: "none" }}>
          Toolbox
        </span>
      )}

      {/* Search */}
      <div ref={wrapRef} style={{ position: "relative", flex: 1, maxWidth: 500 }}>
        <div style={{ position: "relative" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
            style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", pointerEvents: "none" }}>
            <circle cx="7" cy="7" r="5"/><line x1="12" y1="12" x2="14.5" y2="14.5"/>
          </svg>
          <input ref={inputRef} className="input" value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder="Search 700+ tools…"
            style={{ paddingLeft: 32, paddingRight: 52 }}
          />
          {query ? (
            <button onClick={() => { setQuery(""); setResults([]); }}
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)", padding: 2, fontSize: 16, lineHeight: 1 }}>×</button>
          ) : (
            <kbd style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 10, background: "var(--bg3)", border: "1px solid var(--border)", color: "var(--text3)", padding: "1px 5px", borderRadius: 4, fontFamily: "inherit" }}>⌘K</kbd>
          )}
        </div>

        {open && results.length > 0 && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
            background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10,
            overflow: "hidden", boxShadow: "var(--shadow-lg)", zIndex: 999,
          }}>
            {results.map((tool, i) => (
              <div key={tool.id} onMouseDown={() => select(tool)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 14px",
                  cursor: "pointer", borderBottom: i < results.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div className="tool-avatar" style={{ width: 30, height: 30, fontSize: 11, background: tool.color + "22", color: tool.color, borderRadius: 6 }}>
                  {tool.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{tool.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tool.desc}</div>
                </div>
                <span className="tag tag-blue" style={{ fontSize: 10, flexShrink: 0 }}>{tool.category}</span>
              </div>
            ))}
            <div style={{ padding: "8px 14px", borderTop: "1px solid var(--border)", fontSize: 11, color: "var(--text3)" }}>
              {results.length} results · Press Enter to see all
            </div>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", flexShrink: 0 }}>
        <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }}
          onClick={() => { const r = tools[Math.floor(Math.random() * tools.length)]; navigate(`/tool/${r.id}`); }}
          title="Random tool">
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>
            </svg>
            Surprise
          </span>
        </button>
        {/* Dark mode toggle */}
        <button className="btn btn-ghost" style={{ padding: "6px 8px" }}
          onClick={() => setDark(p => !p)} title={dark ? "Light mode" : "Dark mode"}>
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <button className="btn btn-ghost" style={{ padding: "6px 8px" }}
          onClick={() => navigate("/bookmarks")} title="Bookmarks">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2h10a.5.5 0 0 1 .5.5v11.5l-5-3-5 3V2.5A.5.5 0 0 1 3 2z"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
