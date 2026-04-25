import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import IframePanel from "./components/IframePanel";
import Home from "./pages/Home";
import { BrowsePage, FeaturedPage, BookmarksPage, CategoryPage, ToolPage } from "./pages/pages";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import UpdatesPage, { UpdatesPopup, TOTAL_TOOLS } from "./pages/UpdatesPage";
import Footer from "./components/Footer";
import VersionBanner from "./components/VersionBanner";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const main = document.querySelector("main");
    if (main) main.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Mobile bottom nav icons
function NavIcon({ name }) {
  const icons = {
    home: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    browse: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    featured: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    saved: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  };
  return icons[name] || null;
}

function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const items = [
    { path: "/",          label: "Home",     icon: "home" },
    { path: "/browse",    label: "Browse",   icon: "browse" },
    { path: "/featured",  label: "Featured", icon: "featured" },
    { path: "/bookmarks", label: "Saved",    icon: "saved" },
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
          <NavIcon name={item.icon} />
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
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
  const [showPopup, setShowPopup] = React.useState(false);

  React.useEffect(() => {
    const stored = parseInt(localStorage.getItem("utb_tool_count") || "0");
    if (stored < TOTAL_TOOLS) {
      setShowPopup(true);
    }
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg)" }}>
      <div className="desktop-sidebar">
        <Sidebar />
      </div>
      <div
        className="main-content"
        style={{
          flex: 1, display: "flex", flexDirection: "column", overflow: "hidden",
          marginLeft: window.innerWidth <= 768 ? 0 : sidebarOpen ? 240 : 0,
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
            <Route path="/whats-new"  element={<UpdatesPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/tool/:id"    element={<ToolPage />} />
            <Route path="/about"       element={<AboutPage />} />
            <Route path="/faq"         element={<FAQPage />} />
            <Route path="/privacy"     element={<PrivacyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <VersionBanner />
      <IframePanel />
      <MobileNav />
      <InstallBanner />
      {showPopup && <UpdatesPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastProvider>
          <Layout />
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
