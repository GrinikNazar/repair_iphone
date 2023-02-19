from django.urls import path, include
from rest_framework import routers

from .api import RepairViewSet
from .views import *

router = routers.SimpleRouter()
router.register('addrep', RepairViewSet)  # Раут для добавлення ремонту в базу даних

urlpatterns = [
    path('', index, name='index'),
    path('api/v1/', include(router.urls)),  # http://127.0.0.1:8000/service/api/v1/addrep/
    path('repair_num/<int:pk>/<str:name>/', add_master, name='rep'),  # Прийняти ремонт))
    path('closed_repair/<int:pk>/', closed_repair, name='closed_repair'),
    path('my_repairs/<int:user_id>/', my_repairs, name='my_repairs'),  # Мої ремонти
    path('statistic/<int:user_id>/', my_statistic, name='my_statistic')
]
