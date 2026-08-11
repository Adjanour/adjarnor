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
    shortDescription: "A minimal functional programming language with no parens, ADTs, pattern matching, and LLVM native compilation. Built from scratch in Zig.",
    fullDescription:
      "Kō is a vibecoded minimal functional programming language with no parens, ADTs, pattern matching, and LLVM native compilation. Built from scratch in Zig as an exploration of language design and compiler internals.",
    techs: ["Zig", "LLVM", "Language Design"],
    github: "https://github.com/Adjanour/ko-language",
    status: "completed",
    featured: true,
  },
  {
    id: "sess-cli",
    title: "SESS CLI",
    shortDescription: "Session-based Git CLI that turns units of work into explicit sessions with start, pause, resume, and PR handoff via GitHub issues.",
    fullDescription:
      "A session-based Git CLI that turns units of work into explicit sessions: start, pause, resume, and end with a branch push and PR handoff. Uses SQLite to track state and integrates with GitHub issues via gh.",
    techs: ["Go", "SQLite", "CLI"],
    github: "https://github.com/Orctatech-Engineering-Team/sess-cli",
    status: "in-progress",
    featured: true,
  },
  {
    id: "mnotify-sdk",
    title: "mNotify TS SDK",
    shortDescription: "Type-safe TypeScript SDK for mNotify's Bulk Messaging API with SMS sending, contact management, templates, and webhook validation.",
    fullDescription:
      "Type-safe TypeScript SDK for mNotify's Bulk Messaging Solution API. Features SMS sending, contact management, templates, and webhook validation with automatic retries.",
    techs: ["TypeScript", "Node.js", "API Design"],
    github: "https://github.com/Adjanour/mnotify-ts-sdk",
    status: "completed",
  },
  {
    id: "easechaos",
    title: "EaseChaos",
    shortDescription: "Class scheduling platform built with TypeScript and React.",
    fullDescription:
      "A class scheduling application that simplifies organizing and managing class schedules. Built with TypeScript and React for a smooth user experience.",
    techs: ["TypeScript", "React", "FastAPI"],
    github: "https://github.com/Adjanour/easechaos",
    status: "completed",
  },
  {
    id: "smsx",
    title: "SMSX",
    shortDescription: "Comprehensive bulk SMS platform with intelligent scheduling, automated reminders, and analytics dashboard.",
    fullDescription:
      "Comprehensive messaging application with bulk SMS capabilities, intelligent scheduling, automated reminders, and analytics dashboard.",
    techs: ["TypeScript", "Node.js", "React", "Hono", "Drizzle ORM"],
    github: "https://github.com/Africoda/smsx",
    status: "completed",
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
