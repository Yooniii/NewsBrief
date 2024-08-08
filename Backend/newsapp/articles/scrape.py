import newspaper
import os
import google.generativeai as genai
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from dotenv import load_dotenv
import nltk
from nltk.tokenize import sent_tokenize
nltk.download('punkt')


def summarize(input_text):
  tokenizer = AutoTokenizer.from_pretrained("Yooniii/Article_summarizer")
  ml_model = AutoModelForSeq2SeqLM.from_pretrained("Yooniii/Article_summarizer")

  # get an initial summary of the scraped content using a ML model
  inputs = tokenizer(input_text, 
                    return_tensors="pt", 
                    max_length=1024, 
                    truncation=True)
  summary_ids = ml_model.generate(
    inputs['input_ids'], 
    max_length=160, 
    min_length=140, 
    length_penalty=2.0, 
    num_beams=4, 
    early_stopping=True
  )
  summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

  sentences = sent_tokenize(summary)  
  delimited_summmary = '|||'.join(sentences)
  return delimited_summmary

def scrape(url):
  page = newspaper.article(url)
  content = page.text.replace('\n', '')
  summary = summarize(content)
  image = page.top_image
  date = page.publish_date
  return date, image, content, summary

