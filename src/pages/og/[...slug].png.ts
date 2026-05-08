import { readFile } from "node:fs/promises"
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

async function loadFont(name: string, weight: number): Promise<FontData> {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${name.replace(/ /g, "+")}:wght@${weight}`,
      {
        headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" },
      },
    )
  ).text()
  const urls = [...css.matchAll(/src:\s*url\(([^)]+)\)/g)]
  const url = urls[urls.length - 1]?.[1]
  if (!url) throw new Error(`Could not find font URL for ${name} weight ${weight}`)
  const data = await (await fetch(url)).arrayBuffer()
  return { name, data, weight: weight as 400 | 700, style: "normal" }
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

  const [titleFont, bodyFont] = await Promise.all([
    loadFont("Space Grotesk", 700),
    loadFont("Inter", 400),
  ])

  const logoData = await readFile("public/logo.png")
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`

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
          backgroundColor: "#0f0f1a",
        },
        children: [
          // Decorative circles behind content
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: -150,
                left: -100,
                width: 500,
                height: 500,
                borderRadius: 9999,
                backgroundColor: "#6366f1",
                opacity: 0.04,
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: -200,
                right: -100,
                width: 600,
                height: 600,
                borderRadius: 9999,
                backgroundColor: "#a855f7",
                opacity: 0.04,
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
