import feedparser
from articles.models import Article
from .decode_url import decode_google_news_url
from .scrape import scrape
from datetime import datetime

class BackgroundClass:

  @staticmethod
  def fetch_articles(category, url):
    feed = feedparser.parse(url)
    count = 0

    for entry in feed.entries:
      if count >= 10:
        break

      try: 
        if not Article.objects.filter(article_link=decoded_url).exists():
          decoded_url = decode_google_news_url(entry.link)
          date, image, content, summary = scrape(decoded_url)
        
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
        
        else:
          break
      
      except Exception as e:
        print(f'error{e}')
      
    count = 0

  @staticmethod
  def upload_data():

    top_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    business_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    tech_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    entertainment_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    sports_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    sci_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    health_url = 'https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-CA&gl=CA&ceid=CA%3Aen'

    urls = {'Top Stories': top_url,
              'Business': business_url,
              'Tech': tech_url,
              'Entertainment': entertainment_url,
              'Sports': sports_url,
              'Science': sci_url,
              'Health': health_url
            }
        
    for category, url in urls.items():
      BackgroundClass.fetch_articles(category, url)
