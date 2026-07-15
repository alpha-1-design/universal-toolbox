import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogs, tools } from "../data";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
};

const PageWrap = ({ children, style }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
    style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 24px 80px", ...style }}
  >
    {children}
  </motion.div>
);

const platformLabel = (p) => (p === "android" ? "Android" : "Desktop");

// ── Blogs Index ────────────────────────────────────────────────────────────
export function BlogsPage() {
  if (!blogs.length) {
    return (
      <PageWrap>
        <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
          <p style={{ color: "var(--text2)", margin: 0 }}>No deep-dives published yet.</p>
        </div>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>
          Open Source Power Tools — Deep Dives
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--text3)" }}>
          In-depth guides to free, open-source tools and the expensive proprietary software they replace.
        </p>
      </div>

      <motion.div
        className="tool-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {blogs.map((b) => {
          const tool = tools.find((t) => t.id === b.toolId);
          const accent = tool?.color || "var(--green)";
          return (
            <motion.div key={b.slug} variants={item}>
              <Link
                to={`/blog/${b.slug}`}
                className="card card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  padding: 18,
                  textDecoration: "none",
                  borderLeft: `3px solid ${accent}`,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: accent, letterSpacing: "0.02em" }}>
                  {b.toolName}
                </div>
                <h3 style={{ margin: "6px 0 8px", fontSize: 15, fontWeight: 800, color: "var(--text)", lineHeight: 1.35 }}>
                  {b.title}
                </h3>
                <span
                  className="tag"
                  style={{ alignSelf: "flex-start", background: "var(--orange-bg)", color: "var(--orange)", marginBottom: 10 }}
                >
                  Replaces {b.replaces}
                </span>
                <p style={{ margin: 0, fontSize: 13, color: "var(--text2)", lineHeight: 1.6, flex: 1 }}>
                  {b.excerpt}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, marginTop: 14 }}>
                  <span style={{ fontSize: 11, color: "var(--text3)" }}>{b.readTime} min read</span>
                  {b.platforms.map((p) => (
                    <span key={p} className="tag tag-blue" style={{ fontSize: 10 }}>
                      {platformLabel(p)}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </PageWrap>
  );
}

// ── Single Blog Post ─────────────────────────────────────────────────────────
export function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <PageWrap style={{ maxWidth: 760 }}>
        <div className="card" style={{ padding: "48px 24px", textAlign: "center" }}>
          <p style={{ color: "var(--text2)", margin: "0 0 16px" }}>Post not found.</p>
          <Link to="/blogs" className="btn btn-ghost" style={{ fontSize: 12 }}>← All deep-dives</Link>
        </div>
      </PageWrap>
    );
  }

  const tool = tools.find((t) => t.id === blog.toolId);
  const accent = tool?.color || "var(--green)";

  return (
    <PageWrap style={{ maxWidth: 760 }}>
      <button
        className="btn btn-ghost"
        style={{ marginBottom: 16, padding: "4px 8px", fontSize: 12 }}
        onClick={() => navigate("/blogs")}
      >
        ← All deep-dives
      </button>

      <div className="card" style={{ padding: 24, marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: accent, letterSpacing: "0.02em" }}>
            {blog.toolName}
          </span>
          <span className="tag tag-orange" style={{ fontSize: 10 }}>Open Source</span>
        </div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text)", lineHeight: 1.3 }}>
          {blog.title}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginTop: 14 }}>
          <span
            className="tag"
            style={{ background: "var(--orange-bg)", color: "var(--orange)" }}
          >
            Replaces {blog.replaces}
          </span>
          <span style={{ fontSize: 12, color: "var(--text3)" }}>{blog.readTime} min read</span>
          {blog.platforms.map((p) => (
            <span key={p} className="tag tag-blue" style={{ fontSize: 10 }}>
              {platformLabel(p)}
            </span>
          ))}
        </div>
      </div>

      <article>
        {blog.sections.map((s, i) => (
          <section key={i} style={{ marginBottom: 22 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 800, color: "var(--text)" }}>
              {s.heading}
            </h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.8, color: "var(--text2)" }}>
              {s.body}
            </p>
          </section>
        ))}
      </article>

      <div
        className="card"
        style={{ padding: 20, marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, borderColor: accent }}
      >
        <div style={{ fontSize: 13, color: "var(--text2)" }}>
          Ready to make the switch? Open <strong style={{ color: "var(--text)" }}>{blog.toolName}</strong> and start saving.
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link to={`/tool/${blog.toolId}`} className="btn btn-primary" style={{ fontSize: 12 }}>
            View in Toolbox
          </Link>
          {tool?.url && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}
            >
              Open official site
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </PageWrap>
  );
}
