import os

from django.urls import path
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

# Have to start Django up here BEFORE importing channels..
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.base')
asgi_application = get_asgi_application()

from channels.auth import AuthMiddlewareStack  # noqa
from realtime.consumers import RealtimeConsumer  # noqa


application = ProtocolTypeRouter({
    "http": asgi_application,

    "websocket": AuthMiddlewareStack(
        URLRouter([
            path("ws/", RealtimeConsumer.as_asgi()),
        ])
    ),
})


# If we're on Heroku, then let's let heroku nginx buildpack know that we're ready by
# touching this file to make it exist: /tmp/app-initialized
if os.getenv('DJANGO_SETTINGS_MODULE') == 'settings.heroku':
    open('/tmp/app-initialized', 'a').close()
