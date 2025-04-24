import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://bymagg.github.io",
  base: "/tfm-static",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
});
