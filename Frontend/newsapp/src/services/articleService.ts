import axios, { AxiosError } from 'axios';
import { FetchArticlesParams, FetchArticlesResponse, Article } from '../types'

// === Config ===
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REQUEST_TIMEOUT = 10_000; // 10 seconds


/**
 * Service function to fetch articles from the backend API
 * @param params - Optional query parameters for filtering and pagination
 * @returns Promise<Article[]> - Array of articles
 */
export const fetchArticles = async (params?: FetchArticlesParams): Promise<Article[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.category) {
      queryParams.append('category', params.category);
    }
    
    if (params?.search) {
      queryParams.append('search', params.search);
    }
    
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const url = `${API_BASE_URL}/articles/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    console.log('Fetching articles from:', url);
    
    const response = await axios.get<Article[] | FetchArticlesResponse>(url, {
      timeout: REQUEST_TIMEOUT,
    });

    // Handle both paginated and non-paginated responses
    const articles = Array.isArray(response.data) 
      ? response.data 
      : (response.data as FetchArticlesResponse).results;

    console.log('Received', articles.length, 'articles');
    
    return articles;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error fetching articles:', axiosError.message);
    throw new Error(axiosError.message || 'Failed to fetch articles');
  }
};
