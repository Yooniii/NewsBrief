# NewsBrief
NewsBrief is a website that scrapes the latest news articles from various sources and summarizes them into bullet points using Machine Learning. 
The ML model used for this is a model I fine-tuned from the Facebook-Bart-Large-CNN article summarizer on the Hugging Face Library, optimized to generate more detailed and contextually rich summaries. 

For more information, the model is available for download at: https://huggingface.co/Yooniii/Article_summarizer

This application also includes a tooltip feature that activates when users highlight text, allowing them to interact with AI by asking questions about the content. For example, users can request explanations of highlighted paragraphs or definitions of specific words.

## Getting Started

### Backend Setup (Django)

#### Clone the Repo
```
git clone https://github.com/yourusername/newsBrief.git
```

#### Create a Virtual Environment
```
cd newsBrief

echo '.env'  >> .gitignore
echo '.venv' >> .gitignore

python3 -m venv venv # create the virtual env

source venv/bin/activate (`venv\Scripts\activate` for Window users) # activate the env

# Install the required dependencies

pip install -r requirements.txt
```

#### Set up the database

```
python manage.py migrate

# Create a superuser (admin account for accessing Django admin panel)
python manage.py createsuperuser
```

#### Configure environment variables
```
# Create a .env file in the project root containing your API key to GeminiAI.

API_KEY='YOUR API KEY'
```

#### Run the development server
```
# This will scrape articles from various sources (in the urls.json file) every 3 minutes
python manage.py runserver
```  
 
### Frontend Setup (React)
```
cd frontend

// Install the required npm packages listed in the package.json
npm install
```

#### Configure environment variables
```
// Create a .env file in the frontend directory with your API key to GeminiAI

// Start the React development server
npm start
```

Once both the Django and React development servers are running, you can access the NewsBrief application.

# Example

## Homepage
<img width="1000" alt="Screen Shot 2024-09-22 at 2 36 29 PM" src="https://github.com/user-attachments/assets/95a3eda2-9758-4517-b2fd-683d29f0664e">

<img width="1000" alt="Screen Shot 2024-09-22 at 2 36 19 PM" src="https://github.com/user-attachments/assets/5a42f6a1-ee8c-4695-add1-0a36497d2849">



<img width="1200" alt="Screen Shot 2024-09-22 at 2 36 48 PM" src="https://github.com/user-attachments/assets/5d15e859-61ab-4ff3-9f85-17cd9c8f669c">

<img width="1200" alt="Screen Shot 2024-09-22 at 2 38 40 PM" src="https://github.com/user-attachments/assets/d1b1ee07-75d3-4059-bee8-439a269a0cc5">



