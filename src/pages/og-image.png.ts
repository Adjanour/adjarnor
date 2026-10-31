import type { APIRoute } from "astro"
import { renderOgCard } from "@/utils/og-card"

export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    title: "Bernard Katamanso",
    subtitle: "Engineer and Pan-Africanist building purposeful systems and tools from Ghana.",
    artPath: "src/assets/og-portrait.png",
  })

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  })
}
