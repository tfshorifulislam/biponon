export type DocCalloutType = "info" | "tip" | "warning";

export interface DocStep {
  stepNumber: number;
  title: string;
  description: string;
  details?: string[];
}

export interface DocSection {
  id: string;
  title: string;
  content: string[];
  bullets?: string[];
  steps?: DocStep[];
  callout?: {
    type: DocCalloutType;
    title?: string;
    text: string;
  };
  example?: {
    title: string;
    scenario: string;
    outcome: string;
  };
  troubleshooting?: {
    problem: string;
    solution: string;
  }[];
  tips?: string[];
  codeSnippet?: {
    label: string;
    code: string;
  };
}

export interface DocArticle {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  readTime: string;
  badge?: string;
  sections: DocSection[];
  relatedArticleIds?: string[];
}

export interface DocCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  articles: DocArticle[];
}

export interface SearchResult {
  articleId: string;
  categoryId: string;
  categoryName: string;
  title: string;
  description: string;
  matchedSnippet?: string;
}
