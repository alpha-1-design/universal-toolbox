import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:3001", changeOrigin: true } },
  },
  build: {
    outDir: "dist",
    rollupOptions: { output: { manualChunks: { vendor: ["react","react-dom","react-router-dom"], motion: ["framer-motion"] } } }
  }
});
