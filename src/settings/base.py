import os
import sys
from datetime import timedelta

import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Also add ../../apps to python path
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

# =============================================================================
# Django
# =============================================================================
ALLOWED_HOSTS = ['*']
USE_X_FORWARDED_HOST = True

SITE_ID = 1

SITE_DOMAIN = os.environ.get('SITE_DOMAIN', 'http://localhost')

THIRD_PARTY_APPS = (
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.postgres',

    'whitenoise',
)
OUR_APPS = (
)
INSTALLED_APPS = THIRD_PARTY_APPS + OUR_APPS

MIDDLEWARE = (
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.template.context_processors.static',
                'django.template.context_processors.media',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # 'utils.context_processors.common_settings',
            ],
        },
    },
]

WSGI_APPLICATION = 'wsgi.application'
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
SECRET_KEY = os.environ.get("SECRET_KEY", '(*0&74%ihg0ui+400+@%2pe92_c)x@w2m%6s(jhs^)dc$&&g93')

EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')

DEFAULT_FROM_EMAIL = 'Do Not Reply <donotreply@blank.com>'
SERVER_EMAIL = 'Do Not Reply <donotreply@blank.com>'

LOGIN_REDIRECT_URL = '/'

# AUTH_USER_MODEL = 'profiles.User'


# =============================================================================
# Authentication
# =============================================================================
# AUTHENTICATION_BACKENDS = (
#     'social_core.backends.github.GithubOAuth2',
#     'utils.oauth_backends.ChahubOAuth2',
#     'django.contrib.auth.backends.ModelBackend',
# )

# User Models
# AUTH_USER_MODEL = 'profiles.User'
# SOCIAL_AUTH_USER_MODEL = 'profiles.User'

# =============================================================================
# Debugging
# =============================================================================
DEBUG = os.environ.get('DEBUG', True)

# =============================================================================
# Database
# =============================================================================
DATABASES = {'default': {}}

db_from_env = dj_database_url.config()
if db_from_env:
    DATABASES['default'].update(db_from_env)
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.environ.get('DB_NAME', 'postgres'),
            'USER': os.environ.get('DB_USERNAME', 'postgres'),
            'PASSWORD': os.environ.get('DB_PASSWORD', 'postgres'),
            'HOST': os.environ.get('DB_HOST', 'db'),
            'PORT': 5432
        }
    }

# # =============================================================================
# # SSL
# # =============================================================================
# if os.environ.get('USE_SSL'):
#     SECURE_SSL_REDIRECT = True
#     SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# else:
#     # Allows us to use with django-oauth-toolkit on localhost sans https
#     SESSION_COOKIE_SECURE = False

# # =========================================================================
# # RabbitMQ
# # =========================================================================
# RABBITMQ_DEFAULT_USER = os.environ.get('RABBITMQ_DEFAULT_USER', 'guest')
# RABBITMQ_DEFAULT_PASS = os.environ.get('RABBITMQ_DEFAULT_PASS', 'guest')
# RABBITMQ_HOST = os.environ.get('RABBITMQ_HOST', 'rabbit')
# RABBITMQ_PORT = os.environ.get('RABBITMQ_PORT', '5672')
# RABBITMQ_MANAGEMENT_PORT = os.environ.get('RABBITMQ_MANAGEMENT_PORT', '15672')


# # ============================================================================
# # Celery
# # ============================================================================
# CELERY_BROKER_URL = os.environ.get("CLOUDAMQP_URL") or os.environ.get('BROKER_URL')
# if not CELERY_BROKER_URL:
#     CELERY_BROKER_URL = f'pyamqp://{RABBITMQ_DEFAULT_USER}:{RABBITMQ_DEFAULT_PASS}@{RABBITMQ_HOST}:{RABBITMQ_PORT}//'
# CELERY_TASK_SERIALIZER = 'json'
# CELERY_ACCEPT_CONTENT = ('json',)
# CELERY_BEAT_SCHEDULE = {
#     'do_phase_migrations': {
#         'task': 'src.apps.competitions.tasks.do_phase_migrations',
#         'schedule': timedelta(seconds=300),
#     },
# }
# CELERY_TIMEZONE = 'UTC'

# =============================================================================
# DRF
# =============================================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DATETIME_INPUT_FORMATS': (
        'iso-8601',
        '%B %d, %Y',
    )
}


# =============================================================================
# OAuth
# =============================================================================
CORS_ORIGIN_ALLOW_ALL = True

if not DEBUG and CORS_ORIGIN_ALLOW_ALL:
    raise Exception("Disable CORS_ORIGIN_ALLOW_ALL if we're not in DEBUG mode")


# =============================================================================
# Storage
# =============================================================================
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploads')
MEDIA_URL = '/media/'


# =============================================================================
# Debug
# =============================================================================
if DEBUG:
    INSTALLED_APPS += ('debug_toolbar',)
    MIDDLEWARE = ('debug_toolbar.middleware.DebugToolbarMiddleware',
                  'querycount.middleware.QueryCountMiddleware',
                  ) + MIDDLEWARE  # we want Debug Middleware at the top
    # tricks to have debug toolbar when developing with docker

    INTERNAL_IPS = ['127.0.0.1']

    import socket

    try:
        INTERNAL_IPS.append(socket.gethostbyname(socket.gethostname())[:-1])
    except socket.gaierror:
        pass

    QUERYCOUNT = {
        'IGNORE_REQUEST_PATTERNS': [
            r'^/admin/',
            r'^/static/',
        ]
    }

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": lambda request: True
    }
