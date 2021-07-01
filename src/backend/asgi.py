import os

from django.conf.urls import url
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter

# Have to start Django up here BEFORE importing channels..
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.base')
asgi_application = get_asgi_application()

from channels.auth import AuthMiddlewareStack
from realtime.consumers import RealtimeConsumer


application = ProtocolTypeRouter({
    "http": asgi_application,

    "websocket": AuthMiddlewareStack(
        URLRouter([
            url(r"^ws/$", RealtimeConsumer.as_asgi()),
        ])
    ),
})
