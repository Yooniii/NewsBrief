from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.db.models import Q
from django.conf import settings
from google.generativeai import GenerativeModel
import google.generativeai as genai
from .models import Article
from .prompts import (
    CUSTOM_SEARCH_PROMPT,
    DEFINITION_PROMPT,
    EXPLANATION_PROMPT
)
from .serializers import (
    ArticleSerializer, 
    TextResponseSerializer,
    TextRequestSerializer,
    ArticleFilterSerializer
)

# Configure Google Generative AI
genai.configure(api_key=settings.GENAI_API_KEY)
model = GenerativeModel('gemini-1.5-flash')



class ArticlePagination(PageNumberPagination):
  page_size = 1
  page_size_query_param = 'page_size'
  max_page_size = 50

@api_view(['GET'])
def fetch_articles(request):
  """
  Fetch articles with optional filtering by category, search query, and pagination.
  
  Query Parameters (ArticleFilterSerializer):
  - category (str, optional): Filter by article category (e.g., 'World', 'Sports', 'Politics')
  - query (str, optional): Search query to filter articles by title and summary (max 200 chars)
  - page (int, optional): Page number for pagination (min: 1)
  - page_size (int, optional): Number of articles per page (min: 1, max: 50)
  """
  # Validate query parameters
  filter_serializer = ArticleFilterSerializer(data=request.GET)
  if not filter_serializer.is_valid():
    return Response(
      {"error": "Invalid query parameters", "details": filter_serializer.errors}, 
      status=status.HTTP_400_BAD_REQUEST
    )
  
  validated_data = filter_serializer.validated_data
  queryset = Article.objects.all().order_by('-date')
  
  # Filter articles by category if provided
  category = validated_data.get('category')
  if category:
    queryset = queryset.filter(category=category)
  
  # Search for a specific user query if provided
  search_query = validated_data.get('query')
  if search_query:
    queryset = queryset.filter(
      Q(title__icontains=search_query) | 
      Q(summary__icontains=search_query)
    )
  
  # Pagination to support infinite scrolling on the frontend
  paginator = ArticlePagination()
  result_page = paginator.paginate_queryset(queryset, request)
  serializer = ArticleSerializer(result_page, many=True)
  
  has_more = paginator.page.has_next() if result_page else False

  return Response({
    "results": serializer.data,
    "has_more": has_more,
    "count": paginator.page.paginator.count,
    "next": paginator.get_next_link(),
    "previous": paginator.get_previous_link()
  })


# Endpoints for Frontend Bubble Menu feature
@api_view(['POST'])
def request_definition(request):
  """
  Request a definition for a given word or phrase.
  """
  try:
    # Validate request data
    serializer = TextRequestSerializer(data=request.data)
    if not serializer.is_valid():
      return Response(
        {"error": "Invalid request data", "details": serializer.errors}, 
        status=status.HTTP_400_BAD_REQUEST
      )
    
    text = serializer.validated_data['text']
    prompt = DEFINITION_PROMPT(text=text)
    
    try:
      result = model.generate_content(prompt)
      response_text = result.text
    except Exception as e:
      response_text = "Sorry, I couldn't generate a definition at this time."
    
    response_serializer = TextResponseSerializer({"response": response_text})
    return Response(response_serializer.data, status=status.HTTP_200_OK)
    
  except Exception as e:
    return Response({"error": "Internal server error"}, status=e.status_code)

@api_view(['POST'])
def request_explanation(request):
  """
  Request an explanation for a given text or concept.
  """
  try:
    # Validate request data
    serializer = TextRequestSerializer(data=request.data)
    if not serializer.is_valid():
      return Response(
        {"error": "Invalid request data", "details": serializer.errors}, 
        status=status.HTTP_400_BAD_REQUEST
      )
    
    text = serializer.validated_data['text']
    prompt = EXPLANATION_PROMPT(text=text)
    
    try:
      result = model.generate_content(prompt)
      response_text = result.text
    except Exception as e:
      response_text = "Sorry, I couldn't generate an explanation at this time."
    
    response_serializer = TextResponseSerializer({"response": response_text})
    return Response(response_serializer.data, status=status.HTTP_200_OK)
    
  except Exception as e:
    return Response({"error": "Internal server error"}, status=e.status_code)
  
@api_view(['POST'])
def custom_search(request):
  """
  Request a custom prompt to the AI model.
  """
  try:
    # Validate request data
    serializer = TextRequestSerializer(data=request.data)
    if not serializer.is_valid():
      return Response(
        {"error": "Invalid request data", "details": serializer.errors}, 
        status=status.HTTP_400_BAD_REQUEST
      )
    
    # For custom search, we expect 'text' field which contains the user prompt
    # and optionally selected text context
    user_prompt = serializer.validated_data.get('prompt', serializer.validated_data['text'])
    selected_text = serializer.validated_data.get('text', '')
    full_prompt = CUSTOM_SEARCH_PROMPT(user_prompt=user_prompt, selected_text=selected_text)
    
    try:
      result = model.generate_content(full_prompt)
      response_text = result.text
    except Exception as e:
      response_text = "Sorry, I couldn't generate a response at this time."
    
    response_serializer = TextResponseSerializer({"response": response_text})
    return Response(response_serializer.data, status=status.HTTP_200_OK)
    
  except Exception as e:
    return Response({"error": "Internal server error"}, status=e.status_code)