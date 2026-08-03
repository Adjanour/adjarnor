import { readFile } from "node:fs/promises"
import { join } from "node:path"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"
import { getCollection } from "astro:content"
import type { APIRoute } from "astro"

interface FontData {
  name: string
  data: ArrayBuffer
  weight: 400 | 700
  style: "normal"
}

const FONTS_DIR = join("src", "assets", "og-fonts")

async function loadFont(
  fileName: string,
  name: string,
  weight: 400 | 700,
): Promise<FontData> {
  const buffer = await readFile(join(FONTS_DIR, fileName))
  const data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  return { name, data, weight, style: "normal" }
}

// Bundled locally (not fetched from Google Fonts at build time) so static
// generation of a dozen OG images doesn't depend on network reachability.
function getFonts(): Promise<[FontData, FontData]> {
  return Promise.all([
    loadFont("space-grotesk-700.ttf", "Space Grotesk", 700),
    loadFont("inter-400.ttf", "Inter", 400),
  ])
}

let logoSrcPromise: Promise<string> | null = null
function getLogoSrc() {
  if (!logoSrcPromise) {
    logoSrcPromise = readFile("public/logo.png").then(
      (data) => `data:image/png;base64,${data.toString("base64")}`,
    )
  }
  return logoSrcPromise
}

export async function getStaticPaths() {
  const articles = await getCollection("blog", ({ data }) => !data.draft)
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const article = (props as Record<string, unknown>).article as {
    data: { title: string; subtitle?: string; description: string; date: Date }
  }
  const { title, subtitle } = article.data

  const shortTitle = title.length > 90 ? title.slice(0, 87) + "..." : title
  const titleSize = title.length < 35 ? 64 : title.length < 60 ? 52 : 42

  const [[titleFont, bodyFont], logoSrc] = await Promise.all([getFonts(), getLogoSrc()])

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 628,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#020817",
        },
        children: [
          // Single flat accent bar in the site's green-to-gold brand gradient
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 6,
                backgroundImage: "linear-gradient(90deg, #27b07d, #f9b310)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                padding: "60px 72px",
              },
              children: [
                { type: "div", props: { style: { flex: 1 } } },
                {
                  type: "h1",
                  props: {
                    style: {
                      fontSize: titleSize,
                      fontWeight: 700,
                      color: "#f1f1f5",
                      lineHeight: 1.1,
                      margin: 0,
                      marginBottom: subtitle ? 20 : 0,
                      textAlign: "start",
                      maxWidth: 900,
                      fontFamily: "Space Grotesk",
                    },
                    children: shortTitle,
                  },
                },
                ...(subtitle
                  ? [
                    {
                      type: "p",
                      props: {
                        style: {
                          fontSize: 26,
                          fontWeight: 400,
                          color: "#a1a1aa",
                          lineHeight: 1.4,
                          margin: 0,
                          textAlign: "start",
                          maxWidth: 700,
                          fontFamily: "Inter",
                        },
                        children: subtitle,
                      },
                    },
                  ]
                  : []),
                { type: "div", props: { style: { flex: 1 } } },
                {
                  type: "div",
                  props: {
                    style: {
                      position: "absolute",
                      display: "flex",
                      flexDirection: "column",
                      bottom: 60,
                      right: 84,
                      alignItems: "center",
                      gap: 12,
                    },
                    children: [
                      {
                        type: "img",
                        props: {
                          src: logoSrc,
                          width: 72,
                          height: 72,
                          style: { borderRadius: 8 },
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontSize: 20,
                            fontWeight: 400,
                            color: "#52525b",
                            letterSpacing: 1.5,
                            fontFamily: "Inter",
                          },
                          children: "adjarnor.dev",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 628,
      fonts: [titleFont, bodyFont],
    },
  )

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
  const png = resvg.render().asPng()

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  })
}
