import json
from urllib.parse import quote, urlparse
from bs4 import BeautifulSoup
import requests

def get_decoding_params(gn_art_id):
  response = requests.get(f"https://news.google.com/articles/{gn_art_id}")
  response.raise_for_status()
  soup = BeautifulSoup(response.text, "lxml")
  div = soup.select_one("c-wiz > div")
    
  return {
    "signature": div.get("data-n-a-sg"),
    "timestamp": div.get("data-n-a-ts"),
    "gn_art_id": gn_art_id,
  }

def decode_google_news_url(source_url):
  article = get_decoding_params(urlparse(source_url).path.split("/")[-1])
  articles_req = [
    "Fbv4je",
    f'["garturlreq",[["X","X",["X","X"],null,null,1,1,"US:en",null,1,null,null,null,null,null,0,1],"X","X",1,[1,1,1],1,1,null,0,0,null,0],"{article["gn_art_id"]}",{article["timestamp"]},"{article["signature"]}"]',
  ]
     
  response = requests.post(
    url="https://news.google.com/_/DotsSplashUi/data/batchexecute",
    headers={"content-type": "application/x-www-form-urlencoded;charset=UTF-8"},
    data=f"f.req={quote(json.dumps([[articles_req]]))}",
  )
     
  response.raise_for_status()
  return json.loads(json.loads(response.text.split("\n\n")[1])[:-2][0][2])[1]
