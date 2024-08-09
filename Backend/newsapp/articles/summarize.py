import os
import google.generativeai as genai
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from dotenv import load_dotenv
import google.generativeai as genai


def clean_summary(summary):

  genai.configure(api_key=os.getenv('GENAI_API_KEY'))

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

  cleaned_summary = genai_model.generate_content(
      f"""Please refine and reformat the following news article summary. 
      Begin with a 1-2 sentence preview that gives a concise overview of the article. 
      Then, organize the remaining details into bullet points that follow a chronological order. 
      Ignore any incoherent or irrelevant text. 

      This is the format to be followed:
      Sentence describing the article.
      - Bullet point 1
      - Bullet point 2
      ...
      - Bullet point N

      Here is the summary to be reformatted: {summary}"""
  )

  return cleaned_summary.text

def summarize(input_text):
  tokenizer = AutoTokenizer.from_pretrained("Yooniii/Article_summarizer")
  ml_model = AutoModelForSeq2SeqLM.from_pretrained("Yooniii/Article_summarizer")

  inputs = tokenizer(input_text, 
                    return_tensors="pt", 
                    max_length=1024, 
                    truncation=True)
  summary_ids = ml_model.generate(
    inputs['input_ids'], 
    max_length=150, 
    min_length=120, 
    length_penalty=2.0, 
    num_beams=4, 
    early_stopping=True
  )
  summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
  summary = clean_summary(summary)

  return summary