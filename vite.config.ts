import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/aabdi-static-pages-deploy/",
  test: {
    environment: "jsdom",
    globals: true,
  },
});
