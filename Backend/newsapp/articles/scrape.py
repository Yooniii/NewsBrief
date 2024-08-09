import newspaper

def get_authors(page):
  return page.authors

def get_content(page):
  return page.text.replace('\n', '')

def get_image(page):
  return page.top_image

def get_date(page):
  return page.publish_date

def scrape(url, method):
  page = newspaper.article(url)
  page.download()
  page.parse()
  
  if method == 'author':
    get_authors(page)
  elif method == 'image':
    get_image(page)
  elif method == 'date':
    get_date(page)
  elif method == 'content':
    get_content(page)
  

