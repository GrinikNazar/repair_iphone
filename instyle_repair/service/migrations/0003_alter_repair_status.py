# Generated by Django 4.1.6 on 2023-02-19 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service', '0002_alter_repair_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repair',
            name='status',
            field=models.CharField(choices=[('new', 'Новий'), ('accepted', 'Прийнятий'), ('answer', 'Потрібна відповідь'), ('closed', 'Закритий')], default='new', max_length=10),
        ),
    ]
