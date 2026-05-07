import { fileURLToPath } from "node:url"
import mdx from "@astrojs/mdx"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

export default defineConfig({
  site: "https://www.adjarnor.dev",
  server: {
    host: true,
    port: 8080,
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  ],
  fonts: [
    {
      name: "Lora",
      cssVariable: "--font-body",
      provider: fontProviders.google(),
      weights: [400, 700],
      styles: ["normal", "italic"],
    },
    {
      name: "Open Sans",
      cssVariable: "--font-sans",
      provider: fontProviders.google(),
      weights: [300, 400, 600, 700, 800],
    },
    {
      name: "Inconsolata",
      cssVariable: "--font-mono",
      provider: fontProviders.google(),
      weights: [400, 700],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
})
