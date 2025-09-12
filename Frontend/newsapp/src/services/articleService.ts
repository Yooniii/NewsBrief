import { FetchArticlesParams, FetchArticlesResponse } from '../types'
import { API_ENDPOINTS, buildApiUrlWithParams } from '../lib/api-config';


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

    const url = buildApiUrlWithParams(API_ENDPOINTS.ARTICLES, queryParams.toString());
    
    console.log('Fetching articles from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};
