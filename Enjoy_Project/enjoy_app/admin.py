from django.contrib import admin


from .models import ImageLibrary, UserImage

admin.site.register(ImageLibrary)
admin.site.register(UserImage)