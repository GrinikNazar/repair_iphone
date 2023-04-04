from rest_framework import serializers
from .models import Repair

from datetime import timedelta


class RepairSerializer(serializers.ModelSerializer):
    shop = serializers.SerializerMethodField()
    master = serializers.SerializerMethodField()
    time_create = serializers.SerializerMethodField()

    class Meta:
        model = Repair
        fields = (
            'id',
            'status',
            'number',
            'warranty',
            'model',
            'password',
            'defect',
            'master',
            'shop',
            'time_create',
            'time_work',
            'time_end',
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
            'time_work': obj.time_create + timedelta(hours=obj.time_work)
        }


class RepairSerializerForBot(serializers.ModelSerializer):
    class Meta:
        model = Repair
        fields = '__all__'
