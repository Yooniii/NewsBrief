from django.core.management.base import BaseCommand
from articles.tasks import fetch_articles

class Command(BaseCommand):
  help = 'Fetch data from the external API and populate the database'

  def handle(self, *args, **kwargs):
    fetch_articles.delay()  # This triggers the Celery task asynchronously
    self.stdout.write(self.style.SUCCESS('Fetch and populate task has been triggered'))
