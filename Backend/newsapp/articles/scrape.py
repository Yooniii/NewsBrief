import newspaper

"""
  Scrapes image, date, text, and possibly videos from the given news url
  Args:
    url: News article URL
"""
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
