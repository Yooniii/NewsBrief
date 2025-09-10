from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from .models import Article
from .serializers import ArticleSerializer

class ArticlePagination(PageNumberPagination):
  page_size = 20
  page_size_query_param = 'page_size'
  max_page_size = 100

@api_view(['GET'])
def fetch_articles(request):
  """
  Fetch articles with optional filtering by category, search query, and pagination.
  
  Query Parameters:
  - category: Filter by article category (e.g., 'World', 'Sports', 'Politics')
  - search: Search in title and summary
  - limit: Number of articles to return (default: 20, max: 100)
  - page: Page number for pagination
  """
  queryset = Article.objects.all().order_by('-date')
  
  # Filter by category if provided
  category = request.GET.get('category')
  if category:
    queryset = queryset.filter(category=category)
  
  # Search in title and summary if provided
  search_query = request.GET.get('search')
  if search_query:
    queryset = queryset.filter(
        Q(title__icontains=search_query) | 
        Q(summary__icontains=search_query)
    )
  
  # Handle limit parameter for simple cases (like home page)
  limit = request.GET.get('limit')
  if limit and not request.GET.get('page'):
    try:
      limit = min(int(limit), 100)  # Cap at 100
      queryset = queryset[:limit]
      serializer = ArticleSerializer(queryset, many=True)
      return Response(serializer.data)
    except ValueError:
      pass  # Fall through to pagination
  
  # Use pagination for larger result sets
  paginator = ArticlePagination()
  result_page = paginator.paginate_queryset(queryset, request)
  serializer = ArticleSerializer(result_page, many=True)
  return paginator.get_paginated_response(serializer.data)
