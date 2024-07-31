# import requests
# import os
# import aiohttp
# import asyncio
# import time
# import feedparser
# from dotenv import load_dotenv
# from adrf.decorators import api_view
# from rest_framework.response import Response
# from .summarizer import summarize
# from .decode_url import decode_google_news_url
# from articles.models import Article
# from articles.serializer import ArticleSerializer

# API_KEY = os.getenv('API_KEY')
  

# @api_view(['GET'])
# def retrieve_headlines(request):

#   url = f'https://news.google.com/rss/topics/
#   CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?
#   hl=en-CA&gl=CA&ceid=CA%3Aen'
#   feed = feedparser.parse(url)
  
#   if feed.entries:
#     news_list = []
#     for entry in feed.entries:
#       url = decode_google_news_url(entry.link)

#       # Create or update the Article instance
    
#           'title': entry.title,
#           'date': entry.published,
#           'source': entry.source.title,
#           'img_url': entry.link,
#           'content': 'null'  
#         }
#       )

#       news_list.append(article)

#       serializer = ArticleSerializer(news_list, many=True)
#       return Response({'status': 'ok', 'news': serializer.data})

# from django.shortcuts import render
# from articles.models import Article

# def news_list(request):
#   articles = Article.objects.all()
#   return render(request, 'book_list.html', {'Articles': articles})