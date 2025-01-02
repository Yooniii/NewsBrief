from articles.models import Article
from concurrent.futures import ThreadPoolExecutor, as_completed
from .scrape import scrape
from .summarize import summarize
from .decode_url import decode_google_news_url
import feedparser
import json
import os

class BackgroundClass:
  """
  A class to handle background tasks related to fetching and uploading articles
  """

  @staticmethod
  def fetch_articles(category, url):
    """
    Fetches articles from a given RSS feed URL, scrapes them, and save them to 
    the Django database.

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

      if count >= 4:
        break
      
      try: 
        # Scrape the article content 
        link = entry.link

        # Decode URL if it's a Google Redirect link 
        if ('news.google' in url):
          link = decode_google_news_url(link)

        source, date, top_image, content, media = scrape(link)
        title = entry.title
        summary = summarize(content, title)
        
        # If valid summary, create a new Article object in the database
        if (
          summary.strip() != 'INVALID' and 
          len(content.split(' ')) > 25 
        ):
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
          print('Successfully added new article')    

      except Exception as e:
        print(f'ERROR: error{e}')
                  
    count = 0

  @staticmethod
  def upload_data():
    """
      Manages the concurrent fetching and processing of articles from multiple
      RSS feed URLs.

      Returns: 
        None
    """

    # Open JSON file containing the RSS urls 
    current_directory = os.path.dirname(__file__)
    file_path = os.path.join(current_directory, 'urls.json')

    with open(file_path, 'r') as file:
      urls = json.load(file)

    # Use ThreadPoolExecutor to fetch news articles concurrently
    with ThreadPoolExecutor(max_workers=8) as executor:
      future_to_article = {}

      max_len = max(len(url_list) for url_list in urls.values())

      for i in range(max_len):
        
        for category, url_list in urls.items():
            # For each URL submit a task to the executor
            # executor.submit schedules the task to be executed by one of the threads
            # Each submitted task returns a Future object representing the ongoing task
            link = url_list[i]
            future = executor.submit(BackgroundClass.fetch_articles, category, link)
            future_to_article[future] = (category, link)
              
        # Process results as they complete
      for future in as_completed(future_to_article):
        category, url = future_to_article[future]
        try:
          future.result()
        except Exception as e:
          print(f'Failed to upload {category} - {url}: {e}')
      

