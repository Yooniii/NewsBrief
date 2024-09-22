# NewsBrief
NewsBrief is a website that fetches and presents the latest news, summarized 
into a few bullet points across various categories. It also includes a tooltip 
feature that appears when text is highlighted, enabling users to ask AI a question, 
request an explanation, or get a definition of the selected text.

## Getting Started

### Backend Setup (Django)
```
git clone https://github.com/yourusername/newsBrief.git
cd newsBrief

# Create a virtual environment
echo '.env'  >> .gitignore
echo '.venv' >> .gitignore

python3 -m venv venv # create the virtual env
source venv/bin/activate (`venv\Scripts\activate` for Window users) # activate the env

# Install the required dependencies
pip install -r requirements.txt

# Set up the database
python manage.py migrate

# Create a superuser (admin account for accessing Django admin panel)
python manage.py createsuperuser

# Configure environment variables
# Create a .env file in the project root containing your API key to GeminiAI.
API_KEY='YOUR API KEY'

# Run the development server
python manage.py runserver
```  
 

### Frontend Setup (React)
1. Navigate to the Frontend Directory  
```cd frontend```

2. Install the required npm packages listed in the package.json  
```npm install```

3. Configure Environment Variables  
Create a .env file in the frontend directory with your API key to GeminiAI

4. Start the React development server  
```npm start```

Once both the Django and React development servers are running, 
you can access the NewsBrief application.
