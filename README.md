# NewsBrief
NewsBrief is a website that scrapes the latest news articles from various sources and summarizes them into concise bullet points using Machine Learning. 

One unique feature of Newsbrief is the tooltip functionality, which was inspired by Notion. When users highlight text, a tooltip appears, allowing them to request definitions or explanations of the selected text.

The ML model used to generate the summaries is a fine-tuned version of the Facebook-Bart-Large-CNN article summarizer from the Hugging Face Library. I fine-tuned this model using Google Colab to address some limitations of the original, such as the overly brief (1-3 sentence) summaries that often missed key highlights of the articles.

# The Process
## Data Collection and Preparation
First, I curated various datasets with human-produced summaries from multiple sources: three from Hugging Face and one from Kaggle. Each dataset contained original article text and corresponding human-generated summaries. I combined these datasets into a single comprehensive dataset and created a preprocessing function to prepare the data for training and evaluation. The function prefixes the input with the task instruction (summarize) and tokenizes the inputs and outputs (labels).
I then split the dataset into 80% training and 20% testing data and applied the preprocessing function using map.

## Model Training
I defined my training arguments (Seq2SeqTrainingArguments) by specificying key parameters such as the learning rate and optimization, number of training epochs, and logging settings. I also used the (Seq2Seq) Trainer class which handled the training and evaluation process. The Trainer also used a compute_metrics function to evaluate model performance.

Compute_metrics takes as input a tuple containing the model outputs (predictions) and desired outcomes (labels). The function decodes the predictions and labels into text, and then calculates the ROUGE score (rounded to 4 decimal places). This score measured the overlap between the generated summaries (predictions) and reference summaries (labels).

For more details, the completed model is available at: https://huggingface.co/Yooniii/Article_summarizer

# Reflection
This was my first experience with NLP and ML, so I spent significant time researching and understanding each component of the process. This project was an excellent introduction to these fields, and I think it has really deepened my interest in learning more about Machine Learning and its applications.

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

## Example

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

