from .base import *


HEROKU_APP_NAME = os.environ.get("HEROKU_APP_NAME")
SITE_DOMAIN = os.environ.get('SITE_DOMAIN', f'https://{HEROKU_APP_NAME}.herokuapp.com')

assert SITE_DOMAIN or HEROKU_APP_NAME, "SITE_DOMAIN or at least HEROKU_APP_NAME must be defined"

# Remove protocol from domain, if given
DOMAIN = SITE_DOMAIN.replace('http://', '').replace('https://', '').replace("/", "")
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
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

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


# =============================================================================
# Monitoring/analyzing process
# =============================================================================
INSTALLED_APPS += ("scout_apm.django",)
SCOUT_NAME = f"{DOMAIN}"


# =============================================================================
# Fix static files/paths
# =============================================================================
TEMPLATES[0]['DIRS'] = [
    os.path.join(BASE_DIR, '../frontend/build/generated'),
    os.path.join(BASE_DIR, 'templates'),
]
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, '../frontend/build/generated/static'),
    os.path.join(BASE_DIR, 'static'),
)
# Turn this on to use S3 public static storage
# class PublicStorage(S3Boto3Storage):
#     default_acl = "public-read"
#     gzip = True
# STATICFILES_STORAGE = 'something.storages.PublicStorage'


# =============================================================================
# CORS
# =============================================================================
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    SITE_DOMAIN,
)


# =============================================================================
# Email
# =============================================================================
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.sendgrid.net')
EMAIL_HOST_USER = os.environ.get('SENDGRID_USERNAME')
EMAIL_HOST_PASSWORD = os.environ.get('SENDGRID_PASSWORD')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', "noreply@ckcollab.com")
SERVER_EMAIL = os.environ.get('SERVER_EMAIL', DEFAULT_FROM_EMAIL)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_PORT = 587


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
