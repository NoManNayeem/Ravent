# agenticai/apps.py

from django.apps import AppConfig

class AgenticaiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "agenticai"

    def ready(self):
        # Import signals module to register signal handlers
        import agenticai.signals
