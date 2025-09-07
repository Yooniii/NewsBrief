import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Article } from "../card/Card";

// === Config ===
const API_URL = import.meta.env.VITE_FETCH_ARTICLES_ENDPOINT;
const REQUEST_TIMEOUT = 10_000; // 10 seconds
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// News categories and their slice limits 
const CATEGORY_LIMITS: Record<string, number> = {
  "World": 3,
  "Top Stories": 4,
  "Sports": 3,
  "Politics": 10,
};

let articlesCache: ArticlesByCategory | null = null;
let cacheTimestamp = 0;

type ArticlesByCategory = {
  worldNews: Article[];
  sportsNews: Article[];
  topStories: Article[];
  politicalNews: Article[];
};


export const useFetchArticles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<ArticlesByCategory>({
    worldNews: [],
    sportsNews: [],
    topStories: [],
    politicalNews: [],
  });

  useEffect(() => {
    if (!API_URL) {
      setError("API URL is not set");
      return;
    }

    const fetchAllArticles = async () => {
      setIsLoading(true);

      try {
        const now = Date.now();

        // Use cache if still valid
        if (articlesCache && now - cacheTimestamp < CACHE_DURATION) {
          setArticles(articlesCache);
          return;
        }

        console.log('Fetching articles from:', API_URL);
        const { data } = await axios.get<Article[]>(API_URL, {
          timeout: REQUEST_TIMEOUT,
        });
        console.log('Received', data.length, 'articles');

        // Keep only articles with images
        const allArticles = data.filter((a) => a.top_image);

        // Organize into categories based on limits
        const categorized: ArticlesByCategory = {
          worldNews: allArticles
            .filter((a) => a.category === "World")
            .slice(0, CATEGORY_LIMITS["World"]),
          topStories: allArticles
            .filter((a) => a.category === "Top Stories")
            .slice(0, CATEGORY_LIMITS["Top Stories"]),
          sportsNews: allArticles
            .filter((a) => a.category === "Sports")
            .slice(0, CATEGORY_LIMITS["Sports"]),
          politicalNews: allArticles
            .filter((a) => a.category === "Politics")
            .slice(0, CATEGORY_LIMITS["Politics"]),
        };

        // Cache results
        articlesCache = categorized;
        cacheTimestamp = now;

        setArticles(categorized);
      } catch (err) {
        const axiosErr = err as AxiosError;
        setError(axiosErr.message ?? "Failed to fetch articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllArticles();
  }, []);

  return { articles, isLoading, error };
};
