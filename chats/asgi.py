"""
ASGI config for chats project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
import chatapp.routing
from django.core.asgi import get_asgi_application
from chats.middleware import TokenMiddleware
from channels.routing import ProtocolTypeRouter, URLRouter


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chats.settings')

application = get_asgi_application()




application = ProtocolTypeRouter(
    {
        "http": application,
        "websocket": TokenMiddleware(URLRouter(chatapp.routing.websocket_urlpatterns)),
    }
)