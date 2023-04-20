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
