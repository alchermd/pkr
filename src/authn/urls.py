from django.urls import path

from authn import views

urlpatterns = [path("login/", views.login, name="login")]

app_name = "authn"
