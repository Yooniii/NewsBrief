import newspaper

def scrape(url, method):
  page = newspaper.article(url)
  page.download()
  page.parse()
  
  if method == 'top_image':
    return page.top_image
  elif method == 'date':
    return page.publish_date
  elif method == 'content':
    return page.text.replace('\n', '')
  elif method =='media':
    return page.movies
  

