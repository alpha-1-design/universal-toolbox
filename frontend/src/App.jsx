import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import IframePanel from "./components/IframePanel";
import Home from "./pages/Home";
import { BrowsePage, FeaturedPage, BookmarksPage, CategoryPage, ToolPage } from "./pages/pages";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import IntroScreen from "./pages/IntroScreen";
import Footer from "./components/Footer";

// Mobile bottom nav icons
function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const items = [
    { path: "/",          label: "Home",     icon: "🏠" },
    { path: "/browse",    label: "Browse",   icon: "🔍" },
    { path: "/featured",  label: "Featured", icon: "⭐" },
    { path: "/bookmarks", label: "Saved",    icon: "🔖" },
  ];
  return (
    <nav className="mobile-nav">
      {items.map(item => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`mobile-nav-item${path === item.path ? " active" : ""}`}
          style={{ border: "none", fontFamily: "inherit" }}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function InstallBanner() {
  const { installPrompt, install } = useApp();
  const [dismissed, setDismissed] = React.useState(false);
  if (!installPrompt || dismissed) return null;
  return (
    <div className="install-banner">
      <div style={{ fontSize: 28 }}>🧰</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 13 }}>Install Universal Toolbox</div>
        <div style={{ fontSize: 12, color: "var(--text2)" }}>Add to home screen for the full app experience</div>
      </div>
      <button className="btn btn-primary" style={{ fontSize: 12, padding: "5px 12px" }} onClick={install}>Install</button>
      <button className="btn btn-ghost" style={{ padding: "5px 8px" }} onClick={() => setDismissed(true)}>✕</button>
    </div>
  );
}

function Layout() {
  const { sidebarOpen } = useApp();
  const [introSeen, setIntroSeen] = React.useState(
    () => localStorage.getItem("utb_intro_seen") === "1"
  );
  if (!introSeen) return <IntroScreen onDone={() => setIntroSeen(true)} />;
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>
      <div className="desktop-sidebar">
        <Sidebar />
      </div>
      <div
        className="main-content"
        style={{
          flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
          marginLeft: (typeof window !== "undefined" && window.innerWidth <= 768) ? 0 : sidebarOpen ? 240 : 0,
          transition: "margin-left 0.2s cubic-bezier(0.4,0,0.2,1)",
          minWidth: 0,
        }}
      >
        <Navbar />
        <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden", background: "var(--bg)" }}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/browse"      element={<BrowsePage />} />
            <Route path="/featured"    element={<FeaturedPage />} />
            <Route path="/bookmarks"   element={<BookmarksPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/tool/:id"    element={<ToolPage />} />
            <Route path="/about"       element={<AboutPage />} />
            <Route path="/faq"         element={<FAQPage />} />
            <Route path="/privacy"     element={<PrivacyPage />} />
          </Routes>
        </main>
      </div>
      <IframePanel />
      <Footer />
      <MobileNav />
      <InstallBanner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout />
      </AppProvider>
    </BrowserRouter>
  );
}
