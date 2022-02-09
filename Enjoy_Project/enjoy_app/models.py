from django.db import models
from django.forms import CharField



class ImageLibrary(models.Model):
    image_name = models.CharField(max_length=15)


    image_location = models.ImageField()

    #upload
   # image_location = models.ImageField(upload_to="images")



    def __str__(self):
        return self.image_name

class UserImage(models.Model):
    username = models.CharField(max_length=15)
    date_saved =models.DateTimeField()
    image_title = models.CharField(max_length=14)


    user_image_location = models.ImageField()

    def __str__(self):
        return self.username + self.image_title
