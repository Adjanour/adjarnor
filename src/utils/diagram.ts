import { createRequire } from "node:module"

const _require = createRequire(import.meta.url)
const { DOMImplementation, XMLSerializer } = _require("@xmldom/xmldom")
const roughMod = _require("roughjs/bundled/rough.cjs.js") as {
  svg(svgEl: any): {
    line(x1: number, y1: number, x2: number, y2: number, opts?: any): any
    rectangle(x: number, y: number, w: number, h: number, opts?: any): any
    polygon(pts: [number, number][], opts?: any): any
    circle(x: number, y: number, d: number, opts?: any): any
  }
}

const NS = "http://www.w3.org/2000/svg"

export const fg = "hsl(var(--foreground))"
export const fgMuted = "hsl(var(--muted-foreground))"
export const primary = "hsl(var(--primary))"
export const border = "hsl(var(--border))"
export const muted = "hsl(var(--muted))"
export const destructive = "hsl(var(--destructive))"

export interface DiagramCtx {
  svg: any
  rough: ReturnType<typeof roughMod.svg>
  serialize(): string
  width: number
  height: number
  text(x: number, y: number, content: string, opts?: TextOpts): void
  centerText(y: number, content: string, opts?: CenterTextOpts): void
  arrow(x1: number, y1: number, x2: number, y2: number, opts?: ArrowOpts): void
  box(x: number, y: number, w: number, h: number, opts?: BoxOpts): void
  step(x: number, y: number, num: number): void
  fillPolygon(points: [number, number][], fill: string): void
  centerTextBoth(
    y: number,
    title: string,
    subtitle: string,
    opts?: {
      titleFill?: string
      subtitleFill?: string
      titleSize?: number
      subtitleSize?: number
      titleWeight?: string
      centerX?: number
    },
  ): void
}

interface TextOpts {
  fill?: string
  fontSize?: number
  fontWeight?: string
  anchor?: string
  centerX?: number
}
interface CenterTextOpts {
  fill?: string
  fontSize?: number
  fontWeight?: string
  centerX?: number
}
interface ArrowOpts {
  stroke?: string
  strokeWidth?: number
  dashed?: boolean
  headSize?: number
  seed?: number
}
interface BoxOpts {
  fill?: string
  stroke?: string
  dashed?: boolean
  roughness?: number
  seed?: number
  strokeWidth?: number
}

export function createDiagram(w: number, h: number): DiagramCtx {
  const doc = new DOMImplementation().createDocument(NS, "html", null)
  const svg = doc.createElementNS(NS, "svg")
  svg.setAttribute("width", String(w))
  svg.setAttribute("height", String(h))
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`)
  svg.setAttribute("xmlns", NS)

  const makeEl = (tag: string) => doc.createElementNS(NS, tag)
  const rough = roughMod.svg(svg)

  function text(x: number, y: number, content: string, opts?: TextOpts) {
    const el = makeEl("text")
    el.setAttribute("x", String(x))
    el.setAttribute("y", String(y))
    el.setAttribute("fill", opts?.fill ?? fg)
    el.setAttribute("font-family", "var(--font-sans), system-ui, sans-serif")
    if (opts?.fontSize) el.setAttribute("font-size", String(opts.fontSize))
    if (opts?.fontWeight) el.setAttribute("font-weight", opts.fontWeight)
    if (opts?.anchor) el.setAttribute("text-anchor", opts.anchor)
    el.textContent = content
    svg.appendChild(el)
  }

  function centerText(y: number, content: string, opts?: CenterTextOpts) {
    text(opts?.centerX ?? w / 2, y, content, {
      fill: opts?.fill,
      fontSize: opts?.fontSize,
      fontWeight: opts?.fontWeight,
      anchor: "middle",
    })
  }

  function arrow(x1: number, y1: number, x2: number, y2: number, opts?: ArrowOpts) {
    const g = makeEl("g")
    const col = opts?.stroke ?? fgMuted
    const seed = opts?.seed ?? 0

    g.appendChild(
      rough.line(x1, y1, x2, y2, {
        stroke: col,
        strokeWidth: opts?.strokeWidth ?? 1.5,
        roughness: 0.5,
        seed,
        strokeLineDash: opts?.dashed ? [6, 4] : undefined,
      }),
    )

    const angle = Math.atan2(y2 - y1, x2 - x1)
    const hs = opts?.headSize ?? 8
    const hx = x2 - hs * 0.3 * Math.cos(angle)
    const hy = y2 - hs * 0.3 * Math.sin(angle)
    g.appendChild(
      rough.polygon(
        [
          [x2, y2],
          [hx + hs * 0.4 * Math.sin(angle), hy - hs * 0.4 * Math.cos(angle)],
          [hx - hs * 0.4 * Math.sin(angle), hy + hs * 0.4 * Math.cos(angle)],
        ],
        {
          fill: col,
          stroke: col,
          roughness: 0.3,
          seed: seed + 1,
        },
      ),
    )
    svg.appendChild(g)
  }

  function box(x: number, y: number, bw: number, bh: number, opts?: BoxOpts) {
    svg.appendChild(
      rough.rectangle(x, y, bw, bh, {
        fill: opts?.fill ?? "transparent",
        stroke: opts?.stroke ?? border,
        strokeWidth: opts?.strokeWidth ?? 1.5,
        roughness: opts?.roughness ?? 0.8,
        seed: opts?.seed ?? 0,
        strokeLineDash: opts?.dashed ? [6, 4] : undefined,
      }),
    )
  }

  function step(x: number, y: number, num: number) {
    const cx = x + 12
    const cy = y + 12
    svg.appendChild(
      rough.circle(cx, cy, 24, {
        stroke: primary,
        fill: "transparent",
        roughness: 0.5,
        strokeWidth: 1.5,
        seed: num * 100,
      }),
    )
    text(cx, cy + 1, String(num), {
      fill: primary,
      fontSize: 11,
      fontWeight: "700",
      anchor: "middle",
    })
  }

  function fillPolygon(points: [number, number][], fill: string) {
    const el = makeEl("polygon")
    el.setAttribute("points", points.map((p) => `${p[0]},${p[1]}`).join(" "))
    el.setAttribute("fill", fill)
    svg.appendChild(el)
  }

  function centerTextBoth(
    y: number,
    title: string,
    subtitle: string,
    opts?: {
      titleFill?: string
      subtitleFill?: string
      titleSize?: number
      subtitleSize?: number
      titleWeight?: string
      centerX?: number
    },
  ) {
    const cx = opts?.centerX ?? w / 2
    if (subtitle) {
      text(cx, y - 4, subtitle, {
        fontSize: opts?.subtitleSize ?? 10,
        fill: opts?.subtitleFill ?? fgMuted,
        anchor: "middle",
      })
    }
    text(cx, y + 8, title, {
      fontSize: opts?.titleSize ?? 12,
      fontWeight: opts?.titleWeight ?? "600",
      fill: opts?.titleFill ?? fg,
      anchor: "middle",
    })
  }

  return {
    svg,
    rough,
    width: w,
    height: h,
    text,
    centerText,
    arrow,
    box,
    step,
    fillPolygon,
    centerTextBoth,
    serialize() {
      return new XMLSerializer().serializeToString(svg).replaceAll(' xmlns:xml=""', "")
    },
  }
}
