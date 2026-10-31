export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  techs: string[]
  github: string
  live?: string
  status: "completed" | "in-progress" | "concept"
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "ko-language",
    title: "Kō Language",
    shortDescription: "An alpha functional language with ADTs, pattern matching, REPL/LSP tooling, and JIT/AOT compilation through LLVM—backed by 256 passing tests.",
    fullDescription:
      "Kō compiles a minimal, purely functional language through AST, HIR, LIR, and LLVM IR to JIT execution or native objects and executables. The Zig compiler includes bidirectional type inference, reference counting, a REPL, an LSP, and a 256-test suite.",
    techs: ["Zig", "LLVM", "Language Design"],
    github: "https://github.com/Adjanour/ko-language",
    status: "in-progress",
    featured: true,
  },
  {
    id: "sess-cli",
    title: "SESS CLI",
    shortDescription: "A Git CLI that turns issue-driven work into resumable sessions and PR handoffs, with v0.6.0 binaries for 6 OS/architecture targets.",
    fullDescription:
      "SESS preserves branch, issue, timing, validation, and handoff context in SQLite across interruptions. Its 13-command workflow can resume checkpointed PR handoffs and ships Linux, macOS, and Windows binaries for amd64 and arm64.",
    techs: ["Go", "SQLite", "CLI"],
    github: "https://github.com/Orctatech-Engineering-Team/sess-cli",
    status: "in-progress",
    featured: true,
  },
  {
    id: "mnotify-sdk",
    title: "mNotify TS SDK",
    shortDescription: "A zero-dependency TypeScript SDK covering 17 mNotify operations across 5 services, dual-published to npm and JSR for 5 runtimes.",
    fullDescription:
      "The SDK wraps SMS, contacts, groups, templates, and account operations in Result-based error handling. It uses native fetch, retries rate limits, and runs across Node, Deno, Bun, Cloudflare Workers, and browsers without runtime dependencies.",
    techs: ["TypeScript", "SDK", "API Design"],
    github: "https://github.com/Adjanour/mnotify-ts-sdk",
    status: "completed",
  },
  {
    id: "easechaos",
    title: "EaseChaos",
    shortDescription: "Turns UMaT lecture and exam spreadsheets into class-filtered weekly, daily, month, and agenda views with offline access.",
    fullDescription:
      "EaseChaos makes dense UMaT timetable spreadsheets usable on any device. Students can isolate their class, browse lecture and exam views, install the offline PWA, and export schedules as PDF, PNG, or ICS calendar files.",
    techs: ["TypeScript", "React", "FastAPI"],
    github: "https://github.com/Adjanour/easechaos",
    status: "in-progress",
  },
  {
    id: "library",
    title: "Library",
    shortDescription: "A local-first PDF and EPUB workspace with indexing, in-app reading, durable progress, bookmarks, search, and terminal access.",
    fullDescription:
      "Library combines a Svelte desktop reader, Go server and TUI, SQLite storage, and signed preview installers. Its v0.1.1 preview ships verified Linux packaging, with Windows and macOS builds passing CI while certification remains in progress.",
    techs: ["Go", "Deno", "SvelteKit", "SQLite"],
    github: "https://github.com/Adjanour/library",
    status: "in-progress",
    featured: true,
  },
]

export function getGitHubOwner(url: string): string {
  const match = url.match(/github\.com\/([^/]+)/)
  return match?.[1] ?? ""
}

export function getGitHubRepo(url: string): string {
  const match = url.match(/github\.com\/[^/]+\/([^/]+)/)
  return match?.[1] ?? ""
}
