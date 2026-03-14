import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    name: "Privacy Toolkit",
    url: "https://privacy-toolkit-ten.vercel.app",
    repo: "https://github.com/alpha-1-design/privacy-toolkit",
    desc: "A free, open-source privacy-first security toolkit. Analyze links, files, QR codes and messages for threats entirely in your browser. No accounts, no tracking, no data collection. 13 tools including JWT decoder, hash generator, AES-256 encryption, and VirusTotal integration.",
    tags: ["Privacy", "Security", "Open Source", "Browser-only"],
    color: "#238636",
  },
  {
    name: "Universal Toolbox",
    url: "http://localhost:5173",
    repo: "https://github.com/alpha-1-design",
    desc: "600+ curated web tools across 50+ categories. A PWA that works on any device, any browser, with dark/light mode, bookmarks, collections, and inline previews.",
    tags: ["PWA", "React", "Tools", "Open Source"],
    color: "#388bfd",
  },
];

const LINKS = [
  { label: "GitHub",    href: "https://github.com/alpha-1-design",               icon: "🐙" },
  { label: "Portfolio", href: "https://samuel-mensah-portfolio.vervel.app",       icon: "🌐" },
  { label: "Instagram", href: "https://instagram.com/samuelmensah607",            icon: "📸" },
  { label: "Email",     href: "mailto:alphariansamuel@gmail.com",                 icon: "✉️" },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      style={{ maxWidth: 780, margin: "0 auto", padding: "28px 24px 80px" }}>

      <button className="btn btn-ghost" style={{ marginBottom: 20, fontSize: 12, padding: "4px 8px" }}
        onClick={() => navigate(-1)}>← Back</button>

      {/* Hero card */}
      <div className="card" style={{ padding: 28, marginBottom: 16, textAlign: "center" }}>
        {/* Avatar */}
        <div style={{
          width: 80, height: 80, borderRadius: "50%", margin: "0 auto 16px",
          background: "linear-gradient(135deg,#238636,#388bfd)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, fontWeight: 800, color: "#fff",
        }}>S</div>

        <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>
          Samuel Mensah
        </h1>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "var(--text3)" }}>
          @alpha-1-design · Full-Stack Developer & Designer
        </p>
        <p style={{ margin: "0 0 20px", fontSize: 13, color: "var(--text2)", lineHeight: 1.7, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
          I build open-source tools that respect your privacy and make the web more accessible.
          Focused on clean UI, security, and tools that actually help people.
        </p>

        {/* Social links */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {LINKS.map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="btn btn-secondary" style={{ fontSize: 12 }}>
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Projects */}
      <h2 style={{ margin: "28px 0 14px", fontSize: 15, fontWeight: 800, color: "var(--text)" }}>
        🚀 Projects
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {PROJECTS.map(p => (
          <div key={p.name} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: p.color + "22", color: p.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14,
                }}>{p.name[0]}</div>
                <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{p.name}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <a href={p.repo} target="_blank" rel="noopener noreferrer"
                  className="btn btn-secondary" style={{ fontSize: 11 }}>🐙 Repo</a>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary" style={{ fontSize: 11 }}>Live ↗</a>
              </div>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 12, color: "var(--text2)", lineHeight: 1.7 }}>{p.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* About the app */}
      <h2 style={{ margin: "28px 0 14px", fontSize: 15, fontWeight: 800, color: "var(--text)" }}>
        🧰 About Universal Toolbox
      </h2>
      <div className="card" style={{ padding: 20 }}>
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>
          Universal Toolbox was built to solve a simple problem: too many great web tools, scattered across
          too many bookmarks. This app brings 600+ curated tools into one clean, fast, and private interface.
        </p>
        <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>
          New tools are added every week. No accounts needed. No tracking. Your bookmarks and collections
          live entirely on your device.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {["React","Vite","Framer Motion","PWA","Open Source","MIT License"].map(t => (
            <span key={t} className="tag tag-blue">{t}</span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <h2 style={{ margin: "28px 0 14px", fontSize: 15, fontWeight: 800, color: "var(--text)" }}>
        📬 Get in Touch
      </h2>
      <div className="card" style={{ padding: 20 }}>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>
          Have a tool suggestion? Found a bug? Want to collaborate? Reach out any time.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <a href="mailto:alphariansamuel@gmail.com" className="btn btn-primary" style={{ fontSize: 12 }}>
            ✉️ alphariansamuel@gmail.com
          </a>
          <a href="https://github.com/alpha-1-design" target="_blank" rel="noopener noreferrer"
            className="btn btn-secondary" style={{ fontSize: 12 }}>
            🐙 GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
