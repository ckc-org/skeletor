from .base import *


# NOTE about emails: Django takes over email sending during tests, and all emails are saved to
# mail.outbox -- https://docs.djangoproject.com/en/4.1/topics/testing/tools/#email-services

# Turn off DJDT
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: False
}

# This is for running tests outside of docker container (used on circleCI)
TEMPLATES[0]['DIRS'].append(os.path.join(BASE_DIR, '../frontend/build/generated'))

# Make whitenoise not nag about missing files
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'
WHITENOISE_MANIFEST_STRICT = False

# This stops WhiteNoise from scanning your static files on start up
WHITENOISE_AUTOREFRESH = False

# Make password hashing faster
PASSWORD_HASHERS = ('django.contrib.auth.hashers.MD5PasswordHasher',)

# Don't actually hit Redis layers..
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}
