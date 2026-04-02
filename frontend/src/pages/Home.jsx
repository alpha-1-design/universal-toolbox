import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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

function ShuffleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
      <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
      <line x1="4" y1="4" x2="9" y2="9"/>
    </svg>
  );
}

function SparkleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/>
      <path d="M5 19l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"/>
      <path d="M19 5l.5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2z"/>
    </svg>
  );
}

function ClockIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function ToolOfTheDay({ tool, onClose }) {
  const navigate = useNavigate();
  const { categories } = useApp();
  const cat = categories.find(c => c.id === tool.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{
        background: "var(--card)",
        border: "1px solid var(--card-border)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        background: tool.color + "15",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: tool.color + "22", color: tool.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
          {tool.name[0]}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <SparkleIcon size={12} />
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tool of the Day</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tool.name}</div>
        <div style={{ fontSize: 11, color: "var(--text3)" }}>{tool.desc}</div>
      </div>
      <button
        className="btn btn-primary"
        style={{ fontSize: 11, padding: "6px 12px", flexShrink: 0 }}
        onClick={() => navigate(`/tool/${tool.id}`)}
      >
        View Tool
      </button>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { tools, categories } = useApp();
  const [query, setQuery] = useState("");
  const [randomTool, setRandomTool] = useState(null);
  const [showRandom, setShowRandom] = useState(false);

  const toolOfTheDay = useMemo(() => {
    const day = new Date().getDate();
    const index = day % tools.length;
    return tools[index];
  }, [tools]);

  const recentTools = useMemo(() => {
    return [...tools].reverse().slice(0, 8);
  }, [tools]);

  const featured = useMemo(() => tools.filter(t => t.featured), [tools]);

  const searched = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q)) || t.category.toLowerCase().includes(q)
    );
  }, [query, tools]);

  const handleRandom = () => {
    const random = tools[Math.floor(Math.random() * tools.length)];
    setRandomTool(random);
    setShowRandom(true);
  };

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
            One place. 700+ curated web tools across 50+ categories — from AI to design, dev to productivity.
          </p>
          {/* Search & Actions */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
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
            <button
              className="btn btn-secondary"
              style={{ height: 44, padding: "0 16px", gap: 8, display: "flex", alignItems: "center" }}
              onClick={handleRandom}
            >
              <ShuffleIcon size={16} />
              <span>Surprise Me</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: "28px 24px 60px", maxWidth: 1400, margin: "0 auto" }}>
        {/* Random Tool Modal */}
        <AnimatePresence>
          {showRandom && randomTool && (
            <ToolOfTheDay tool={randomTool} onClose={() => setShowRandom(false)} />
          )}
        </AnimatePresence>

        {/* Search Results */}
        {query && (
          <section style={{ marginBottom: 40 }}>
            <SectionHeader title={`"${query}"`} sub={`${searched.length} tools found`} />
            {searched.length === 0
              ? <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text3)" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ margin: "0 auto 12px", opacity: 0.4 }}>
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  No tools found for "{query}"
                </div>
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
                  <motion.button
                    key={cat.id}
                    onClick={() => navigate(`/category/${cat.id}`)}
                    style={{
                      background: "var(--card)", border: "1px solid var(--card-border)", borderRadius: 10,
                      padding: "12px 10px", cursor: "pointer", textAlign: "left",
                      display: "flex", flexDirection: "column", gap: 5,
                    }}
                    whileHover={{ y: -2, borderColor: cat.color + "66", boxShadow: `0 4px 12px ${cat.color}15` }}
                    transition={{ duration: 0.15 }}
                  >
                    <CategoryIcon icon={cat.icon} size={22} color={cat.color} />
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>{cat.name}</div>
                    <div style={{ fontSize: 10, color: "var(--text3)" }}>{count} tools</div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Featured */}
          <section style={{ marginBottom: 36 }}>
            <SectionHeader title="Featured Tools" sub="Hand-picked by our team" action="View all" onAction={() => navigate("/featured")} />
            <div className="tool-grid">{featured.slice(0, 8).map(t => <ToolCard key={t.id} tool={t} />)}</div>
          </section>

          {/* Recently Added */}
          <section style={{ marginBottom: 36 }}>
            <SectionHeader title="Recently Added" sub="Latest additions to our collection" action="See all" onAction={() => navigate("/browse")} />
            <div className="tool-grid">{recentTools.map(t => <ToolCard key={t.id} tool={t} />)}</div>
          </section>

          {/* Category samples */}
          {[
            { id: "ai", title: "AI & Machine Learning" },
            { id: "dev", title: "Developer Tools" },
            { id: "design", title: "Design & Graphics" },
            { id: "productivity", title: "Productivity" },
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
