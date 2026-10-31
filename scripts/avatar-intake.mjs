/**
 * Avatar intake pipeline — regenerate the hero portrait asset set from a
 * source image.
 *
 *   node scripts/avatar-intake.mjs /path/to/source.png [--suffix variant]
 *
 * The source may be square (≥ 1254px) or the native 2:3 portrait — the
 * cover-resize passes it through; square sources get a center crop. Both
 * output
 * ratios match the hero slot (2:3 portrait, 320×480 @1x, 640×960 @2x) —
 * per-slot `object-cover` handles other container shapes, so files only
 * need to serve the hero ratio. Center crop keeps the head, which sits
 * centered; the subject's background disc bleeding off the sides is the
 * intended poster composition. `--suffix dark` emits `-dark`-suffixed
 * files for a named variant (see docs/avatar-pipeline.md). Alpha sources
 * preserve transparency in WebP + PNG; opaque sources use WebP + JPEG.
 *
 * sharp resolves through astro's dependency tree — no extra install.
 */
import { createRequire } from "node:module"

const req = createRequire(import.meta.url)
const sharp = createRequire(req.resolve("astro"))("sharp")

const src = process.argv[2]
if (!src) {
  console.error("usage: node scripts/avatar-intake.mjs <source-image> [--suffix dark]")
  process.exit(1)
}
const suffixArg = process.argv.indexOf("--suffix")
const suffix = suffixArg !== -1 ? `-${process.argv[suffixArg + 1] ?? "dark"}` : ""
const { hasAlpha = false } = await sharp(src).metadata()
const fallbackExt = hasAlpha ? "png" : "jpg"

const variants = [
  { w: 320, h: 480, webp: `public/profile-hero-320${suffix}.webp`, fallback: `public/profile-hero-320${suffix}.${fallbackExt}` },
  { w: 640, h: 960, webp: `public/profile-hero-640${suffix}.webp`, fallback: `public/profile-hero-640${suffix}.${fallbackExt}` },
]

for (const v of variants) {
  await sharp(src)
    .resize(v.w, v.h, { fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toFile(v.webp)
  const fallback = sharp(src).resize(v.w, v.h, { fit: "cover", position: "centre" })
  if (hasAlpha) {
    await fallback.png({ compressionLevel: 9 }).toFile(v.fallback)
  } else {
    await fallback.jpeg({ quality: 88, progressive: true }).toFile(v.fallback)
  }
}

console.log(variants.flatMap((v) => [v.webp, v.fallback]).join("\n"))
