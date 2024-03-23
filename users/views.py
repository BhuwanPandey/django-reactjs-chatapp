from rest_framework.generics import RetrieveUpdateDestroyAPIView,RetrieveAPIView,ListAPIView
from users.serializers import UserDetailsSerializer
from rest_framework import permissions
from users.models import UserModel
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
import django_filters


class UserDetailsView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = (permissions.IsAuthenticated,)
    http_method_names = ["get", "put", "delete"]
    queryset = UserModel.objects.none()

    def get_object(self):
        user = self.request.user
        return user

class UserFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(method='filter_username')

    class Meta:
        model = UserModel
        fields = ["username"]

    def filter_username(self, queryset, name, value):
        if not value:
            return []
        return queryset.filter(username__icontains=value)


class UserAllDetailsView(ListAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class  = UserFilter


    def get_queryset(self):
        user_qs = UserModel.objects.all()
        request = self.request.user
        if request.is_authenticated:
            user_id = request.id
            queryset = user_qs.exclude(id=user_id)
        else:
            queryset = user_qs
        return queryset


class UserDetailView(RetrieveAPIView):
    serializer_class = UserDetailsSerializer
    queryset = UserModel.objects.all()

    def get_object(self):
        id = self.kwargs["uuid"]
        user = get_object_or_404(self.queryset,public_id=id)
        return user

class UserView(UserDetailView):
    serializer_class = UserDetailsSerializer
    queryset = UserModel.objects.all()

    def get_object(self):
        name = self.kwargs["username"]
        user = get_object_or_404(self.queryset,username=name)
        return user

