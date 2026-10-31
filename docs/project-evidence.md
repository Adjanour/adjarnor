# Project copy evidence

Evidence audit for the homepage project summaries. Last checked against
the live repositories on October 31, 2026.

## Method

Claims came from repository READMEs, GitHub metadata, release assets,
workflow history, and visible test files. Registry state was checked for
the mNotify SDK because its README claims dual publication.

Two evidence classes stay separate:

- **Adoption outcomes:** users, messages delivered, schedules viewed,
  downloads. None of the repositories currently exposes reliable counts,
  so the portfolio claims none.
- **Verified scope:** test counts, command/API surfaces, release targets,
  export formats, and implemented workflows. These can make copy concrete
  without pretending they measure adoption.

## Kō Language

Repository: <https://github.com/Adjanour/ko-language>

- Latest GitHub release: `v0.3.2`; 6 releases visible.
- README reports 256 of 256 tests passing.
- Pipeline documented as AST → HIR → LIR → LLVM IR.
- JIT and AOT outputs, reference counting, REPL, LSP, ADTs, and pattern
  matching are implemented; project status is explicitly alpha.
- Homepage status changed from `completed` to `in-progress` to match the
  repository.

The test count is a quality/scope signal, not a user-impact claim.

## SESS CLI

Repository: <https://github.com/Orctatech-Engineering-Team/sess-cli>

- Latest release: `v0.6.0`; 9 releases visible.
- Release assets cover 6 platform/architecture combinations: Linux,
  macOS, and Windows on amd64 and arm64.
- README documents 13 commands.
- Repository contains 25 Go test files; latest visible Build and Release
  workflows succeeded.
- Interrupted PR handoffs persist checkpoints and resume after conflicts
  are resolved.

The summary emphasizes preserved work context and cross-platform release
scope—not unmeasured productivity gains.

## mNotify TypeScript SDK

Repository: <https://github.com/Adjanour/mnotify-ts-sdk>

- 17 documented methods across SMS, contacts, groups, templates, and
  account services.
- Zero runtime dependencies; documented for Node, Deno, Bun, Cloudflare
  Workers, and browsers.
- 7 test files; latest visible Test and Docs workflows succeeded.
- Published on both registries, but versions differ: JSR is `4.0.0` and
  npm is `3.0.0`. The latest GitHub Publish workflow failed, so the copy
  does not imply npm already carries v4.
- The old webhook-validation claim was removed; the README does not
  document that feature.

## EaseChaos

Repository: <https://github.com/Adjanour/easechaos>

- It is a UMaT timetable **viewer**, not a schedule-authoring platform.
- Supports class-filtered lecture views plus exam month, agenda, today,
  this-week, and next-week views.
- Exports PDF, PNG, and ICS; installable as an offline PWA after data is
  loaded.
- Repository contains 6 backend test files and no GitHub releases.
- README says the project remains under development; homepage status is
  now `in-progress`.

The old “class scheduling platform” wording was corrected because it
described a product the repository does not implement.

## SMSX

Repository: <https://github.com/Africoda/smsx>

- README documents 13 endpoints across health, authentication, contacts,
  SMS, and CSV import.
- Implements 3 rate-limit tiers: 500/15m standard, 5/15m auth, and
  100/15m strict.
- Includes OpenAPI/Swagger output, structured Pino logging, validation,
  JWT authentication, and Drizzle-backed persistence.
- Repository contains 2 test files; recent visible CodeQL workflows
  succeeded; no GitHub releases are published.
- The old claims about intelligent scheduling, automated reminders, and
  an analytics dashboard were removed because the repository does not
  support them.

## Update rule

When adding a number to project copy, record its source and check date in
this file. If a number cannot be reproduced from a public source, leave
it out of the homepage.

## Feature-candidate audit

Checked against the public GitHub profile on October 31, 2026.

### Feature now: Library

Repository: <https://github.com/Adjanour/library>

- Local-first PDF/EPUB workspace with indexing, progress, bookmarks,
  search, reading queues, TUI access, and FocusD integration.
- Public `v0.1.1-preview.1` release with signed/checksummed setup and
  preview artifacts.
- 15 visible test files; latest Desktop Builds, Installer, and Publish
  Preview Installers workflows succeeded.
- Linux packaging/launch is verified. Windows and macOS are build-capable
  but correctly documented as not release-certified.

This is the strongest omitted project: it adds desktop, local-first,
reader, packaging, and multi-interface engineering to the portfolio.

### Feature now, framed as research: DCA-Trie

Repository: <https://github.com/Adjanour/graph-constrained-reasoning-dca>

- Explicitly extends the ICML 2025 Graph-Constrained Reasoning work.
- Uses knowledge-graph entity types and relation ranges as deterministic
  constraint gates before LLM decoding.
- No embeddings, thresholds, learned oracle parameters, or GPU scoring
  in the symbolic gate.
- Includes algorithm demos, evaluation notebooks, and Lean proof work,
  but no release or published evaluation result yet.

Feature it as an in-progress research extension—not as ownership of the
original GCR system and not with unmeasured accuracy claims.

### Prepare before featuring

- **django-zig:** strong comptime ORM/router/admin concept, but no release,
  CI history, or meaningful test surface yet.
- **FocusD:** broad systems product with daemon, browser extension, IPC,
  blocking layers, schedules, and sync; no release/CI and effectively one
  test-like file.
- **lumen/imgv:** useful native image viewer, but repository identity and
  metadata disagree (name/language/README), with no release or tests.
- **await-lies:** compelling event-loop implementation/talk artifact, but
  has no README, so visitors cannot evaluate it.

### Curation recommendation

The homepage now keeps 5 projects and replaces SMSX with Library. SMSX
overlapped the mNotify messaging domain and had weaker release/test
evidence; its repository remains available but is no longer featured.
