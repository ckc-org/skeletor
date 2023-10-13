from .base import *


HEROKU_APP_NAME = os.environ.get("HEROKU_APP_NAME")
BACKEND_URL = os.environ.get('BACKEND_URL', f'https://{HEROKU_APP_NAME}.herokuapp.com')

assert BACKEND_URL or HEROKU_APP_NAME, "BACKEND_URL or at least HEROKU_APP_NAME must be defined"

# Remove protocol from domain, if given
DOMAIN = BACKEND_URL.replace('http://', '').replace('https://', '').replace("/", "")
SITE_NAME = DOMAIN

# =============================================================================
# Cookies/auth
# =============================================================================
SESSION_COOKIE_DOMAIN = DOMAIN
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'Strict'

# =============================================================================
# SSL
# =============================================================================
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True

# =============================================================================
# Cloudcube storage
# =============================================================================
cloudcube_url = os.environ.get('CLOUDCUBE_URL')
if cloudcube_url:
    STORAGES['default']['BACKEND'] = 'storages.backends.s3boto3.S3Boto3Storage'

    # example cloudcube url: https://cloud-cube.s3.amazonaws.com/bucketname
    cloudcube_url = os.environ.get('CLOUDCUBE_URL')
    cloudcube_bucket = os.path.basename(cloudcube_url)   # bucketname
    cloudcube_base_url = os.path.dirname(cloudcube_url)  # https://cloud-cube.s3.amazonaws.com/

    AWS_S3_ENDPOINT_URL = cloudcube_base_url
    AWS_ACCESS_KEY_ID = os.environ.get('CLOUDCUBE_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('CLOUDCUBE_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = cloudcube_bucket
    AWS_DEFAULT_ACL = os.environ.get('AWS_DEFAULT_ACL', 'private')
    AWS_QUERYSTRING_AUTH = False
    AWS_S3_SIGNATURE_VERSION = "s3v4"
    AWS_S3_FILE_OVERWRITE = False


# =============================================================================
# Static
# =============================================================================
# On Heroku nginx buildpack is serving the Nuxt3 app from / so we need to prefix
# all of our stuff with /django
STATIC_URL = '/django/static/'


# =============================================================================
# CORS
# =============================================================================
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    BACKEND_URL,
)


# =============================================================================
# Logging
# =============================================================================
LOGGING['handlers']['mail_admins'] = {
    'level': 'ERROR',
    'class': 'django.utils.log.AdminEmailHandler',
}
LOGGING['django.request'] = {
    'handlers': ['mail_admins'],
    'level': 'ERROR',
    'propagate': False,
}
