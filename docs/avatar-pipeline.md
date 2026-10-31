# Avatar asset pipeline

How the hero portrait ships, how to swap it, and how to generate new
ones without drifting off the color system.

## Where the file is consumed

Two slots, one file set:

| Slot | Shape | Crop behavior |
|---|---|---|
| Hero aside (desktop) | 2:3 portrait, 320px | renders at file's intrinsic ratio |
| Mobile/tablet inline portrait | 2:3, 96–112px wide | `object-contain object-top` — no source pixels are cropped |

Because every slot crops in-browser, the *file* only needs to satisfy
the hero ratio. Ship files at exactly that ratio; never ship squares
into a 2:3 slot and let the browser stretch (`object-cover` can't fix a
stretched `<img>` with `h-auto`).

## Intake

```sh
node scripts/avatar-intake.mjs /path/to/source.png
node scripts/avatar-intake.mjs /path/to/source.png --suffix alternate
```

The script inspects the source. Alpha sources emit WebP + PNG (preserving
transparency); opaque sources emit WebP + JPEG. Both 320×480 and 640×960
sets get a center crop, and `--suffix` creates a named alternate without
overwriting the primary. Verify `public/profile-hero-320.png` visually:
the head must remain whole and the gold mark may bleed naturally behind
it. sharp resolves through astro's dependency tree, so the script needs
no extra install.

Commit all files together; each set is one logical asset.

## Theme behavior (shipped)

One transparent portrait serves both themes. The page background—not a
baked image background—provides the light/dark floor, so the subject
doesn't appear to turn into a different illustration when the toggle is
pressed. Each slot needs only one `<picture>`: alpha WebP first, PNG
fallback. This also removes duplicate image downloads and theme-switch
bookkeeping.

### Edge treatment

The fade is baked into the source PNG's **alpha channel**, not simulated
in CSS. The selected Comic/Emerald portrait keeps the face and upper
jacket opaque, then gradually dissolves the lower shoulders to true zero
alpha at the final row. This resolves naturally on white and navy without
theme-specific overlays or browser mask differences. Preserve that alpha
gradient when regenerating and never flatten the source onto a color.

## Generating a new avatar (palette-locked prompt)

The system colors are load-bearing even in illustrations. Lock them in
the prompt (exact token values):

- jacket/collar green — `#1D8660` (the primary green)
- background disc gold — `#F9B310` (the brand gradient's end)
- canvas — transparent (the site owns the light/dark floor)
- ink/outlines — near-black from the earth family, not pure `#000`

Full prompt template:

```
Hand-drawn risograph print illustration of a young Ghanaian man,
head and shoulders, three-quarter view, looking directly at the viewer,
calm slight smile. Thick confident ink outlines (near-black), halftone
dot shading on skin and fabric.

Limited palette, exact values: jacket green #1D8660, background disc
gold #F9B310, transparent background, ink #17130E. No other hues. No blue,
no purple, no gradients, no photorealism, no text, no watermark.

Composition: subject centered low in frame with generous head clearance
and even margins — must crop cleanly to a circle, a square, AND a 2:3
vertical rectangle. Clean flat background, no environment, no props.
Flat vector-like detail that stays legible at 128px. Output 1600×2400.
```

Iteration discipline: **keep every style word identical, change
exactly one variable per batch** (view → crop → palette). Image models
don't render exact hex — the prompt buys proximity; run the winner
through the intake script, then eyeball for drift.

## Blog card art (shipped)

`ArticleCard` renders a 64px art tile between the date column and the
title (sm+ only — the mobile list stays typographic). Art source, in
order: the post's optional `image:` frontmatter, else
`/article-art-fallback.webp` — the halftone glasses sticker, compressed
at 256px (retina headroom, ~6KB). Chosen over the "b" monogram tile
because the monogram already lives in the tab favicon; a repeated
monogram and a character sticker read differently.

## Social preview cards / OG images (shipped)

`src/utils/og-card.ts` is the single renderer for both surfaces:

- `/og-image.png` — the site/home card; full matching portrait.
- `/og/<article-id>.png` — generated at build for every published post;
  glasses cartoon by default.

The distinction is intentional: the portrait represents Bernard; the
cartoon is editorial art; the “b” monogram is identity furniture in the
byline. All cards share the navy floor, exact green→gold accent bar,
typography, spacing, byline, and 1200×630 social-card contract.

Future article art is already wired. Add a public-root PNG/JPEG path to
frontmatter:

```yaml
image: /article-images/my-article.png
```

That image replaces only the right-hand art tile in both the on-site
`ArticleCard` and its generated OG image; it does not fork the card
layout. Prefer square art with a safe center crop. Keep PNG/JPEG for OG
generation (`resvg` cannot reliably decode WebP data URIs).

Social crawlers fetch one static PNG and know nothing about the site's
theme toggle, so the stable navy canvas is deliberate—there is no
light/dark OG pair to maintain.

### Previewing before sharing

Open `/og-preview/` locally or on the deployed site. It lists the home
card and every published article card using the exact generated PNGs,
scaled at their real 1.91:1 display ratio. Each card has a full-resolution
link, a public-URL copy button, and a link back to its source page.

The route is an internal QA tool: `BaseLayout` emits
`noindex, nofollow`, and the sitemap integration filters it out. It stays
deployed because social debugger tools need public URLs, but search
engines are explicitly told it is not content.

## Favicons (shipped)

The `/bernard-favicon-kit` assets replaced the old placeholders:

- `favicon.svg` — the "b" monogram, **adaptive**: colors flip via an
  embedded `@media (prefers-color-scheme: dark)` inside the SVG
  document, driven by *browser chrome* theme (not the site toggle —
  correct domain for favicons).
- `favicon.ico` + `favicon-192.png` — fallback chain and manifest icon.
- `apple-touch-icon.png` replaced `apple-touch-icon.svg` (iOS requires PNG).
- `theme-color` meta is now two adaptive values (`#ffffff` light /
  `#020817` dark, the navy token); the manifest's matches.
