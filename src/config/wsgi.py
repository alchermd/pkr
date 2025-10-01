"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os


from django.conf import settings
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

if settings.DEBUG:
    import pydevd_pycharm

    pydevd_pycharm.settrace(
        "host.docker.internal",
        port=4200,
        stdoutToServer=True,
        stderrToServer=True,
        suspend=False,
    )

application = get_wsgi_application()
