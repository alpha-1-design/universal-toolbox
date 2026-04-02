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

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LINKS = [
  { label: "GitHub",    href: "https://github.com/alpha-1-design",               Icon: GitHubIcon },
  { label: "Portfolio", href: "https://samuel-mensah-portfolio.vervel.app",       Icon: GlobeIcon },
  { label: "Instagram", href: "https://instagram.com/samuelmensah607",            Icon: InstagramIcon },
  { label: "Email",     href: "mailto:alphariansamuel@gmail.com",                 Icon: MailIcon },
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
              className="btn btn-secondary" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <link.Icon /> {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Projects */}
      <h2 style={{ margin: "28px 0 14px", fontSize: 15, fontWeight: 800, color: "var(--text)" }}>
        Projects
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
                  className="btn btn-secondary" style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  Repo
                </a>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary" style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                  Live
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                  </svg>
                </a>
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
        About Universal Toolbox
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
        Get in Touch
      </h2>
      <div className="card" style={{ padding: 20 }}>
        <p style={{ margin: "0 0 14px", fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>
          Have a tool suggestion? Found a bug? Want to collaborate? Reach out any time.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <a href="mailto:alphariansamuel@gmail.com" className="btn btn-primary" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            alphariansamuel@gmail.com
          </a>
          <a href="https://github.com/alpha-1-design" target="_blank" rel="noopener noreferrer"
            className="btn btn-secondary" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
