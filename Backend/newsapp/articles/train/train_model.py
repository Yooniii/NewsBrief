from transformers import BartTokenizer, BartForConditionalGeneration
from transformers import TrainingArguments, Trainer, DataCollatorForSeq2Seq
from transformers import AutoModelForSeq2SeqLM, Seq2SeqTrainingArguments, Seq2SeqTrainer
from datasets import load_dataset, interleave_datasets
from evaluate import load
import evaluate
import numpy as np
import torch

checkpoint = 'facebook/bart-large-cnn'
tokenizer = BartTokenizer.from_pretrained(checkpoint)
model = AutoModelForSeq2SeqLM.from_pretrained(checkpoint)
rouge = evaluate.load('rouge')
device = torch.device('mps')

def compute_metrics(eval_pred):
  predictions, labels = eval_pred
  decoded_preds = tokenizer.batch_decode(predictions, skip_special_tokens=True)

  # account for padding tokens in labels
  labels = np.where(labels != -100, labels, tokenizer.pad_token_id)
  decoded_labels = tokenizer.batch_decode(labels, skip_special_tokens=True)

  # compute ROUGE score (eval quality of summaries by comparison to ref summaries)
  result = rouge.compute(predictions=decoded_preds, references=decoded_labels, use_stemmer=True)

  # calculate the average length of the generated predictions (exclude padding tokens)
  prediction_lens = [np.count_nonzero(pred != tokenizer.pad_token_id) for pred in predictions]
  result['gen_len'] = np.mean(prediction_lens)

  return {k: round(v, 4) for k, v in result.items()}

def tokenize_function(entry):
  return tokenizer(entry['article'], padding='max_length', truncation=True, max_length=1024)

def preprocess_function(entries):
  inputs = ['summarize: '+ entry for entry in entries['article']]
  model_inputs = tokenizer(inputs, max_length=1024, truncation=True)

  labels = tokenizer(text_target=entries['summary'], max_length=128, truncation=True)
  model_inputs['labels'] = labels['input_ids']
  return model_inputs

ds1 = load_dataset('stevendevoe/news-article-summary', split='train')
ds2 = load_dataset('therapara/summary-of-news-articles', split='train')
# ds2 = ds2.train_test_split(test_size=0.2)
ds2 = ds2.rename_column('document', 'article')
dataset = interleave_datasets([ds1, ds2])
dataset = dataset.train_test_split(test_size=0.2)
tokenized_dataset = dataset.map(preprocess_function, batched=True)
data_collator = DataCollatorForSeq2Seq(tokenizer=tokenizer, model=checkpoint)


training_args = Seq2SeqTrainingArguments(
  output_dir='articlesum_model',
  eval_strategy='epoch',
  save_strategy='epoch',
  learning_rate=2e-5,
  per_device_train_batch_size=4, 
  per_device_eval_batch_size=4,
  warmup_steps=500,
  weight_decay=0.01,
  logging_steps=10,
  logging_dir='./logs',
  save_total_limit=3,
  predict_with_generate=True,
  num_train_epochs=4,
  load_best_model_at_end=True,
  max_grad_norm=1.0,
  gradient_accumulation_steps=4,
  fp16=True,
)

trainer = Seq2SeqTrainer(
  model=model,
  args=training_args,
  train_dataset=tokenized_dataset['train'],
  eval_dataset=tokenized_dataset['test'],
  tokenizer=tokenizer,
  data_collator=data_collator,
  compute_metrics=compute_metrics,
)

trainer.train()