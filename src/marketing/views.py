from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def home(request: HttpRequest) -> HttpResponse:
    ctx = {}
    return render(request, "marketing/home.html", ctx)
