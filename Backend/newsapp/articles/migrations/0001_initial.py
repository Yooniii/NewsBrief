# Generated by Django 5.0.7 on 2024-08-06 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=225, unique=True)),
                ('date', models.DateTimeField()),
                ('source', models.CharField(max_length=225)),
                ('article_link', models.URLField()),
                ('img_url', models.URLField()),
                ('content', models.TextField()),
                ('summary', models.TextField()),
                ('category', models.CharField(max_length=20)),
            ],
        ),
    ]
