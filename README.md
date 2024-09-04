### NewsBrief
NewsBrief is a website that fetches and presents the latest news, summarized 
into a few bullet points across various categories. It also includes a tooltip 
feature that appears when text is highlighted, enabling users to ask AI a question, 
request an explanation, or get a definition of the selected text.

## Installation
Make sure you have the following installed on your system:
* Python 
* Node.js and npm
* Django

# Backend Setup (Django)
1. Clone the repository

git clone https://github.com/yourusername/newsBrief.git
cd newsBrief

2. Create a virtual environment
python3 -m venv venv
source venv/bin/activate (`venv\Scripts\activate` for Window users)

3. Install the required Python packages listed in requirements.txt
pip install -r requirements.txt

4. Set up the Database
Apply the database migrations 
python manage.py migrate

Create a superuser (admin account for accessing Django admin panel)
python manage.py createsuperuser

5. Configure Environment Variables
Create a .env file in the project root containing your API key to GeminiAI.
API_KEY='YOUR API KEY'

6. Run the development server
python manage.py runserver

# Frontend Setup (React)
1. Navigate to the Frontend Directory
cd frontend

2. Install the required npm packages listed in the package.json
npm install

3. Configure Environment Variables
Create a .env file in the frontend directory with your API key to GeminiAI

4. Start the React development server
npm start

Once both the Django and React development servers are running, 
you can access the NewsBrief application.