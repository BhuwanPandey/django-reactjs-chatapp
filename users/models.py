from django.db import models
from common.abstract import AbstractModel
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ObjectDoesNotExist 
from django.http import Http404
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    def get_object_by_public_id(self, public_id): 
        try: 
            instance = self.get(public_id=public_id) 
            return instance 
        except (ObjectDoesNotExist, ValueError, TypeError): 
            return Http404
        
    def create_user(self, username, email, password=None, 
        **kwargs): 
        """Create and return a `User` with an email, phone 
            number, username and password.""" 
        if username is None: 
            raise TypeError('Users must have a username.') 
        if password is None: 
            raise TypeError('User must have an password.')
        if email:
            email = self.normalize_email(email)
        user = self.model(username=username, 
            email=self.normalize_email(email), **kwargs) 
        user.set_password(password) 
        user.save(using=self._db) 
        return user

    def create_superuser(self, username, email, password, 
        **kwargs): 
        """ 
        Create and return a `User` with superuser (admin) 
            permissions. 
        """ 
        if password is None: 
            raise TypeError('Superusers must have a password.') 
        if username is None: 
            raise TypeError('Superusers must have an username.')
        if email:
            email = self.normalize_email(email)
        user = self.create_user(username, email, password, 
            **kwargs) 
        user.is_superuser = True 
        user.is_staff = True 
        user.save(using=self._db) 
        return user

    
def user_directory_path(instance, filename): 
    return 'user_{0}/{1}'.format(instance.public_id, filename)

class UserModel(AbstractModel,AbstractUser):
    fullname = models.CharField(max_length=30, blank=True, null=True)
    about = models.TextField(max_length=500, blank=True)
    address = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField( 
        null=True, blank=True, 
        upload_to = user_directory_path
    )
    objects = UserManager()

    def __str__(self): 
        return f"{self.username}"

