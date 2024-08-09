from articles.models import Article
from newscatcherapi import NewsCatcherApiClient
from rest_framework.decorators import api_view
from rest_framework.response import Response
from concurrent.futures import ThreadPoolExecutor, as_completed
from .decode_url import decode_google_news_url
from .scrape import scrape
from .summarize import summarize
import feedparser
import requests
import os
import concurrent.futures

class BackgroundClass:

  @staticmethod
  def fetch_articles(category, url):
    print(f"Fetching articles from URL: {url}")

    count = 0
    feed = feedparser.parse(url)

    for entry in feed.entries:
      if count >= 10:
        break

      try: 
        decoded_url = decode_google_news_url(entry.link)
        date = scrape(decoded_url, 'date')
        image = scrape(decoded_url, 'image')
        content = scrape(decoded_url, 'content')
        summary = summarize(content)
          
        Article.objects.create(
          title=entry.title.split(' - ')[0],
          date=date,
          source=entry.source.title,
          article_link=decoded_url,
          img_url=image,
          content=content,
          summary=summary,
          category=category 
        )
        count+=1
        print('Successfully added new article')    
        
      except Exception as e:
        print(f'error{e}')
            
    count = 0

  @staticmethod
  def upload_data():
    urls = {
      'Top Stories': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'World': 'https://news.google.com/topics/rss/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'Business': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'Tech': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'Entertainment': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'Politics': 'https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNRFZ4ZERBU0JXVnVMVWRDS0FBUAE?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'Sports': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'Science': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
      'Health': 'https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-CA&gl=CA&ceid=CA%3Aen'
    }
    
    with ThreadPoolExecutor(max_workers=8) as executor:
      future_to_article = {
        executor.submit(BackgroundClass.fetch_articles, category, url): 
        category for category, url in urls.items()
      }

      for future in concurrent.futures.as_completed(future_to_article):
        article = future_to_article[future]
        try:
          future.result()
        except Exception as e:
          print(f'Failed to upload data for {article} {e}')

