from rest_framework.views import APIView
from .models import Repair, Shop
from rest_framework import viewsets
from .serializers import RepairSerializer, RepairSerializerForBot
from rest_framework.response import Response
from users.models import CustomUser


class RepairViewSet(viewsets.ModelViewSet):
    queryset = Repair.objects.all()
    serializer_class = RepairSerializerForBot


class RepairView(APIView):
    def get(self, request):
        sidebar = request.GET['sidebar']
        if sidebar == 'all':
            repairs = Repair.objects.all().order_by('-warranty', '-time_create')
        elif sidebar == 'closed':
            repairs = Repair.objects.filter(status='closed').order_by('-warranty', '-time_end')
        elif sidebar == 'warranty':
            repairs = Repair.objects.filter(warranty=True).order_by('-warranty', '-time_create')
        elif sidebar == 'new':
            repairs = Repair.objects.filter(status='new').order_by('-warranty', '-time_create')

        masters = request.GET['masters']
        shops = request.GET['shops']

        if masters and shops:
            masters_list = list(map(int, masters.split(',')))
            shops_list = list(map(int, shops.split(',')))

            all_repair = repairs.filter(shop__in=shops_list).filter(master__in=masters_list)

        elif masters or shops:
            if masters:
                masters_list = list(map(int, masters.split(',')))
                all_repair = repairs.filter(master__in=masters_list)

            elif shops:
                shops_list = list(map(int, shops.split(',')))
                all_repair = repairs.filter(shop__in=shops_list)

        else:
            all_repair = repairs

        serializer = RepairSerializer(all_repair, many=True)

        return Response(serializer.data)


class ShopsAndMastersAPI(APIView):
    def get(self, request):
        shops = Shop.objects.all()
        masters = CustomUser.objects.filter(groups__name='Майстри')
        json_out = {
            'shops': [{'id': shop.pk, 'name': shop.name} for shop in shops],
            'masters': [{'id': master.pk, 'name': master.name} for master in masters]
        }

        return Response(json_out)


class CurrentUser(APIView):
    def post(self, request):
        masters = CustomUser.objects.filter(groups__name='Майстри')
        user_id = request.data['user']
        master = masters.get(pk=user_id)
        return Response(
            {'name': master.name}
        )


class AddMaster(APIView):
    def post(self, request):
        repair_id = request.data['repair_id']
        user_id = request.data['master_id']
        repair_status = request.data['status']

        repair = Repair.objects.get(pk=repair_id)

        if repair_status == repair.NEW:
            master = CustomUser.objects.get(pk=user_id)
            repair.master = master
            repair.status = repair.APPLY
            repair.save()

        elif repair_status == repair.APPLY:
            repair.status = repair.CLOSED
            repair.save()

        serializer = RepairSerializer(repair)

        return Response(serializer.data)
