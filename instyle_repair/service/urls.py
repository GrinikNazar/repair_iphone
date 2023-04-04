# from django.contrib.auth.views import LogoutView
from django.urls import path

from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('<user_id>/', index, name='index'),
    path('repair_num/<int:pk>/<str:name>/', add_master, name='rep'),  # Прийняти ремонт))
    path('closed_repair/<int:pk>/', closed_repair, name='closed_repair'),
    path('statistic/<int:user_id>/', my_statistic, name='my_statistic'),
]
