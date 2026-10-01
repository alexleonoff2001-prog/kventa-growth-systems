import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname, "github-pages"),
  base: "/",
  plugins: [react()],
  define: {
    __KVENTA_GITHUB_PAGES__: "true",
    __KVENTA_LEAD_ENDPOINT__: JSON.stringify("/api/lead"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist-cloudflare"),
    emptyOutDir: true,
  },
});
