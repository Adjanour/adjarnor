import { readFile } from "node:fs/promises"
import { extname, join } from "node:path"
import { Resvg } from "@resvg/resvg-js"
import satori from "satori"

interface FontData {
  name: string
  data: ArrayBuffer
  weight: 400 | 700
  style: "normal"
}

interface OgCardOptions {
  title: string
  subtitle?: string
  /** Public-root path (`/article.png`) or a repository-relative path. */
  artPath?: string
}

const FONTS_DIR = join("src", "assets", "og-fonts")
const DEFAULT_ART = join("src", "assets", "og-cameo.png")
const MONOGRAM = join("src", "assets", "og-monogram.png")

let fontsPromise: Promise<[FontData, FontData]> | null = null
const imagePromises = new Map<string, Promise<string>>()

async function loadFont(fileName: string, name: string, weight: 400 | 700): Promise<FontData> {
  const buffer = await readFile(join(FONTS_DIR, fileName))
  const data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  return { name, data, weight, style: "normal" }
}

function getFonts() {
  fontsPromise ??= Promise.all([
    loadFont("space-grotesk-700.ttf", "Space Grotesk", 700),
    loadFont("inter-400.ttf", "Inter", 400),
  ])
  return fontsPromise
}

function mimeFor(path: string) {
  switch (extname(path).toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg"
    case ".svg":
      return "image/svg+xml"
    default:
      return "image/png"
  }
}

function resolveAsset(path: string) {
  return path.startsWith("/") ? join("public", path.slice(1)) : path
}

function getImageSrc(path: string) {
  const resolved = resolveAsset(path)
  if (!imagePromises.has(resolved)) {
    imagePromises.set(
      resolved,
      readFile(resolved).then((data) => `data:${mimeFor(resolved)};base64,${data.toString("base64")}`),
    )
  }
  return imagePromises.get(resolved)!
}

export async function renderOgCard({ title, subtitle, artPath = DEFAULT_ART }: OgCardOptions) {
  const shortTitle = title.length > 90 ? `${title.slice(0, 87)}…` : title
  const titleSize = title.length < 34 ? 64 : title.length < 58 ? 54 : 44
  const [[titleFont, bodyFont], artSrc, monogramSrc] = await Promise.all([
    getFonts(),
    getImageSrc(artPath),
    getImageSrc(MONOGRAM),
  ])

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 630,
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#020817",
          color: "#F7F4EB",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                inset: 0,
                opacity: 0.2,
                backgroundImage:
                  "radial-gradient(circle at 82% 48%, #F9B310 0, #F9B310 18%, transparent 18.3%)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: 7,
                backgroundImage: "linear-gradient(90deg, #1D8660, #F9B310)",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                width: "100%",
                height: "100%",
                padding: "64px 70px 54px",
                alignItems: "stretch",
                gap: 58,
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flex: 1,
                      minWidth: 0,
                      flexDirection: "column",
                      justifyContent: "space-between",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: { display: "flex", flexDirection: "column", marginTop: 30 },
                          children: [
                            {
                              type: "div",
                              props: {
                                style: {
                                  color: "#79D2AD",
                                  fontFamily: "Inter",
                                  fontSize: 18,
                                  letterSpacing: 2.6,
                                  textTransform: "uppercase",
                                  marginBottom: 22,
                                },
                                children: "Notes on engineering and craft",
                              },
                            },
                            {
                              type: "h1",
                              props: {
                                style: {
                                  margin: 0,
                                  color: "#F7F4EB",
                                  fontFamily: "Space Grotesk",
                                  fontSize: titleSize,
                                  fontWeight: 700,
                                  lineHeight: 1.06,
                                  letterSpacing: -1.5,
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
                                        maxWidth: 660,
                                        margin: "20px 0 0",
                                        color: "#B8C0CC",
                                        fontFamily: "Inter",
                                        fontSize: 24,
                                        lineHeight: 1.35,
                                      },
                                      children: subtitle.length > 120 ? `${subtitle.slice(0, 117)}…` : subtitle,
                                    },
                                  },
                                ]
                              : []),
                          ],
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: { display: "flex", alignItems: "center", gap: 14 },
                          children: [
                            {
                              type: "img",
                              props: {
                                src: monogramSrc,
                                width: 44,
                                height: 44,
                                style: { borderRadius: 11 },
                              },
                            },
                            {
                              type: "div",
                              props: {
                                style: { display: "flex", flexDirection: "column", gap: 2 },
                                children: [
                                  {
                                    type: "span",
                                    props: {
                                      style: { color: "#F7F4EB", fontFamily: "Inter", fontSize: 19 },
                                      children: "Bernard Katamanso",
                                    },
                                  },
                                  {
                                    type: "span",
                                    props: {
                                      style: { color: "#8F99A8", fontFamily: "Inter", fontSize: 16 },
                                      children: "bernardkatamanso.com",
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
                  type: "div",
                  props: {
                    style: {
                      width: 308,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            position: "absolute",
                            width: 286,
                            height: 286,
                            borderRadius: 66,
                            backgroundColor: "#F9B310",
                            transform: "rotate(6deg)",
                          },
                        },
                      },
                      {
                        type: "img",
                        props: {
                          src: artSrc,
                          width: 278,
                          height: 278,
                          style: {
                            borderRadius: 58,
                            objectFit: "cover",
                            position: "relative",
                            border: "4px solid #F7F4EB",
                          },
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
    { width: 1200, height: 630, fonts: [titleFont, bodyFont] },
  )

  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng()
}
