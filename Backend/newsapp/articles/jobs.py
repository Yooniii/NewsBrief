from apscheduler.schedulers.background import BackgroundScheduler
from .tasks import BackgroundClass

def start():
  scheduler = BackgroundScheduler()
  scheduler.add_job(BackgroundClass.main, 'interval', minutes=60)
  scheduler.start()