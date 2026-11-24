import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

// GitHub Pages has no idea about React Router's pages, so reloading /meetings
// would show GitHub's 404. GitHub Pages serves 404.html for unknown paths, so we
// make 404.html a copy of index.html: the app loads and the router shows the page.
function githubPagesSpaFallback(): Plugin {
  let outDir = "";
  return {
    name: "github-pages-spa-fallback",
    apply: "build",
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, "index.html"), resolve(outDir, "404.html"));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), githubPagesSpaFallback()],
  build: {
    // Put the build in the outer (repo root) modernslug folder: modernslug/dist
    outDir: "../dist",
    // Needed because the folder is outside this project; clears old builds first
    emptyOutDir: true,
  },
});
