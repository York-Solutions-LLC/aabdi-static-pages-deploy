import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/aabdi-static-pages-deploy/",
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
