from rest_framework import serializers
from articles.models import Article

class ErrorResponseSerializer(serializers.Serializer):
  """Error response schema"""
  error = serializers.CharField(
    help_text="Error message describing what went wrong"
  )


# Article Serializers
class ArticleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article
    fields = '__all__' # include all fields

class ArticleListResponseSerializer(serializers.Serializer):
  """Response schema for article list endpoint"""
  results = ArticleSerializer(many=True, help_text="List of articles")
  has_more = serializers.BooleanField(help_text="Whether there are more pages available")
  count = serializers.IntegerField(help_text="Total number of articles matching the query")
  next = serializers.URLField(allow_null=True, help_text="URL for next page of results")
  previous = serializers.URLField(allow_null=True, help_text="URL for previous page of results")

# Query Parameter Serializers
class ArticleFilterSerializer(serializers.Serializer):
  """Query parameters for article filtering"""
  category = serializers.CharField(
    max_length=100,
    required=False,
    help_text="Filter by article category (e.g., 'World', 'Sports', 'Politics')"
  )
  query = serializers.CharField(
    max_length=200,
    required=False,
    help_text="Search query to filter articles by title and summary"
  )
  page = serializers.IntegerField(
    min_value=1,
    required=False,
    help_text="Page number for pagination"
  )
  page_size = serializers.IntegerField(
    min_value=1,
    max_value=50,
    required=False,
    help_text="Number of articles per page (max 50)"
  )
  
  
  
# Text Serializers
class TextRequestSerializer(serializers.Serializer):
  """Request schema for explanation, definition, and custom search endpoint"""
  text = serializers.CharField(
    max_length=500, 
    help_text="Word or phrase to define",
    required=True
  )

class TextResponseSerializer(serializers.Serializer):
  """Standard AI response schema"""
  response = serializers.CharField(
    help_text="AI generated response text"
  )
