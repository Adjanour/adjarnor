import { readdir, readFile, writeFile, mkdir } from "node:fs/promises"
import { join, basename } from "node:path"

const SRC_DIR = join(import.meta.dirname, "..", "src", "content", "diagrams")
const OUT_DIR = join(import.meta.dirname, "..", "public", "diagrams")

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  let entries: string[]
  try {
    entries = await readdir(SRC_DIR)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      console.log("No diagrams directory found at", SRC_DIR)
      return
    }
    throw err
  }

  const files = entries.filter((f) => f.endsWith(".excalidraw"))

  if (files.length === 0) {
    console.log("No .excalidraw files found in", SRC_DIR)
    return
  }

  // Set up linkedom as a DOM shim for @excalidraw/utils
  const { parseHTML } = await import("linkedom")
  const { document, window } = parseHTML(
    "<!DOCTYPE html><html><body><div id='root'></div></body></html>",
  )

  // Provide location.origin which excalidraw utils accesses
  Object.defineProperty(window, "location", {
    value: { origin: "http://localhost", href: "http://localhost" },
    writable: true,
    configurable: true,
  })

  // Polyfill globals that @excalidraw/utils expects
  globalThis.DOMParser = window.DOMParser
  globalThis.XMLSerializer = window.XMLSerializer
  globalThis.document = document
  globalThis.window = window as unknown as typeof globalThis.window
  try {
    globalThis.navigator = window.navigator
  } catch {
    // navigator is read-only in some environments
  }
  globalThis.getComputedStyle = window.getComputedStyle
  globalThis.devicePixelRatio = 1
  globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0)
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id)

  // FontFace polyfill
  class FontFacePolyfill {
    family: string
    source: string
    descriptors: Record<string, unknown>
    status = "unloaded"
    constructor(family: string, source: string, descriptors: Record<string, unknown> = {}) {
      this.family = family
      this.source = source
      this.descriptors = descriptors
    }
    async load() {
      this.status = "loaded"
      return this
    }
  }
  globalThis.FontFace = FontFacePolyfill as unknown as typeof globalThis.FontFace

  const { exportToSvg } = await import("@excalidraw/utils")

  for (const file of files) {
    const raw = await readFile(join(SRC_DIR, file), "utf-8")
    const scene = JSON.parse(raw)

    const elements = scene.elements ?? []
    if (elements.length === 0) {
      console.log(`Skipping ${file} — no elements`)
      continue
    }

    const svg = await exportToSvg({
      elements,
      appState: {
        ...(scene.appState ?? {}),
        exportBackground: scene.appState?.exportBackground ?? false,
      },
      files: scene.files ?? {},
    })

    // Serialize the SVG — use the svg element's outerHTML since linkedom's
    // XMLSerializer isn't a proper constructor
    const svgString = svg.outerHTML ?? new XMLSerializer().serializeToString(svg)
    const outName = basename(file, ".excalidraw") + ".svg"
    await writeFile(join(OUT_DIR, outName), svgString)
    console.log(`✓ ${file} → ${outName}`)
  }

  console.log(`\nDone — ${files.length} diagram(s) exported to ${OUT_DIR}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
