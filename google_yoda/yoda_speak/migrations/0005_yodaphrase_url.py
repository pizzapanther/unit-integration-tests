# Generated by Django 2.0 on 2017-12-07 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yoda_speak', '0004_auto_20171207_0126'),
    ]

    operations = [
        migrations.AddField(
            model_name='yodaphrase',
            name='url',
            field=models.CharField(max_length=250, null=True, unique=True),
        ),
    ]
