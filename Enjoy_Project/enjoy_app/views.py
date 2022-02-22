import datetime
import os, sys
import re
import base64
from io import BytesIO
from tkinter import image_names
from django.forms import ImageField
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from PIL import Image
from django.contrib.auth.models import User
from enjoy_app.models import UserImage
from enjoy_app.forms import UserSaveImage
from enjoy_app.forms import UserLoginForm, UserCreateForm

from enjoy_app.models import ImageLibrary

from django.shortcuts import redirect, render


def index(request):

   # print(request)
    #print("testindex")
  #  if (request.method == "POST"):
   #     print("testpost")
   #     login(request)
    ### image loading test
    ### just send string of locations on post????
   
    image1  = ImageLibrary.objects.get(image_name = "mandala1")
    image2 = ImageLibrary.objects.get(image_name = "mandala2")
    image3 = ImageLibrary.objects.get(image_name = "mandala3")
    image4 = ImageLibrary.objects.get(image_name = "mandala4")



    ###Image editing
   # with Image.open(testImage.image_location) as testing:
       # (width, height) = (testing.width // 1, testing.height //1)
        #testresize = testing.resize((width, height))
     #   size = 400, 400
  #      testing.thumbnail(size, Image.ANTIALIAS)
          


   # print(testresize)
    #testresize.save(f"{testImage.image_location}")
  # testing.save(f"{testImage.image_location}")
   # testing.close()

    form = UserLoginForm()
    create_form = UserCreateForm()

    context = {"image": [image1, image2, image3, image4], 'form': form, "create_form": create_form}
    return render(request, "enjoy_app/index.html", context)
    
       


##
#User section
##


def create_user(request):

    print(request)
    if request.method == "POST":

        username = request.POST['username']
        password = request.POST['password']

        user = User.objects.create_user(username, None, password)
        user.save()

        return HttpResponse("success")

    return redirect("/")





def my_login(request):

    if request.method == 'POST':

            
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
        # redirect to a success page
            return redirect("/")


        else:

            return HttpResponse("fail")




def logout_view(request):
   
    logout(request)

    return redirect("/")



#@login_required

def submit(request):

    if request.method == 'POST':

        username = request.user.get_username()
        date_saved = datetime.datetime.now()
        image_title = request.POST["image_title"]
        image_data = request.POST["user_image_location"]
        image_height = request.POST["user_image_height"]
        image_width = request.POST["user_image_width"]
    

        #converts photo data to image.
        image_data = re.sub("^data:image/png;base64,", "", image_data)
        image_data = base64.b64decode(image_data)
        image_data = BytesIO(image_data)
        im = Image.open(image_data)
        assert (int(image_height), int(image_width)) == im.size

        save_location = f"media/user_save/{image_title}.png"
   
        im.save(save_location)


#### Check if filename already exists. Add? (1) at end?

        createtest = UserImage(username=username, date_saved =date_saved,
            image_title =image_title, user_image_location = save_location)

        createtest.save()


    return HttpResponseRedirect ("/")













#https://www.geeksforgeeks.org/python-uploading-images-in-django/





        ###Image editing
   # with Image.open(testImage.image_location) as testing:
       # (width, height) = (testing.width // 1, testing.height //1)
       # testresize = testing.resize((width, height))
       # size = 200, 200
       # testing.thumbnail(size, Image.ANTIALIAS)
      #      ...    


   # print(testresize)
   # testresize.save(f"{testImage.image_location}")
   #     testing.save(f"{testImage.image_location}")
   # testresize.close()