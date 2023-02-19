from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import CustomUser


class CustomUserAdmin(UserAdmin):

    def custom_group(self, obj):
        return ','.join([g.name for g in obj.groups.all()]) if obj.groups.count() else ''

    custom_group.admin_order_field = 'groups'

    model = CustomUser
    list_display_links = ('username', 'name',)
    list_display = ('name', 'username', 'is_staff', 'custom_group',)

    add_fieldsets = (
        *UserAdmin.add_fieldsets,
        (
            'Про користувача',
            {
                'fields': (
                    'name',
                    'groups',
                )
            }
        )
    )

    fieldsets = (
        *UserAdmin.fieldsets,
        (
            'Про користувача',
            {
                'fields': (
                    'name',
                )
            }
        )
    )


admin.site.register(CustomUser, CustomUserAdmin)
