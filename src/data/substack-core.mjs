import { XMLParser } from "fast-xml-parser"

export const FEED_URL = "https://bernardkirkadjanorkatamanso.substack.com/feed"

const WORDS_PER_MINUTE = 200
const parser = new XMLParser({
  ignoreAttributes: false,
})

const toArray = (value) => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const decodeHtmlEntities = (str) =>
  str
    .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(Number(c)))
    .replace(/&#x([0-9a-f]+);/gi, (_, c) => String.fromCharCode(Number.parseInt(c, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

const stripHtml = (input) =>
  input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const estimateReadTime = (text) => {
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${minutes} min`
}

const normalizeItem = (item) => {
  const title = item.title || "Untitled"
  const href = item.link || "#"
  const pubDate = item.pubDate ? new Date(item.pubDate) : new Date()
  const date = pubDate.toISOString().slice(0, 10)
  const content = item["content:encoded"] || ""
  const description = item.description || ""
  const enclosureUrl = item.enclosure?.["@_url"] || item.enclosure?.["@_href"]
  const excerptSource = decodeHtmlEntities(description || stripHtml(content))
  const excerpt = excerptSource.slice(0, 200)
  const readTime = estimateReadTime(stripHtml(content || description))

  return {
    title: decodeHtmlEntities(title),
    date,
    excerpt,
    href,
    readTime,
    image: enclosureUrl,
  }
}

export const parseSubstackFeed = (xml) => {
  const data = parser.parse(xml)
  const items = toArray(data?.rss?.channel?.item)

  return items
    .map(normalizeItem)
    .filter((article) => article.href !== "#")
    .sort((a, b) => b.date.localeCompare(a.date))
}
