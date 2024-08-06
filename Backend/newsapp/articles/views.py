from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Article
from .serializers import ArticleSerializer

@api_view(['GET'])
def fetch_articles(request):
  data = Article.objects.all().order_by('-date')
  serializer = ArticleSerializer(data, context={'request': request}, many=True)
  return Response(serializer.data)