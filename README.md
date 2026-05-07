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
└── index.css          # Tailwind theme + global styles
```

Articles are fetched from Substack's RSS feed at build time — no cron, no committed cache, no CI pipeline.
