from functools import wraps
from typing import Any, TypeVar
from collections.abc import Callable
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect
from django.conf import settings

ViewFunc = TypeVar("ViewFunc", bound=Callable[..., HttpResponse])


def guest_required(function: ViewFunc | None = None) -> Callable[[ViewFunc], ViewFunc]:
    def decorator(view_func: ViewFunc) -> ViewFunc:
        @wraps(view_func)
        def f(request: HttpRequest, *args: Any, **kwargs: Any) -> HttpResponse:
            if request.user.is_authenticated:
                return redirect(settings.LOGIN_REDIRECT_URL)
            return view_func(request, *args, **kwargs)

        return f

    if function is not None:
        return decorator(function)
    return decorator
