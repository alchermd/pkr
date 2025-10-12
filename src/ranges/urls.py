from django.urls import path
from ranges import views

urlpatterns = [
    path("<int:range_id>", views.range_detail, name="range_detail"),
]

app_name = "ranges"
