from articles.models import Article
from concurrent.futures import ThreadPoolExecutor, as_completed
from .scrape import scrape
from .summarize import summarize
from .decode_url import decode_google_news_url
import feedparser
import json
import os

def save_article_to_db(article_data):
  """
    Adds the article to the database.
  """
  try:
    Article.objects.create(
      title=article_data["title"],
      date=article_data["date"],
      source=article_data["source"],
      article_link=article_data["link"],
      top_image=article_data["top_image"],
      media=article_data["media"],
      content=article_data["content"],
      summary=article_data["summary"],
      category=article_data["category"],
    )
    print(f"Successfully saved article: {article_data['title']}")
      
  except Exception as e:
    print(f"ERROR saving article to Database: {e}")


def add_summary(article):
  article["summary"] = summarize(article["content"], article["title"])


def fetch_article_data(entry, category, url):
    try:
      link = entry.link
      
      if 'news.google' in url:  # Decode URL if a Google Redirect link
        link = decode_google_news_url(link)

      source, date, top_image, content, media = scrape(link)
      title = entry.title

      if len(content.split(' ')) > 25:  # Ensure scraped text is valid
        return {
          "title": title,
          "date": date,
          "source": source,
          "link": link,
          "top_image": top_image,
          "media": media,
          "content": content,
          "category": category,
        }
      
    except Exception as e:
      print(f"ERROR processing article: {e}")
    return None
  

def fetch_articles(category, url):
  """
    Fetches articles from a given RSS feed and processes them.
  """
  
  print(f"Fetching articles from URL: {url}")
  feed = feedparser.parse(url)
  summarized_articles = []
  articles_to_process = []
  valid_article_count = 0

  for entry in feed.entries:
    if (valid_article_count >= 4): break

    else: 
      article_data = fetch_article_data(entry, category, url)

    if article_data:
      articles_to_process.append(article_data)
      valid_article_count += 1

  # Parallelize summarization with ThreadPoolExecutor
  with ThreadPoolExecutor() as executor:
    summarized_articles = list(executor.map(add_summary, articles_to_process))

  # Save summarized articles to the database
  for article in summarized_articles:
    save_article_to_db(article)


def upload_data():
  """
    Fetches and processes articles from multiple RSS feed URLs concurrently.
  """
  # Load JSON file containing RSS URLs
  current_directory = os.path.dirname(__file__)
  file_path = os.path.join(current_directory, 'urls.json')

  with open(file_path, 'r') as file:
    file = json.load(file)
    
  # Use ThreadPoolExecutor to fetch articles from feeds
  with ThreadPoolExecutor(max_workers=10) as executor:
    future_to_category_url = {}

    for category, urls in file.items():
      for url in urls:
        future = executor.submit(fetch_articles, category, url)
        future_to_category_url[future] = (category, url)
            
      for future in as_completed(future_to_category_url):
        article_type, link = future_to_category_url[future]
        try:
          future.result()      
          # print(f"Successfully processed articles for {article_type} from {link}")
        except Exception as e:
          print(f"Failed to process {article_type} - {link}: {e}")

