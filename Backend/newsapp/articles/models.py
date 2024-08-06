from django.db import models

# Defining the structure of an article
class Article(models.Model):
  title = models.CharField(max_length=225, unique=True)
  date = models.DateTimeField()
  source = models.CharField(max_length=225)
  article_link = models.URLField()
  img_url = models.URLField()
  content = models.TextField()
  summary = models.TextField()
  category = models.CharField(max_length=20)

  def __str__(self):
    return self.title