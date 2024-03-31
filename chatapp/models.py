from django.db import models
from django.contrib.auth import get_user_model
from common.abstract import AbstractModel


User = get_user_model()

class Chat(AbstractModel):
    name = models.CharField(max_length=255)
    group_profile = models.ImageField(upload_to='groupprofile/',null=True,blank=True)
    has_group = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ChatUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chat_id = models.ForeignKey(Chat, related_name="chat_user", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.user} chat"


class ChatMessage(models.Model):
    message = models.TextField()
    user = models.ForeignKey(ChatUser, related_name="user_messages", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return self.message
