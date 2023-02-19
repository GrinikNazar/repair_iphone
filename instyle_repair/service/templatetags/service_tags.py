from django import template
from service.models import *
from users.models import *


register = template.Library()


@register.simple_tag()
def get_masters():
    masters = CustomUser.objects.filter(groups__name='Майстри')
    return masters


@register.simple_tag()
def get_shops():
    shops = Shop.objects.all()
    return shops
