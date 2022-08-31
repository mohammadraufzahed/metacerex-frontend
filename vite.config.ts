import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

const prodAlias = {
  "@tanstack/react-query-devtools": path.resolve(
    __dirname,
    "node_modules",
    "@tanstack",
    "react-query-devtools",
    "build",
    "cjs",
    "noop.js"
  ),
};
const devAlias = {};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: process.env.NODE_ENV == "production" ? prodAlias : devAlias,
  },
  build: {
    outDir: "./build",
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          framer: ["framer-motion"],
          yup: ["yup"],
          react_icon: ["react-icons"],
          react_loading: ["react-loading"],
          formik: ["formik"],
          react_table: ["@tanstack/react-table"],
        },
      },
    },
  },
});
