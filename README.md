# 🧰 Universal Toolbox
### *Every Tool You'll Ever Need — In One Place.*

A beautifully designed, open-source web app and PWA featuring **600+ curated tools** across **50+ categories**. From AI to design, developer utilities to productivity — if it's a great web tool, it's here.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔍 **Search** | Instant search across 600+ tools with Cmd+K shortcut |
| 🌙 **Dark / Light Mode** | Follows system preference, toggle anytime |
| 📱 **PWA** | Installs on any device — feels like a real native app |
| 🔖 **Bookmarks** | Save tools locally, persists between sessions |
| 📁 **Collections** | Create named folders to group your favourite tools |
| 🖥️ **Inline Preview** | Open tools in a side panel without leaving the app |
| 📂 **50+ Categories** | AI, Design, Dev, Productivity, Security, SEO, and more |
| ♿ **Accessible** | WCAG-compliant colour contrast, keyboard navigable |
| 🌍 **Any Browser** | Chrome, Firefox, Safari, Edge, Samsung Internet |
| 📐 **Responsive** | Mobile, tablet, desktop — every screen size |
| ⚡ **Fast** | Vite build, code-split bundles, service worker caching |
| 🔒 **Privacy** | All data stays on your device (localStorage only) |

---

## 🚀 Quick Start (Termux / Linux)

### Step 1 — Install Node.js
```bash
pkg update && pkg install nodejs
```

### Step 2 — Unzip and enter the project
```bash
cp /sdcard/Download/universal-toolbox.zip ~/
unzip universal-toolbox.zip
cd universal-toolbox
```

### Step 3 — Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

### Step 4 — (Optional) Start the Backend API
```bash
# New Termux session (swipe right → New Session)
cd ~/universal-toolbox/backend
npm install
node server.js
# Runs on http://localhost:3001
```

---

## 📁 Project Structure

```
universal-toolbox/
├── frontend/
│   ├── public/
│   │   ├── manifest.json     ← PWA manifest
│   │   ├── sw.js             ← Service worker (offline support)
│   │   ├── robots.txt
│   │   └── icons/            ← App icons (all sizes)
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx    ← Search, theme toggle, nav
│       │   ├── Sidebar.jsx   ← Collapsible category sidebar
│       │   ├── ToolCard.jsx  ← Individual tool card
│       │   └── IframePanel.jsx ← Inline tool preview
│       ├── context/
│       │   └── AppContext.jsx ← Global state (theme, bookmarks, etc.)
│       ├── data/
│       │   ├── categories.js ← 50+ categories
│       │   ├── tools1–4.js   ← 600+ tools split across files
│       │   └── index.js      ← Exports merged tools + categories
│       ├── pages/
│       │   ├── Home.jsx      ← Landing page with search + sections
│       │   └── pages.jsx     ← Browse, Featured, Bookmarks, Category, Tool
│       ├── styles/
│       │   └── global.css    ← CSS variables, light/dark, responsive
│       ├── App.jsx           ← Router, layout, mobile nav, PWA install
│       └── main.jsx          ← Entry point, SW registration
├── backend/
│   └── server.js             ← Express API (extendable)
└── README.md
```

---

## 🛠️ Adding New Tools

Edit any of the `frontend/src/data/tools1.js` – `tools4.js` files and add:

```js
{
  id: 607,                          // Unique, increment from last
  name: "Tool Name",
  url: "https://example.com",
  category: "dev",                  // Must match a category id
  tags: ["tag1", "tag2", "tag3"],
  color: "#FF5500",                 // Brand color for the avatar
  free: true,
  rating: 4.5,
  reviews: 5000,
  featured: false,
  desc: "Short description of what this tool does."
}
```

---

## 🗂️ Available Category IDs

`ai` · `design` · `ui-ux` · `dev` · `productivity` · `image` · `video` · `audio` · `writing` · `seo` · `marketing` · `analytics` · `pdf` · `security` · `cloud` · `deploy` · `devops` · `api` · `database` · `testing` · `collab` · `comms` · `pm` · `notes` · `color` · `typography` · `icons` · `photos` · `fonts` · `screenshot` · `learning` · `docs` · `forms` · `qr` · `utils` · `finance` · `scheduling` · `ecommerce` · `cms` · `accessibility` · `maps` · `dataviz` · `resume` · `monitoring` · `translation` · `animation` · `threed` · `social` · `compress` · `version` · `prototyping` · `email` · `stocks` · `3dprint`

---

## 📈 Expanding to Production

| Goal | Solution |
|---|---|
| Real database | Replace `src/data/` with Supabase / Postgres |
| User accounts | Add Supabase Auth |
| Tool submissions | Add a form + admin review queue |
| Search engine | Integrate Algolia or MeiliSearch |
| Deploy frontend | Vercel / Netlify (free) |
| Deploy backend | Railway / Render (free tier) |
| Analytics | Plausible or Umami (privacy-first) |

---

## 📜 License

MIT — Free to use, modify, and distribute.

---

*Built with React, Vite, Framer Motion, and ❤️*
