from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from chatapp.serializers import ChatMessageSerializer
from chatapp.models import Chat, ChatMessage,ChatUser
from django.contrib.auth import get_user_model
from django.core.cache import cache

User = get_user_model()

class ChatConsumer(AsyncJsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.chat_id = []
        self.online_user = []
        self.user = None

    async def add_online_user(self):
        # adding on cache
        username = self.user.username.lower()
        key = f"user_:{username}"
        has_key = cache.get(key)
        if not has_key:
            cache.set(key,username)
        
        name = "user_:*"
        all_keys = cache.keys(name)
        
        for key in all_keys:
            _,username = key.split(":")
            self.online_user.append(username)

    def get_chat_id(self, user):
        chat_queryset = Chat.objects.filter(chat_user__user=user).values_list(
            "public_id",flat=True
        )
        return list(chat_queryset)
    
    async def send_online_users(self):
        chatMessage = {
            'type': "userjoined",
            'message': {
                'type': 'onlineUser',
                'onlineuser': self.online_user
            }
        }
        await self.channel_layer.group_send("OnlineUser",chatMessage)
    
    async def delete_online_user(self):
        username = self.user.username.lower()
        key = f"user_:{username}"
        cache.delete(key)
        self.online_user.remove(username)

    async def connect(self):
        self.user = self.scope["user"]
        if self.user is None or self.user.is_anonymous:
            await self.close()
            return
        
        self.chat_id = await database_sync_to_async(self.get_chat_id)(self.user)
        for chatid in self.chat_id:
            self.chatroom = str(chatid)
            await self.channel_layer.group_add(
                self.chatroom,
                self.channel_name
            )
        # online user handling
        await self.channel_layer.group_add(
            "OnlineUser",
            self.channel_name
        )
        await self.accept()
        await self.add_online_user()
        await self.send_online_users()
        await self.send_json({
            "message":f"{self.user.username} is connected !"
        })

    async def disconnect(self,code):
        if not self.user.is_anonymous:
            await self.delete_online_user()
            await self.send_online_users()
            for chatid in self.chat_id:
                self.chatroom = str(chatid)
                await self.channel_layer.group_discard(
                    self.chatroom,
                    self.channel_name
                )
        await self.close()

    @database_sync_to_async
    def create_chat(self,name,username):
        chat_obj,_ = Chat.objects.get_or_create(
                name = name
            )
        c1 = ChatUser(user=self.user,chat_id=chat_obj)
        u = User.objects.get(username=username)
        c2 = ChatUser(user=u,chat_id=chat_obj)
        ChatUser.objects.bulk_create([c1,c2])
        return chat_obj
    
    @database_sync_to_async
    def check_chat(self, id):
        status = False
        chat_obj = None
        chat_qs = Chat.objects.filter(public_id=id,chat_user__user=self.user)
        if chat_qs.exists():
            status = True
            chat_obj = chat_qs.first()
        return status,chat_obj
    
    @database_sync_to_async
    def save(self, chat_obj, message):
        chatuser = chat_obj.chat_user.filter(user=self.user)
        
        chatmessage = ChatMessage.objects.create(
            user=chatuser[0], message = message
        )
        serializer = ChatMessageSerializer(chatmessage).data
        serializer["type"] = "chat_message"
        return serializer
        

    async def receive_json(self, content, **kwargs):
        message_type = content["type"]
        chat_message = {}
        if message_type == "chat_begin":
            message = content["message"]
            chat_name = content["chat_name"]
            another_user = content["user"]
            chat_obj = await self.create_chat(chat_name,another_user)
            message = content["message"]
            chat_message = await self.save(chat_obj, message)
            self.chatroom = str(chat_obj.public_id)
            await self.channel_layer.group_add(
                self.chatroom,
                self.channel_name
            )
            chat_message["chat_id"] = str(chat_obj.public_id)
        else:
            chat_id = content["chat_id"]
            exists,chat_obj = await self.check_chat(chat_id)

            if not exists:
                await self.close()
                return 

            self.chatroom = str(chat_obj.public_id)
            if message_type == "chat_message":
                message = content["message"]
                chat_message = await self.save(chat_obj, message)

            elif message_type == "typing":
                content["username"] = self.user.username
                chat_id = content["chat_id"]
                chat_message = content

        await self.channel_layer.group_send(
            self.chatroom,
            {
                'type': 'chat_messages',
                'message': chat_message
            }
        )
    
    async def chat_messages(self, event):
        message = event['message']
        await self.send_json(message)

    async def userjoined(self, event):
        message = event['message']
        await self.send_json(message)
