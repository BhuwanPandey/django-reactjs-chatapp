from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.db import transaction
from users.models import UserModel


class CustomRegisterSerializer(RegisterSerializer):
    fullname = serializers.CharField(max_length=30,required=False)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.fullname = self.data.get('fullname')
        user.save()
        return user
    

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (
            "id",
            "public_id",
            "username",
            "fullname",
            "about",
            "address",
            "avatar",
        )
        read_only_fields = ("id","public_id","username")
