from django.db import models
from django.utils import timezone

# Defining the structure of an article
class Article(models.Model):
  title = models.CharField(max_length=225, unique=True)
  date = models.DateTimeField(default=timezone.now)
  author = models.CharField(max_length=60)
  source = models.CharField(max_length=225)
  article_link = models.URLField()
  img_url = models.URLField()
  content = models.TextField()
  summary = models.TextField()
  category = models.CharField(max_length=20)

  class Meta:
    unique_together = ('title', 'source')

  def __str__(self):
    return self.title