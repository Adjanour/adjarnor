# adjarnor.dev

Personal portfolio and writing site for [Bernard Kirk Adjarnor Katamanso](https://www.adjarnor.dev).

Built with Astro v6, Tailwind CSS v4, and TypeScript.

## Tech

- [Astro](https://astro.build) v6 — static site generation
- [Tailwind CSS](https://tailwindcss.com) v4 — utility-first CSS
- [TypeScript](https://www.typescriptlang.org) v5
- [Biome](https://biomejs.dev) — formatting and linting
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) — RSS feed parsing

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server at `0.0.0.0:8080` |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run format` | Format and lint-fix with Biome |
| `npm run lint` | Lint with ESLint |
| `npm run test` | Run tests |

## Structure

```
src/
├── data/              # Substack RSS fetch + parse
├── layouts/           # Base HTML layout
├── pages/             # Routes: /, /writing, /404, sitemaps
├── components/site/   # UI components
├── docs/              # Internal conventions & write-ups
└── index.css          # Tailwind theme + global styles
```

### Conventions

- **Alignment & width system** — the `container-page` utility, gutters,
  max-width, and the four-checkpoint DevTools test:
  [docs/page-alignment-system.md](docs/page-alignment-system.md)
- **Hover & color etiquette, OKLCH ramp** — hue is meaning, value is
  affordance; the token ramp; the green ramp in a perceptual space with
  contrast math: [docs/color-system.md](docs/color-system.md)
- **Live indicators & the chips** — the status dot's pulse anatomy, the
  ticking clock's SSR handoff, motion-reduction, hot-path hygiene, icons
  vs. typographic glyphs, and the quote archive that lives client-side:
  [docs/live-indicator.md](docs/live-indicator.md)

- **Avatar pipeline** — hero slot's asset ratios, the palette-locked
  regeneration prompt, and the intake script:
  [docs/avatar-pipeline.md](docs/avatar-pipeline.md)

- **Project list interactions** — why an underline is a contract, what
  the Kelvin Amoaba reference teaches, and why only real controls react:
  [docs/project-list-interactions.md](docs/project-list-interactions.md)

- **Project copy evidence** — reproducible sources behind every concrete
  project-summary claim: [docs/project-evidence.md](docs/project-evidence.md)

- **Article cover-art prompts** — the locked visual system and repeatable
  generation/audit chain for every published article:
  [docs/article-cover-art-prompts.md](docs/article-cover-art-prompts.md)

Read them before adding a page, changing a section's width or padding, or
displaying any "live" data in the UI.

Articles are fetched from Substack's RSS feed at build time — no cron, no committed cache, no CI pipeline.
