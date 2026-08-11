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
    id: "sess-cli",
    title: "SESS CLI",
    shortDescription: "Session-based Git CLI for issue-driven repos.",
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
    shortDescription: "TypeScript SDK for mNotify messaging APIs.",
    fullDescription:
      "Type-safe TypeScript SDK for mNotify's Bulk Messaging Solution API. Features SMS sending, contact management, templates, and webhook validation with automatic retries.",
    techs: ["TypeScript", "Node.js", "API Design"],
    github: "https://github.com/Adjanour/mnotify-ts-sdk",
    status: "completed",
    featured: true,
  },
  {
    id: "valkey-collab",
    title: "Valkey Collab",
    shortDescription: "Real-time collaborative whiteboard.",
    fullDescription:
      "Real-time collaborative whiteboard application built with FastAPI, Vue.js, and Valkey. WebSocket-based synchronization with persistent storage.",
    techs: ["Python", "FastAPI", "Vue.js", "Valkey"],
    github: "https://github.com/Orctatech-Engineering-Team/valkey-collab-demo",
    status: "completed",
    featured: true,
  },
  {
    id: "listen-to-this-article",
    title: "Listen to This Article",
    shortDescription: "WordPress TTS plugin for accessibility.",
    fullDescription:
      "A WordPress plugin that adds text-to-speech functionality to posts, letting visitors listen to article content via generated audio files. Supports audio generation, regeneration, and media library integration.",
    techs: ["PHP", "WordPress", "JavaScript"],
    github: "https://github.com/Adjanour/listen-to-this-article",
    status: "completed",
  },
  {
    id: "react-components",
    title: "React Components",
    shortDescription: "Feature-rich reusable React components.",
    fullDescription:
      "Collection of feature-rich React components including accordion with search, navigation utilities, and other reusable UI patterns.",
    techs: ["React", "TypeScript", "JavaScript"],
    github: "https://github.com/Adjanour/ReactComponents",
    status: "completed",
  },
  {
    id: "podcast-player-app",
    title: "PodPlay",
    shortDescription: "Modern podcast player with glassmorphism UI.",
    fullDescription:
      "A minimal podcast player web app with Apple-inspired glassmorphism design. Features RSS feed support, offline downloads, playback speed control, keyboard shortcuts, and a Python backend for serving audio downloads.",
    techs: ["JavaScript", "Python", "HTML", "CSS"],
    github: "https://github.com/Adjanour/podcast-player-app",
    status: "completed",
  },
  {
    id: "vesper",
    title: "Vesper",
    shortDescription: "Time blocking for deep work.",
    fullDescription:
      "A time blocking application designed to help structure your day, maintain focus, and achieve deep work states.",
    techs: ["Go"],
    github: "https://github.com/Adjanour/vesper",
    status: "in-progress",
  },
  {
    id: "smsx",
    title: "SMSX",
    shortDescription: "Bulk SMS platform with scheduling.",
    fullDescription:
      "Comprehensive messaging application with bulk SMS capabilities, intelligent scheduling, automated reminders, and analytics dashboard.",
    techs: ["TypeScript", "Node.js", "React", "Hono", "Drizzle ORM"],
    github: "https://github.com/Africoda/smsx",
    status: "completed",
  },
  {
    id: "text-editor",
    title: "Text Editor",
    shortDescription: "Desktop text editor in Java.",
    fullDescription:
      "A desktop text editor application built with Java and Maven, featuring core text editing functionality.",
    techs: ["Java", "Maven"],
    github: "https://github.com/Adjanour/TextEditor",
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
