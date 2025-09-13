from django.apps import AppConfig
from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import BackgroundClass

import os
import logging

logger = logging.getLogger(__name__)

scheduler = BackgroundScheduler()

class ArticlesConfig(AppConfig):
    name = 'articles'

    def ready(self):
        if os.environ.get('RUN_MAIN') == 'true':
            logger.info("Starting background job scheduler...")
            scheduler.add_job(BackgroundClass.run_feed_ingestion, 'interval', minutes=1)
            scheduler.start()
            logger.info("Background job scheduler started successfully!")
            