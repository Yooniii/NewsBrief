import newspaper
from transformers import BartTokenizer, BartForConditionalGeneration, TrainingArguments, Trainer
from datasets import load_dataset, interleave_datasets
from evaluate import load
import evaluate

tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')

def tokenize_function(entry):
  return tokenizer(entry['article'], padding='max_length', truncation=True, max_length=1024)

def compute_metrics(eval_pred):
  logits, labels = eval_pred
  decoded_preds = tokenizer.batch_decode(logits, skip_special_tokens=True)
  decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)
  rouge = evaluate.load('rouge')
  return rouge.compute(predictions=decoded_preds, references=decoded_labels)
    
ds1 = load_dataset('stevendevoe/news-article-summary', split='train')
ds2 = load_dataset('therapara/summary-of-news-articles', split='train')
ds2 = ds2.rename_column('document', 'article')
dataset = interleave_datasets([ds1, ds2])

tokenized_datasets = dataset.map(tokenize_function, batched=True)

total_size = len(tokenized_datasets) 
split_ratio = 0.8
split_index = int(total_size * split_ratio)

small_train_ds = tokenized_datasets.select(range(split_index)).shuffle(seed=42)
small_eval_ds = tokenized_datasets.select(range(split_index, total_size)).shuffle(seed=42) 

training_args = TrainingArguments(
  output_dir="test_trainer",
  per_device_train_batch_size=2, 
  per_device_eval_batch_size=2,
  warmup_steps=500,
  weight_decay=0.01,
  logging_steps=10,
  logging_dir="./logs"
)

# data_collator = DataCollatorForLanguageModeling(
#   tokenizer=tokenizer, mlm=True, mlm_probability=0.15
# )

trainer = Trainer(
  model=model,
  args=training_args,
  train_dataset=small_train_ds,
  eval_dataset=small_eval_ds,
  compute_metrics=compute_metrics,
  )

trainer.train()
results = trainer.evaluate()
print(results)
trainer.save_model('./models')
