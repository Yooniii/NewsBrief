# Generated by Django 5.0.7 on 2024-08-04 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.CharField(default='null', max_length=20),
            preserve_default=False,
        ),
    ]