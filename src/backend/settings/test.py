from .base import *


# Turn off DJDT
DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: False
}

# This is for running tests outside of docker container (used on circleCI)
TEMPLATES[0]['DIRS'].append(os.path.join(BASE_DIR, '../frontend/build/generated'))
