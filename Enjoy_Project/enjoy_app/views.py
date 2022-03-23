import datetime
from email.mime import image

import re
import base64
from io import BytesIO


from django.shortcuts import render
from django.http import  HttpResponseRedirect
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from PIL import Image
from django.contrib.auth.models import User
from enjoy_app.models import UserImage
from enjoy_app.forms import UserLoginForm, UserCreateForm
from django.contrib import messages
from enjoy_app.models import ImageLibrary
from django.shortcuts import  render



#import cloudinary
#import cloudinary.uploader
#import cloudinary.api
      


im_thumb = image

#cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", 
 # public_id = "olympic_flag")


def index(request):

    image_list = []
    user_image_list = []
    user_gallery_list = []

    images_set = ImageLibrary.objects.all()
    user_image_set = UserImage.objects.all()


   #image library
    for image in images_set:  

        image_list.append(image)

    #All user drawings
    for user_image in user_image_set:
 
            user_gallery_list.append(user_image)

    
    #loads logged in user drawings
    # 
    if request.user.is_authenticated:
        
        username = request.user.get_username()
        print(username)
        for user_image in user_image_set:
  
            if user_image.username == username:
                user_image_list.append(user_image)

    #cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg", 
    #public_id = "olympic_flag")

    form = UserLoginForm()
    create_form = UserCreateForm()

    context = {"image": image_list, "user_image": user_image_list,
             "gallery_images": user_gallery_list,
             'form': form, "create_form": create_form}

    return render(request, "enjoy_app/index.html", context)
   
       


##
#User section
##
def create_user(request):


    if request.method == "POST":

        username = request.POST['username']
        password = request.POST['password']

        user = User.objects.create_user(username, None, password)
        user.save()
      #  login(request, user)

        messages.info(request, 'You have successfully created an account!')

        return HttpResponseRedirect("/")


    return HttpResponseRedirect("/")





#
#User login
#
def my_login(request):

    if request.method == 'POST':

            
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
        # redirect to a success page
            messages.info(request, 'You have successfully logged in!')

            return HttpResponseRedirect("/")


        else:

            messages.info(request, 'Login unsucessfull!')

            return HttpResponseRedirect("/")


#
#logout
#
def logout_view(request):
   
    logout(request)


    messages.info(request, 'You have logged out successfully!')

    return HttpResponseRedirect("/")


#post request data from the user drawing submit
#Conversts user drawing back into image, saves to database and hardrive
# creates a thumbnail version of the image
#
def submit(request):

    print(request)
    if request.method == 'POST':

        username = request.user.get_username()
        date_saved = datetime.datetime.now()
        image_title = request.POST["image_title"]
        image_data = request.POST["user_image_location"]
        image_height = request.POST["user_image_height"]
        image_width = request.POST["user_image_width"]

        #converts photodata to image.
        image_data = re.sub("^data:image/png;base64,", "", image_data)
        image_data = base64.b64decode(image_data)
        image_data = BytesIO(image_data)

        print(image_data)

        im = Image.open(image_data)
        assert (int(image_height), int(image_width)) == im.size

   
        im_thumb = im
        save_location = f"media/user_save/{image_title}.png"
        im.save(save_location)

          
        #create a thumbnail from photodata
        thum_size = 250, 250
        im_thumb.thumbnail(thum_size, Image.ANTIALIAS)
        thumb_save_location = f"media/user_save/{image_title}Thm.png"
        im_thumb.save(thumb_save_location)


        new_user_img = UserImage(username=username, date_saved =date_saved,
            image_title =image_title, user_image_location = save_location,
            user_thumbnail_image_location = thumb_save_location )

        new_user_img.save()


        messages.info(request, 'Image Saved!')

    return HttpResponseRedirect("/")

