export interface Article { 
  key: string;
  title: string;
  date: string;
  source: string;
  top_image: string;
  media: string;
  article_link: string;
  summary: string;
  category: string;
}

export type ArticlesByCategory = {
  worldNews: Article[];
  sportsNews: Article[];
  topStories: Article[];
  politicalNews: Article[];
};

export type ArticleCardProps = {
  article: Article;
};

export interface useFetchArticlesProps {
  category: string;
  pageSize?: number;
  query?: string | null | undefined
}

export interface FetchArticlesParams {
  category?: string;
  query?: string | null | undefined;
  page?: number;
  page_size?: number;
}

export interface FetchArticlesResponse {
  results: Article[];
  has_more: boolean;
  count: number;
  next: string;
  previous: string;
}
