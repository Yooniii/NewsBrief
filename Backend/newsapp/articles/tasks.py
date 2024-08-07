import feedparser
from articles.models import Article
from .decode_url import decode_google_news_url
from .scrape import scrape

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
      
      except Exception as e:
        print(f'error{e}')
      
    count = 0

  @staticmethod
  def upload_data():
    urls = {'Top Stories': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
              'Business': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
              'Tech': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
              'Entertainment': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
              'Sports': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
              'Science': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
              'Health': 'https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-CA&gl=CA&ceid=CA%3Aen'
            }
        
    for category, url in urls.items():
      BackgroundClass.fetch_articles(category, url)
