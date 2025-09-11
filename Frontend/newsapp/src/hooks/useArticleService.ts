import { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from '../services/articleService';
import { useFetchArticlesProps, Article } from '../types';

/**
 * Hook for fetching articles by category
 * @param category - The category to filter by
 * @param limit - Optional limit on number of articles
 * @returns Object containing articles and loading state
 */
export const useFetchArticlesByCategory = ({category, limit, query} : useFetchArticlesProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      let fetchedArticles = await fetchArticles({category: category, limit: limit});
      if (query) {
        fetchedArticles = fetchedArticles.filter((article: Article) => {
          return article.title.toLowerCase().includes(query) ||
                 article.summary.toLowerCase().includes(query);
        });
      }
      setArticles(fetchedArticles);
      setHasMore(fetchedArticles.length === limit);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { articles, loading, error, hasMore, loadMore: fetchData };
};
