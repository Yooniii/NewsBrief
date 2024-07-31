from bs4 import BeautifulSoup
import requests
import newspaper
from Backend.newsapp.articles.decode_url import decode_google_news_url

def scrape(url):
  article = newspaper.article(url)
  print(article.text)
  