from django.conf import settings
from django.http import HttpRequest


def debug_flag(_request: HttpRequest) -> dict[str, bool]:
    return {"DEBUG": settings.DEBUG}
