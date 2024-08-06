import feedparser
from articles.models import Article
from .decode_url import decode_google_news_url
from .scrape import scrape
import aiohttp
import asyncio
import feedparser

class BackgroundClass:

    @staticmethod
    async def fetch_article(category, url):
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                feed = feedparser.parse(await response.text())
                tasks = []
                for entry in feed.entries[:10]:
                    tasks.append(BackgroundClass.process_entry(entry, category))
                await asyncio.gather(*tasks)

    @staticmethod
    async def process_entry(entry, category):
        try:
            decoded_url = decode_google_news_url(entry.link)
            date, image, content, summary = await asyncio.to_thread(scrape, decoded_url)
            
            await asyncio.to_thread(Article.objects.create,
                title=entry.title.split(' - ')[0],
                date=date,
                source=entry.source.title,
                article_link=decoded_url,
                img_url=image,
                content=content,
                summary=summary,
                category=category
            )
            print('Successfully added new article')
        
        except Exception as e:
            print(f'error{e}')

    @staticmethod
    def upload_data():
        urls = {
            'Top Stories': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFZxYUdjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
            'Business': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
            'Tech': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
            'Entertainment': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
            'Sports': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
            'Science': 'https://news.google.com/rss/topics/CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKRFFTZ0FQAQ?hl=en-CA&gl=CA&ceid=CA%3Aen',
            'Health': 'https://news.google.com/rss/topics/CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE?hl=en-CA&gl=CA&ceid=CA%3Aen',

        }
        loop = asyncio.get_event_loop()
        tasks = [BackgroundClass.fetch_article(category, url) for category, url in urls.items()]
        loop.run_until_complete(asyncio.gather(*tasks))