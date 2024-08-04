from rest_framework import serializers
from articles.models import Article

class ArticleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article
    fields = ['title', 'date', 'source', 'article_link', 
              'img_url', 'content', 'summary', 'category']