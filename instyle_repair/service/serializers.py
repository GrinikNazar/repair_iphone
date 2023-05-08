from rest_framework import serializers
from .models import Repair

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
    class Meta:
        model = Repair
        fields = '__all__'
