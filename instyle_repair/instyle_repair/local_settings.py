import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-mqmgw=v1e9s0jk+!rx6&-s$zo1%fng0@qlni@m1dtynp(!pum8'

DEBUG = True

ALLOWED_HOSTS = []


DATABASES = {

    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'instyle',
        'USER': 'postgres',
        'PASSWORD': 'root',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}


STATIC_URL = '/static/'
