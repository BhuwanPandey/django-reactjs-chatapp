from django.contrib import admin
from users.models import UserModel
from django.contrib.auth.admin import UserAdmin

admin.site.register(UserModel,UserAdmin)
