from rest_framework import routers
from django.urls import path, include
from chatapp.views import ChatViewset


router = routers.SimpleRouter()
router.register('chats', ChatViewset, basename="chats")


urlpatterns = [
    path("", include(router.urls))
    
]
