from typing import Dict

from django.conf import settings
from django.http import HttpRequest


def debug_flag(request: HttpRequest) -> Dict[str, bool]:
    return {"DEBUG": settings.DEBUG}
