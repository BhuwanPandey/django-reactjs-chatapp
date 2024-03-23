from rest_framework import viewsets, permissions,status
from chatapp.serializers import ChatSerializer, ChatMessageSerializer, MessageSerializer, CheckSerializer, ChatCommonSerializer
from chatapp.models import Chat, ChatMessage, ChatUser
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
import uuid
from django.http import Http404

from django.db.models import OuterRef, Subquery, F


User = get_user_model()

class ChatViewset(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "uuid"


    def get_queryset(self):
        user = self.request.user
        last_messages = ChatMessage.objects.filter(
            user__chat_id=OuterRef('pk')
        ).order_by('-created_at').annotate(
            username=F("user__user__username")
        )

        return Chat.objects.filter(chat_user__user=user).annotate(
            last_messages = Subquery(last_messages.values('message')[:1]),
            last_messages_sender = Subquery(last_messages.values('username')[:1]),
            last_date = Subquery(last_messages.values("created_at")[:1])
        ).order_by("-last_date")
    

    def create(self,request):
        try:
            owner = request.user
            member = request.data["member"]
            message = request.data["message"]
            otheruser = User.objects.get(public_id=member)
            owner_username = owner.username
            member_username = otheruser.username

            if owner == otheruser:
                raise ValueError

            if owner.public_id > otheruser.public_id:
                name = f"{owner_username}_{member_username}_chat"
            else:
                name = f"{member_username}_{owner_username}_chat"

            chat = Chat.objects.filter(
                Q(name=name)
            )
            if not chat.exists():
                chat_obj = Chat.objects.create(
                    name = name
                )
            else:
                chat_obj = chat.first()
            
            # adding on chatuser
            chatuser_qs = ChatUser.objects.filter(
                user = owner, chat_id = chat_obj
            )
            if not chatuser_qs.exists():
                chatuser = ChatUser.objects.create(
                    user = owner, chat_id = chat_obj, is_initiator=True
                )
                ChatUser.objects.create(
                    user = otheruser, chat_id = chat_obj
                )
            else:
                chatuser = chatuser_qs.first()
            
            chatMessageObj = ChatMessage.objects.create(
                user=chatuser, message=message
            )
            serializer = ChatMessageSerializer(chatMessageObj)
            return Response(serializer.data)
        except:
            status_code = status.HTTP_400_BAD_REQUEST
            return Response({"details":"Something Went Wrong!"},status=status_code)

    def get_object(self):
        id = self.kwargs["uuid"]
        try:
            uuid.UUID(id)
        except ValueError:
            raise Http404("Invalid format.")
        queryset = self.get_queryset()
        user = get_object_or_404(queryset,public_id=id)
        return user


    @action(detail=True, methods=['get'])
    def messagecollection(self,request,uuid=None):
        chat_obj = self.get_object()
        chat_messages = ChatMessage.objects.filter(
            user__chat_id=chat_obj
        ).order_by("created_at")
        serializer = ChatMessageSerializer(chat_messages, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], serializer_class=CheckSerializer)
    def check_chat(self,request):
        name = request.data["chat_name"]
        chat_qs = Chat.objects.filter(
            name=name
        )
        if chat_qs.exists() and chat_qs[0].chat_user.count() > 1:
            chat_obj = chat_qs.first()
            serializer = ChatCommonSerializer(chat_obj, context={"request":request}).data
            res_status = status.HTTP_200_OK
        else:
            serializer = {}
            res_status = status.HTTP_202_ACCEPTED
        return Response(serializer, status = res_status)

    @action(detail=True, methods=['post'], serializer_class = MessageSerializer)
    def send_messages(self,request,uuid=None):
        chat_obj = self.get_object()
        try:
            message = request.data["message"]
            chatuser = chat_obj.chat_user.filter(user=request.user)
            
            chatmessage = ChatMessage.objects.create(
                user=chatuser[0], message = message
            )
            serializer = ChatMessageSerializer(chatmessage).data
            status_code = status.HTTP_200_OK

        except:
            status_code = status.HTTP_400_BAD_REQUEST
            serializer = {"details":"Bad Request"}
        return Response(serializer,status=status_code)

