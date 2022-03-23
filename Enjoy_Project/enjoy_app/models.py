
from pyexpat import model
from django.db import models
from django.forms import CharField
from django.contrib.auth.models import User


#
#model for all the drawing images
#
class ImageLibrary(models.Model):
    image_name = models.CharField(max_length=15)

    image_location = models.ImageField(upload_to="media")
    thumbnail_image_location = models.ImageField(upload_to="media")

    def __str__(self):
        return self.image_name



#
#Saved user images model
#
class UserImage(models.Model):
    
    username = models.CharField(max_length=15)
    date_saved =models.DateTimeField()
    image_title = models.CharField(max_length=14)

    user_image_location = models.ImageField()
    user_thumbnail_image_location = models.ImageField(default = "mandala.jpg")

    def __str__(self):
        return f"{self.username}: {self.image_title}"


