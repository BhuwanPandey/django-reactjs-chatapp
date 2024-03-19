from django.contrib import admin
from chatapp.models import Chat, ChatUser, ChatMessage

admin.site.register([Chat,ChatUser,ChatMessage])
