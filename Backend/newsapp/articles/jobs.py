from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import BackgroundClass

def start():
  scheduler = BackgroundScheduler()
  scheduler.add_job(BackgroundClass.upload_data, 'interval', minutes=10)
  scheduler.start()