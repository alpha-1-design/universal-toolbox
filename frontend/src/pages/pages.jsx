import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryIcon from '../components/CategoryIcon';
import { useApp } from "../context/AppContext";
import ToolCard from "../components/ToolCard";
import { SkeletonGrid } from "../components/Skeleton";

const PageWrap = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
    style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px 80px" }}>
    {children}
  </motion.div>
);

const H1 = ({ children, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>{children}</h1>
    {sub && <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text3)" }}>{sub}</p>}
  </div>
);

// ── Category Page ─────────────────────────────────────────────────────────
export function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tools, categories } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rating");
  const [loading, setLoading] = useState(true);
  const cat = categories.find(c => c.id === id);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [id, filter, sort]);

  const list = useMemo(() => {
    let r = tools.filter(t => t.category === id);
    if (filter === "free") r = r.filter(t => t.free);
    if (filter === "paid") r = r.filter(t => !t.free);
    if (filter === "featured") r = r.filter(t => t.featured);
    if (query.trim()) { const q = query.toLowerCase(); r = r.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)); }
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    if (sort === "reviews") r.sort((a, b) => b.reviews - a.reviews);
    if (sort === "name") r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [tools, id, filter, query, sort]);

  if (!cat) return <PageWrap><p style={{ color: "var(--text3)" }}>Category not found. <button className="btn btn-ghost" onClick={() => navigate("/")}>← Go home</button></p></PageWrap>;

  return (
    <PageWrap>
      <button className="btn btn-ghost" style={{ marginBottom: 16, padding: "4px 8px", fontSize: 12 }} onClick={() => navigate(-1)}>← Back</button>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: cat.color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}><CategoryIcon icon={cat.icon} size={24} color={cat.color} /></div>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{cat.name}</h1>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "var(--text3)" }}>{cat.desc}</p>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        <input className="input" placeholder="Filter…" value={query} onChange={e => setQuery(e.target.value)} style={{ maxWidth: 220, fontSize: 13 }} />
        {["all","free","paid","featured"].map(f => (
          <button key={f} className={`btn ${filter === f ? "btn-accent" : "btn-secondary"}`}
            style={{ fontSize: 12, textTransform: "capitalize" }} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <select className="input" style={{ maxWidth: 130, fontSize: 12 }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="rating">Top Rated</option>
          <option value="reviews">Most Reviews</option>
          <option value="name">A–Z</option>
        </select>
      </div>
      <p style={{ margin: "0 0 16px", fontSize: 12, color: "var(--text3)" }}>{list.length} tools</p>
      {loading
        ? <SkeletonGrid count={12} />
        : list.length === 0
          ? <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text3)" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ margin: "0 auto 12px", opacity: 0.4 }}>
                <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              No tools match your filters.
            </div>
          : <div className="tool-grid">{list.map(t => <ToolCard key={t.id} tool={t} />)}</div>
      }
    </PageWrap>
  );
}

// ── Tool Page ─────────────────────────────────────────────────────────────
export function ToolPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tools, categories, toggleBookmark, isBookmarked, openPanel, collections, addCollection, addToCollection } = useApp();
  const tool = tools.find(t => t.id === parseInt(id));
  if (!tool) return <PageWrap><p style={{ color: "var(--text3)" }}>Tool not found. <button className="btn btn-ghost" onClick={() => navigate("/")}>← Go home</button></p></PageWrap>;

  const bm = isBookmarked(tool.id);
  const cat = categories.find(c => c.id === tool.category);
  const related = tools.filter(t => t.category === tool.category && t.id !== tool.id).sort((a, b) => b.rating - a.rating).slice(0, 4);

  const handleCollection = () => {
    if (!collections.length) { const n = prompt("New collection name:"); if (n?.trim()) { const c = addCollection(n.trim()); addToCollection(c.id, tool.id); } }
    else { const opts = collections.map((c, i) => `${i+1}. ${c.name}`).join("\n"); const v = prompt(`Add to:\n${opts}\n\nNumber or new name:`); if (!v) return; const i = parseInt(v)-1; if (!isNaN(i) && collections[i]) addToCollection(collections[i].id, tool.id); else if (v.trim()) { const c = addCollection(v.trim()); addToCollection(c.id, tool.id); } }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 80px" }}>
      <button className="btn btn-ghost" style={{ marginBottom: 16, fontSize: 12, padding: "4px 8px" }} onClick={() => navigate(-1)}>← Back</button>
      {/* Main card */}
      <div className="card" style={{ padding: 24, marginBottom: 14 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <div className="tool-avatar" style={{ width: 64, height: 64, fontSize: 26, background: tool.color + "22", color: tool.color, border: `1px solid ${tool.color}30`, borderRadius: 14, flexShrink: 0 }}>{tool.name[0]}</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
              <div>
                <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800, color: "var(--text)" }}>{tool.name}</h1>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {cat && <span className="tag">{cat.name}</span>}
                  {tool.free ? <span className="tag tag-green">Free</span> : <span className="tag tag-orange">Paid</span>}
                  {tool.featured && <span className="tag tag-blue">Featured</span>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <button className="btn btn-secondary" onClick={() => toggleBookmark(tool.id)} style={{ fontSize: 12 }}>
                  {bm ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      Saved
                    </span>
                  ) : "Save"}
                </button>
                <button className="btn btn-secondary" onClick={handleCollection} style={{ fontSize: 12 }}>+ Collection</button>
                <button className="btn btn-primary" onClick={() => openPanel(tool.url, tool.name)} style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                  Open Tool
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </button>
              </div>
            </div>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{tool.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#d29922" stroke="#d29922" strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{tool.rating}</span>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>({tool.reviews.toLocaleString()} reviews)</span>
              </div>
              {tool.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
        </div>
      </div>
      {/* URL bar */}
      <div className="card" style={{ padding: "10px 16px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <span className="mono" style={{ color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 11, display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          {tool.url}
        </span>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <a href={`mailto:alphariansamuel@gmail.com?subject=Broken%20tool%20report&body=Tool%3A%20${encodeURIComponent(tool.name)}%0AURL%3A%20${encodeURIComponent(tool.url)}%0%0ADescription%20of%20issue%3A`}
            className="btn btn-ghost" style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }} title="Report broken link">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Report
          </a>
          <a href={tool.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
            Open in new tab
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
      {/* Related */}
      {related.length > 0 && <>
        <h2 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>More in {cat?.name}</h2>
        <div className="tool-grid">{related.map(t => <ToolCard key={t.id} tool={t} />)}</div>
      </>}
    </motion.div>
  );
}

// ── Browse Page ───────────────────────────────────────────────────────────
export function BrowsePage() {
  const { tools, categories } = useApp();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rating");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [cat, filter, sort]);

  const list = useMemo(() => {
    let r = [...tools];
    if (cat !== "all") r = r.filter(t => t.category === cat);
    if (filter === "free") r = r.filter(t => t.free);
    if (filter === "paid") r = r.filter(t => !t.free);
    if (filter === "featured") r = r.filter(t => t.featured);
    if (query.trim()) { const q = query.toLowerCase(); r = r.filter(t => t.name.toLowerCase().includes(q) || t.tags.some(g => g.includes(q))); }
    if (sort === "rating") r.sort((a, b) => b.rating - a.rating);
    if (sort === "reviews") r.sort((a, b) => b.reviews - a.reviews);
    if (sort === "name") r.sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [tools, cat, filter, query, sort]);

  return (
    <PageWrap>
      <H1 sub={`${list.length} of ${tools.length} tools`}>Browse All Tools</H1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
        <input className="input" placeholder="Search…" value={query} onChange={e => setQuery(e.target.value)} style={{ maxWidth: 220, fontSize: 13 }} />
        <select className="input" style={{ maxWidth: 180, fontSize: 12 }} value={cat} onChange={e => setCat(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {["all","free","paid","featured"].map(f => (
          <button key={f} className={`btn ${filter === f ? "btn-accent" : "btn-secondary"}`}
            style={{ fontSize: 12, textTransform: "capitalize" }} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <select className="input" style={{ maxWidth: 130, fontSize: 12 }} value={sort} onChange={e => setSort(e.target.value)}>
          <option value="rating">Top Rated</option>
          <option value="reviews">Most Reviews</option>
          <option value="name">A–Z</option>
        </select>
      </div>
      {loading ? <SkeletonGrid count={12} /> : <div className="tool-grid">{list.map(t => <ToolCard key={t.id} tool={t} />)}</div>}
    </PageWrap>
  );
}

// ── Featured Page ─────────────────────────────────────────────────────────
export function FeaturedPage() {
  const { tools } = useApp();
  const featured = tools.filter(t => t.featured).sort((a, b) => b.rating - a.rating);
  return (
    <PageWrap>
      <H1 sub="Hand-picked tools that stand out for quality and usefulness">Featured Tools</H1>
      <div className="tool-grid">{featured.map(t => <ToolCard key={t.id} tool={t} />)}</div>
    </PageWrap>
  );
}

// ── Bookmarks Page ────────────────────────────────────────────────────────
export function BookmarksPage() {
  const navigate = useNavigate();
  const { getBookmarked, collections, tools } = useApp();
  const saved = getBookmarked();
  return (
    <PageWrap>
      <H1 sub={`${saved.length} saved tools`}>Bookmarks</H1>
      {saved.length === 0
        ? <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ margin: "0 auto 12px", opacity: 0.4, color: "var(--text3)" }}>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            <p style={{ color: "var(--text2)", margin: "0 0 16px" }}>No bookmarks yet. Click the bookmark icon on any tool to save it.</p>
            <button className="btn btn-primary" onClick={() => navigate("/browse")}>Browse Tools</button>
          </div>
        : <div className="tool-grid" style={{ marginBottom: 36 }}>{saved.map(t => <ToolCard key={t.id} tool={t} />)}</div>
      }
      {collections.length > 0 && <>
        <h2 style={{ margin: "32px 0 16px", fontSize: 16, fontWeight: 800, color: "var(--text)" }}>Collections</h2>
        {collections.map(col => {
          const colTools = tools.filter(t => col.toolIds.includes(t.id));
          return (
            <div key={col.id} style={{ marginBottom: 28 }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "var(--text)", display: "flex", alignItems: "center", gap: 8 }}>
                {col.name} <span style={{ fontSize: 11, color: "var(--text3)", fontWeight: 400 }}>({colTools.length} tools)</span>
              </h3>
              {colTools.length > 0
                ? <div className="tool-grid">{colTools.map(t => <ToolCard key={t.id} tool={t} />)}</div>
                : <p style={{ fontSize: 12, color: "var(--text3)" }}>Empty collection</p>}
            </div>
          );
        })}
      </>}
    </PageWrap>
  );
}
