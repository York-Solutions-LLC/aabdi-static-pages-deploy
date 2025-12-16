import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: "/aabdi-static-pages-deploy/",
  test: {
    environment: "jsdom",
    globals: true,
  },
});
