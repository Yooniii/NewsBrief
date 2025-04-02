from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import upload_data

def start():
  scheduler = BackgroundScheduler()
  scheduler.add_job(upload_data, 'interval', minutes=3)
  scheduler.start()
  