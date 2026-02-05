import { XMLParser } from "fast-xml-parser";
import type { Article } from "./articles";
import { articles as fallbackArticles } from "./articles";

const FEED_URL = "https://bernardkirkadjanorkatamanso.substack.com/feed";
const WORDS_PER_MINUTE = 200;
const CACHE_TTL_MS = 15 * 60 * 1000;

const parser = new XMLParser({
  ignoreAttributes: false,
});

let cachedArticles: Article[] | null = null;
let cachedAt = 0;

const toArray = <T,>(value: T | T[] | undefined | null): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const stripHtml = (input: string) =>
  input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const estimateReadTime = (text: string) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
};

const normalizeItem = (item: Record<string, any>): Article => {
  const title = item.title || "Untitled";
  const href = item.link || "#";
  const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
  const date = pubDate.toISOString().slice(0, 10);
  const content = item["content:encoded"] || "";
  const description = item.description || "";
  const enclosureUrl = item.enclosure?.["@_url"] || item.enclosure?.["@_href"];
  const excerptSource = description || stripHtml(content);
  const excerpt = excerptSource.slice(0, 200);
  const readTime = estimateReadTime(stripHtml(content || description));

  return {
    title,
    date,
    excerpt,
    href,
    readTime,
    image: enclosureUrl,
  };
};

export const getSubstackArticles = async (limit?: number): Promise<Article[]> => {
  const now = Date.now();
  if (cachedArticles && now - cachedAt < CACHE_TTL_MS) {
    return typeof limit === "number"
      ? cachedArticles.slice(0, limit)
      : cachedArticles;
  }

  try {
    const response = await fetch(FEED_URL);
    if (!response.ok) {
      throw new Error(`Failed to load feed: ${response.status}`);
    }
    const xml = await response.text();
    const data = parser.parse(xml);
    const items = toArray<Record<string, string>>(data?.rss?.channel?.item);
    const articles = items
      .map(normalizeItem)
      .filter((article) => article.href !== "#")
      .sort((a, b) => b.date.localeCompare(a.date));

    cachedArticles = articles;
    cachedAt = now;

    return typeof limit === "number" ? articles.slice(0, limit) : articles;
  } catch (error) {
    console.warn("Substack feed fetch failed, using fallback articles.", error);
    return typeof limit === "number"
      ? fallbackArticles.slice(0, limit)
      : fallbackArticles;
  }
};
