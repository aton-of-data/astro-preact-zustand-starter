import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import { imagetools } from "vite-imagetools";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  /**
   * for vercel deploy only
   */
  output: "server",
  adapter: vercel(),
  /**
   * end
   */

  integrations: [preact()],
  vite: {
    plugins: [imagetools()],
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },
    ssr: {
      noExternal: ["zustand"],
    },
  },
});
