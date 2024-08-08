import newspaper
import os
import google.generativeai as genai
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from dotenv import load_dotenv

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
    length_penalty=2.0, 
    num_beams=4, 
    early_stopping=True
  )
  summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

  # refine the summary using Gemini AI
  genai.configure(api_key=os.getenv('API_KEY'))
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

  refined_summary = genai_model.generate_content(
    f"""Please provide a 1-2 sentence description preview of the following news 
    article. Then summarize the remaining content into 3 concise bullet points 
    that flow chronologically. If the text provided is incoherent or does not 
    make sense, respond with 'null'. 
    Preview: This is a sentence or two describing the article.
    - Point one
    - Point two
    - Point three
    {summary}"""
  )

  return refined_summary.text

def scrape(url):
  page = newspaper.article(url)
  content = page.text.replace('\n', '')
  summary = summarize(content)
  image = page.top_image
  date = page.publish_date
  return date, image, content, summary

# tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
# model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

# def summarize(text):
#   inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)
#   summary_ids = model.generate(inputs, max_length=150, min_length=60, length_penalty=2.0, num_beams=4, early_stopping=True)
#   summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
#   return summary
