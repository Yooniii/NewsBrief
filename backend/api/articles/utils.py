
from .prompts import CLEAN_SUMMARY_PROMPT
from core.settings import GENAI_API_KEY
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from urllib.parse import quote, urlparse
from bs4 import BeautifulSoup
import google.generativeai as genai
import requests
import json
import asyncio

# Load the tokenizer and ML model from HuggingFace
tokenizer = AutoTokenizer.from_pretrained("Yooniii/Article_summarizer")
ml_model = AutoModelForSeq2SeqLM.from_pretrained("Yooniii/Article_summarizer")
genai.configure(api_key=GENAI_API_KEY)   # Load Gemini AI Model


def clean_summary(summary, title):
  """Reformat and clean the summary with Gemini API"""
  genai.configure(api_key=GENAI_API_KEY)
  
  generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
  }

  genai_model = genai.GenerativeModel(
    model_name='gemini-1.5-flash',
    generation_config=generation_config,
  )

  # Pass in input to GeminiAI
  cleaned_summary = genai_model.generate_content(
    CLEAN_SUMMARY_PROMPT(summary=summary, title=title)
  )
  return cleaned_summary.text


def summarize(input_text, title):
  """Summarization with ML model and Gemini API"""
  # Summarize the input text using the ML model
  inputs = tokenizer(input_text, return_tensors="pt", max_length=1024, truncation=True)
  
  summary_ids = ml_model.generate(
    inputs['input_ids'], 
    max_length=150, 
    min_length=120, 
    length_penalty=2.0, 
    num_beams=4, 
    early_stopping=True
  )

  # Decode generated summary back into human text, remove special tokens
  summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
  
  # Clean the summary with Gemini API
  return clean_summary(summary, title)


def extract_source(url):
  source = urlparse(url).netloc.upper().split('.')
  if len(source) > 1:
    source = source[1]
  else:
    source = source[0]
  return source

def get_decoding_params(gn_art_id):
  response = requests.get(f"https://news.google.com/articles/{gn_art_id}", timeout=10)
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
    timeout=10,
  )
     
  response.raise_for_status()
  return json.loads(json.loads(response.text.split("\n\n")[1])[:-2][0][2])[1]
