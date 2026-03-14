import React, { createContext, useContext, useState, useEffect } from "react";
import { tools as allTools, categories } from "../data";

const Ctx = createContext(null);

export function AppProvider({ children }) {
  // Theme
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("utb_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { return true; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0d1117" : "#ffffff");
    localStorage.setItem("utb_theme", dark ? "dark" : "light");
  }, [dark]);

  // Bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("utb_bm") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("utb_bm", JSON.stringify(bookmarks)); }, [bookmarks]);

  // Collections
  const [collections, setCollections] = useState(() => {
    try { return JSON.parse(localStorage.getItem("utb_cols") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("utb_cols", JSON.stringify(collections)); }, [collections]);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [panelUrl, setPanelUrl] = useState(null);
  const [panelName, setPanelName] = useState("");
  // PWA install prompt
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const h = e => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener("beforeinstallprompt", h);
    return () => window.removeEventListener("beforeinstallprompt", h);
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const toggleBookmark = id => setBookmarks(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const isBookmarked = id => bookmarks.includes(id);
  const getBookmarked = () => allTools.filter(t => bookmarks.includes(t.id));

  const openPanel = (url, name) => { setPanelUrl(url); setPanelName(name); };
  const closePanel = () => { setPanelUrl(null); setPanelName(""); };

  const addCollection = name => {
    const c = { id: Date.now(), name, toolIds: [] };
    setCollections(p => [...p, c]);
    return c;
  };
  const removeCollection = id => setCollections(p => p.filter(c => c.id !== id));
  const addToCollection = (cid, tid) =>
    setCollections(p => p.map(c =>
      c.id === cid && !c.toolIds.includes(tid) ? { ...c, toolIds: [...c.toolIds, tid] } : c
    ));

  return (
    <Ctx.Provider value={{
      tools: allTools, categories, dark, setDark,
      bookmarks, toggleBookmark, isBookmarked, getBookmarked,
      collections, addCollection, removeCollection, addToCollection,
      panelUrl, panelName, openPanel, closePanel,
      sidebarOpen, setSidebarOpen,
      installPrompt, install,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp outside AppProvider");
  return ctx;
};
