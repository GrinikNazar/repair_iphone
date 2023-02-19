from django.shortcuts import render, redirect
from .models import *
from users.models import CustomUser


def index(request):
    repairs = Repair.objects.all().order_by('-warranty', '-time_create')

    context = {
        'repairs': repairs,
    }

    return render(request, 'service/index.html', context=context)


def add_master(request, pk, name):
    repair = Repair.objects.get(pk=pk)
    master = CustomUser.objects.get(name=name)
    repair.master = master
    repair.status = repair.APPLY
    repair.save()

    return redirect('index')


def closed_repair(request, pk):
    repair = Repair.objects.get(pk=pk)
    repair.status = repair.CLOSED
    repair.save()

    return redirect('index')


def my_repairs(request, user_id):
    masters = CustomUser.objects.filter(groups__name='Майстри')
    master = masters.get(pk=user_id)
    repairs = Repair.objects.filter(master=master).order_by('-warranty', '-time_create')

    context = {
        'repairs': repairs,
    }

    return render(request, 'service/index.html', context=context)


def my_statistic(request, user_id):
    masters = CustomUser.objects.filter(groups__name='Майстри')
    master = masters.get(pk=user_id)

    statistic = f'Тут буде шось про статистику чувака {master.name}'

    context = {
        'statistic': statistic,
    }

    return render(request, 'service/index.html', context=context)
