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
    minify: "esbuild",
  },
});
