import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

const FONTS_DIR = join("src", "assets", "og-fonts")

async function loadFont(fileName: string, name: string, weight: 400 | 700) {
  const buffer = await readFile(join(FONTS_DIR, fileName))
  const data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  return { name, data, weight, style: "normal" as const }
}

async function main() {
  const [titleFont, bodyFont] = await Promise.all([
    loadFont("space-grotesk-700.ttf", "Space Grotesk", 700),
    loadFont("inter-400.ttf", "Inter", 400),
  ])

  const logoData = await readFile("public/logo.png")
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#020817",
        },
        children: [
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
                display: "flex",
                flexDirection: "column",
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
                      fontSize: 68,
                      fontWeight: 700,
                      color: "#f1f1f5",
                      lineHeight: 1.1,
                      margin: 0,
                      marginBottom: 20,
                      fontFamily: "Space Grotesk",
                    },
                    children: "Bernard Katamanso",
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: 30,
                      fontWeight: 400,
                      color: "#a1a1aa",
                      lineHeight: 1.4,
                      margin: 0,
                      fontFamily: "Inter",
                    },
                    children: "Engineer & Pan-Africanist",
                  },
                },
                { type: "div", props: { style: { flex: 1 } } },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    },
                    children: [
                      {
                        type: "img",
                        props: {
                          src: logoSrc,
                          width: 40,
                          height: 40,
                          style: { borderRadius: 6 },
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
      height: 630,
      fonts: [titleFont, bodyFont],
    },
  )

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 2400 } })
  const png = resvg.render().asPng()
  await writeFile("public/og-image.png", png)
  console.log("✓ Wrote public/og-image.png")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
