import axios, { AxiosError } from 'axios';
import { FetchArticlesParams, FetchArticlesResponse } from '../types'

// === Config ===
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REQUEST_TIMEOUT = 10_000; // 10 seconds


/**
 * Service function to fetch articles from the backend API
 * @param params - Optional query parameters for filtering and pagination
 * @returns Promise<Article[]> - Array of articles
 */
export const fetchArticles = async (params?: FetchArticlesParams): Promise<FetchArticlesResponse> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params?.category) {
      queryParams.append('category', params.category);
    }
    
    if (params?.query) {
      queryParams.append('search', params.query);
    }
    
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    
    if (params?.page_size) {
      queryParams.append('page_size', params.page_size.toString());
    }

    const url = `${API_BASE_URL}/articles/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    console.log('Fetching articles from:', url);
    
    const response = await axios.get(url, {
      timeout: REQUEST_TIMEOUT,
    });

    const data = response.data    
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error fetching articles:', axiosError.message);
    throw new Error(axiosError.message || 'Failed to fetch articles');
  }
};
