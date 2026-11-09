import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Built into ../site/admin by the GitHub workflow; relative paths so it works under /slick/admin/
export default defineConfig({ plugins: [react()], base: "./", build: { outDir: "dist", emptyOutDir: true } });
