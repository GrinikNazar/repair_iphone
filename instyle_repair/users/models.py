from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField('Імя', max_length=255, default='')

    def __str__(self):
        return str(self.name)
