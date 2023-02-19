from django.contrib import admin
from .models import *


class RepairAdmin(admin.ModelAdmin):
    list_display = ('number', 'status', 'master', 'shop', 'warranty')
    list_editable = ('warranty', )


class ShopAdmin(admin.ModelAdmin):
    pass


admin.site.register(Repair, RepairAdmin)
admin.site.register(Shop, ShopAdmin)
