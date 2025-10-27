from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def login(request: HttpRequest) -> HttpResponse:
    ctx = {}
    return render(request, "authn/login.html", ctx)
