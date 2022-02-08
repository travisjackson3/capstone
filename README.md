# Capstone
---

## Name 

Enjoy: Colorful Fun

## Project Overview
 The major features of my project include the ability to select from a range of black and white images that can be edited by the user by using a paintbrush with a color pallet. The project is meant to provide the user a way to be creative and draw on images. The project will include the use of Django, python, HTML, CSS and JavaScript. The main library used will be Pillow for image processing. JavaScript will provide the main frontend functions in the image editing canvas.
## Features
### User stories 
		As an artistic user, I want to be able to draw and color on images, because I want to color for relaxation. As a user I would like to have a large range of images available to edit. 
		The main page that users interact with will be the canvas image editor. There the user can pick an image, edit the image and draw on the image. The images will be loaded and stored by the backend framework. Get and Post functions will handle the transfer of the images. User functionality will be managed by Django. The frontend canvas image editing will be done using JavaScript.		

## Data Model
The application will need to store images that are available to be edited. it will need to have user information and be able to store images created by the user.

### ImageLibrary
- image_name. (Charfield)	
- image_location (ImageField)

### User
- Username (CharField)
- password

### UserImage
- username (FK)
- date_saved (DateTimeField)
- title (CharField)
- user_image_location (ImageField)


## MVP milestones
1. Access and view image
2. Essential feature: edit image
3. User access and saving their edited images.

### Essential features
- access images from database properly display images.
- edit images
- User access.

### really great to haves
- user functionality
- saving images
- advanced photo editing functionality. advanced color pallet, brush type, undo redo, fill

### nice to haves
- upload images locally
- upload images from web API search
- Built it printing functionality

## Schedule
The schedule will be broken down into weekly MVP. The first week will include Django setup, html layout and functionality. The essential feature for this interval will be the ability to access and view images on the webpage. The second week will include the main JavaScript programming for editing an image. The essential feature will allow the user to edit an image. Week three will include adding user access and the ability of the user to save their images. 

### week 1
- Basic backbone, Django setup, html layout, and be able to access images from image database
- Essential feature: Access and view image
### week 2
- image editing functionality via JavaScript
- Essential feature: edit image
- “Really great to haves” if time allows
### week 3
- CSS polish
- “Really great to haves”
- user access
- saving files
- “nice to have features” if time allows
