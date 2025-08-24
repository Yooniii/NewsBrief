from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import BackgroundClass

def start():
  scheduler = BackgroundScheduler()
  # Scrape and upload articles every 5 minutes
  scheduler.add_job(BackgroundClass.upload_data, 'interval', minutes=5)
  scheduler.start()
  