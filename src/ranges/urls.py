from django.urls import path
from ranges import views

urlpatterns = [
    path("", views.range_list, name="range_list"),
    path("<int:range_id>", views.range_detail, name="range_detail"),
    path("<int:range_id>/quiz", views.range_quiz, name="range_quiz"),
]

app_name = "ranges"
