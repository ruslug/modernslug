import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Put the build in the outer (repo root) modernslug folder: modernslug/dist
    outDir: "../dist",
    // Needed because the folder is outside this project; clears old builds first
    emptyOutDir: true,
  },
});
