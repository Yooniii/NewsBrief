from django.db import models
from django.utils import timezone

# Defining the structure of an article
class Article(models.Model):
  title = models.CharField(max_length=225, unique=True)
  date = models.DateTimeField(default=timezone.now)
  source = models.CharField(max_length=225)
  article_link = models.URLField()
  top_image = models.URLField()
  media = models.URLField()
  content = models.TextField()
  summary = models.TextField()
  category = models.CharField(max_length=20)

  class Meta:
    unique_together = ('title', 'source')

  def __str__(self):
    return self.title