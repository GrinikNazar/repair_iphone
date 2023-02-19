from .models import Repair
from rest_framework import viewsets
from .serializers import RepairSerializer


class RepairViewSet(viewsets.ModelViewSet):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializer
