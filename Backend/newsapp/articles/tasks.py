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
        decoded_url = decode_google_news_url(entry.link)
        image, content, summary = scrape(decoded_url)
        
        published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %Z')
        formatted_date = published_date.strftime('%Y-%m-%d %H:%M')
        
        Article.objects.update_or_create(
          title=entry.title,

          defaults={
            'title': entry.title.split(' - ')[0],
            'date': formatted_date,
            'source': entry.source.title,
            'article_link': decoded_url,
            'img_url': image,
            'content': content,
            'summary': summary,
            'category': category 
          }
        )
        print('Successfully added new article')
        count+=1
      
      except Exception as e:
        print(f'error{e}')

  @staticmethod
  def upload_data():
    print('uploading..')
    top_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    business_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    tech_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    entertainment_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    sports_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    sci_url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    health_url = 'https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-CA&gl=CA&ceid=CA%3Aen'

    links = {'top_stories': top_url,
              'business': business_url,
              'tech': tech_url,
              'entertainment': entertainment_url,
              'sports': sports_url,
              'science': sci_url,
              'health': health_url
            }
        
    for category in links:
      print(category, links[category])
      BackgroundClass.fetch_articles(category, links[category])

