from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField('Імя', max_length=255, default='')
    password_visible = models.CharField(max_length=128, null=True, blank=True)
    telegram_id = models.CharField(max_length=128, null=True, blank=True)

    def __str__(self):
        return str(self.name)
