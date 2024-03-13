from rest_framework.generics import RetrieveUpdateDestroyAPIView,RetrieveAPIView
from users.serializers import UserDetailsSerializer
from rest_framework import permissions
from users.models import UserModel
from django.shortcuts import get_object_or_404


class UserDetailsView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ["get", "put", "delete"]
    queryset = UserModel.objects.none()

    def get_object(self):
        user = self.request.user
        return user


class UserDetailView(RetrieveAPIView):
    serializer_class = UserDetailsSerializer
    queryset = UserModel.objects.all()

    def get_object(self):
        id = self.kwargs["uuid"]
        user = get_object_or_404(self.queryset,public_id=id)
        return user
