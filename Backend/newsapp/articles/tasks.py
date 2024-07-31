import feedparser
import newspaper
from django.core.management.base import BaseCommand
from articles.models import Article
from .decode_url import decode_google_news_url
from datetime import datetime
from celery import shared_task

@shared_task
def fetch_articles(self, *args, **kwargs):
  url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
  feed = feedparser.parse(url)
  
  for entry in feed.entries:
    decoded_url = decode_google_news_url(entry.link)
    published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %Z')
    formatted_date = published_date.strftime('%Y-%m-%d %H:%M')
    content = newspaper.article(decoded_url).text
 
    article,created = Article.objects.update_or_create(
      title=entry.title,
      defaults={
        'title': entry.title,
        'date': formatted_date,
        'source': entry.source.title,
        'article_link': decoded_url,
        'img_url': entry.link,
        'content': content 
      }
    )
    print('Successfully added new articles')
    return
      
      # if not Article.objects.filter(title=entry.title).exists():
      
      #   published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %Z')
      #   formatted_date = published_date.strftime('%Y-%m-%d %H:%M')
      #   content = newspaper.article(decoded_url).text

      #   article = Article(
      #   title=entry.title,
      #   date=formatted_date,
      #   source=entry.source.title,
      #   article_link=decoded_url,
      #   img_url=entry.link,
      #   content=content
      #   )
      #   article.save()
