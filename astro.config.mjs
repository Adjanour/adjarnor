import { fileURLToPath } from "node:url"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"

export default defineConfig({
  site: "https://www.bernardkatamanso.com",
  image: {
    domains: ["substack-post-media.s3.amazonaws.com"],
  },
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
    sitemap({
      // Internal visual QA tool: useful when deployed, not public content.
      filter: (page) => !page.endsWith("/og-preview/"),
    }),
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
      name: "Geist",
      cssVariable: "--font-body",
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
    },
    {
      name: "Geist",
      cssVariable: "--font-sans",
      provider: fontProviders.google(),
      weights: [300, 400, 500, 600, 700],
    },
    {
      name: "Google Sans Code",
      cssVariable: "--font-mono",
      provider: fontProviders.google(),
      weights: [400, 700],
    },
    {
      name: "Caveat",
      cssVariable: "--font-signature",
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
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
