from tkinter import image_names
from django.forms import ImageField
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login

from enjoy_app.models import ImageLibrary


def index(request):



    ### image loading test

    testImage = ImageLibrary.objects.get(image_name = "testtest")
    testImage2 = ImageLibrary.objects.get(image_name = "mandala_2")
    testImage3 = ImageLibrary.objects.get(image_name = "mandala_wolf")
    testImage4 = ImageLibrary.objects.get(image_name = "blossom_mandala")
    print(testImage.image_location)
   
    context = {"test": [1,2,3], "image": [testImage, testImage2, testImage3, testImage4] }
   # context = {"imagetest": testImage}

    print(context)


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