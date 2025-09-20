from django.urls import path
from ranges import views

urlpatterns = [
    path("<str:name>", views.ranges_view, name="ranges"),
]

app_name = "ranges"
