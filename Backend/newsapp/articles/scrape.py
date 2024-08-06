import newspaper
from transformers import BartTokenizer, BartForConditionalGeneration


# model = BartForConditionalGeneration.from_pretrained(
#   '/Users/sarahyoon/Code/NewsBrief/Backend/newsapp/articles/ml/data/models/checkpoint-118'
# )

# tokenizer = BartTokenizer.from_pretrained(
#   '/Users/sarahyoon/Code/NewsBrief/Backend/newsapp/articles/ml/data/models/checkpoint-118'
# )

# def summarize(input_text):
#   inputs = tokenizer(input_text, 
#                     return_tensors="pt", 
#                     max_length=1024, 
#                     truncation=True)
#   summary_ids = model.generate(
#     input_text, 
#     max_length=160, 
#     min_length=120, 
#     length_penalty=2.0, 
#     num_beams=4, 
#     early_stopping=True
#   )
#   summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
#   return summary

tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

def summarize(text):
  inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)
  summary_ids = model.generate(inputs, max_length=150, min_length=60, length_penalty=2.0, num_beams=4, early_stopping=True)
  summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
  return summary


def scrape(url):
  page = newspaper.article(url)
  content = page.text.replace('\n', '')
  summary = summarize(content)
  image = page.top_image
  date = page.publish_date
  return date, image, content, summary
  