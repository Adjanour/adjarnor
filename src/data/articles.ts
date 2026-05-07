import { FEED_URL, parseSubstackFeed } from "./substack-core.mjs"

export interface Article {
  title: string
  date: string
  excerpt: string
  href: string
  readTime: string
  image?: string
}

let cached: Article[] | null = null

export async function getArticles(): Promise<Article[]> {
  if (cached) return cached
  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) throw new Error(`Substack feed returned ${res.status}`)
    const xml = await res.text()
    cached = parseSubstackFeed(xml)
    return cached
  } catch (e) {
    console.warn("Failed to fetch Substack feed:", e)
    return []
  }
}
