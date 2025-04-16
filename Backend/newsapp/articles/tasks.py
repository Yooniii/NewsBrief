from articles.models import Article
from concurrent.futures import ThreadPoolExecutor, as_completed
from .summarize import summarize
from .decode_url import decode_google_news_url
from random import shuffle
import newspaper
import feedparser
import json
import os

class BackgroundClass:
  
  @staticmethod
  def scrape(url):
    page = newspaper.article(url)
    page.download()
    page.parse()

    source = newspaper.build(url).brand.upper()
    
    return (
      source,
      page.publish_date, 
      page.top_image, 
      page.text.replace('\n', ''), 
      page.movies)

  @staticmethod
  def fetch_articles(category, url):
    print(f"Fetching articles from URL: {url}")

    count = 0
    feed = feedparser.parse(url)

    for entry in feed.entries:

      if count >= 4:
        break
      
      try: 
        # Scrape the article content 
        link = entry.link

        # if the URL is a Google Redirect link decode it to obtain the OG link
        if ('news.google' in url):
          link = decode_google_news_url(link)

        source, date, top_image, content, media = BackgroundClass.scrape(link)
        title = entry.title
        summary = summarize(content, title)
        
        # If the summary is valid, create a new Article object in the database
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

    # Open the JSON file containing the RSS urls 
    current_directory = os.path.dirname(__file__)
    file_path = os.path.join(current_directory, 'urls.json')

    with open(file_path, 'r') as file:
      urls = json.load(file)

    # Use ThreadPoolExecutor to fetch news articles concurrently
    with ThreadPoolExecutor(max_workers=8) as executor:
      future_to_article = {}
      category_url_pairs = []
      for category, url_list in urls.items():
          for url in url_list:
              category_url_pairs.append((category, url))
      shuffle(category_url_pairs)
        
      for category, link in category_url_pairs:
        future = executor.submit(BackgroundClass.fetch_articles, category, link)
        future_to_article[future] = (category, link)
              
      # Process the results as they complete
      for future in as_completed(future_to_article):
        category, url = future_to_article[future]
        try:
          future.result()
        except Exception as e:
          print(f'Failed to upload {category} - {url}: {e}')
      