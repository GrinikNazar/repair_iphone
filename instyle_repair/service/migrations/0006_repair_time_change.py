# Generated by Django 4.1.6 on 2023-05-08 20:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0005_repair_vendor'),
    ]

    operations = [
        migrations.AddField(
            model_name='repair',
            name='time_change',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]