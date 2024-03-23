from django.urls import path
from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView,
)
from dj_rest_auth.registration.views import RegisterView
from users.views import UserDetailsView,UserDetailView,UserAllDetailsView,UserView


urlpatterns = [
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('users/', UserAllDetailsView.as_view(), name='user_details'),
    path('users/<str:username>/', UserView.as_view(), name='by_username'),
    path('userinfo/<uuid:uuid>/', UserDetailView.as_view(), name='rest_user_detail'),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('registration/', RegisterView.as_view(), name='rest_register'),
]
