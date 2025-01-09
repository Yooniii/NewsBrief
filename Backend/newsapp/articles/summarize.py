import os
import google.generativeai as genai
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load the tokenizer and ML model from HuggingFace
tokenizer = AutoTokenizer.from_pretrained("Yooniii/Article_summarizer")
ml_model = AutoModelForSeq2SeqLM.from_pretrained("Yooniii/Article_summarizer")

"""
  Reformats and ensures the raw summary is coherent 
  Args:
    summary (str): Initial news summary
    title (str): Article title
  Returns:
    cleaned_summary.text (str)
"""
def clean_summary(summary, title):
  # Load Gemini AI Model
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

  # Pass in prompt, raw summary, and title to GeminiAI
  cleaned_summary = genai_model.generate_content(
    f"""Please refine and reformat the following news article summary according
    to the guidelines below:
      Begin with a 1-2 sentence preview that provides a concise overview of the 
      article. Then, organize the remaining details into bullet points, following
      a chronological order. Ignore incoherent or irrelevant text. If the
      provided text and title is nonsensical return 'INVALID'.

    This is the format to be followed:
      Sentence describing the article.
      - Bullet point 1
      - Bullet point 2
      ...
      - Bullet point N

    Write the summary from the perspective of the article itself, avoiding 
    phrases like "This article" and instead focusing on presenting the 
    information as if it is coming directly from the source.
    Present the summary in plain text and avoid any use of asterisks.
    Here is the title: {title} and the summary to be reformatted: {summary}"""
  )
  return cleaned_summary.text


"""
  Returns a summary of input_text
  Args:
    input_text(str): Raw article content
    title(str): News article title
"""
def summarize(input_text, title):
  # Tokenize input text for model
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

  # Refine and reformat summary
  summary = clean_summary(summary, title)

  return summary
