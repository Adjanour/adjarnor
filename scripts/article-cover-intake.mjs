/**
 * Archive and optimize one article cover.
 *
 *   node scripts/article-cover-intake.mjs /path/to/cover.png article-slug
 *
 * Original PNG -> src/assets/article-covers/<slug>.png (not served)
 * 512px JPEG    -> public/article-images/<slug>.jpg (site + OG renderer)
 */
import { copyFile, mkdir } from "node:fs/promises"
import { createRequire } from "node:module"

const req = createRequire(import.meta.url)
const sharp = createRequire(req.resolve("astro"))("sharp")

const [src, slug] = process.argv.slice(2)
if (!src || !slug) {
  console.error("usage: node scripts/article-cover-intake.mjs <source.png> <article-slug>")
  process.exit(1)
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(`invalid slug: ${slug}`)
  process.exit(1)
}

const metadata = await sharp(src).metadata()
if (!metadata.width || !metadata.height || metadata.width !== metadata.height) {
  console.error(`cover must be square; received ${metadata.width ?? "?"}×${metadata.height ?? "?"}`)
  process.exit(1)
}
if (metadata.width < 512) {
  console.error(`cover must be at least 512px; received ${metadata.width}px`)
  process.exit(1)
}

await mkdir("src/assets/article-covers", { recursive: true })
await mkdir("public/article-images", { recursive: true })

const archive = `src/assets/article-covers/${slug}.png`
const output = `public/article-images/${slug}.jpg`

await copyFile(src, archive)
await sharp(src)
  .flatten({ background: "#020817" })
  .resize(512, 512, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88, progressive: true, chromaSubsampling: "4:4:4" })
  .toFile(output)

console.log(`${archive}\n${output}`)
