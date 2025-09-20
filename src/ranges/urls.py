from django.urls import path
from ranges import views

urlpatterns = [
    path("", views.ranges_view, name="ranges"),
]

app_name = "ranges"
