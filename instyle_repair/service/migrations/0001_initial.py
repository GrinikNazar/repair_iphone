# Generated by Django 4.1.6 on 2023-07-21 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Repair",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("number", models.CharField(max_length=20)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("new", "Новий"),
                            ("accepted", "Прийнятий"),
                            ("answer", "Потрібна відповідь"),
                            ("closed", "Закритий"),
                        ],
                        default="new",
                        max_length=10,
                    ),
                ),
                ("model", models.CharField(max_length=255)),
                ("vendor", models.CharField(blank=True, max_length=255)),
                ("customer_phone", models.CharField(max_length=255)),
                ("customer_name", models.CharField(max_length=255)),
                ("password", models.CharField(max_length=255)),
                ("imei", models.CharField(max_length=15)),
                ("defect", models.TextField(blank=True)),
                ("time_create", models.DateTimeField(auto_now_add=True)),
                ("time_change", models.DateTimeField(auto_now_add=True)),
                ("time_work", models.IntegerField(default=1)),
                ("time_end", models.DateTimeField(auto_now=True)),
                ("warranty", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Shop",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
            ],
        ),
    ]
