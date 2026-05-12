const WORDS_PER_MINUTE = 225

export function estimateReadTime(text: string): string {
  const stripped = text
    .replace(/<[^>]*>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const words = stripped.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}
