import feedparser
from articles.models import Article
from .decode_url import decode_google_news_url
from .scrape import scrape
from datetime import datetime

class BackgroundClass:
  @staticmethod
  def fetch_articles():
    url = 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen'
    feed = feedparser.parse(url)

    for entry in feed.entries:
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
            'summary': summary 
          }
        )
        print('Successfully added new articles')
      
      except:
        print('error')
