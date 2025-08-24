from django.apps import AppConfig
import os
from . import jobs

class articlesConfig(AppConfig):
    name = 'articles'

    def ready(self):

        # RUN_MAIN check to avoid running the code twice since manage.py runserver runs 'ready' twice on startup
        if os.environ.get('RUN_MAIN', None) != 'true':
            jobs.start()