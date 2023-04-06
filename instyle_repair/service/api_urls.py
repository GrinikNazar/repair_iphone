from django.urls import path, include
from rest_framework import routers

from .api import *

router = routers.SimpleRouter()
router.register('addrep', RepairViewSet)  # Раут для добавлення ремонту в базу даних


urlpatterns = [
    path('api/v1/', include(router.urls)),  # http://127.0.0.1:8000/service/api/v1/addrep/
    path('api/v2/get_rep/', RepairView.as_view()),  # http://127.0.0.1:8000/service/api/v2/get_rep/
    path('api/v2/get_shops_and_masters/', ShopsAndMastersAPI.as_view()),  # http://127.0.0.1:8000/service/api/v2/get_shops_and_masters/
    path('api/v2/get_current_user/', CurrentUser.as_view()),  # http://127.0.0.1:8000/service/api/v2/get_current_user/
    path('api/v2/apply_master/', AddMaster.as_view()),  # http://127.0.0.1:8000/service/api/v2/apply_master/
    path('api/v2/count_repairs/', CountRepairs.as_view()),  # http://127.0.0.1:8000/service/api/v2/count_repairs/
]
