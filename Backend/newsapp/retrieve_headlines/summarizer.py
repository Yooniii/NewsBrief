from transformers import BartTokenizer, BartForConditionalGeneration

tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

def summarize(text):
  inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)
  summary_ids = model.generate(inputs, max_length=150, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)
  summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
  return summary

# article = "After being diagnosed with Stiff Person Syndrom (SPS) in 2022, Celine Dion is finally slated to make her return to singing at the Olympic Games in Paris, France. While the specifics of Dion's alleged performance remain classified, Variety reported that the \"My Heart Will Go On\" singer — who arrived in Paris on Monday at the Royal Monceau hotel near the Champs-Élysées — is rumored to make her debut at Friday's opening ceremony.The outlet reported that Dion may have teased her return to the stage in an April interview with Vogue France, in which she said, “I’ve chosen to work with all my body and soul, from head to toe, with a medical team. I want to be the best I can be. My goal is to see the Eiffel Tower again!"
# summary = generate_summary(article)
# print("Original Text: ", article)
# print("Summary:", summary)