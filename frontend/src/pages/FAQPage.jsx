import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Is Universal Toolbox free?",
    a: "Yes, completely free. Always. No subscriptions, no hidden fees, no premium tiers. The app itself is open source under the MIT license.",
  },
  {
    q: "Do I need an account to use it?",
    a: "No account needed. Ever. Your bookmarks and collections are saved directly in your browser's localStorage. Nothing is sent to any server.",
  },
  {
    q: "Are the tools themselves free?",
    a: "Most tools in the list are free or have generous free tiers. Each tool card is labeled 'Free' or 'Paid' so you always know before clicking. We prioritize free and open-source tools.",
  },
  {
    q: "How do I install it as an app on my phone?",
    a: "Open the app in your browser, then tap the 'Install' banner that appears at the bottom of the screen. On iOS (Safari), tap the Share button → 'Add to Home Screen'. On Android (Chrome), tap the menu → 'Add to Home Screen' or 'Install App'. Once installed it works like a native app — offline, full screen, no browser UI.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. After your first visit, the app is cached by the service worker and works fully offline. All tool data is bundled in the app. You only need internet to actually open and use the external tools.",
  },
  {
    q: "How do I save tools?",
    a: "Click the ☆ bookmark icon on any tool card to save it. Saved tools appear in the Bookmarks page. You can also create Collections (folders) to group tools by project or use case — click '+ Collection' on any tool detail page.",
  },
  {
    q: "How often are new tools added?",
    a: "New tools are added every week. The app currently has 600+ tools across 50+ categories and grows regularly. If you have a suggestion, contact the developer.",
  },
  {
    q: "Can I suggest a tool to be added?",
    a: "Absolutely. Email alphariansamuel@gmail.com or open an issue on GitHub at github.com/alpha-1-design with the tool name, URL, and a short description. If it's a quality tool that's useful to others, it'll be added in the next weekly update.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Universal Toolbox collects zero data. There is no analytics, no tracking scripts, no cookies, and no accounts. Your bookmarks and collections are stored only in your browser and never leave your device. See our Privacy Policy for full details.",
  },
  {
    q: "Why do some tools show a blank panel when I click 'Open'?",
    a: "Some websites block being loaded inside iframes for security reasons (this is called X-Frame-Options). When that happens, click 'Full page ↗' in the panel header to open the tool directly in a new tab. This is normal and expected for sites like Google, Figma, and others.",
  },
  {
    q: "What browsers does it work on?",
    a: "Universal Toolbox works on all modern browsers: Chrome, Firefox, Safari, Edge, Samsung Internet, Brave, and Opera. It's tested on both desktop and mobile. For the best PWA install experience, use Chrome on Android or Safari on iOS.",
  },
  {
    q: "Can I use it on my phone or tablet?",
    a: "Yes. The app is fully responsive and works great on phones and tablets. On mobile, there's a dedicated bottom navigation bar. For the best experience, install it as a PWA from your browser.",
  },
  {
    q: "Is the source code available?",
    a: "Yes. Universal Toolbox is open source under the MIT license. You can view, fork, and contribute to the code on GitHub at github.com/alpha-1-design.",
  },
  {
    q: "How do I use the keyboard shortcut for search?",
    a: "Press Cmd+K on Mac or Ctrl+K on Windows/Linux to instantly focus the search bar from anywhere in the app. Press Escape to close it.",
  },
  {
    q: "Can I switch between dark and light mode?",
    a: "Yes. The app automatically matches your system's theme preference. You can also toggle it manually using the theme button in the top navigation bar. Your preference is saved.",
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          fontFamily: "inherit", textAlign: "left",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{item.q}</span>
        <span style={{
          fontSize: 18, color: "var(--text3)", flexShrink: 0, lineHeight: 1,
          transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform 0.2s",
        }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 20px 16px", borderTop: "1px solid var(--border)" }}>
              <p style={{ margin: "12px 0 0", fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{item.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const filtered = FAQS.filter(f =>
    f.q.toLowerCase().includes(query.toLowerCase()) ||
    f.a.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
      style={{ maxWidth: 700, margin: "0 auto", padding: "28px 24px 80px" }}>

      <button className="btn btn-ghost" style={{ marginBottom: 20, fontSize: 12, padding: "4px 8px" }}
        onClick={() => navigate(-1)}>← Back</button>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.01em" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--text3)" }}>
          {FAQS.length} questions · Can't find your answer? <a href="mailto:alphariansamuel@gmail.com" style={{ color: "var(--accent)" }}>Email us</a>
        </p>
        <input className="input" placeholder="Search questions…" value={query}
          onChange={e => setQuery(e.target.value)} style={{ maxWidth: 360 }} />
      </div>

      {filtered.length === 0
        ? <p style={{ color: "var(--text3)", fontSize: 13 }}>No results for "{query}"</p>
        : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </div>
      }
    </motion.div>
  );
}
