import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET() {
  const articles = await getCollection("blog", ({ data }) => !data.draft)
  const sorted = articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  return rss({
    title: "Bernard Katamanso - Blog",
    description: "Technical deep-dives on software engineering, systems architecture, and AI.",
    site: "https://www.adjarnor.dev",
    items: sorted.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.date,
      link: `/blog/${article.id}/`,
    })),
  })
}
