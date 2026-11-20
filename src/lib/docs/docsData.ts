import { DOCS_CATEGORIES_EN } from "./docsDataEn";
import { DOCS_CATEGORIES_BN } from "./docsDataBn";
import { DocArticle, DocCategory, SearchResult } from "./types";
import { Language } from "../i18n/types";

export function getDocsCategories(lang: Language = "en"): DocCategory[] {
  return lang === "bn" ? DOCS_CATEGORIES_BN : DOCS_CATEGORIES_EN;
}

export function getAllArticles(lang: Language = "en"): DocArticle[] {
  const categories = getDocsCategories(lang);
  return categories.flatMap((cat) => cat.articles);
}

export function getDocArticle(
  id: string,
  lang: Language = "en"
): DocArticle | undefined {
  const all = getAllArticles(lang);
  return all.find((art) => art.id.toLowerCase() === id.toLowerCase());
}

export function getAdjacentArticles(
  currentId: string,
  lang: Language = "en"
): { prev?: DocArticle; next?: DocArticle } {
  const all = getAllArticles(lang);
  const index = all.findIndex(
    (art) => art.id.toLowerCase() === currentId.toLowerCase()
  );
  if (index === -1) return {};

  return {
    prev: index > 0 ? all[index - 1] : undefined,
    next: index < all.length - 1 ? all[index + 1] : undefined,
  };
}

export function searchDocs(
  query: string,
  lang: Language = "en"
): SearchResult[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const all = getAllArticles(lang);
  const results: SearchResult[] = [];

  for (const article of all) {
    const titleMatch = article.title.toLowerCase().includes(clean);
    const descMatch = article.description.toLowerCase().includes(clean);
    let matchedSnippet = "";

    if (!titleMatch && !descMatch) {
      // Check inside sections content, bullets, steps, troubleshooting
      for (const sec of article.sections) {
        const textContent = sec.content.join(" ");
        const idx = textContent.toLowerCase().indexOf(clean);
        if (idx !== -1) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(textContent.length, idx + clean.length + 60);
          matchedSnippet = "..." + textContent.substring(start, end).trim() + "...";
          break;
        }

        if (sec.bullets) {
          const matchedBullet = sec.bullets.find((b) =>
            b.toLowerCase().includes(clean)
          );
          if (matchedBullet) {
            matchedSnippet = matchedBullet;
            break;
          }
        }
      }
    }

    if (titleMatch || descMatch || matchedSnippet) {
      results.push({
        articleId: article.id,
        categoryId: article.categoryId,
        categoryName: article.categoryName,
        title: article.title,
        description: article.description,
        matchedSnippet: matchedSnippet || undefined,
      });
    }
  }

  return results;
}
