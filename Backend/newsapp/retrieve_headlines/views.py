import requests
from adrf.decorators import api_view
from rest_framework.response import Response
from newspaper import Article
import scrapy
from bs4 import BeautifulSoup
import aiohttp
import asyncio
import time
from .button_views import get_selection
from .summarizer import summarize
from asgiref.sync import sync_to_async

async def scrape_content(session, url):
  invalid_urls = ['pixstory']

  # if any(invalid_url in url for invalid_url in invalid_urls):
  #   return 'null'
  """
  Extracts content from a given URL. If the URL requires redirection,
  this function finds the final domain link before extracting content.

  Args:
    session (aiohttp.ClientSession): Session obj used for making HTTP requests.
    url (str): The URL to scrape content from.

  Returns:
    str: The text content of the article, or 'null' if an error occurs.
  """

  try:
    async with session.get(url) as response:
      html_content = await response.text()
      soup = BeautifulSoup(html_content, 'html.parser')
        
    if 'article.wn' in url:
      target_text = soup.find('p', class_='art-text')
      url = target_text.find('a').get('href')
      
    async with session.get(url) as response:
      content = await response.text()
      article = Article(url)
      article.download(input_html=content).parse()
      return article.text.replace('\n', '').strip()
    
  except Exception as e:
    # print(f"Error in scrape_content: {e}")  # Log the exception
    return 'null'



@api_view(['GET'])
async def retrieve_headlines(request):
  start = time.time()

  url = f'https://api.newscatcherapi.com/v2/latest_headlines?countries=US&lang=en&page_size=4&not_sources=The Daily Mail'
  headers = {
  'x-api-key': 'wVzi0kzFbYITxUWFWoEH-fTdxdQ7UARpdoQqXlEtf9k'  
  }
  response = requests.get(url, headers=headers)

  if response.status_code == 200:
    data = response.json()
    articles = data.get('articles', [])
    news_list = []

    async with aiohttp.ClientSession() as session:
      tasks = [scrape_content(session, article.get('link')) 
                for article in articles]
      contents = await asyncio.gather(*tasks)  

      for article, content in zip(articles, contents):
          
        if content != 'null' or '':
          summary = await sync_to_async(summarize)(content)

          news_item = {
            'title': article.get('title'),
            'author': article.get('author'),
            'date': article.get('published_date'),
            'url': article.get('link'),
            'image_url': article.get('media'),
            # 'content': content,
            # 'summary': summary
          }
          news_list.append(news_item)

    end = time.time()
    print(end - start)     
    return Response({'status': 'ok', 'news': news_list})
      
  else:
    return Response({'error': 'Failed to retrieve articles.'}, 
                      status=response.status_code)

