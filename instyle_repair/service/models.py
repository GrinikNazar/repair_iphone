from django.db import models
from django.conf import settings


class Repair(models.Model):
    NEW = 'new'
    APPLY = 'accepted'
    NEED_ANSWER = 'answer'
    CLOSED = 'closed'

    STATUS_CHOICES = [
        (NEW, 'Новий'),
        (APPLY, 'Прийнятий'),
        (NEED_ANSWER, 'Потрібна відповідь'),
        (CLOSED, 'Закритий'),
    ]

    number = models.CharField(max_length=20)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=NEW)
    model = models.CharField(max_length=255)
    vendor = models.CharField(max_length=255, blank=True)
    customer_phone = models.CharField(max_length=255)
    customer_name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    imei = models.CharField(max_length=15)
    defect = models.TextField(blank=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_change = models.DateTimeField(auto_now_add=True)
    time_work = models.IntegerField(default=1)
    time_end = models.DateTimeField(auto_now=True, auto_now_add=False)
    warranty = models.BooleanField(default=False)
    master = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_DEFAULT, default=None, blank=True, null=True)  # Один ремонт один майстер
    shop = models.ForeignKey('Shop', on_delete=models.PROTECT)

    def __str__(self):
        return self.number


class Shop(models.Model):
    name = models.CharField(max_length=255)
    id_from_m = models.IntegerField(default=1)
    # Добавити менеджера

    def __str__(self):
        return self.name
