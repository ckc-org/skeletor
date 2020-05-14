from .base import *


HEROKU_APP_NAME = os.environ.get("HEROKU_APP_NAME")
DOMAIN = os.environ.get('DOMAIN', f'{HEROKU_APP_NAME}.herokuapp.com')

# =============================================================================
# SSL
# =============================================================================
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True

# =============================================================================
# Cloudcube storage
# =============================================================================
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
# Fix static files/paths
# =============================================================================
TEMPLATES[0]['DIRS'] = [
    os.path.join(BASE_DIR, '../frontend/build/generated'),
    os.path.join(BASE_DIR, 'templates'),
]
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, '../frontend/build/generated'),
    os.path.join(BASE_DIR, 'static'),
)
STATICFILES_STORAGE = 'whitenoise.django.CompressedManifestStaticFilesStorage'
# Turn this on to use S3 public static storage
# class PublicStorage(S3Boto3Storage):
#     default_acl = "public-read"
#     gzip = True
# STATICFILES_STORAGE = 'something.storages.PublicStorage'


# =============================================================================
# CORS
# =============================================================================
CORS_ORIGIN_WHITELIST = (
    f'https://{DOMAIN}',
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
