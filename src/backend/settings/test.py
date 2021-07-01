from .base import *


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Turn off DJDT
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: False
}

# This is for running tests outside of docker container (used on circleCI)
TEMPLATES[0]['DIRS'].append(os.path.join(BASE_DIR, '../frontend/build/generated'))

# Make whitenoise not nag about missing files
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
