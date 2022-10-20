import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const prodAlias = {};
const devAlias = {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: process.env.NODE_ENV == "production" ? prodAlias : devAlias,
  },
  optimizeDeps: {
    include: ["@preact/signals-react"]
  },
  build: {
    outDir: "./build",
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          "form.vendor": ["yup", "formik"],
          "ui.vendor": ["react-icons", "react-loading", "framer-motion"],
          "http.vendor": ["axios", "@tanstack/react-query"],
          react_table: ["@tanstack/react-table"],
        },
      },
    },
  },
});
