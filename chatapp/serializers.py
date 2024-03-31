from rest_framework import serializers
from chatapp.models import ChatMessage
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","avatar"]



class ChatCommonSerializer(serializers.Serializer):
    chat_id = serializers.UUIDField(read_only=True,source="public_id")
    member = serializers.CharField(write_only=True)
    message = serializers.CharField(write_only=True)

    class Meta:
        fields = "__all__"

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        request = self.context["request"]
        profile_image = None

        try:
            user_qs = obj.chat_user.all().exclude(user=request.user)
            user = user_qs.first().user
            display_name = user.username.capitalize()
            display_name_id = user.id
            if user.avatar.name:
                profile_image =  user.avatar.url
        except AttributeError:
            display_name = None
            display_name_id=0
            profile_image = None

        representation['display_name'] = display_name
        representation['display_name_id'] = display_name_id
        representation['chat_profile'] = profile_image
        return representation


class ChatSerializer(ChatCommonSerializer):
    member = serializers.CharField(write_only=True)
    message = serializers.CharField(write_only=True)
    last_message = serializers.SerializerMethodField()
    last_message_sender = serializers.SerializerMethodField()
    last_date = serializers.CharField(read_only=True)

    def get_last_message(self, obj):
        return obj.last_messages
    
    def get_last_message_sender(self, obj):
        return obj.last_messages_sender


class ChatMessageSerializer(serializers.ModelSerializer):
    message_id = serializers.IntegerField(source="id",read_only=True)
    chat_id = serializers.UUIDField(source="user.chat_id.public_id",read_only=True)
    user_details = UserSerializer(source="user.user")

    class Meta:
        model = ChatMessage
        fields = [
            "message_id",
            "chat_id",
            "message",
            "user_details",
            "read",
            "created_at",
        ]

class MessageSerializer(serializers.Serializer):
    message = serializers.CharField()

    class Meta:
        fields = ("message",)

class CheckSerializer(serializers.Serializer):
    chat_name = serializers.CharField()

    class Meta:
        fields = ["chat_name"]
