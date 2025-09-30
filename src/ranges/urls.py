from django.urls import path
from ranges import views

urlpatterns = [
    path("<int:range_id>", views.ranges_view, name="ranges"),
]

app_name = "ranges"
