import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <h2 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{title}</h2>
    <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function PrivacyPage() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      style={{ maxWidth: 700, margin: "0 auto", padding: "28px 24px 80px" }}>

      <button className="btn btn-ghost" style={{ marginBottom: 20, fontSize: 12, padding: "4px 8px" }}
        onClick={() => navigate(-1)}>← Back</button>

      <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>
        Privacy Policy
      </h1>
      <p style={{ margin: "0 0 28px", fontSize: 12, color: "var(--text3)" }}>
        Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} ·{" "}
        <a href="mailto:alphariansamuel@gmail.com" style={{ color: "var(--accent)" }}>alphariansamuel@gmail.com</a>
      </p>

      {/* TL;DR */}
      <div style={{
        background: "var(--green-bg)", border: "1px solid var(--green)", borderRadius: 10,
        padding: "14px 18px", marginBottom: 28,
      }}>
        <p style={{ margin: 0, fontSize: 13, color: "var(--green)", fontWeight: 600 }}>
          🛡️ TL;DR — We collect absolutely nothing. No accounts, no tracking, no cookies, no servers receiving your data. Everything stays on your device.
        </p>
      </div>

      <Section title="1. Who We Are">
        Universal Toolbox is an open-source project built and maintained by Samuel Mensah (
        <a href="https://github.com/alpha-1-design" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>@alpha-1-design</a>
        ). The app is a curated directory of web tools. You can reach the developer at{" "}
        <a href="mailto:alphariansamuel@gmail.com" style={{ color: "var(--accent)" }}>alphariansamuel@gmail.com</a>.
      </Section>

      <Section title="2. Data We Collect">
        <strong>We collect no personal data whatsoever.</strong>
        <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
          <li>No name, email address, or account information</li>
          <li>No IP address logging</li>
          <li>No analytics or usage tracking</li>
          <li>No cookies of any kind</li>
          <li>No third-party tracking scripts</li>
          <li>No advertising networks</li>
        </ul>
      </Section>

      <Section title="3. Local Storage">
        Universal Toolbox uses your browser's <strong>localStorage</strong> to save:
        <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
          <li>Your bookmarked tools</li>
          <li>Your collections (folders of tools)</li>
          <li>Your dark/light mode preference</li>
        </ul>
        <p style={{ margin: "10px 0 0" }}>
          This data lives <strong>only on your device</strong> and is never transmitted anywhere.
          You can clear it at any time by clearing your browser's site data or localStorage for this app.
        </p>
      </Section>

      <Section title="4. Third-Party Tools">
        Universal Toolbox is a <em>directory</em> of external tools. When you click "Open" or visit any
        listed tool, you are leaving Universal Toolbox and entering that tool's own website. We have no
        control over third-party websites and are not responsible for their privacy practices. Please review
        each tool's own privacy policy before using it.
      </Section>

      <Section title="5. Service Worker & Caching">
        This app uses a service worker for offline support. The service worker caches app files (HTML, JS,
        CSS) locally on your device so the app works without an internet connection. No personal data is
        stored in this cache — only app code and assets.
      </Section>

      <Section title="6. Open Source">
        Universal Toolbox is fully open source. You can inspect every line of code at{" "}
        <a href="https://github.com/alpha-1-design" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
          github.com/alpha-1-design
        </a>. There are no hidden scripts, no obfuscated code, and no surprises.
      </Section>

      <Section title="7. Children's Privacy">
        Universal Toolbox does not collect data from anyone, including children under 13. The app is safe
        for all ages.
      </Section>

      <Section title="8. Changes to This Policy">
        If this policy ever changes (for example, if we add optional analytics), we will update this page
        with a new date and clearly describe what changed. We will never add tracking without being
        transparent about it.
      </Section>

      <Section title="9. Contact">
        Questions about this privacy policy? Contact Samuel Mensah at{" "}
        <a href="mailto:alphariansamuel@gmail.com" style={{ color: "var(--accent)" }}>
          alphariansamuel@gmail.com
        </a>{" "}
        or open an issue on{" "}
        <a href="https://github.com/alpha-1-design" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
          GitHub
        </a>.
      </Section>
    </motion.div>
  );
}
