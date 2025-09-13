from concurrent.futures import ThreadPoolExecutor, as_completed
from .utils import summarize, decode_google_news_url, extract_source
from random import shuffle
import newspaper
import feedparser
import os
import json
import logging

logger = logging.getLogger(__name__)


# Open the JSON file containing the RSS urls once
current_directory = os.path.dirname(__file__)
file_path = os.path.join(current_directory, 'rss_feeds.json')

with open(file_path, 'r') as file:
  feeds = json.load(file)

MAX_ARTICLE_COUNT = 4

class BackgroundClass:
  
  @staticmethod
  def extract_article_data(url):
    page = newspaper.article(url)
    page.download()
    page.parse()

    source = extract_source(url)
    
    return (
      source,
      page.publish_date, 
      page.top_image, 
      page.text.replace('\n', ''), 
      page.movies
    )

  @staticmethod
  def process_feed(category, url): 
    from articles.models import Article
   
    logger.info(f"Fetching articles from URL: {url}")
    feed = feedparser.parse(url)
    count = 0

    for entry in feed.entries:
      if count >= MAX_ARTICLE_COUNT:
        break
      
      try: 
        link = entry.link
        if ('news.google' in url):
          link = decode_google_news_url(link)

        source, date, top_image, content, media = BackgroundClass.extract_article_data(link)
        title = entry.title
        summary = summarize(content, title)
        
        # If the summary is valid, create a new Article object in the database
        if (summary.strip() != 'INVALID' and len(content.split(' ')) > 25):
          Article.objects.create(
            title=title,
            date=date,
            source=source,
            article_link=link,
            top_image=top_image, 
            media=media,
            content=content,
            summary=summary,
            category=category 
          )
          count+=1
          logger.info('Successfully added new article')    

      except Exception as e:
        logger.error(f'ERROR processing {entry.get("link", "unknown")}: {e}')
                  
                  
  @staticmethod
  def run_feed_ingestion():
    """
      Manages the concurrent fetching and processing of articles 
      from multiple RSS feed URLs.
    """
    category_url_pairs = []
    for category, url_list in feeds.items():
      for url in url_list:
        category_url_pairs.append((category, url))
    shuffle(category_url_pairs)
    
    logger.info(f"Fetching articles from {len(category_url_pairs)} feeds")
      

    # Use ThreadPoolExecutor to fetch news articles concurrently
    with ThreadPoolExecutor(max_workers=8) as executor:      
      futures = {executor.submit(BackgroundClass.process_feed, cat, url): (cat, url) 
                  for cat, url in category_url_pairs}
        
      # Process the results as they complete
      for future in as_completed(futures):
        category, url = futures[future]
        try:
          future.result()
        except Exception as e:
          logger.error(f'Failed to process feed {category} - {url}: {e}')
      