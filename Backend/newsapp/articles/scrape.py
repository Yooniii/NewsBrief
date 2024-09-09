import newspaper

def scrape(url):
  """
  Scrapes the image, date, raw text, and possibly videos from the given news url

  Args:
    url: the news article URL
    
  """
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
  

