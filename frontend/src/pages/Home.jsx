import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import ToolCard from "../components/ToolCard";
import CategoryIcon from "../components/CategoryIcon";

function SectionHeader({ title, sub, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>{title}</h2>
        {sub && <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--text3)" }}>{sub}</p>}
      </div>
      {action && (
        <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={onAction}>{action} →</button>
      )}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { tools, categories } = useApp();
  const [query, setQuery] = useState("");

  const featured = useMemo(() => tools.filter(t => t.featured), [tools]);
  const searched = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q)) || t.category.toLowerCase().includes(q)
    );
  }, [query, tools]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {/* Hero */}
      <div style={{ padding: "32px 24px 28px", borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 600 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 20, background: "var(--green-bg)", marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--green)" }}>{tools.length} tools · {categories.length} categories · always free</span>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Every Tool You'll Ever Need
          </h1>
          <p style={{ margin: "0 0 20px", fontSize: 15, color: "var(--text2)", lineHeight: 1.6, maxWidth: 480 }}>
            One place. 600+ curated web tools across 50+ categories — from AI to design, dev to productivity.
          </p>
          {/* Search */}
          <div style={{ position: "relative", maxWidth: 480 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", pointerEvents: "none" }}>
              <circle cx="7" cy="7" r="5"/><line x1="12" y1="12" x2="14.5" y2="14.5"/>
            </svg>
            <input className="input" placeholder="Search tools, categories, tags…" value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ paddingLeft: 36, fontSize: 14, height: 44, borderRadius: 10 }} />
            {query && <button onClick={() => setQuery("")}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text3)", fontSize: 18 }}>×</button>}
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 24px 60px", maxWidth: 1400, margin: "0 auto" }}>
        {/* Search Results */}
        {query && (
          <section style={{ marginBottom: 40 }}>
            <SectionHeader title={`"${query}"`} sub={`${searched.length} tools found`} />
            {searched.length === 0
              ? <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text3)" }}><div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>No tools found for "{query}"</div>
              : <div className="tool-grid">{searched.map(t => <ToolCard key={t.id} tool={t} />)}</div>
            }
          </section>
        )}

        {!query && <>
          {/* Category pills */}
          <section style={{ marginBottom: 36 }}>
            <SectionHeader title="Browse by Category" sub={`${categories.length} categories`} action="See all" onAction={() => navigate("/browse")} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8 }}>
              {categories.map(cat => {
                const count = tools.filter(t => t.category === cat.id).length;
                return (
                  <button key={cat.id} onClick={() => navigate(`/category/${cat.id}`)}
                    style={{
                      background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: 10,
                      padding: "12px 10px", cursor: "pointer", textAlign: "left",
                      transition: "all 0.12s", display: "flex", flexDirection: "column", gap: 5,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + "66"; e.currentTarget.style.boxShadow = `0 2px 12px ${cat.color}22`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.boxShadow = "none"; }}>
                    <CategoryIcon icon={cat.icon} size={22} color={cat.color} />
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{cat.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text3)" }}>{count} tools</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Featured */}
          <section style={{ marginBottom: 36 }}>
            <SectionHeader title="⭐ Featured Tools" sub="Hand-picked by our team" action="View all" onAction={() => navigate("/featured")} />
            <div className="tool-grid">{featured.slice(0, 8).map(t => <ToolCard key={t.id} tool={t} />)}</div>
          </section>

          {/* All tools split by category samples */}
          {[
            { id: "ai", title: "🤖 AI & Machine Learning" },
            { id: "dev", title: "⚡ Developer Tools" },
            { id: "design", title: "🎨 Design & Graphics" },
            { id: "productivity", title: "🚀 Productivity" },
          ].map(section => {
            const catTools = tools.filter(t => t.category === section.id).slice(0, 4);
            if (!catTools.length) return null;
            return (
              <section key={section.id} style={{ marginBottom: 36 }}>
                <SectionHeader title={section.title} action="See all"
                  onAction={() => navigate(`/category/${section.id}`)} />
                <div className="tool-grid">{catTools.map(t => <ToolCard key={t.id} tool={t} />)}</div>
              </section>
            );
          })}
        </>}
      </div>
    </motion.div>
  );
}
