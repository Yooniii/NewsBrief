# NewsBrief
NewsBrief is a website that scrapes the latest news articles from RSS feeds and summarizes them into concise bullet points using Machine Learning. 

One unique feature of Newsbrief is the tooltip functionality, inspired by Notion. When users highlight text, a tooltip appears, allowing them to request definitions or explanations of the selected text.

The summaries are generated using a fine-tuned version of the Facebook-Bart-Large-CNN article summarizer from the Hugging Face Library. I fine-tuned this model using Google Colab to improve upon the original, which generated overly brief (1-3 sentence) summaries that missed key details.

# Key Features
* **Multithreading:** Scrapes news content from different sources concurrently, reducing data processing times.
* **Asynchronous Summarization:** A summarize function processes multiple articles in parallel, speeding up the summarization process.
* **Modular Design:** The backend is split into independent functions for scraping, summarizing, validating data, and saving articles to the database, ensuring low coupling. This principle was also applied to the front end, which is structured into separate React components and combined to form a cohesive interface.
* **Custom ML Model:** Summaries are generated using a fine-tuned ML model. More details about this process are below.
* **Tooltip feature:** Appears when users highlight text, offering definitions/explanations to help them understand unfamiliar terms without needing to search elsewhere.


# The Process
## Data Collection and Preparation
First, I curated various datasets with human-produced summaries from multiple sources: three from Hugging Face and one from Kaggle. Each dataset contained original article text and human-generated summaries. I combined these datasets into a comprehensive dataset and created a preprocessing function to prepare the data for training and evaluation. The function prefixes the input with the task instruction (summarize) and tokenizes the inputs and outputs (labels).

## Model Training
The dataset was split as 80% training and 20% testing.
I defined my training arguments (Seq2SeqTrainingArguments) by specifying key parameters such as the learning rate and optimization, the number of training epochs, and logging settings. I also used the (Seq2Seq) Trainer class which handled the training and evaluation process. The Trainer also used a compute_metrics function to evaluate model performance.

Compute_metrics takes a tuple of the model outputs (predictions) and desired outcomes (labels) as input. The function decodes the predictions and labels into text and then calculates the ROUGE score (rounded to 4 decimal places). This score measured the overlap between the generated summaries (predictions) and reference summaries (labels).

The completed model is available at: https://huggingface.co/Yooniii/Article_summarizer

# Getting Started

### Backend Setup (Django)

#### Clone the Repository
```
git clone https://github.com/yourusername/newsBrief.git
cd newsBrief
```

#### Create a Virtual Environment
```
# Create and activate the virtual environment
python3 -m venv venv 
source venv/bin/activate (`venv\Scripts\activate` for Window users) 

# Install dependencies
pip install -r requirements.txt
```

#### Set up the database
```
# Apply database migrations
python manage.py migrate

# Create a superuser for Django Admin access
python manage.py createsuperuser
```

#### Configure environment variables
Create a .env file in the project root containing your API key to GeminiAI.
```
API_KEY='YOUR API KEY'
```

#### Run the development server
```
# Start the Django server
python manage.py runserver
```  
The backend will scrape articles from multiple news sources (defined in urls.json)

### Frontend Setup (React)
```
cd frontend

npm install
```

#### Configure environment variables
Create a .env file in the frontend directory with your API key to GeminiAI.

To start the React development server:
```
npm run dev
```
Once both the Django and React development servers are running, you can access the NewsBrief application.

# Visuals

### Homepage
<table>
  <tr>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 36 29 PM" src="https://github.com/user-attachments/assets/95a3eda2-9758-4517-b2fd-683d29f0664e"></td>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 36 19 PM" src="https://github.com/user-attachments/assets/5a42f6a1-ee8c-4695-add1-0a36497d2849"></td>
  </tr>
<table>

  
### News Summaries and Tooltip Feature
 <table>
  <tr>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 36 48 PM" src="https://github.com/user-attachments/assets/5d15e859-61ab-4ff3-9f85-17cd9c8f669c"></td>
    <td><img width="700" alt="Screen Shot 2024-09-22 at 2 38 40 PM" src="https://github.com/user-attachments/assets/d1b1ee07-75d3-4059-bee8-439a269a0cc5"></td>
  </tr>
</table>

# Reflection: My First Experience with Machine Learning
This project was my first experience with Natural Language Processing (NLP) and ML. I dedicated a lot of time to understanding each step of the process - from tokenization and model training to evaluating performance. I explored key concepts like fine-tuning training arguments to achieve an optimal balance between training and validation loss to prevent over/underfitting. The journey involved considerable trial and error, but each challenge strengthened my problem-solving skills and deepened my technical understanding.

It was also my first time building a full-stack application using Django and React. I gained hands-on experience in integrating these frameworks to create a seamless interface, learning how front-end and back-end systems work together in a production environment.

Overall, this project was an invaluable learning experience and an excellent introduction to these topics, reinforcing my interest in ML and its applications.
