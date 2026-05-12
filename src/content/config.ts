import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
})

export const collections = { blog }
