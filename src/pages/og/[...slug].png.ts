import { getCollection } from "astro:content"
import type { APIRoute } from "astro"
import { renderOgCard } from "@/utils/og-card"

export async function getStaticPaths() {
  const articles = await getCollection("blog", ({ data }) => !data.draft)
  return articles.map((article) => ({
    params: { slug: article.id },
    props: { article },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const article = (props as Record<string, unknown>).article as {
    data: { title: string; subtitle?: string; description: string; image?: string }
  }
  const { title, subtitle, description, image } = article.data
  const png = await renderOgCard({
    title,
    subtitle: subtitle ?? description,
    artPath: image,
  })

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  })
}
