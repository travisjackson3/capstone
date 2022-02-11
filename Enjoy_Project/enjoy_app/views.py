import os, sys

from tkinter import image_names
from django.forms import ImageField
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login
from PIL import Image


from enjoy_app.models import ImageLibrary


def index(request):


    ### image loading test
    ### just send string of locations on post????

    testImage  = ImageLibrary.objects.get(image_name = "world")
    testImage2 = ImageLibrary.objects.get(image_name = "mandala2")
    testImage3 = ImageLibrary.objects.get(image_name = "wolf")
    testImage4 = ImageLibrary.objects.get(image_name = "blossom")



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

    
   # print(testImage.image_location)   
    #print(testImage.image_location.width)
  #  print(testImage.image_location.height)



    context = {"test": [1,2,3], "image": [testImage, testImage2, testImage3, testImage4]}
   # context = {"imagetest": testImage}

  #  print(context)


    return render(request, "enjoy_app/index.html", context)




















##
#User section
##

def mylogin(request):
    # retrieve the variables from the form submission
    username = request.POST['username']
    password = request.POST['password']
   # user = authenticate(request, username=username, password=password)
 #   if user is not None:
 ##       login(request, user)
        # redirect to a success page
  #  else:
        # return an 'invalid login' error message



def logout_view(request):
    ...
   # logout(request)
    # redirect to a success page.


















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