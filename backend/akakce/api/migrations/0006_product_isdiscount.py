# Generated by Django 4.2.13 on 2024-07-31 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_category_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='isdiscount',
            field=models.BooleanField(default=False),
        ),
    ]
