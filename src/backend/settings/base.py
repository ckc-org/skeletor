import datetime
import os
import sys

import dj_database_url

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Also add src/backend/apps to python path so we don't have to do
# "apps" in each import
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))

# =============================================================================
# Django
# =============================================================================
ALLOWED_HOSTS = ['*']
# Example admins env var (semi-colon separated entries with name and
# email separated by comma)
#
#   Admin Name,admin@test.com; Admin Name 2,admin2@test.com
ADMINS = [admin.split(",") for admin in os.environ.get("ADMINS", "").split(";")]
USE_X_FORWARDED_HOST = True

SITE_ID = 1

SITE_DOMAIN = os.environ.get('SITE_DOMAIN', 'http://localhost:8000')

THIRD_PARTY_APPS = (
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.postgres',

    'rest_framework',
    'rest_framework.authtoken',
    'django_extensions',
    'corsheaders',
    'ckc',
    'channels',
)
OUR_APPS = (
    'users',
    'commands',
)
INSTALLED_APPS = THIRD_PARTY_APPS + OUR_APPS

MIDDLEWARE = (
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            '/frontend/generated',
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
            ],
        },
    },
]

ASGI_APPLICATION = 'asgi.application'
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
SECRET_KEY = os.environ.get("SECRET_KEY", '5p&8i^z@#%nxkp&z)o%=m$51-hz&u7q^^ldtdh9ywcl(@@6ds+')
LOGIN_REDIRECT_URL = '/'
AUTH_USER_MODEL = 'users.User'
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
SESSION_ENGINE = os.environ.get("SESSION_ENGINE", "django.contrib.sessions.backends.cached_db")


# =============================================================================
# Debugging
# =============================================================================
DEBUG = os.environ.get('DEBUG', False)


# =============================================================================
# Database
# =============================================================================
DATABASES = {'default': {}}

db_from_env = dj_database_url.config()
if db_from_env:  # pragma: no cover
    DATABASES['default'].update(db_from_env)
else:  # pragma: no cover
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': os.environ.get('DB_NAME', 'postgres'),
            'USER': os.environ.get('DB_USERNAME', 'postgres'),
            'PASSWORD': os.environ.get('DB_PASSWORD', 'postgres'),
            'HOST': os.environ.get('DB_HOST', 'db'),
            'PORT': 5432,
        }
    }

DATABASES["default"]["CONN_MAX_AGE"] = 500


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
# Security/cookies
# =============================================================================
CORS_ORIGIN_WHITELIST = ('http://localhost:3000',)
CORS_ALLOW_CREDENTIALS = True

SESSION_COOKIE_HTTPONLY = True

CSRF_TRUSTED_ORIGINS = (
    'http://localhost:3000',
    SITE_DOMAIN,
)


# =============================================================================
# Whitenoise
# =============================================================================
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
WHITENOISE_MANIFEST_STRICT = False


# =============================================================================
# Storage
# =============================================================================
STATIC_URL = '/static/'
STATIC_URL_PREFIX = next((section for section in STATIC_URL.split('/') if section), 'static')
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
    '/frontend/generated/static',
)
MEDIA_ROOT = os.path.join(BASE_DIR, 'uploads')
MEDIA_URL = '/media/'
MEDIA_URL_PREFIX = next((section for section in MEDIA_URL.split('/') if section), 'media')


# =============================================================================
# Email
# =============================================================================
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'noreply@example.com')
SERVER_EMAIL = os.environ.get('SERVER_EMAIL', DEFAULT_FROM_EMAIL)

ANYMAIL = {
    'MANDRILL_API_KEY': os.environ.get('MANDRILL_API_KEY', '123456'),
}

DEFAULT_EMAIL_CONTEXT = {
    'CURRENT_YEAR': datetime.datetime.now().year,
    'SITE_DOMAIN': SITE_DOMAIN,
    'DEFAULT_FROM_EMAIL': DEFAULT_FROM_EMAIL,

    # Keys prepended with IMAGE_ are replaced with InlineImages when generating emails
    # then used like so in templates: <img src="">
    # 'IMAGE_EXAMPLE': 'images/example.png',
}

TEMPLATED_EMAIL_EMAIL_MESSAGE_CLASS = 'anymail.message.AnymailMessage'
TEMPLATED_EMAIL_EMAIL_MULTIALTERNATIVES_CLASS = 'anymail.message.AnymailMessage'
TEMPLATED_EMAIL_TEMPLATE_DIR = 'emails/'
TEMPLATED_EMAIL_FILE_EXTENSION = 'html'  # for nice highlighting, instead of .email ending


# ============================================================================
# Channels
# ============================================================================
REDIS_URL = os.environ.get('REDIS_URL', 'redis://redis:6379')
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [REDIS_URL],
        },
    },
}


# =============================================================================
# Caching
# =============================================================================
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': [REDIS_URL],
    },
}


# =============================================================================
# Celery
# =============================================================================
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_TIMEZONE = "US/Pacific"
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 15 * 60  # in seconds
CELERY_WORKER_HIJACK_ROOT_LOGGER = False  # let's handle our own logging stuff


# =============================================================================
# Redis SSL fun
# =============================================================================
# Handle Redis being SSL
if REDIS_URL.startswith('rediss'):
    import ssl

    # Mute the Heroku Redis error:
    # "[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self signed certificate in certificate chain"
    # by disabling hostname check.

    # Channels
    ssl_context = ssl.SSLContext()
    ssl_context.check_hostname = False
    CHANNEL_LAYERS["default"]["CONFIG"]["hosts"] = [{
        'address': REDIS_URL,
        'ssl': ssl_context,
    }]

    # Celery
    CELERY_BROKER_URL += "?ssl_cert_reqs=none"
    CELERY_RESULT_BACKEND += "?ssl_cert_reqs=none"

    # Caches
    CACHES['default']['OPTIONS'] = {
        'ssl_cert_reqs': ssl.CERT_NONE,
    }


# =============================================================================
# Logging
# =============================================================================
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'colored': {
            '()': 'colorlog.ColoredFormatter',
            'format': "%(log_color)s%(levelname)-8s%(reset)s %(white)s%(message)s",
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'colored',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
        },
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
        'django.server': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
        'uvicorn': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
    },
}

SLACK_WEBHOOK_URL = os.getenv('SLACK_WEBHOOK_URL', '')
if SLACK_WEBHOOK_URL:
    LOGGING['handlers']['slack'] = {
        'class': 'ckc.logging.CkcSlackHandler',
        'level': os.getenv('DJANGO_SLACK_LOG_LEVEL', 'ERROR'),
    }

    LOGGING['loggers']['django']['handlers'] = ['console', 'slack']
    LOGGING['loggers']['']['handlers'] = ['console', 'slack']

# =============================================================================
# Debug
# =============================================================================
if DEBUG:  # pragma: no cover
    INSTALLED_APPS += ('debug_toolbar',)
    MIDDLEWARE = (
        'debug_toolbar.middleware.DebugToolbarMiddleware',
        'querycount.middleware.QueryCountMiddleware',
    ) + MIDDLEWARE  # we want Debug Middleware at the top

    INTERNAL_IPS = ['127.0.0.1']

    import socket

    try:
        INTERNAL_IPS.append(socket.gethostbyname(socket.gethostname())[:-1])
    except socket.gaierror:  # pragma: no cover
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
