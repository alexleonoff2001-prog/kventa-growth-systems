import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  root: path.resolve(__dirname, "github-pages"),
  base: "/kventa-growth-systems/",
  plugins: [react()],
  define: {
    __KVENTA_GITHUB_PAGES__: "true",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  publicDir: path.resolve(__dirname, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist-pages"),
    emptyOutDir: true,
  },
});
