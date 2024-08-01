from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import BackgroundClass

def start():
  scheduler = BackgroundScheduler()
  scheduler.add_job(BackgroundClass.fetch_articles, 'interval', minutes=5)
  scheduler.start()