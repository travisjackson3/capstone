from django.forms import ModelForm
from django.contrib.auth.models import User

from enjoy_app.models import UserImage



class UserLoginForm(ModelForm):
    class Meta:

        model = User
        fields = ['username', 'password']


class UserSaveImage(ModelForm):
    class Meta:
        model = UserImage
        fields = ["image_title", "user_image_location"]
