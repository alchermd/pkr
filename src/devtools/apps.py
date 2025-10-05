import logging

from django.apps import AppConfig
from django.conf import settings
import pydevd_pycharm

logger = logging.getLogger(__name__)


class DevtoolsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "devtools"

    def ready(self):
        if settings.DEBUG:
            try:
                pydevd_pycharm.settrace(
                    "host.docker.internal",
                    port=4200,
                    stdoutToServer=True,
                    stderrToServer=True,
                    suspend=False,
                )
                logger.info("Connected to PyCharm Debugger")
            except Exception as e:
                logger.error("Failed to connect to PyCharm Debugger")
                logger.error(e)
