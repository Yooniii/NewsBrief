# NewsBrief
A web app that scrapes the latest news and summarizes them into bullet-point summaries using a fine-tuned BART model.

## Key Features
* **Multithreading & Automated Scraping** Scrapes and summarizes multiple RSS feeds in parallel, on an hourly schedule.
* **Fine-Tuned ML Model:** Generates detailed, concise summaries beyond the base model.
* **Tooltip Feature:** Select text to request definitions or explanations of terms or phrases.

## How It Works
### Data Collection and Preparation
NewsBrief uses multiple datasets with human-generated summaries from Hugging Face and Kaggle. These were combined into a single dataset, preprocessed, and tokenized for training. Each input is prefixed with a task instruction (summarize).

### Model Training
* Dataset Split: 80% training, 20% testing.
* Training uses Seq2SeqTrainingArguments with optimized learning rates and epochs. Seq2Seq Trainer handles training and evaluation. Model performance was measured with *ROUGE scores*, comparing generated summaries with reference summaries.

The fine-tuned model is available here: [Hugging Face: Article Summarizer](https://huggingface.co/Yooniii/Article_summarizer)


## Set Up

### Backend (Django)

**1. Clone the Repository**
```
git clone https://github.com/yourusername/newsBrief.git
cd newsBrief
```

**2. Create & activate a virtual environment**
```
python3 -m venv venv 
source venv/bin/activate
pip install -r requirements.txt # Install dependencies
```

**3. Set up the database**
```
cd backend/api
python manage.py migrate

# Create a superuser for Django Admin access
python manage.py createsuperuser
```

**4. Configure environment variables**
Create a `.env` file in the project root:
```
GENAI_API_KEY='YOUR API KEY'
```

**5. Run the server**
```
python manage.py runserver
```  


### Frontend (React)

**1. Install dependencies**
```
cd frontend/newsapp
npm install
```

**2. Configure environment variables**
Create a `.env` file in the frontend directory:
```
VITE_GENAI_API_KEY='YOUR API KEY'
```

**3. Start the development server**
```
npm run dev
```


## Visuals

<table>
  <tr>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 36 29 PM" src="https://github.com/user-attachments/assets/95a3eda2-9758-4517-b2fd-683d29f0664e"></td>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 36 19 PM" src="https://github.com/user-attachments/assets/5a42f6a1-ee8c-4695-add1-0a36497d2849"></td>
  </tr>
<table>

 <table>
  <tr>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 36 48 PM" src="https://github.com/user-attachments/assets/5d15e859-61ab-4ff3-9f85-17cd9c8f669c"></td>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 38 40 PM" src="https://github.com/user-attachments/assets/d1b1ee07-75d3-4059-bee8-439a269a0cc5"></td>
  </tr>
</table>
