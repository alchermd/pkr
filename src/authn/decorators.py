from functools import wraps

from django.conf import settings
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect


def guest_required(function):
    def decorator(view_func):
        @wraps(view_func)
        def f(request: HttpRequest, *args, **kwargs) -> HttpResponse:
            if request.user.is_authenticated:
                return redirect(settings.LOGIN_REDIRECT_URL)
            return view_func(request, *args, **kwargs)

        return f

    if function is not None:
        return decorator(function)

    return decorator
