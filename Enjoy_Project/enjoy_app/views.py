import datetime
import os, sys

from tkinter import image_names
from django.forms import ImageField
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from PIL import Image
from django.contrib.auth.models import User
from enjoy_app.forms import UserSaveImage
from enjoy_app.forms import UserLoginForm

from enjoy_app.models import ImageLibrary


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
    formSave = UserSaveImage()

    context = {"image": [image1, image2, image3, image4], 'form': form, "formSave": formSave}
    return render(request, "enjoy_app/index.html", context)
    
       

def user_save_image(request):

    #@login_required
    ...















##
#User section
##


def create_user(request):
    #user = User.objects.create_user()
    # user.name = "test"
    # user.save()
    ...








def my_login(request):

    if request.method == 'POST':

            
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
        # redirect to a success page
            return HttpResponse('success')

        else:

            return HttpResponse("fail")

def logout_view(request):
    ...
   # logout(request)
    # redirect to a success page.




#@login_required

def submit(request):

    if request.method == 'POST':

        username = request.user.get_username()
        date_saved = datetime.datetime.now()
        image_title = request.POST["image_title"]
        user_image_location = request.POST["user_image_location"]

        print(username)
        print(user_image_location)
        print(image_title)



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