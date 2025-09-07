import axios from "axios";

import { useState, useEffect } from "react";
import { Article } from "../card/Card";
import { AxiosError } from "axios";

// Custom hook to fetch articles for the home page
export const useFetchArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState({
    worldNews: [] as Article[],
    sportsNews: [] as Article[],
    topStories: [] as Article[],
    politicalNews: [] as Article[],
  });

  const fetchArticles = async (category: string, articleCount: number) => {
    try {
      console.log('Fetching articles for category:', category);
      const response = await axios.get('http://127.0.0.1:8000/articles/');
      const articles = response.data
        .filter((article: Article) => article.category === category && article.top_image)
        .slice(0, articleCount)
      return articles;

    } catch (error) {
      console.error('Error fetching articles:', error);
      setError((error as AxiosError).message);
      return [];
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchAllArticles = async () => {
    const [worldNews, topStories, sportsNews, politicalNews] = await Promise.all([
      fetchArticles('World', 3),
      fetchArticles('Top Stories', 3),
      fetchArticles('Sports', 3),
      fetchArticles('Politics', 10),
    ]);

    setArticles({ worldNews, sportsNews, topStories, politicalNews });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllArticles();
  }, []);

  return { articles, isLoading, error };
};