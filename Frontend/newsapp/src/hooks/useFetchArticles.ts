import { useFetchArticlesByCategory } from "./useArticleService";
import { ArticlesByCategory } from "../types";

// News categories and their slice limits 
const CATEGORY_LIMITS: Record<string, number> = {
  "World": 3,
  "Top Stories": 4,
  "Sports": 3,
  "Politics": 10,
};


export const useFetchArticles = () => {
  const worldHook = useFetchArticlesByCategory({category: "World", limit: CATEGORY_LIMITS["World"]});
  const topStoriesHook = useFetchArticlesByCategory({category: "Top Stories", limit: CATEGORY_LIMITS["Top Stories"]});
  const sportsHook = useFetchArticlesByCategory({category: "Sports", limit: CATEGORY_LIMITS["Sports"]});
  const politicsHook = useFetchArticlesByCategory({category: "Politics", limit: CATEGORY_LIMITS["Politics"]});

  const isLoading = worldHook.loading || topStoriesHook.loading || sportsHook.loading || politicsHook.loading;
  const error = worldHook.error || topStoriesHook.error || sportsHook.error || politicsHook.error;

  const articles: ArticlesByCategory = {
    worldNews: worldHook.articles,
    topStories: topStoriesHook.articles,
    sportsNews: sportsHook.articles,
    politicalNews: politicsHook.articles,
  };

  return { articles, isLoading, error };
};
