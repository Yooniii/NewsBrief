from django.db import models
from django.utils import timezone

class Article(models.Model):
  title = models.CharField(max_length=225, unique=True)
  date = models.DateTimeField(default=timezone.now)
  source = models.CharField(max_length=225)
  article_link = models.URLField()
  top_image = models.URLField()
  media = models.URLField(blank=True)
  content = models.TextField()
  summary = models.TextField()
  category = models.CharField(max_length=20)

  class Meta:
    unique_together = ('title', 'article_link')
    
    indexes = [
      # Sort articles by category and date
      models.Index(fields=['category', '-date']),
      models.Index(fields=['-date']),
      # Sort articles by title
      models.Index(fields=['title']),
    ]

  def __str__(self):
    return self.title