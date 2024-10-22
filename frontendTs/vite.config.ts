// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@magicui": path.resolve(__dirname, "src/magicui"), // Adjust the path as needed
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components/"),
      "@/ui/lib/utils": path.resolve(__dirname, "./src/ui/lib/utils"),
      "@/ui/components": path.resolve(__dirname, "./src/ui/components"),
      "@/ui/lib": path.resolve(__dirname, "./src/ui/lib"),
      "@/ui/hooks": path.resolve(__dirname, "./src/ui/hooks"),
    },
  },
  build: {
    commonjsOptions: {
      include: ["node_modules/buffer/index.js"],
    },
  },
});
