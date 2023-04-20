from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import CustomUser


class CustomUserAdmin(UserAdmin):

    def custom_group(self, obj):
        return ','.join([g.name for g in obj.groups.all()]) if obj.groups.count() else ''

    custom_group.admin_order_field = 'groups'

    model = CustomUser
    list_display_links = ('username', 'name',)
    list_display = ('id', 'name', 'username', 'password_visible', 'is_staff', 'custom_group',)

    add_fieldsets = (
        *UserAdmin.add_fieldsets,
        (
            'Про користувача',
            {
                'fields': (
                    'name',
                    'groups',
                    'password_visible',
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
                    'password_visible',
                )
            }
        )
    )


admin.site.register(CustomUser, CustomUserAdmin)
