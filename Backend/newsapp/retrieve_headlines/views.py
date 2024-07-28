import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from newspaper import Article
from newscatcherapi import NewsCatcherApiClient
from rest_framework.response import Response
from bs4 import BeautifulSoup
from .button_views import get_selection
from .decode_url import decode_google_news_url
from .summarizer import summarize
import json


def scrape_content(url):
  links = []
  
  if 'article.wn' in url:
    page = requests.get(url).text
    soup = BeautifulSoup(page, 'html.parser')

    target_text = soup.find('p', class_='art-text')
    url = target_text.find('a').get('href')
    # target_urls = target_text.find_all('a')

    # for link in target_urls:
    #     print(link)
    #     if 'read' in link.text: 
    #       url = link
    #       print(url)
    #       break

  try:
    content = Article(url)
    content.download()
    content.parse()
    return content.text.replace('\n', '')
  
  except Exception as e:
    return 'null'

@api_view(['GET', 'POST'])
def retrieve_headlines(request):
  data = request.data

  url = f'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&lang=en&page_size=10'

  headers = {
  'x-api-key': 'wVzi0kzFbYITxUWFWoEH-fTdxdQ7UARpdoQqXlEtf9k'  
}

  response = requests.request("GET", url, headers=headers)

  if response.status_code == 200:
    data = response.json()
    articles = data.get('articles', [])
    news_list = []


    for article in articles:
      article_url = article.get('link')

      content = scrape_content(article_url)

      # if (content != 'null'):
      news_item = {
        'title': article.get('title'),
        'author': article.get('author'),
        'date': article.get('published_date'),
        'url': article_url,
        'image_url': article.get('media'),
        'content': content
          # 'default-summary': article.get('summary'),
        }
      news_list.append(news_item)
      
    return Response({'status': 'ok', 'news': news_list})
    
  else:
    return Response({'error': 'Failed to retrieve articles.'}, 
                    status=response.status_code)
