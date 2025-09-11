import { useState, useEffect, useCallback } from 'react';
import { fetchArticles } from '../services/articleService';
import { useFetchArticlesProps, Article } from '../types';

/**
 * Hook for fetching articles by a specific category. Wraps the fetchArticles service.
 * @param category - The category to filter by
 * @param query - User query
 * @param pageSize
 * @returns Object containing articles and loading state
 */
export const useFetchArticlesByCategory = ({category, query, pageSize = 10} : useFetchArticlesProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (reset = false) => {
    if (loading) return; // Prevent multiple simultaneous requests
    setLoading(true);
    setError(null);

    try {
      const currentPage = reset ? 1 : page;
      const fetchedData = await fetchArticles({
        category,
        query: query,
        page: currentPage,
        page_size: pageSize,
      });

      const fetchedArticles = fetchedData.results;

      if (reset) {
        setArticles(fetchedArticles);
        setPage(2); // Next page to fetch
      } else {
        setArticles(prev => [...prev, ...fetchedArticles]);
        setPage(prev => prev + 1);
      }

      setHasMore(fetchedData.has_more);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  }, [category, query, page, pageSize, loading]);

  // Initial load or reset when category/query changes
  useEffect(() => {
    setArticles([]);
    setHasMore(true);
    setPage(1);
    fetchData(true);
  }, [category, query]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(false);
    }
  }, [loading, hasMore, fetchData]);

  return { articles, loading, error, hasMore, loadMore };
};