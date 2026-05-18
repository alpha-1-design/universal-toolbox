# Universal Toolbox 🛠️

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-blue.svg)](https://web.dev/progressive-web-apps/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-emerald.svg)](https://universal-toolbox.vercel.app/)

**Universal Toolbox** is a comprehensive, beautifully designed open-source workspace featuring **700+ curated tools** across **50+ categories**. It is built as a high-performance Progressive Web App (PWA) to ensure your essential tools are always just one click away.

[Live Demo](https://universal-toolbox.vercel.app/) · [Report Bug](https://github.com/alpha-1-design/universal-toolbox/issues) · [Contributing](./CONTRIBUTING.md)

<div align="center">
  <img src="assets/screenshot1.jpg" width="45%" />
  <img src="assets/screenshot2.jpg" width="45%" />
</div>

</div>

---

## 🚀 Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) |
| **State & Logic** | ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat) ![Context API](https://img.shields.io/badge/React_Context-61DAFB?style=flat) |
| **Performance** | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![Service Workers](https://img.shields.io/badge/PWA-Enabled-orange?style=flat) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) |

---

## ✨ Key Features

*   **700+ Curated Tools:** A massive collection covering AI, Design, Development, SEO, and Productivity.
*   **Instant Search:** Global `Cmd+K` shortcut for lightning-fast discovery.
*   **Progressive Web App:** Install natively on Android, iOS, or Desktop for offline-ready access.
*   **Personalization:** Dark/Light mode support, local bookmarks, and custom tool collections.
*   **Inline Previews:** Side-panel iframe previews allow you to use tools without losing your place.
*   **Privacy Centric:** All bookmarks and settings stay on your device via `localStorage`.

<div align="center">
  <img src="assets/screenshot1.jpg" width="45%" />
  <img src="assets/screenshot2.jpg" width="45%" />
</div>

---

## 🛠️ Installation & Development

### Quick Start (Local Development)
```bash
# Clone the repository
git clone https://github.com/alpha-1-design/universal-toolbox.git
cd universal-toolbox

# Setup Frontend
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173`.

### Backend Setup (Optional)
```bash
cd backend
npm install
node server.js
```
Runs on `http://localhost:3001`.

---

## 📦 Project Structure

*   `frontend/src/components`: UI components including the Sidebar, ToolCards, and Iframe panels.
*   `frontend/src/data`: The core engine containing the 700+ tool definitions and 50+ categories.
*   `frontend/src/context`: Global state management for theme, bookmarks, and notifications.
*   `backend/`: Express API for extended functionality and data synchronization.

---

## 📜 Contributing & Community

We welcome contributions! Whether you're adding new tools or improving the UI, please check out our [Contributing Guide](./CONTRIBUTING.md).

Distributed under the **MIT License**. Built for the Alpha-1 Ecosystem.

<div align="center">
  <img src="assets/hero.jpg" width="90%" />
</div>
