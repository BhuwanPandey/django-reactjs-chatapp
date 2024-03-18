from channels.middleware import BaseMiddleware
from rest_framework.authtoken.models import Token
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from urllib.parse import parse_qs


@database_sync_to_async
def get_user(token_key):
    try:
        token = Token.objects.get(key=token_key)
        return token.user
    except Token.DoesNotExist:
        return AnonymousUser()
    

class TokenMiddleware(BaseMiddleware):

    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):        
        query_params = parse_qs(scope["query_string"].decode())
        token = query_params["token"][0]
        try:
            scope["user"] =  await get_user(token_key=token)
        except:
            scope["user"] =  AnonymousUser()
        return await self.app(scope, receive, send)
