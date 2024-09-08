from articles.models import Article
from concurrent.futures import ThreadPoolExecutor, as_completed
from .decode_url import decode_google_news_url
from .scrape import scrape
from .summarize import summarize
from urllib.request import ProxyHandler
import feedparser
from urllib.request import ProxyHandler
import json
import os

class BackgroundClass:
  """
  A class to handle background tasks related to fetching and uploading articles
  """

  @staticmethod
  def fetch_articles(category, url):
    """
    Fetch articles from a given RSS feed URL, scrape them, and save them to the 
    database.

    Args:
      category (str): The category of the articles to fetch
      url (str): The RSS feed URL to fetch articles from.
    
    Returns:
      None
    """

    print(f"Fetching articles from URL: {url}")

    count = 0

    feed = feedparser.parse(url)

    for entry in feed.entries:
      # Fetch only ten articles from the Feed at a time
      if count >= 3:
        break
      
      try: 
        
        # Scrape the article content and summarize it
        # decoded_url = decode_google_news_url(entry.link) 
        # print(f"DECODED URL: {decoded_url}")  
        
        source, date, top_image, content, media = scrape(entry.link)
        title = entry.title
        summary = summarize(content, title)
        
        # If the summary is valid, save the article to the database
        if summary.strip() != 'INVALID':
          Article.objects.create(
            title=title,
            date=date,
            source=source,
            article_link=entry.link,
            top_image=top_image, 
            media=media,
            content=content,
            summary=summary,
            category=category 
          )

          count+=1
          print('Successfully added new article')    

      except Exception as e:
        print(f'ERROR: error{e}')
                  
    count = 0

  @staticmethod
  def upload_data():
    """
      Wrapper function that calls fetch_articles() concurrently for multiple news
      categories.

      Returns: 
        None
    """

    current_directory = os.path.dirname(__file__)
    file_path = os.path.join(current_directory, 'urls.json')

    with open(file_path, 'r') as file:
      urls = json.load(file)

    
    # Use ThreadPoolExecutor to fetch news articles from 7 categories at a time
    with ThreadPoolExecutor(max_workers=5) as executor:
      for category, url_arr in urls.items():
        for url in url_arr:
          executor.submit(BackgroundClass.fetch_articles, category, url)

