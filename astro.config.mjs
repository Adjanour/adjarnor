import { fileURLToPath } from "node:url"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

export default defineConfig({
  site: "https://www.adjarnor.dev",
  server: {
    host: true,
    port: 8080,
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  integrations: [
    sitemap(),
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
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
