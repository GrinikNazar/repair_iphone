from rest_framework import serializers
from .models import Repair, Shop
from django.core.exceptions import ObjectDoesNotExist

from datetime import timedelta


class RepairSerializer(serializers.ModelSerializer):
    shop = serializers.SerializerMethodField()
    master = serializers.SerializerMethodField()
    time_create = serializers.SerializerMethodField()
    imei = serializers.SerializerMethodField()

    class Meta:
        model = Repair
        fields = (
            'id',
            'status',
            'number',
            'imei',
            'warranty',
            'model',
            'password',
            'defect',
            'master',
            'shop',
            'time_create',
            'time_change',
            'time_work',
            'time_end',
            'vendor',
            'customer_name',
        )

    def get_shop(self, obj):
        return str(obj.shop)

    def get_master(self, obj):
        if obj.master is None:
            return None
        else:
            return {
                'id': int(repr(obj.master.id)),
                'name': str(obj.master)
            }

    def get_time_create(self, obj):
        return {
            'time_create': obj.time_create,
            'time_work': obj.time_change + timedelta(hours=obj.time_work)
        }

    def get_imei(self, obj):
        return obj.imei.lower()


class RepairSerializerForBot(serializers.ModelSerializer):
    id = serializers.CharField(source='number')
    device_imei = serializers.CharField(source='imei')
    is_warranty = serializers.BooleanField(source='warranty', allow_null=True)
    device_name = serializers.CharField(source='model')
    device_code = serializers.CharField(source='password')
    device_damage = serializers.CharField(source='defect')
    store_id = serializers.IntegerField(source='shop_id', allow_null=True)
    date_end = serializers.CharField(source='time_work')
    shipper_name = serializers.CharField(source='vendor', allow_null=True)
    client_phone = serializers.CharField(source='customer_phone')
    client_name = serializers.CharField(source='customer_name')

    class Meta:
        model = Repair
        fields = (
            'id',
            'device_imei',
            'is_warranty',
            'device_name',
            'device_code',
            'device_damage',
            'store_id',
            'date_end',
            'shipper_name',
            'client_name',
            'client_phone',
        )

    def create(self, validated_data):
        time_work = validated_data.get('time_work')
        warranty = validated_data.get('warranty')
        vendor = validated_data.get('vendor')
        model = validated_data.get('model')
        shop = validated_data.get('shop_id')

        # вибірка магазину по ід з Мішки бекенду
        try:
            shop = Shop.objects.get(id_from_m=shop)
            shop = shop.pk
        except ObjectDoesNotExist:
            # Для Снятина
            shop = Shop.objects.get(id_from_m=100)
            shop = shop.pk

        warranty = True if warranty else False

        # постачальник
        if not vendor:
            vendor = ''

        # видалити з назви моделі слово Apple і дужки з імеі
        sp_model = model.split()
        if sp_model[0] == 'Apple':
            model = ' '.join(sp_model[1:])
        model = ''.join(model.split('(')[0])

        # Вибір часу з того який ввели менеджери ! 2-3 години вибирає більше!!!
        try:
            x = []
            for i in list(time_work):
                if i.isdigit():
                    x.append(i)
            try:
                time_work = max(x)
            except ValueError:
                time_work = 1

        except TypeError:
            pass

        validated_data['time_work'] = time_work
        validated_data['warranty'] = warranty
        validated_data['vendor'] = vendor
        validated_data['model'] = model
        validated_data['shop_id'] = shop

        my_model = Repair(**validated_data)
        my_model.save()

        return my_model

