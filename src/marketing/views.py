from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from authn.decorators import guest_required


@guest_required
def home(request: HttpRequest) -> HttpResponse:
    ctx = {}
    return render(request, "marketing/home.html", ctx)
