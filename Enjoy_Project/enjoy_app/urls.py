from django.urls import path
from . import views

app_name = 'enjoy_app' # for namespacing
urlpatterns = [
    path('', views.index, name='index'),
    path("user/", views.my_login, name="my_login"),
    path("submit/", views.submit, name="submit"),
    path("user/logout", views.logout_view, name="logout"),
    path("user/create", views.create_user, name = "create_user")


]