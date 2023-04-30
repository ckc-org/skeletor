from .base import *


# NOTE about emails: Django takes over email sending during tests, and all emails are saved to
# mail.outbox -- https://docs.djangoproject.com/en/4.1/topics/testing/tools/#email-services

# Turn off DJDT
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: False
}

# Make whitenoise not nag about missing files
STORAGES["staticfiles"] = {
    "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
}
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
