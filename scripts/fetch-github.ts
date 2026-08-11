import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import { projects, getGitHubOwner, getGitHubRepo } from "../src/data/projects.ts"

interface GitHubData {
  [repoId: string]: {
    stars: number
    forks: number
    language: string | null
    languageColor: string | null
    updatedAt: string
    description: string | null
  }
}

const LANGUAGE_COLORS: Record<string, string> = {
  Go: "#00ADD8",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  PHP: "#4F5D95",
  Java: "#B07219",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Vue: "#41B883",
  SQL: "#e38c00",
  Shell: "#89e051",
}

async function fetchRepo(owner: string, repo: string): Promise<GitHubData[string] | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    })

    if (!res.ok) {
      console.warn(`  ⚠ ${owner}/${repo}: ${res.status} ${res.statusText}`)
      return null
    }

    const data = await res.json()
    const lang = data.language ?? null
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      language: lang,
      languageColor: lang ? (LANGUAGE_COLORS[lang] ?? "#6e7681") : null,
      updatedAt: data.updated_at ?? new Date().toISOString(),
      description: data.description ?? null,
    }
  } catch (err) {
    console.warn(`  ⚠ ${owner}/${repo}: fetch failed`, err)
    return null
  }
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const seconds = Math.floor((now - then) / 1000)

  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(months / 12)
  return `${years}y ago`
}

async function main() {
  console.log("Fetching GitHub data...\n")
  const data: GitHubData = {}

  for (const project of projects) {
    const owner = getGitHubOwner(project.github)
    const repo = getGitHubRepo(project.github)
    if (!owner || !repo) {
      console.warn(`  ⚠ ${project.id}: invalid GitHub URL`)
      continue
    }

    process.stdout.write(`  ${owner}/${repo}... `)
    const repoData = await fetchRepo(owner, repo)
    if (repoData) {
      data[project.id] = repoData
      console.log(`✓ ★${repoData.stars} · ${repoData.forks} forks · ${timeAgo(repoData.updatedAt)}`)
    }
  }

  const outPath = join(import.meta.dirname, "..", "src", "data", "github.json")
  await writeFile(outPath, JSON.stringify(data, null, 2))
  console.log(`\nDone — wrote ${Object.keys(data).length} repos to ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
